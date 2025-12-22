"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/typography"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const words = ["systems", "websites", "internal tools", "automations"]

export function HeroIntro() {
  const [mounted, setMounted] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    // Delay animation start to reduce initial blocking
    let interval: NodeJS.Timeout | null = null
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
      }, 3000)
    }, 100)

    return () => {
      clearTimeout(timeout)
      if (interval) clearInterval(interval)
    }
  }, [mounted])

  return (
    <section className="grid items-center gap-6 pt-0 pb-0 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:gap-6 md:py-0">
      <motion.div
        initial={false}
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.3 }}
        className="space-y-2 md:space-y-3"
      >
        <div className="flex items-center gap-4 mb-2">
          <div className="relative h-16 w-16 md:h-20 md:w-20 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Karol Buczek"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
        <Typography variant="eyebrow" className="text-muted-foreground">
          Web Systems Engineer • Full-Stack Developer • MarTech & Automation
        </Typography>

        <Typography variant="h1" as="h1" className="flex flex-wrap items-baseline gap-2">
          I build{" "}
          <span className="relative inline-block min-w-[180px] text-left">
            {mounted ? (
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[currentWordIndex]}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block text-primary"
                >
                  {words[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
            ) : (
              <span className="inline-block text-primary">
                {words[0]}
              </span>
            )}
          </span>{" "}
          that help marketing, product, and engineering actually work together.
        </Typography>

        <Typography variant="body" className="max-w-xl text-muted-foreground">
          I fix cross-functional problems — slow or fragile stacks, attribution gaps, scattered data, manual workflows — using modern web tooling, cloud platforms, and practical AI to turn them into reliable, measurable systems.
        </Typography>

        <div className="flex flex-wrap items-center gap-3">
          <Button asChild className="rounded-full px-6 py-2 text-sm font-semibold font-ui">
            <a href="#case-studies">View case studies</a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-border/50 px-6 py-2 text-sm font-ui hover:border-foreground/20"
          >
            <Link href="/resume">Open interactive resume</Link>
          </Button>
        </div>
      </motion.div>

      {/* Photo */}
      <motion.div
        initial={false}
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="relative flex aspect-[3/4] w-full overflow-hidden rounded-lg"
      >
        <div className="relative h-full w-full">
          <Image
            src="/karol-photo.png"
            alt="Karol Buczek"
            fill
            className="object-cover"
            loading="lazy"
            decoding="async"
            sizes="(max-width: 768px) 100vw, 33vw"
            quality={80}
            fetchPriority="low"
          />
        </div>
      </motion.div>
    </section>
  )
}

