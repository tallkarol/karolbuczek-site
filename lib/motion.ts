/**
 * Motion tokens — the single source of truth for the site's scroll-motion language.
 *
 * Restrained, editorial feel: short durations, tiny distances, smooth deceleration,
 * no overshoot/bounce. CSS reveals read these via custom properties (see globals.css);
 * framer-motion scroll-linked effects (parallax, progress) import them directly.
 */

/** Easing curves as [x1, y1, x2, y2] tuples for framer-motion. */
export const EASE = {
  /** Smooth deceleration, no overshoot — reveals + parallax settle. */
  out: [0.22, 1, 0.36, 1],
  /** Standard UI ease for hovers/color transitions. */
  ui: [0.4, 0, 0.2, 1],
} as const

/** Same curves as CSS cubic-bezier() strings. */
export const EASE_CSS = {
  out: "cubic-bezier(0.22, 1, 0.36, 1)",
  ui: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const

/** Durations in seconds (framer). */
export const DURATION = {
  reveal: 0.6,
  micro: 0.2,
} as const

/** Reveal travel distance in px. */
export const DISTANCE = {
  reveal: 16,
} as const

/** Stagger timing in seconds. */
export const STAGGER = {
  /** Delay between grouped siblings. */
  step: 0.07,
  /** Small lead-in before the first child. */
  delayChildren: 0.06,
  /** Cap the number of staggered steps so groups never grow a long tail. */
  maxSteps: 5,
} as const

/** In-view threshold (fraction visible before a reveal fires). */
export const REVEAL_THRESHOLD = 0.18

/**
 * Compute a stagger delay (seconds) for the nth child, capped at STAGGER.maxSteps
 * so large groups don't trail on forever.
 */
export function staggerDelay(index: number, step: number = STAGGER.step): number {
  return Math.min(index, STAGGER.maxSteps) * step
}
