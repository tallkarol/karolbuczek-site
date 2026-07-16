"use client"

import { motion, useScroll } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"

/**
 * A thin page-scroll progress line. Rendered inside the sticky <header> as an
 * absolutely-positioned bar on its bottom edge — out of normal flow, so it never
 * affects layout / CLS. Transform-only (scaleX), no bounce. Hidden under
 * reduced-motion.
 */
export function ScrollProgress() {
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()

  if (reducedMotion) return null

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: scrollYProgress }}
      className="pointer-events-none absolute bottom-0 left-0 z-50 h-0.5 w-full origin-left bg-accent"
    />
  )
}
