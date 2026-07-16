"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ColorSamplerPreview } from "@/components/color-sampler/ColorSamplerPreview"
import { ContrastAudit } from "@/components/color-sampler/ContrastAudit"
import {
  type ColorSystem,
  type SemanticRole,
  CANONICAL_ROLE_ORDER,
  DEFAULT_COLOR_SYSTEM,
  PALETTE_PRESETS,
  SEMANTIC_ROLE_META,
  getSwatchForRole,
  getSlotTokenSwatches,
  parseCoolorsInput,
  parseStoredColorSystem,
  swapRoles,
  systemToCoolorsUrl,
  systemToGlobalsSnippet,
  paletteToCssVars,
  updateRoleHex,
} from "@/lib/design-system"
import { cn } from "@/lib/utils"

const STORAGE_KEY = "karolbuczek-color-sampler"
const SIDEBAR_STORAGE_KEY = "karolbuczek-color-sampler-sidebar"
const CONTENT_MAX = "max-w-7xl"
const DRAG_ROLE_PREFIX = "sampler-role:"

function setRoleDragData(e: React.DragEvent, role: SemanticRole) {
  e.dataTransfer.setData("text/plain", `${DRAG_ROLE_PREFIX}${role}`)
  e.dataTransfer.effectAllowed = "move"
}

function readDragData(e: React.DragEvent): { kind: "role"; role: SemanticRole } | null {
  const raw = e.dataTransfer.getData("text/plain")
  if (raw.startsWith(DRAG_ROLE_PREFIX)) {
    return { kind: "role", role: raw.slice(DRAG_ROLE_PREFIX.length) as SemanticRole }
  }
  return null
}

const ROLE_GROUPS = [
  { id: "brand" as const, label: "Brand" },
  { id: "canvas" as const, label: "Canvas" },
  { id: "utility" as const, label: "Utility" },
]

function ColorChip({
  hex,
  label,
  draggable = false,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop,
  className,
}: {
  hex: string
  label: string
  draggable?: boolean
  onDragStart?: (e: React.DragEvent) => void
  onDragEnd?: (e: React.DragEvent) => void
  onDragOver?: (e: React.DragEvent) => void
  onDragLeave?: (e: React.DragEvent) => void
  onDrop?: (e: React.DragEvent) => void
  className?: string
}) {
  return (
    <div
      draggable={draggable}
      onDragStart={(e) => {
        if (!draggable) return
        onDragStart?.(e)
      }}
      onDragEnd={onDragEnd}
      onDragOver={(e) => {
        if (!onDragOver) return
        e.preventDefault()
        e.stopPropagation()
        onDragOver(e)
      }}
      onDragLeave={onDragLeave}
      onDrop={(e) => {
        if (!onDrop) return
        e.preventDefault()
        e.stopPropagation()
        onDrop(e)
      }}
      title={label}
      className={cn(
        "flex h-9 min-w-0 flex-1 select-none items-center gap-2 rounded border border-zinc-200 bg-white px-2",
        draggable && "cursor-grab active:cursor-grabbing",
        className
      )}
    >
      <div
        className="h-5 w-5 shrink-0 rounded border border-black/10"
        style={{ backgroundColor: hex }}
      />
      <span className="truncate font-mono text-[10px] uppercase text-zinc-700">{hex}</span>
    </div>
  )
}

function RoleSlot({
  label,
  description,
  swatchHex,
  slotIndex,
  isDragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragStart,
  onDragEnd,
  onColorChange,
}: {
  label: string
  description: string
  swatchHex: string
  slotIndex: number
  isDragOver: boolean
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: () => void
  onDrop: (e: React.DragEvent) => void
  onDragStart: (e: React.DragEvent) => void
  onDragEnd: () => void
  onColorChange: (value: string) => void
}) {
  return (
    <div
      onDragEnter={(e) => {
        e.preventDefault()
        onDragOver(e)
      }}
      onDragOver={(e) => {
        e.preventDefault()
        onDragOver(e)
      }}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={cn(
        "rounded border p-2 transition-colors",
        isDragOver ? "border-zinc-400 bg-zinc-50" : "border-zinc-100 bg-zinc-50/50"
      )}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <p className="font-ui text-[11px] font-semibold text-zinc-800">{label}</p>
          <p className="font-ui text-[10px] leading-snug text-zinc-400">{description}</p>
        </div>
        <span className="shrink-0 font-mono text-[10px] text-zinc-400">{String(slotIndex).padStart(2, "0")}</span>
      </div>
      <div className="flex gap-2">
        <ColorChip
          hex={swatchHex}
          label={label}
          draggable
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className="max-w-[6.5rem] shrink-0 flex-none"
        />
        <input
          type="color"
          value={swatchHex}
          onChange={(e) => onColorChange(e.target.value)}
          className="h-9 w-9 shrink-0 cursor-pointer rounded border border-zinc-200"
          aria-label={`Edit ${label}`}
        />
        <Input
          value={swatchHex}
          onChange={(e) => onColorChange(e.target.value)}
          className="h-9 min-w-0 flex-1 font-mono text-xs uppercase"
          aria-label={`${label} hex`}
        />
      </div>
    </div>
  )
}

export function ColorSampler() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [system, setSystem] = useState<ColorSystem>(DEFAULT_COLOR_SYSTEM)
  const [previewMode, setPreviewMode] = useState<"light" | "dark">("light")
  const [copied, setCopied] = useState<string | null>(null)
  const [coolorsInput, setCoolorsInput] = useState("")
  const [coolorsError, setCoolorsError] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [dragOverRole, setDragOverRole] = useState<SemanticRole | null>(null)
  const activeDragRef = useRef<{ kind: "role"; role: SemanticRole } | null>(null)

  const clearActiveDrag = useCallback(() => {
    activeDragRef.current = null
    setDragOverRole(null)
  }, [])

  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setSystem(parseStoredColorSystem(JSON.parse(saved)))
      const savedSidebar = localStorage.getItem(SIDEBAR_STORAGE_KEY)
      if (savedSidebar !== null) setSidebarOpen(savedSidebar === "open")
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(system))
  }, [system, mounted])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem(SIDEBAR_STORAGE_KEY, sidebarOpen ? "open" : "closed")
  }, [sidebarOpen, mounted])

  const cssVars = useMemo(
    () => paletteToCssVars(system, previewMode),
    [system, previewMode]
  )

  const handleRoleDragStart = useCallback((e: React.DragEvent, role: SemanticRole) => {
    activeDragRef.current = { kind: "role", role }
    setRoleDragData(e, role)
  }, [])

  const handleRoleDragOver = useCallback((e: React.DragEvent, role: SemanticRole) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setDragOverRole(role)
  }, [])

  const handleRoleDrop = useCallback((e: React.DragEvent, targetRole: SemanticRole) => {
    e.preventDefault()
    setDragOverRole(null)

    const payload = readDragData(e) ?? activeDragRef.current
    clearActiveDrag()
    if (!payload || payload.kind !== "role" || payload.role === targetRole) return

    setSystem((s) => swapRoles(s, payload.role, targetRole))
  }, [clearActiveDrag])

  const updateRoleColor = (role: SemanticRole, value: string) => {
    setSystem((s) => updateRoleHex(s, role, value.startsWith("#") ? value : `#${value}`))
  }

  const copyText = useCallback(async (text: string, label: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }, [])

  const applyCoolorsInput = useCallback(() => {
    const result = parseCoolorsInput(coolorsInput)
    if ("error" in result) {
      setCoolorsError(result.error)
      return
    }
    setSystem(result.system)
    setCoolorsError(null)
    setCoolorsInput("")
  }, [coolorsInput])

  const handleCoolorsPaste = useCallback((value: string) => {
    setCoolorsInput(value)
    setCoolorsError(null)
    const result = parseCoolorsInput(value)
    if (!("error" in result)) {
      setSystem(result.system)
      setCoolorsInput("")
    }
  }, [])

  const tokenSwatches = useMemo(() => {
    const slots = getSlotTokenSwatches(system)
    const derived: [string, string][] = [
      ["primary-800", cssVars["--navy-800"]],
      ["secondary-800", cssVars["--olive-800"]],
      ["background-100", cssVars["--chiffon-100"]],
      ["inverse-900", cssVars["--navy-900"]],
      ["inverse-950", cssVars["--navy-950"]],
      ["neutral-ink", cssVars["--slate-ink"]],
      ["surface-card", cssVars["--surface-card"]],
      ["page-background", cssVars["--background"]],
    ].filter(([, v]) => v) as [string, string][]
    return [...slots, ...derived]
  }, [system, cssVars])

  return (
    <div className="flex min-h-screen bg-zinc-100 text-zinc-900">
      {/* Collapsible control sidebar — neutral chrome, not affected by preview tokens */}
      <aside
        className={cn(
          "sticky top-0 flex h-screen shrink-0 flex-col border-r border-zinc-200 bg-white transition-[width] duration-200 ease-in-out",
          sidebarOpen ? "w-80" : "w-12"
        )}
      >
        <div className={cn("flex items-center border-b border-zinc-100", sidebarOpen ? "justify-between px-4 py-3" : "justify-center py-3")}>
          {sidebarOpen && (
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <h1 className="font-display text-base font-semibold tracking-tight">Color Sampler</h1>
                <Link href="/" className="shrink-0 font-ui text-xs text-zinc-500 underline-offset-2 hover:underline">
                  ← Site
                </Link>
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={() => setSidebarOpen((open) => !open)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-zinc-200 text-zinc-600 hover:bg-zinc-50"
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            aria-expanded={sidebarOpen}
          >
            {sidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
          </button>
        </div>

        {sidebarOpen && (
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
            <div className="space-y-5 border-b border-zinc-100 px-4 py-4">
              <p className="font-ui text-xs text-zinc-500">
                Primitives → semantic roles · drag to reassign · preview updates live
              </p>

              <div>
                <p className="mb-2 font-ui text-[10px] uppercase tracking-wider text-zinc-500">Presets</p>
                <div className="flex flex-wrap gap-2">
                  {PALETTE_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setSystem(preset.system)}
                      className="rounded border border-zinc-200 bg-zinc-50 px-2.5 py-1 font-ui text-[11px] font-medium hover:bg-zinc-100"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-ui text-[10px] uppercase tracking-wider text-zinc-500">Preview mode</p>
                <div className="flex rounded border border-zinc-200 p-0.5">
                  {(["light", "dark"] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setPreviewMode(mode)}
                      className={cn(
                        "flex-1 rounded px-3 py-1 font-ui text-xs font-medium capitalize",
                        previewMode === mode ? "bg-zinc-900 text-white" : "text-zinc-600"
                      )}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
                {mounted && (
                  <button
                    type="button"
                    onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                    className="font-ui text-xs text-zinc-500 underline-offset-2 hover:underline"
                  >
                    Site theme: {resolvedTheme}
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="w-full rounded-none border-zinc-300 text-zinc-800"
                  onClick={() => copyText(systemToCoolorsUrl(system), "coolors")}
                >
                  {copied === "coolors" ? "Copied!" : "Coolors link"}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="w-full rounded-none border-zinc-300 text-zinc-800"
                  onClick={() => copyText(systemToGlobalsSnippet(system), "css")}
                >
                  {copied === "css" ? "Copied!" : "Copy CSS snippet"}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="w-full rounded-none border-zinc-300 text-zinc-800"
                  onClick={() => setSystem(DEFAULT_COLOR_SYSTEM)}
                >
                  Reset
                </Button>
              </div>
            </div>

            <div className="space-y-2 border-b border-zinc-100 px-4 py-4">
              <Label htmlFor="coolors-import" className="font-ui text-[10px] uppercase tracking-wider text-zinc-500">
                Import from Coolors
              </Label>
              <Input
                id="coolors-import"
                value={coolorsInput}
                onChange={(e) => {
                  setCoolorsInput(e.target.value)
                  setCoolorsError(null)
                }}
                onPaste={(e) => {
                  const pasted = e.clipboardData.getData("text")
                  if (pasted.includes("coolors.co") || /^[0-9a-f-]{11,}$/i.test(pasted.trim())) {
                    e.preventDefault()
                    handleCoolorsPaste(pasted)
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") applyCoolorsInput()
                }}
                placeholder="coolors.co/hex-hex-… or coolors.co/palette/…"
                className="h-9 font-mono text-xs"
              />
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="w-full rounded-none border-zinc-300 text-zinc-800"
                onClick={applyCoolorsInput}
              >
                Apply palette
              </Button>
              <p className="font-ui text-[11px] text-zinc-400">
                7 colors in order: Primary · Secondary · Accent · Background · Surface · Inverse · Neutral
              </p>
              {coolorsError && (
                <p className="font-ui text-xs text-red-600" role="alert">
                  {coolorsError}
                </p>
              )}
            </div>

            <div className="space-y-4 px-4 py-4">
              <div>
                <p className="mb-1 font-ui text-[10px] uppercase tracking-wider text-zinc-500">7-slot design system</p>
                <p className="mb-3 font-ui text-[10px] text-zinc-400">
                  Matches Coolors URL order · drag slots to swap colors
                </p>
              </div>
              {ROLE_GROUPS.map((group) => (
                <div key={group.id}>
                  <p className="mb-2 font-ui text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                    {group.label}
                  </p>
                  <div className="space-y-2">
                    {SEMANTIC_ROLE_META.filter((r) => r.group === group.id).map(({ role, label, description }) => {
                      const swatch = getSwatchForRole(system, role)
                      if (!swatch) return null
                      return (
                        <RoleSlot
                          key={role}
                          label={label}
                          description={description}
                          swatchHex={swatch.hex}
                          isDragOver={dragOverRole === role}
                          onDragOver={(e) => handleRoleDragOver(e, role)}
                          onDragLeave={() => setDragOverRole(null)}
                          onDrop={(e) => handleRoleDrop(e, role)}
                          onDragStart={(e) => handleRoleDragStart(e, role)}
                          onDragEnd={clearActiveDrag}
                          slotIndex={CANONICAL_ROLE_ORDER.indexOf(role) + 1}
                          onColorChange={(value) => updateRoleColor(role, value)}
                        />
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Live preview — scoped tokens, boxed to site content width */}
      <main className="min-w-0 flex-1">
        <div className={cn("mx-auto px-4 py-8 sm:px-6 lg:px-8", CONTENT_MAX)}>
          <p className="mb-3 font-ui text-[11px] uppercase tracking-wider text-zinc-500">
            Preview · {previewMode} mode · flip through demo pages below
          </p>
        <div
          className={cn(
            "color-sampler-preview overflow-hidden rounded-lg border border-zinc-300 shadow-xl",
            previewMode === "dark" && "dark"
          )}
          style={cssVars as React.CSSProperties}
        >
          <ColorSamplerPreview tokenSwatches={tokenSwatches} />
        </div>
        <div className="mt-6">
          <ContrastAudit system={system} />
        </div>
        </div>
      </main>
    </div>
  )
}
