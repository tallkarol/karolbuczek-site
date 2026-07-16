"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Typography } from "@/components/typography"

const ROTATE_MS = 9000

// Excerpts are verbatim substrings of the full LinkedIn recommendations shown on /resume.
type QuoteLogo = {
  src: string
  alt: string
  /**
   * Keep the asset's native colors. Use for logos with baked-in backgrounds
   * (e.g. UWD/PPW PNGs) — brightness/invert turns those into solid boxes.
   */
  preserveColor?: boolean
}

const quotes: Array<{
  excerpt: string
  author: string
  role: string
  relationship: string
  logos: QuoteLogo[]
}> = [
  {
    excerpt:
      "Highly technical, incredibly quick to learn new workflows, and remarkably dynamic when it comes to evolving project requirements.",
    author: "Christopher Jarvis",
    role: "VP of Enterprise Digital Marketing, Great Day Improvements",
    relationship: "Direct Manager",
    logos: [{ src: "/gdi-logo.svg", alt: "Great Day Improvements" }],
  },
  {
    excerpt:
      "One of the rare professionals who can bridge the gap between deep technical capability and real business understanding.",
    author: "John Kosmides",
    role: "Vice President of Marketing, Perfect Power Wash & Universal Windows Direct",
    relationship: "Direct Manager",
    logos: [
      { src: "/ppw.png", alt: "Perfect Power Wash", preserveColor: true },
      { src: "/uwd-logo.png", alt: "Universal Windows Direct", preserveColor: true },
    ],
  },
  {
    excerpt:
      "Whether you need someone to lead or support you in any role, Karol is your man.",
    author: "Julian Quesada",
    role: "Software Engineer, Perfect Power Wash",
    relationship: "Reported to Karol",
    logos: [{ src: "/ppw.png", alt: "Perfect Power Wash", preserveColor: true }],
  },
  {
    excerpt:
      "I really valued Karol's collaboration and willingness to explain things in a way that was easy for someone who isn't as tech-savvy to understand.",
    author: "Anne-Marie Colant",
    role: "Director of Social Media, Universal Windows Direct & Great Day Improvements",
    relationship: "Cross-functional Collaborator",
    logos: [
      { src: "/uwd-logo.png", alt: "Universal Windows Direct", preserveColor: true },
      { src: "/gdi-logo.svg", alt: "Great Day Improvements" },
    ],
  },
]

export function FeaturedQuote() {
  const [mounted, setMounted] = useState(false)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length)
    }, ROTATE_MS)
    return () => clearInterval(interval)
  }, [mounted, index])

  const current = quotes[index]

  return (
    <motion.div
      initial={mounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="relative mx-auto max-w-4xl"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-8 -left-2 select-none font-serif text-[7rem] leading-none text-chiffon/15 md:-left-10 md:text-[9rem]"
      >
        &ldquo;
      </div>

      <div className="relative overflow-hidden rounded-lg border border-chiffon/20 bg-olive-800 px-6 py-10 md:px-14 md:py-12">
        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-white/50 to-transparent" />

        <Typography variant="eyebrow" className="mb-6 text-center text-chiffon/75">
          From managers &amp; teammates
        </Typography>

        <div className="flex min-h-[11rem] items-center justify-center md:min-h-[9.5rem]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current.author}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <p className="font-display text-xl leading-snug tracking-tight text-chiffon sm:text-2xl md:text-[1.75rem] md:leading-[2.35rem]">
                &ldquo;{current.excerpt}&rdquo;
              </p>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${current.author}-attribution`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6 flex flex-col items-center gap-1 text-center"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-chiffon/40" />
              <Typography variant="body-sm" className="font-semibold text-chiffon">
                {current.author}
              </Typography>
              <span className="h-px w-8 bg-chiffon/40" />
            </div>
            <Typography variant="body-sm" className="text-chiffon/75">
              {current.role}
            </Typography>
            <Typography variant="body-sm" className="text-xs uppercase tracking-wider text-chiffon/75">
              {current.relationship}
            </Typography>
            <div className="mt-3 flex items-center justify-center gap-4">
              {current.logos.map((logo) =>
                logo.preserveColor ? (
                  <div
                    key={logo.src}
                    className="relative h-9 w-24 overflow-hidden"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      className="object-contain [filter:grayscale(1)_saturate(0)_brightness(1.45)_contrast(0.72)]"
                      sizes="96px"
                    />
                    {/* Pull logos toward the card's chiffon tone */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-chiffon/55 mix-blend-color"
                    />
                    {/* Soften remaining contrast against olive */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-olive-800/45"
                    />
                  </div>
                ) : (
                  <div
                    key={logo.src}
                    className="relative h-8 w-20 opacity-80 brightness-0 invert"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      className="object-contain"
                      sizes="96px"
                    />
                  </div>
                )
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-center gap-2.5" role="tablist" aria-label="Testimonials">
          {quotes.map((quote, i) => {
            const isActive = i === index
            return (
            <button
              key={quote.author}
              type="button"
              role="tab"
              aria-label={`Show quote from ${quote.author}`}
              aria-selected={isActive}
              aria-current={isActive ? "true" : undefined}
              onClick={() => setIndex(i)}
              className="relative h-2.5 w-14 overflow-hidden rounded-full bg-chiffon transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chiffon"
            >
              {isActive && (
                <motion.span
                  key={`progress-${index}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: ROTATE_MS / 1000, ease: "linear" }}
                  className="absolute inset-0 origin-left rounded-full bg-navy-900"
                />
              )}
            </button>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
