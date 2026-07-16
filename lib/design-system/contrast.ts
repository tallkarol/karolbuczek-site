/**
 * WCAG 2.1 contrast + perceptual (OKLCH) legibility engine.
 *
 * Pure, framework-agnostic. Used by the /color-sampler dev route and the
 * build-time token generator — NOT by production routes (which consume static
 * CSS vars). Powered by `culori` for correct relative luminance + in-gamut
 * OKLCH lightness adjustment.
 */
import { wcagContrast, wcagLuminance, oklch, formatHex, clampChroma, converter } from "culori"

const toHsl = converter("hsl")

/** WCAG AA/AAA thresholds. Normal text 4.5:1, large text / UI components 3:1. */
export const AA_NORMAL = 4.5
export const AA_LARGE = 3.0
export const AAA_NORMAL = 7.0
export const AAA_LARGE = 4.5

/** Relative luminance (0–1) per WCAG 2.1. Accepts any CSS color / hex. */
export function relativeLuminance(color: string): number {
  return wcagLuminance(color) ?? 0
}

/** WCAG 2.1 contrast ratio (1–21) between two colors. */
export function contrastRatio(a: string, b: string): number {
  return wcagContrast(a, b) ?? 1
}

export function passesAA(ratio: number, opts: { large?: boolean } = {}): boolean {
  return ratio >= (opts.large ? AA_LARGE : AA_NORMAL)
}

export function passesAAA(ratio: number, opts: { large?: boolean } = {}): boolean {
  return ratio >= (opts.large ? AAA_LARGE : AAA_NORMAL)
}

export type ContrastGrade = "AAA" | "AA" | "AA-large" | "fail"

/** Grade a foreground/background pair for reporting (audit panel). */
export function gradeContrast(fg: string, bg: string): { ratio: number; grade: ContrastGrade } {
  const ratio = contrastRatio(fg, bg)
  let grade: ContrastGrade = "fail"
  if (ratio >= AAA_NORMAL) grade = "AAA"
  else if (ratio >= AA_NORMAL) grade = "AA"
  else if (ratio >= AA_LARGE) grade = "AA-large"
  return { ratio, grade }
}

/** Parse "H S% L%" channel triplet into a hex string (for luminance math). */
export function channelsToHex(channels: string): string {
  const m = channels.trim().match(/^(-?[\d.]+)\s+(-?[\d.]+)%\s+(-?[\d.]+)%$/)
  if (!m) return formatHex(channels) ?? "#000000"
  const [, h, s, l] = m
  return formatHex({ mode: "hsl", h: Number(h), s: Number(s) / 100, l: Number(l) / 100 }) ?? "#000000"
}

/** Convert a hex (or CSS color) back to "H S% L%" channels (Tailwind alpha-friendly form). */
export function hexToChannels(color: string): string {
  const c = toHsl(color)
  if (!c) return "0 0% 0%"
  return `${Math.round(c.h ?? 0)} ${Math.round((c.s ?? 0) * 100)}% ${Math.round((c.l ?? 0) * 100)}%`
}

/**
 * Return a foreground color that clears `target` contrast against `bg`, staying
 * as close as possible to `preferred` (hue + chroma held; only OKLCH lightness
 * is marched toward the legible end). Preserves brand character. Degenerate
 * fallback: whichever of black/white scores higher.
 */
export function legibleForeground(
  bg: string,
  preferred: string,
  target: number = AA_NORMAL,
  opts: { step?: number } = {}
): string {
  if (contrastRatio(preferred, bg) >= target) return preferred

  const pref = oklch(preferred)
  if (!pref) return fallbackBW(bg)

  const step = opts.step ?? 0.02
  // March away from the background's luminance: dark bg → lighten, light bg → darken.
  const dir = relativeLuminance(bg) < 0.5 ? 1 : -1
  const l0 = pref.l ?? 0.5

  for (let l = l0; l >= 0 && l <= 1; l += dir * step) {
    const candidate = formatHex(clampChroma({ mode: "oklch", l, c: pref.c ?? 0, h: pref.h ?? 0 }, "rgb"))
    if (candidate && contrastRatio(candidate, bg) >= target) return candidate
  }
  return fallbackBW(bg)
}

function fallbackBW(bg: string): string {
  return contrastRatio("#ffffff", bg) >= contrastRatio("#000000", bg) ? "#ffffff" : "#000000"
}

/** legibleForeground returning "H S% L%" channels for token emission. */
export function legibleForegroundChannels(bg: string, preferred: string, target: number = AA_NORMAL): string {
  return hexToChannels(legibleForeground(bg, preferred, target))
}
