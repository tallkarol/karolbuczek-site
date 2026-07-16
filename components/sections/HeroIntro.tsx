"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeroFlyIn } from "@/components/motion/HeroFlyIn"
import { HomeHeroIllustration } from "@/components/illustrations"

const animatedPhrases = [
  "that work.",
  "that scale.",
  "that integrate.",
  "that stay observable.",
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
    <section className="kb-hero-inverse relative isolate w-full overflow-hidden text-ink dark:text-text-inverse">
      <div className="kb-content-rail relative py-12 md:py-[6.65rem] lg:py-[7.6rem]">
        {/* Mobile illustration — above copy */}
        <HeroFlyIn side="right" className="tk-hero-visual relative z-[1] mb-8 md:hidden">
          <div className="relative left-1/2 aspect-[1376/768] w-[112vw] max-w-none -translate-x-1/2">
            <HomeHeroIllustration priority />
          </div>
        </HeroFlyIn>

        {/* Illustration — right side, sits behind copy on desktop */}
        <HeroFlyIn
          side="right"
          className="tk-hero-visual pointer-events-none absolute inset-y-4 right-0 z-[1] hidden w-[min(68%,720px)] items-center md:flex lg:w-[min(62%,760px)]"
        >
          <div className="relative aspect-[1376/768] w-full">
            <HomeHeroIllustration priority />
          </div>
        </HeroFlyIn>

        {/* Copy — left, overlaps illustration slightly on desktop */}
        <HeroFlyIn
          side="left"
          delay={0.08}
          className="relative z-[5] flex min-w-0 flex-col justify-center md:max-w-[min(100%,50rem)] lg:max-w-[min(100%,54rem)]"
        >
          <p className="tk-hero-rise font-ui text-[11px] font-semibold uppercase tracking-[0.17em] text-ink/65 dark:text-text-inverse/70 [animation-delay:.45s]">
            Full-Stack Engineer · Solutions Architect
          </p>

          <h1 className="mb-5 mt-5 font-display text-[clamp(2rem,7.5vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-ink dark:text-text-inverse">
            <span className="block overflow-hidden pb-[.08em] -mb-[.08em]">
              <span className="tk-hero-title-line block md:whitespace-nowrap">I design systems</span>
            </span>
            <span className="block overflow-hidden pb-[.08em] -mb-[.08em]">
              <span className="tk-hero-title-line block min-h-[1.05em] md:whitespace-nowrap [animation-delay:.09s]">
                {mounted ? (
                  <AnimatedLine words={animatedPhrases} />
                ) : (
                  <span className="text-accent-text">{animatedPhrases[0]}</span>
                )}
              </span>
            </span>
          </h1>

          <p className="tk-hero-rise max-w-md font-body text-base leading-relaxed text-ink/70 dark:text-text-inverse/70 [animation-delay:.7s] lg:max-w-lg lg:text-lg">
            Custom web applications, enterprise WordPress, and systems integration — scoped directly with stakeholders, shipped to production.
          </p>

          <div className="tk-hero-rise mt-7 flex flex-wrap items-center gap-3 [animation-delay:.85s]">
            <Button asChild variant="default" size="lg">
              <a href="#portfolio">
                View portfolio
                <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">
                Get In Touch
                <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">↗</span>
              </Link>
            </Button>
          </div>
        </HeroFlyIn>
      </div>
    </section>
  )
}
