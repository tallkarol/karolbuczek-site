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
      <HeroIntro />

      <BrandTrustBar />

      <section className="kb-section-secondary w-full">
        <div className="kb-content-rail py-12 lg:py-16">
          <SkillsMap />
        </div>
      </section>

      <Section id="portfolio">
        <Suspense
          fallback={
            <div
              className="min-h-[720px] animate-pulse rounded-lg bg-muted/50 sm:min-h-[480px]"
              aria-hidden
            />
          }
        >
          <CaseStudyGrid carousel showViewAllButton />
        </Suspense>
      </Section>

      <section className="kb-section-background w-full">
        <div className="kb-content-rail py-12 lg:py-16">
          <FeaturedQuote />
        </div>
      </section>

      <section className="kb-section-inverse w-full pb-0">
        <div className="kb-content-rail py-20 lg:py-28">
          <CTASection fullWidth />
        </div>
      </section>
    </>
  )
}
