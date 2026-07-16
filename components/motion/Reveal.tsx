"use client"

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { REVEAL_THRESHOLD } from "@/lib/motion"

interface RevealProps {
  children: ReactNode
  /** Element to render. Defaults to a div. */
  as?: ElementType
  className?: string
  /** Extra delay before this element reveals, in ms — use for stagger. */
  delay?: number
  /** Override vertical travel distance, in px. */
  distance?: number
  /** Optional starting scale (e.g. 0.985) for cards/media. */
  scale?: number
  /** Fraction visible before revealing (0–1). */
  threshold?: number
}

/**
 * Lightweight in-view reveal. Uses IntersectionObserver + a CSS transition
 * (see the SCROLL-MOTION block in globals.css) rather than per-element JS
 * animation, so it stays cheap on Core Web Vitals.
 *
 * Content is visible by default; the hidden-initial state is armed only when
 * `.js-reveal` is present on <html> (set synchronously in layout.tsx when JS is
 * on and motion is allowed). Reduced-motion + no-JS users always see content.
 */
export function Reveal({
  children,
  as,
  className,
  delay = 0,
  distance,
  scale,
  threshold = REVEAL_THRESHOLD,
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType
  const ref = useRef<HTMLElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Not armed (no-JS class absent / reduced motion) or no IO support:
    // mark revealed so the element is unambiguously visible.
    if (
      !document.documentElement.classList.contains("js-reveal") ||
      typeof IntersectionObserver === "undefined"
    ) {
      setRevealed(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true)
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  const style: CSSProperties = {}
  if (delay) style.transitionDelay = `${delay}ms`
  if (distance != null) (style as Record<string, string>)["--reveal-distance"] = `${distance}px`
  if (scale != null) (style as Record<string, string>)["--reveal-scale"] = String(scale)

  return (
    <Tag ref={ref} className={cn("reveal", revealed && "is-revealed", className)} style={style}>
      {children}
    </Tag>
  )
}
