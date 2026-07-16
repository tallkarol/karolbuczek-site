/** Utilities for the /color-sampler dev page — not used in production routes. */
import {
  AA_NORMAL,
  channelsToHex,
  contrastRatio,
  gradeContrast,
  hexToChannels,
  legibleForeground,
  type ContrastGrade,
} from "./contrast"

export type SemanticRole =
  | "primary"
  | "secondary"
  | "accent"
  | "background"
  | "surface"
  | "inverse"
  | "neutral"

/** Fixed Coolors URL order — slot 1→7 maps directly to these roles. */
export const CANONICAL_ROLE_ORDER: SemanticRole[] = [
  "primary",
  "secondary",
  "accent",
  "background",
  "surface",
  "inverse",
  "neutral",
]

export const SLOT_COUNT = CANONICAL_ROLE_ORDER.length

const SLOT_IDS = [
  "slot-primary",
  "slot-secondary",
  "slot-accent",
  "slot-background",
  "slot-surface",
  "slot-inverse",
  "slot-neutral",
] as const

export const SEMANTIC_ROLE_META: {
  role: SemanticRole
  label: string
  description: string
  group: "brand" | "canvas" | "utility"
  /** core = required minimum viable palette; brand = optional (may repeat from primary). */
  tier: "core" | "brand"
  optional?: boolean
}[] = [
  { role: "primary", label: "Primary", description: "Brand anchor · CTAs · headings", group: "brand", tier: "core" },
  { role: "secondary", label: "Secondary", description: "Process sections · supporting brand", group: "brand", tier: "brand", optional: true },
  { role: "accent", label: "Accent", description: "Highlights · badges · active states", group: "brand", tier: "brand", optional: true },
  { role: "background", label: "Background", description: "Page canvas · editorial warmth", group: "canvas", tier: "core" },
  { role: "surface", label: "Surface", description: "Cards · elevated UI · inputs", group: "canvas", tier: "core" },
  { role: "inverse", label: "Inverse", description: "Hero · footer · dark environments", group: "canvas", tier: "brand", optional: true },
  { role: "neutral", label: "Neutral", description: "Metadata · borders · tertiary text", group: "utility", tier: "core" },
]

/** Functional status tier — themeable defaults, separate from the 7 brand slots. */
export type StatusRole = "success" | "warning" | "danger" | "info"

export type StatusColors = Record<StatusRole, string>

export const STATUS_ROLE_META: { role: StatusRole; label: string; description: string }[] = [
  { role: "success", label: "Success", description: "Positive · healthy · complete" },
  { role: "warning", label: "Warning", description: "Caution · degraded · attention" },
  { role: "danger", label: "Danger", description: "Error · destructive · failure" },
  { role: "info", label: "Info", description: "Informational · neutral notice" },
]

/** Sensible defaults (green / amber / red / blue). `danger` matches the current --destructive. */
export const DEFAULT_STATUS_COLORS: StatusColors = {
  success: "#3F7D4E",
  warning: "#B7791F",
  danger: "#B42222", // ≈ hsl(0 68% 42%) — matches the prior --destructive
  info: "#2C5C8F",
}

export type ColorSwatch = {
  id: string
  hex: string
  label: string
  role: SemanticRole
}

export type ColorSystem = {
  swatches: ColorSwatch[]
  roles: Record<SemanticRole, string>
  /** Functional status tier — omitted means DEFAULT_STATUS_COLORS. Not part of the 7-color Coolors import. */
  status?: StatusColors
}

/** Status colors for a system, falling back to themeable defaults. */
export function getStatusColors(system: ColorSystem): StatusColors {
  return { ...DEFAULT_STATUS_COLORS, ...(system.status ?? {}) }
}

/** @deprecated Legacy flat palette — migrated automatically from localStorage */
export type BrandPalette = {
  navy: string
  olive: string
  chiffon: string
  slate: string
  white: string
}

// Default brand slots — premium slate-grey system with a pacific-cyan accent.
const KAROL_SEVEN_SLOT_HEXES = [
  "#46494C", // primary    — iron grey (headings · CTAs)
  "#4C5C68", // secondary  — blue slate (process / support bands)
  "#157893", // accent     — pacific cyan (highlights · links · active)
  "#DCDCDD", // background — alabaster grey (page canvas)
  "#FFFFFF", // surface    — white (cards · elevated)
  "#16191D", // inverse    — near-black cool charcoal (heroes · footer)
  "#C5C3C6", // neutral    — pale slate (borders · metadata)
]

const COOLORS_SEVEN_SLOT_EXAMPLE = [
  "#172033",
  "#2F3D56",
  "#5E7CE2",
  "#F5F3EE",
  "#FFFFFF",
  "#07090D",
  "#B4BBC6",
]

function getHexLightness(hex: string): number {
  const rgb = hexToRgb(hex)
  if (!rgb) return 0
  return rgbToHsl(rgb.r, rgb.g, rgb.b)[2]
}

function normalizeHex(hex: string): string | null {
  const token = hex.replace("#", "").trim().toLowerCase()
  if (/^[0-9a-f]{6}$/.test(token)) return `#${token.toUpperCase()}`
  if (/^[0-9a-f]{3}$/.test(token)) {
    return `#${token[0]}${token[0]}${token[1]}${token[1]}${token[2]}${token[2]}`.toUpperCase()
  }
  return null
}

/** Pad partial Coolors imports to 7 slots using lightness heuristics for missing positions. */
function padHexesToSeven(hexes: string[]): string[] {
  const normalized = hexes.map((h) => normalizeHex(h)).filter((h): h is string => h !== null)
  if (normalized.length >= SLOT_COUNT) return normalized.slice(0, SLOT_COUNT)
  if (normalized.length === 0) return [...KAROL_SEVEN_SLOT_HEXES]

  const sorted = [...normalized].sort((a, b) => getHexLightness(b) - getHexLightness(a))
  const lightest = sorted[0]
  const darkest = sorted[sorted.length - 1]
  const mid = sorted[Math.floor(sorted.length / 2)]

  return CANONICAL_ROLE_ORDER.map((role, i) => {
    if (normalized[i]) return normalized[i]
    switch (role) {
      case "surface":
        return lightest
      case "inverse":
        return darkest
      case "neutral":
      case "background":
        return mid
      default:
        return normalized[normalized.length - 1]
    }
  })
}

function buildRoleMap(swatches: ColorSwatch[]): Record<SemanticRole, string> {
  return Object.fromEntries(
    CANONICAL_ROLE_ORDER.map((role, i) => [role, swatches[i]?.id ?? swatches[0].id])
  ) as Record<SemanticRole, string>
}

function buildSwatchesFromHexes(hexes: string[]): ColorSwatch[] {
  const padded = padHexesToSeven(hexes)
  return CANONICAL_ROLE_ORDER.map((role, i) => {
    const meta = SEMANTIC_ROLE_META.find((m) => m.role === role)!
    return {
      id: SLOT_IDS[i],
      hex: normalizeHex(padded[i]) ?? padded[i],
      label: meta.label,
      role,
    }
  })
}

export function createSystemFromHexes(hexes: string[]): ColorSystem {
  const swatches = buildSwatchesFromHexes(hexes)
  return { swatches, roles: buildRoleMap(swatches) }
}

export const DEFAULT_COLOR_SYSTEM: ColorSystem = createSystemFromHexes(KAROL_SEVEN_SLOT_HEXES)

/** @deprecated Use DEFAULT_COLOR_SYSTEM */
export const DEFAULT_PALETTE: BrandPalette = {
  navy: "#0D3B66",
  olive: "#474B24",
  chiffon: "#FAF0CA",
  slate: "#828A95",
  white: "#FFFFFF",
}

export const PALETTE_PRESETS: { id: string; label: string; system: ColorSystem }[] = [
  { id: "current", label: "Karol brand", system: DEFAULT_COLOR_SYSTEM },
  { id: "coolors-7", label: "Coolors 7-slot", system: createSystemFromHexes(COOLORS_SEVEN_SLOT_EXAMPLE) },
]

function normalizeColorSystem(system: ColorSystem): ColorSystem {
  const hexes = CANONICAL_ROLE_ORDER.map((role) => getRoleHex(system, role))
  return createSystemFromHexes(hexes)
}

export function brandPaletteToSystem(palette: BrandPalette): ColorSystem {
  return createSystemFromHexes([
    palette.navy,
    palette.olive,
    palette.olive,
    palette.chiffon,
    palette.white,
    palette.navy,
    palette.slate,
  ])
}

export function parseStoredColorSystem(raw: unknown): ColorSystem {
  if (!raw || typeof raw !== "object") return DEFAULT_COLOR_SYSTEM

  if ("swatches" in raw && "roles" in raw) {
    const system = raw as ColorSystem
    if (Array.isArray(system.swatches) && system.roles) {
      return normalizeColorSystem(system)
    }
  }

  if ("navy" in raw) {
    return brandPaletteToSystem(raw as BrandPalette)
  }

  return DEFAULT_COLOR_SYSTEM
}

export function getRoleIndex(role: SemanticRole): number {
  return CANONICAL_ROLE_ORDER.indexOf(role)
}

export function getSwatchForRole(system: ColorSystem, role: SemanticRole): ColorSwatch | undefined {
  const idx = getRoleIndex(role)
  return idx >= 0 ? system.swatches[idx] : undefined
}

export function getSwatchById(system: ColorSystem, id: string): ColorSwatch | undefined {
  return system.swatches.find((s) => s.id === id)
}

export function getRoleHex(system: ColorSystem, role: SemanticRole): string {
  return getSwatchForRole(system, role)?.hex ?? "#000000"
}

function swapSwatchHexAtIndices(system: ColorSystem, indexA: number, indexB: number): ColorSystem {
  if (indexA < 0 || indexB < 0 || indexA === indexB) return system
  const swatches = system.swatches.map((s) => ({ ...s }))
  const hexA = swatches[indexA].hex
  swatches[indexA] = { ...swatches[indexA], hex: swatches[indexB].hex }
  swatches[indexB] = { ...swatches[indexB], hex: hexA }
  return { swatches, roles: buildRoleMap(swatches) }
}

export function assignRole(system: ColorSystem, role: SemanticRole, swatchId: string): ColorSystem {
  const sourceIdx = system.swatches.findIndex((s) => s.id === swatchId)
  const targetIdx = getRoleIndex(role)
  if (sourceIdx < 0 || targetIdx < 0) return system
  return swapSwatchHexAtIndices(system, sourceIdx, targetIdx)
}

export function swapRoles(system: ColorSystem, roleA: SemanticRole, roleB: SemanticRole): ColorSystem {
  return swapSwatchHexAtIndices(system, getRoleIndex(roleA), getRoleIndex(roleB))
}

export function updateSwatchHex(system: ColorSystem, swatchId: string, hex: string): ColorSystem {
  const normalized = normalizeHex(hex)
  if (!normalized) return system
  const swatches = system.swatches.map((s) => (s.id === swatchId ? { ...s, hex: normalized } : s))
  return { swatches, roles: buildRoleMap(swatches) }
}

export function updateRoleHex(system: ColorSystem, role: SemanticRole, hex: string): ColorSystem {
  const swatch = getSwatchForRole(system, role)
  if (!swatch) return system
  return updateSwatchHex(system, swatch.id, hex)
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const normalized = hex.replace("#", "").trim()
  if (!/^[0-9A-Fa-f]{6}$/.test(normalized)) return null
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  }
}

export function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      default:
        h = ((r - g) / d + 4) / 6
    }
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

export function hexToHslChannels(hex: string): string | null {
  const rgb = hexToRgb(hex)
  if (!rgb) return null
  const [h, s, l] = rgbToHsl(rgb.r, rgb.g, rgb.b)
  return `${h} ${s}% ${l}%`
}

/** Recolor: keep a hex's hue, optionally scale its saturation, set an explicit lightness. */
function withLightness(hex: string, lightness: number, satScale = 1): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return "0 0% 50%"
  const [h, s] = rgbToHsl(rgb.r, rgb.g, rgb.b)
  return `${h} ${Math.round(s * satScale)}% ${lightness}%`
}

function slotChannels(system: ColorSystem, role: SemanticRole): string {
  return hexToHslChannels(getRoleHex(system, role)) ?? "0 0% 50%"
}

/**
 * Pick a foreground that clears AA against `bgChannels`, preferring `preferredChannels`.
 * No-op (returns the exact preferred channels) when it already passes — so the default
 * palette stays byte-identical; only failing palettes get remediated.
 */
function legibleFg(bgChannels: string, preferredChannels: string, target: number = AA_NORMAL): string {
  const bgHex = channelsToHex(bgChannels)
  const prefHex = channelsToHex(preferredChannels)
  if (contrastRatio(prefHex, bgHex) >= target) return preferredChannels
  return hexToChannels(legibleForeground(bgHex, prefHex, target))
}

/** Canonical 7-slot swatches for the UI kit token panel. */
export function getSlotTokenSwatches(system: ColorSystem): [string, string][] {
  return SEMANTIC_ROLE_META.map(({ role, label }) => {
    const index = String(getRoleIndex(role) + 1).padStart(2, "0")
    return [`${index} · ${label}`, slotChannels(system, role)]
  })
}

/** Build all CSS custom properties from semantic role assignments. */
export function paletteToCssVars(system: ColorSystem, mode: "light" | "dark"): Record<string, string> {
  const primaryHex = getRoleHex(system, "primary")
  const secondaryHex = getRoleHex(system, "secondary")
  const accentHex = getRoleHex(system, "accent")
  const backgroundHex = getRoleHex(system, "background")
  const surfaceHex = getRoleHex(system, "surface")
  const neutralHex = getRoleHex(system, "neutral")
  const inverseHex = getRoleHex(system, "inverse")

  const slots = Object.fromEntries(
    CANONICAL_ROLE_ORDER.map((role) => [`--slot-${role}`, slotChannels(system, role)])
  ) as Record<string, string>

  const navy = slots["--slot-primary"]
  const olive = slots["--slot-secondary"]
  const accent = slots["--slot-accent"]
  const chiffon = slots["--slot-background"]
  const white = slots["--slot-surface"]
  const slate = slots["--slot-neutral"]

  // Primitive tonal scale — derived from slots (hue+sat held, lightness set).
  const navy950 = withLightness(inverseHex, 8)
  const navy900 = withLightness(inverseHex, 10)
  const navy800 = withLightness(primaryHex, 16)
  const navy700 = navy
  const olive800 = withLightness(secondaryHex, 16)
  const olive700 = olive
  const chiffon100 = withLightness(backgroundHex, 94)
  const chiffon200 = chiffon
  const slateInk = withLightness(neutralHex, 38)

  // Borders — light from neutral; dark navy-tinted from primary (subtle, 1px).
  const borderSubtle = withLightness(neutralHex, 82)
  const borderDefault = withLightness(neutralHex, 74)
  const borderEmphasis = withLightness(primaryHex, 55, 0.52)
  const borderSubtleDark = withLightness(primaryHex, 19, 0.36)
  const borderDefaultDark = withLightness(primaryHex, 28, 0.29)
  const borderEmphasisDark = withLightness(backgroundHex, 55, 0.36)

  // Muted / secondary text — desaturated tints (satScale tuned so the default brand matches).
  const mutedLight = withLightness(backgroundHex, 90, 0.54)
  const textSecLight = withLightness(primaryHex, 28, 0.58)
  const textSecDark = withLightness(backgroundHex, 78, 0.48)
  const surfaceCardHoverDark = withLightness(primaryHex, 18, 0.9)

  // Functional status tier — themeable defaults, foregrounds contrast-derived.
  const status = getStatusColors(system)
  const statusVars: Record<string, string> = {}
  for (const { role } of STATUS_ROLE_META) {
    const ch = hexToChannels(status[role])
    statusVars[`--${role}`] = ch
    statusVars[`--${role}-foreground`] = legibleFg(ch, white)
  }

  // Per-environment legible foregrounds for the brand-fixed kb-section-* bands.
  // Preferred = the band's current ink/muted choice, so the default palette is a
  // no-op; arbitrary/simpler palettes get auto-remediated to clear AA.
  const onVars: Record<string, string> = {}
  const envDefs: [string, string, string, string][] = [
    // [role, bg, preferred foreground, preferred muted]
    ["secondary", olive, chiffon, chiffon],
    ["primary", navy, chiffon, slate],
    ["accent", accent, white, chiffon],
    ["neutral", slate, slots["--slot-inverse"], navy],
    ["inverse", slots["--slot-inverse"], chiffon, slate],
  ]
  for (const [name, bg, fgPref, mutedPref] of envDefs) {
    onVars[`--on-${name}`] = legibleFg(bg, fgPref)
    onVars[`--on-${name}-muted`] = legibleFg(bg, mutedPref)
  }

  // Accent used AS TEXT must clear AA — vibrant accent (e.g. cyan) is fine for
  // fills but fails as small text. Darken on light canvases, lighten on dark.
  // Tune each against the HARDEST surface it appears on (the darkest light bg /
  // the lightest dark bg = elevated card) so it passes on all the rest too.
  const accentTextLight = legibleFg(chiffon100, accent)
  const accentTextOnDark = legibleFg(navy800, accent)

  const light: Record<string, string> = {
    ...slots,
    "--brand-accent": accent,
    "--regal-navy": navy700,
    "--olive-leaf": olive700,
    "--lemon-chiffon": chiffon200,
    "--slate-grey": slate,
    "--pure-white": white,
    "--navy-950": navy950,
    "--navy-900": navy900,
    "--navy-800": navy800,
    "--navy-700": navy700,
    "--olive-800": olive800,
    "--olive-700": olive700,
    "--chiffon-100": chiffon100,
    "--chiffon-200": chiffon200,
    "--slate-500": slate,
    "--slate-ink": slateInk,
    "--navy": navy700,
    "--olive": olive700,
    "--cream": chiffon200,
    "--slate": slate,
    "--paper": chiffon100,
    "--ink": navy900,
    "--background-primary": chiffon100,
    "--background-secondary": chiffon200,
    "--background-elevated": white,
    "--background-inverse": navy900,
    "--background-process": olive700,
    "--text-primary": navy900,
    "--text-secondary": textSecLight,
    "--text-tertiary": slateInk,
    "--text-inverse": chiffon200,
    "--text-on-dark": chiffon200,
    "--border-subtle": borderSubtle,
    "--border-default": borderDefault,
    "--border-emphasis": borderEmphasis,
    "--accent-primary": navy700,
    "--accent-secondary": olive700,
    "--accent-active": olive700,
    "--surface-card": white,
    "--surface-card-hover": white,
    "--surface-selected": navy800,
    "--signal-success": statusVars["--success"],
    "--signal-processing": chiffon200,
    "--signal-inactive": slate,
    "--background": chiffon100,
    "--background-alt": chiffon200,
    "--background-dark": navy900,
    "--foreground": navy900,
    "--heading": navy700,
    "--card": white,
    "--card-foreground": navy900,
    "--popover": white,
    "--popover-foreground": navy900,
    "--primary": navy700,
    "--primary-foreground": legibleFg(navy700, chiffon200),
    "--secondary": chiffon200,
    "--secondary-foreground": legibleFg(chiffon200, navy900),
    "--muted": mutedLight,
    "--muted-foreground": textSecLight,
    "--accent": accent,
    "--accent-foreground": legibleFg(accent, chiffon200),
    "--accent-text": accentTextLight,
    "--accent-text-on-dark": accentTextOnDark,
    "--destructive": statusVars["--danger"],
    "--destructive-foreground": statusVars["--danger-foreground"],
    "--border": borderSubtle,
    "--border-strong": borderDefault,
    "--input": borderSubtle,
    "--ring": navy700,
    "--radius": "0.5rem",
    ...statusVars,
    ...onVars,
  }

  const dark: Record<string, string> = {
    ...light,
    "--background-primary": navy950,
    "--background-secondary": navy900,
    "--background-elevated": navy800,
    "--background-inverse": navy900,
    "--background-process": olive800,
    "--background": navy950,
    "--background-alt": navy900,
    "--background-dark": navy950,
    "--text-primary": chiffon200,
    "--text-secondary": textSecDark,
    "--text-tertiary": slate,
    "--border-subtle": borderSubtleDark,
    "--border-default": borderDefaultDark,
    "--border-emphasis": borderEmphasisDark,
    "--accent-primary": chiffon200,
    "--surface-card": navy800,
    "--surface-card-hover": surfaceCardHoverDark,
    "--surface-selected": olive700,
    "--foreground": chiffon200,
    "--heading": chiffon200,
    "--card": navy800,
    "--card-foreground": chiffon200,
    "--popover": navy800,
    "--popover-foreground": chiffon200,
    "--primary": chiffon200,
    "--primary-foreground": legibleFg(chiffon200, navy900),
    "--secondary": olive800,
    "--secondary-foreground": legibleFg(olive800, chiffon200),
    "--muted": navy800,
    "--muted-foreground": textSecDark,
    "--accent": accent,
    "--accent-foreground": legibleFg(accent, chiffon200),
    "--accent-text": accentTextOnDark,
    "--border": borderSubtleDark,
    "--border-strong": borderDefaultDark,
    "--input": borderSubtleDark,
    "--ring": chiffon200,
  }

  return mode === "light" ? light : dark
}

export function systemToCoolorsUrl(system: ColorSystem): string {
  const codes = CANONICAL_ROLE_ORDER.map((role) =>
    getRoleHex(system, role).replace("#", "").toLowerCase()
  ).join("-")
  return `https://coolors.co/${codes}`
}

/** @deprecated Use systemToCoolorsUrl */
export function paletteToCoolorsUrl(palette: BrandPalette): string {
  return systemToCoolorsUrl(brandPaletteToSystem(palette))
}

/** Extract hyphenated hex segment from Coolors URLs or raw lists. */
function extractCoolorsHexSegment(input: string): string | null {
  const trimmed = input.trim()

  if (/^[0-9a-f]{3,6}(?:-[0-9a-f]{3,6})+$/i.test(trimmed)) {
    return trimmed
  }

  try {
    const url = new URL(trimmed.includes("://") ? trimmed : `https://${trimmed}`)
    const host = url.hostname.replace(/^www\./i, "")
    if (host !== "coolors.co") return null

    const path = decodeURIComponent(url.pathname).replace(/^\/+|\/+$/g, "")
    if (!path) return null

    const prefixed = path.match(/^(?:palette|gradient-palette)\/([0-9a-f-]+)$/i)
    if (prefixed) return prefixed[1]

    if (/^[0-9a-f]{3,6}(?:-[0-9a-f]{3,6})+$/i.test(path)) {
      return path
    }

    return null
  } catch {
    return null
  }
}

/** Extract hex codes from a Coolors URL, share link, or raw hyphen list. */
export function parseCoolorsInput(input: string): { system: ColorSystem } | { error: string } {
  const trimmed = input.trim()
  if (!trimmed) {
    return { error: "Paste a Coolors palette URL or hyphen-separated hex codes." }
  }

  const hexSegment = extractCoolorsHexSegment(trimmed)

  if (!hexSegment) {
    if (trimmed.includes("coolors.co")) {
      return {
        error: "Could not read colors from that Coolors URL. Use a /palette/… or /hex-hex-… link.",
      }
    }
    return { error: "Paste a Coolors URL or hyphen-separated hex codes (e.g. 20242b-345995-d8dce3)." }
  }

  const tokens = hexSegment.split("-").filter(Boolean)
  const hexes = tokens.map(normalizeHex).filter((h): h is string => h !== null)

  if (hexes.length < 3) {
    return {
      error: `Need at least 3 colors. Found ${hexes.length}. Full system uses 7 slots in Coolors order.`,
    }
  }

  return { system: createSystemFromHexes(hexes) }
}

export function systemToGlobalsSnippet(system: ColorSystem): string {
  const roleLines = SEMANTIC_ROLE_META.map(({ role, label }) => {
    const swatch = getSwatchById(system, system.roles[role])
    return `/* ${label}: ${swatch?.hex ?? "—"} */`
  })

  const lines = [
    "/* Paste into :root in globals.css — derived by /color-sampler */",
    "/* Semantic role mapping: */",
    ...roleLines,
    "",
    "/* HSL channels (auto-derived): */",
    ...Object.entries(paletteToCssVars(system, "light"))
      .filter(
        ([k]) =>
          k.startsWith("--navy") ||
          k.startsWith("--olive") ||
          k.startsWith("--chiffon") ||
          k.startsWith("--slate") ||
          k.startsWith("--background") ||
          k.startsWith("--accent")
      )
      .map(([k, v]) => `${k}: ${v};`),
  ]
  return lines.join("\n")
}

/** @deprecated Use systemToGlobalsSnippet */
export function paletteToGlobalsSnippet(palette: BrandPalette): string {
  return systemToGlobalsSnippet(brandPaletteToSystem(palette))
}

/** One audited foreground/background pairing the system produces. */
export type AuditRow = {
  label: string
  fg: string
  bg: string
  ratio: number
  grade: ContrastGrade
  large: boolean
}

/**
 * Audit every meaningful foreground/background pair the system emits, for a mode.
 * Used by the /color-sampler audit panel and the a11y verification script.
 */
export function getContrastAudit(system: ColorSystem, mode: "light" | "dark"): AuditRow[] {
  const v = paletteToCssVars(system, mode)
  const hex = (name: string) => channelsToHex(v[name] ?? "0 0% 0%")
  const pairs: [string, string, string, boolean?][] = [
    ["Body on canvas", "--foreground", "--background"],
    ["Muted on canvas", "--muted-foreground", "--background"],
    ["Heading on canvas", "--heading", "--background"],
    ["Muted on card", "--muted-foreground", "--card"],
    ["Primary button", "--primary-foreground", "--primary"],
    ["Secondary button", "--secondary-foreground", "--secondary"],
    ["Accent fg", "--accent-foreground", "--accent"],
    ["Accent text on canvas", "--accent-text", "--background"],
    ["Accent text on surface", "--accent-text", "--surface-card"],
    ["Accent text on inverse", "--accent-text-on-dark", "--slot-inverse", true],
    ["Card text", "--card-foreground", "--card"],
    ["Inverse text", "--text-inverse", "--slot-inverse"],
    ["Success", "--success-foreground", "--success"],
    ["Warning", "--warning-foreground", "--warning"],
    ["Danger", "--danger-foreground", "--danger"],
    ["Info", "--info-foreground", "--info"],
    ["On secondary band", "--on-secondary", "--slot-secondary"],
    ["On secondary muted", "--on-secondary-muted", "--slot-secondary"],
    ["On primary band", "--on-primary", "--slot-primary"],
    ["On accent band", "--on-accent", "--slot-accent"],
    ["On inverse band", "--on-inverse", "--slot-inverse"],
    ["On neutral band", "--on-neutral", "--slot-neutral"],
  ]
  return pairs.map(([label, fgV, bgV, large]) => {
    const fg = hex(fgV)
    const bg = hex(bgV)
    const { ratio, grade } = gradeContrast(fg, bg)
    return { label, fg, bg, ratio, grade, large: !!large }
  })
}
