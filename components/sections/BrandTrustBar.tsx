"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { clientBrands } from "@/lib/client-brands"

const AUTOPLAY_MS = 3500

function useVisibleCount() {
  const [visibleCount, setVisibleCount] = useState(2)

  useEffect(() => {
    const mqDesktop = window.matchMedia("(min-width: 1024px)")
    const mqTablet = window.matchMedia("(min-width: 768px)")

    const update = () => {
      if (mqDesktop.matches) setVisibleCount(5)
      else if (mqTablet.matches) setVisibleCount(3)
      else setVisibleCount(2)
    }

    update()
    mqDesktop.addEventListener("change", update)
    mqTablet.addEventListener("change", update)
    return () => {
      mqDesktop.removeEventListener("change", update)
      mqTablet.removeEventListener("change", update)
    }
  }, [])

  return visibleCount
}

function BrandLogo({ src, alt }: { src: string; alt: string }) {
  const isSvg = src.endsWith(".svg")

  return (
    <div className="relative mx-auto flex h-10 w-full max-w-[112px] items-center justify-center opacity-50 grayscale contrast-125 brightness-75 transition-all duration-300 hover:opacity-100 hover:grayscale-0 hover:brightness-100 sm:h-11 dark:opacity-60 dark:brightness-125 dark:hover:brightness-100">
      {isSvg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="max-h-full max-w-full object-contain" />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="112px"
        />
      )}
    </div>
  )
}

export function BrandTrustBar() {
  const visibleCount = useVisibleCount()
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [itemWidth, setItemWidth] = useState(0)
  const [index, setIndex] = useState(0)
  const [animate, setAnimate] = useState(true)
  const [paused, setPaused] = useState(false)

  const loopBrands = [...clientBrands, ...clientBrands]

  const measure = useCallback(() => {
    if (containerRef.current) {
      setItemWidth(containerRef.current.offsetWidth / visibleCount)
    }
  }, [visibleCount])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [measure])

  useEffect(() => {
    setIndex(0)
    setAnimate(false)
    requestAnimationFrame(() => setAnimate(true))
  }, [visibleCount])

  useEffect(() => {
    if (!mounted || paused) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const interval = setInterval(() => {
      setIndex((prev) => prev + 1)
    }, AUTOPLAY_MS)

    return () => clearInterval(interval)
  }, [mounted, paused])

  const handleAnimationComplete = () => {
    if (index >= clientBrands.length) {
      setAnimate(false)
      setIndex(0)
      requestAnimationFrame(() => setAnimate(true))
    }
  }

  return (
    <motion.div
      initial={mounted ? { opacity: 0 } : { opacity: 1 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="border-b border-navy-700/10 bg-chiffon-100 py-6 md:py-8 dark:border-chiffon/10 dark:bg-navy-900"
    >
      <div className="kb-content-rail">
        <p className="mb-6 text-center font-ui text-[11px] font-semibold uppercase tracking-[0.17em] text-ink/65 dark:text-text-inverse/70">
          Brands I&apos;ve worked with
        </p>

        <div
          ref={containerRef}
          className="overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <motion.div
            className="flex"
            animate={itemWidth > 0 ? { x: -index * itemWidth } : undefined}
            transition={
              animate
                ? { duration: 0.55, ease: [0.4, 0, 0.2, 1] }
                : { duration: 0 }
            }
            onAnimationComplete={handleAnimationComplete}
          >
            {loopBrands.map((brand, i) => (
              <div
                key={`${brand.src}-${i}`}
                className="flex-shrink-0 px-3 sm:px-4"
                style={{ width: itemWidth > 0 ? itemWidth : `${100 / visibleCount}%` }}
              >
                <BrandLogo src={brand.src} alt={brand.alt} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
