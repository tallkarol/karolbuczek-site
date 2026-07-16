/**
 * Design-system token generator.
 *
 * Emits the derived CSS custom properties for app/globals.css from the 7-slot
 * ColorSystem — the single source of truth. Production consumes only the static
 * CSS it writes; this script (and culori) run at build/dev time only.
 *
 *   npx tsx scripts/generate-tokens.ts           # write generated blocks into globals.css
 *   npx tsx scripts/generate-tokens.ts --check   # fail (exit 1) if globals.css is stale
 *   npx tsx scripts/generate-tokens.ts --print    # print the blocks to stdout
 *
 * Swapping the palette = change DEFAULT_COLOR_SYSTEM's 7 slot hexes (or the
 * status defaults) and re-run. Everything else re-derives.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { paletteToCssVars, DEFAULT_COLOR_SYSTEM } from "../lib/design-system/palette"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const GLOBALS = path.resolve(__dirname, "../app/globals.css")

const ROOT_START = "/* >>> generated-tokens:root — derived from the 7 slots by scripts/generate-tokens.ts — do not hand-edit <<< */"
const ROOT_END = "/* <<< end generated-tokens:root */"
const DARK_START = "/* >>> generated-tokens:dark — do not hand-edit <<< */"
const DARK_END = "/* <<< end generated-tokens:dark */"

function fmt(vars: Record<string, string>, indent: string): string {
  return Object.entries(vars)
    .map(([k, v]) => `${indent}${k}: ${v};`)
    .join("\n")
}

function buildBlocks() {
  const light = paletteToCssVars(DEFAULT_COLOR_SYSTEM, "light")
  const dark = paletteToCssVars(DEFAULT_COLOR_SYSTEM, "dark")
  const darkOverrides: Record<string, string> = {}
  for (const [k, v] of Object.entries(dark)) if (v !== light[k]) darkOverrides[k] = v
  return {
    root: `${ROOT_START}\n${fmt(light, "    ")}\n    ${ROOT_END}`,
    dark: `${DARK_START}\n${fmt(darkOverrides, "    ")}\n    ${DARK_END}`,
  }
}

function replaceBetween(src: string, start: string, end: string, block: string): string {
  const s = src.indexOf(start)
  const e = src.indexOf(end)
  if (s === -1 || e === -1) {
    throw new Error(`Markers not found in globals.css: ${start.slice(0, 40)}…\nRun the Phase 1 setup to insert markers first.`)
  }
  return src.slice(0, s) + block + src.slice(e + end.length)
}

function apply(src: string): string {
  const { root, dark } = buildBlocks()
  let out = replaceBetween(src, ROOT_START, ROOT_END, root)
  out = replaceBetween(out, DARK_START, DARK_END, dark)
  return out
}

function main() {
  const mode = process.argv[2]
  const { root, dark } = buildBlocks()

  if (mode === "--print") {
    console.log(root + "\n\n" + dark)
    return
  }

  const src = fs.readFileSync(GLOBALS, "utf8")
  const next = apply(src)

  if (mode === "--check") {
    if (src !== next) {
      console.error("✗ globals.css generated tokens are STALE. Run: npx tsx scripts/generate-tokens.ts")
      process.exit(1)
    }
    console.log("✓ globals.css generated tokens are up to date.")
    return
  }

  if (src === next) {
    console.log("✓ globals.css already up to date.")
  } else {
    fs.writeFileSync(GLOBALS, next)
    console.log("✓ globals.css generated tokens written.")
  }
}

main()
