"use client"

import { useEffect, useState } from "react"

/**
 * Reports the user's `prefers-reduced-motion` setting, updating live if it changes.
 *
 * SSR-safe: returns `false` until mounted so server and first client render match,
 * then resolves to the real value. Use this to gate JS-driven motion
 * (parallax, scroll progress) — CSS reveals handle reduced motion natively in globals.css.
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return prefersReducedMotion
}
