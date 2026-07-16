import { Suspense } from "react"
import { Section } from "@/components/Section"
import { HeroIntro } from "@/components/sections/HeroIntro"
import { BrandTrustBar } from "@/components/sections/BrandTrustBar"
import { FeaturedQuote } from "@/components/sections/FeaturedQuote"
import { SkillsMap } from "@/components/sections/SkillsMap"
import { CaseStudyGrid } from "@/components/sections/CaseStudyGrid"
import { CTASection } from "@/components/sections/CTASection"

export default function HomePage() {
  return (
    <>
      <Section className="pt-4 pb-0 md:pt-6 lg:pt-6 lg:pb-0">
        <HeroIntro />
      </Section>

      <BrandTrustBar />

      <Section>
        <FeaturedQuote />
      </Section>

      <section className="w-full bg-muted">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-6 lg:px-8 lg:py-16">
          <SkillsMap />
        </div>
      </section>

      <Section id="portfolio">
        <Suspense fallback={
          <div className="h-[420px] animate-pulse rounded-lg bg-muted/50" />
        }>
          <CaseStudyGrid carousel showViewAllButton />
        </Suspense>
      </Section>

      <section className="w-full bg-primary pb-0 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-6 lg:px-8 lg:py-16">
          <CTASection fullWidth />
        </div>
      </section>
    </>
  )
}

