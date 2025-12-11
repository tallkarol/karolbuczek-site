"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/typography"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export function HeroIntro() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="grid items-center gap-6 pt-0 pb-0 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:gap-6 md:py-0">
      <motion.div
        initial={mounted ? "hidden" : "visible"}
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="space-y-2 md:space-y-3"
      >
        <Typography variant="eyebrow" className="text-muted-foreground">
          Web Systems Engineer • WordPress & MarTech • Internal Tools & Automation
        </Typography>

        <Typography variant="h1" as="h1">
          I build the systems that make marketing, product, and engineering actually work together.
        </Typography>

        <Typography variant="body" className="max-w-xl text-muted-foreground">
          I fix cross-functional problems — attribution gaps, slow WordPress stacks, scattered data, manual workflows — and turn them into fast, measurable, maintainable systems.
        </Typography>

        <div className="flex flex-wrap items-center gap-3">
          <Button asChild className="rounded-full px-6 py-2 text-sm font-semibold font-ui">
            <a href="#case-studies">View my work</a>
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
        initial={mounted ? "hidden" : "visible"}
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative hidden aspect-[3/4] w-full md:flex overflow-hidden rounded-lg border border-border/50 bg-muted/20"
      >
        {/* Placeholder - replace with actual photo */}
        <div className="relative h-full w-full bg-gradient-to-br from-muted/50 to-muted/30">
          {/* Uncomment when you have the photo */}
          {/* <Image
            src="/images/karol-photo.jpg"
            alt="Karol Buczek"
            fill
            className="object-cover"
            priority
          /> */}
        </div>
      </motion.div>
    </section>
  )
}

