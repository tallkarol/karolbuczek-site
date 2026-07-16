/**
 * Design-system kernel — the portable core of the 7-slot color configurator.
 *
 * Pure, framework-agnostic TypeScript (no Next.js / app / brand imports). This
 * is the module a future standalone package would lift out nearly as-is.
 *
 * - palette.ts  — role model, ColorSystem, derivation (paletteToCssVars), Coolors I/O
 * - contrast.ts — WCAG contrast + OKLCH legibility engine
 *
 * See README.md for the design-system contract (roles, tiers, token catalog).
 */
export * from "./palette"
export * from "./contrast"
