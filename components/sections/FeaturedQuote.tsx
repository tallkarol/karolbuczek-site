"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Typography } from "@/components/typography"

const ROTATE_MS = 9000

// Excerpts are verbatim substrings of the full LinkedIn recommendations shown on /resume.
const quotes = [
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
      { src: "/ppw.png", alt: "Perfect Power Wash" },
      { src: "/uwd-logo.png", alt: "Universal Windows Direct" },
    ],
  },
  {
    excerpt:
      "Whether you need someone to lead or support you in any role, Karol is your man.",
    author: "Julian Quesada",
    role: "Software Engineer, Perfect Power Wash",
    relationship: "Reported to Karol",
    logos: [{ src: "/ppw.png", alt: "Perfect Power Wash" }],
  },
  {
    excerpt:
      "I really valued Karol's collaboration and willingness to explain things in a way that was easy for someone who isn't as tech-savvy to understand.",
    author: "Anne-Marie Colant",
    role: "Director of Social Media, Universal Windows Direct & Great Day Improvements",
    relationship: "Cross-functional Collaborator",
    logos: [
      { src: "/uwd-logo.png", alt: "Universal Windows Direct" },
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
      className="relative max-w-4xl mx-auto"
    >
      {/* Oversized decorative quote mark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-8 -left-2 md:-left-10 select-none font-serif text-[7rem] md:text-[9rem] leading-none text-primary/10"
      >
        &ldquo;
      </div>

      <div className="relative rounded-lg border border-border/50 bg-muted/20 px-6 py-10 md:px-14 md:py-12 overflow-hidden">
        {/* Accent line, matching the CTA treatment */}
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0" />

        <Typography variant="eyebrow" className="mb-6 text-center">
          From managers &amp; teammates
        </Typography>

        <div className="min-h-[11rem] md:min-h-[9.5rem] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current.author}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <p className="font-display text-xl leading-snug tracking-tight text-foreground sm:text-2xl md:text-[1.75rem] md:leading-[2.35rem]">
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
              <span className="h-px w-8 bg-primary/40" />
              <Typography variant="body-sm" className="font-semibold text-foreground">
                {current.author}
              </Typography>
              <span className="h-px w-8 bg-primary/40" />
            </div>
            <Typography variant="body-sm" className="text-muted-foreground">
              {current.role}
            </Typography>
            <Typography variant="body-sm" className="text-muted-foreground/60 text-xs uppercase tracking-wider">
              {current.relationship}
            </Typography>
            <div className="mt-3 flex items-center justify-center gap-4">
              {current.logos.map((logo) => (
                <div key={logo.src} className="relative h-8 w-20 opacity-70">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-center gap-2">
          {quotes.map((quote, i) => (
            <button
              key={quote.author}
              type="button"
              aria-label={`Show quote from ${quote.author}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className="relative h-1 w-10 overflow-hidden rounded-full bg-border"
            >
              {i === index && (
                <motion.span
                  key={`progress-${index}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: ROTATE_MS / 1000, ease: "linear" }}
                  className="absolute inset-0 origin-left bg-primary"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
