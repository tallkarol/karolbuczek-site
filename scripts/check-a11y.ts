/**
 * Accessibility gate: assert every system-produced foreground/background pair
 * clears WCAG AA, across the default palette, an unrelated new scheme, and a
 * degenerate scheme with repeated colors. Run: npx tsx scripts/check-a11y.ts
 */
import { getContrastAudit, createSystemFromHexes, DEFAULT_COLOR_SYSTEM } from "../lib/design-system/palette"

const schemes: Record<string, ReturnType<typeof createSystemFromHexes>> = {
  "default (brand)": DEFAULT_COLOR_SYSTEM,
  "charcoal/rose": createSystemFromHexes(["#1A2233", "#3A4658", "#8F3D4A", "#F7F4ED", "#FFFFFF", "#090A0D", "#B0B6BF"]),
  "degenerate (repeats)": createSystemFromHexes(["#334155", "#334155", "#334155", "#FFFFFF", "#FFFFFF", "#334155", "#94A3B8"]),
}

let failures = 0
for (const [name, sys] of Object.entries(schemes)) {
  for (const mode of ["light", "dark"] as const) {
    const rows = getContrastAudit(sys, mode)
    const fails = rows.filter((r) => r.grade === "fail" || (r.grade === "AA-large" && !r.large))
    console.log(`${(name + " · " + mode).padEnd(30)} ${rows.length - fails.length}/${rows.length} pass AA`)
    for (const f of fails) {
      console.log(`    ✗ ${f.label}  ${f.ratio.toFixed(2)}:1 (${f.grade})  fg ${f.fg} on bg ${f.bg}`)
      failures++
    }
  }
}
if (failures) {
  console.error(`\n✗ ${failures} contrast failure(s).`)
  process.exit(1)
}
console.log("\n✓ All system foreground/background pairs pass WCAG AA across all schemes.")
