/**
 * Client logos for the homepage trust bar (`components/character/TrustBar.tsx`).
 * Ported from tallkarol's lib/brands.ts — keep the two lists in step.
 *
 * TO ADD A LOGO — append one entry here, nothing else:
 *   1. Drop the file in `public/` (SVG best; otherwise a transparent PNG/WebP
 *      trimmed tight to the mark).
 *   2. Read its intrinsic pixel size: `sips -g pixelWidth -g pixelHeight public/your-logo.png`
 *      (for SVG, use the viewBox numbers).
 *   3. Pick `displayHeight`: wide wordmarks 32–36, square-ish marks 48–52.
 *      Cap is TICKER_ROW_HEIGHT.
 */
export type Brand = {
  name: string
  logo: string
  /** intrinsic pixel dimensions of the source file */
  width: number
  height: number
  /** optical height in the bar, px — balances weight across aspect ratios */
  displayHeight: number
}

/** Fixed row height for every logo — the CLS-0 contract. Keep displayHeight ≤ this. */
export const TICKER_ROW_HEIGHT = 56

export const brands: Brand[] = [
  { name: "AXVOR", logo: "/axvor-logo.png", width: 2300, height: 700, displayHeight: 36 },
  { name: "Zemvelo", logo: "/zemvelo-logo.png", width: 650, height: 150, displayHeight: 40 },
  { name: "DQS Solutions & Staffing", logo: "/dqs-logo.png", width: 1475, height: 460, displayHeight: 40 },
  { name: "Auto Intelligence Solutions", logo: "/ais-logo.png", width: 366, height: 257, displayHeight: 52 },
  { name: "GDI", logo: "/GDI-Main-Logo.svg", width: 292, height: 72, displayHeight: 36 },
  { name: "UWD", logo: "/uwd-logo.png", width: 600, height: 291, displayHeight: 44 },
  { name: "PPW", logo: "/ppw.webp", width: 600, height: 412, displayHeight: 52 },
  { name: "Mineralife", logo: "/ML-Horizontal-Logo-w-Tag.png", width: 776, height: 266, displayHeight: 50 },
  { name: "Artist House", logo: "/artist-house-logo.webp", width: 1407, height: 417, displayHeight: 36 },
]

/** Width the logo actually paints at — drives the `sizes` hint and the loop math. */
export function renderedWidth(brand: Brand): number {
  return Math.round((brand.width / brand.height) * brand.displayHeight)
}
