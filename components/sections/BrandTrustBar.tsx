"use client"

import { useCallback, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useMotionValue } from "framer-motion"
import { clientBrands } from "@/lib/client-brands"
import { useReducedMotion } from "@/hooks/useReducedMotion"

/** Logos visible at once: 4 on mobile/tablet, 5 on desktop. */
const VISIBLE_COUNT_MOBILE = 4
const VISIBLE_COUNT_DESKTOP = 5
/** Seconds for one full loop (matches prior marquee pacing). */
const LOOP_DURATION_S = 28
const RESUME_DELAY_MS = 5000

/** Duplicate once so a 50% track translate loops seamlessly. */
const loopBrands = [...clientBrands, ...clientBrands]
const trackWidthMobile = (loopBrands.length / VISIBLE_COUNT_MOBILE) * 100
const trackWidthDesktop = (loopBrands.length / VISIBLE_COUNT_DESKTOP) * 100
const itemWidthPercent = 100 / loopBrands.length

function wrapX(value: number, loopWidth: number) {
  if (loopWidth <= 0) return value
  let next = value % loopWidth
  if (next > 0) next -= loopWidth
  if (next <= -loopWidth) next += loopWidth
  return next
}

function BrandLogo({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative flex h-10 w-full max-w-[112px] items-center justify-center opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-12">
      {src.endsWith(".svg") ? (
        // eslint-disable-next-line @next/next/no-img-element -- SVG logos; sized to reserve layout
        <img
          src={src}
          alt={alt}
          width={112}
          height={40}
          draggable={false}
          className="pointer-events-none max-h-full max-w-full object-contain"
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          draggable={false}
          className="pointer-events-none object-contain"
          sizes="112px"
        />
      )}
    </div>
  )
}

export function BrandTrustBar() {
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const loopWidthRef = useRef(0)
  const pausedRef = useRef(false)
  const draggingRef = useRef(false)
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const measure = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    loopWidthRef.current = el.scrollWidth / 2
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [measure])

  // Keep drag + auto-scroll inside the seamless loop range.
  useEffect(() => {
    return x.on("change", (value) => {
      const loopWidth = loopWidthRef.current
      if (loopWidth <= 0) return
      const wrapped = wrapX(value, loopWidth)
      if (wrapped !== value) x.set(wrapped)
    })
  }, [x])

  const clearResumeTimer = useCallback(() => {
    if (resumeTimerRef.current !== null) {
      clearTimeout(resumeTimerRef.current)
      resumeTimerRef.current = null
    }
  }, [])

  const pause = useCallback(() => {
    pausedRef.current = true
    clearResumeTimer()
  }, [clearResumeTimer])

  const scheduleResume = useCallback(() => {
    clearResumeTimer()
    if (reduceMotion) return
    resumeTimerRef.current = setTimeout(() => {
      pausedRef.current = false
      resumeTimerRef.current = null
    }, RESUME_DELAY_MS)
  }, [clearResumeTimer, reduceMotion])

  // Transform marquee: auto-start, pause while interacting.
  useEffect(() => {
    if (reduceMotion) {
      pausedRef.current = true
      return
    }

    pausedRef.current = false
    let raf = 0
    let last = performance.now()

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64)
      last = now
      const loopWidth = loopWidthRef.current

      if (!pausedRef.current && !draggingRef.current && loopWidth > 0) {
        const speedPxPerMs = loopWidth / (LOOP_DURATION_S * 1000)
        x.set(wrapX(x.get() - speedPxPerMs * dt, loopWidth))
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      clearResumeTimer()
    }
  }, [clearResumeTimer, reduceMotion, x])

  return (
    <div className="overflow-hidden border-b border-border/40 bg-muted/20 py-10">
      <div className="kb-content-rail">
        <p className="mb-6 text-center font-ui text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Brands I&apos;ve Worked With
        </p>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-muted/20 to-transparent sm:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-muted/20 to-transparent sm:w-20" />

          {/* Percentage-based track: no JS measure for layout → no CLS on mount */}
          <motion.div
            ref={trackRef}
            className={`flex w-[var(--track-w-mobile)] cursor-grab items-center active:cursor-grabbing lg:w-[var(--track-w-desktop)]`}
            style={
              {
                "--track-w-mobile": `${trackWidthMobile}%`,
                "--track-w-desktop": `${trackWidthDesktop}%`,
                x,
              } as React.ComponentProps<typeof motion.div>["style"]
            }
            drag={reduceMotion ? false : "x"}
            dragDirectionLock
            dragElastic={0}
            dragMomentum
            onPointerDown={(event) => {
              if (event.pointerType === "mouse" && event.button !== 0) return
              pause()
            }}
            onPointerUp={() => {
              if (!draggingRef.current) scheduleResume()
            }}
            onPointerCancel={() => {
              draggingRef.current = false
              scheduleResume()
            }}
            onDragStart={() => {
              draggingRef.current = true
              pause()
            }}
            onDragEnd={() => {
              draggingRef.current = false
              const loopWidth = loopWidthRef.current
              if (loopWidth > 0) x.set(wrapX(x.get(), loopWidth))
              scheduleResume()
            }}
          >
            {loopBrands.map((brand, i) => (
              <div
                key={`${brand.alt}-${i}`}
                className="flex flex-shrink-0 items-center justify-center px-2"
                style={{ width: `${itemWidthPercent}%` }}
              >
                <BrandLogo src={brand.src} alt={brand.alt} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
