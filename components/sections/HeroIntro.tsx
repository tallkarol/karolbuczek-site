"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/typography"

const animatedPhrases = [
  "that work.",
  "that scale.",
  "that integrate.",
  "that stay observable.",
  "that don't fail silently.",
]

const AnimatedLine = dynamic(
  () => import("./AnimatedWord").then((mod) => ({ default: mod.AnimatedWord })),
  { ssr: false }
)

export function HeroIntro() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="grid items-center gap-6 pt-0 pb-0 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-6 md:py-0">
      {/* Photo - left on desktop */}
      <div className="relative flex aspect-[3/4] w-full overflow-hidden rounded-lg order-2 md:order-1">
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
      </div>

      <div className="space-y-2 md:space-y-3 order-1 md:order-2">
        <Typography variant="eyebrow" className="text-muted-foreground">
          Solutions Architect <span className="text-primary">|</span> Cloud Systems <span className="text-primary">|</span> MarTech <span className="text-primary">|</span> AI
        </Typography>

        <Typography variant="h1" as="h1" className="flex flex-col gap-1">
          <span>I design systems</span>
          <span className="relative block min-h-[1.25em] min-w-[200px] sm:min-w-[260px]">
            {mounted ? (
              <AnimatedLine words={animatedPhrases} />
            ) : (
              <span className="text-primary">{animatedPhrases[0]}</span>
            )}
          </span>
        </Typography>

        <Typography variant="body" className="max-w-xl text-muted-foreground">
        Over a decade leading technical direction from stakeholder discovery through production deployment — aligning systems with operational reality.        </Typography>
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
      </div>
    </section>
  )
}

