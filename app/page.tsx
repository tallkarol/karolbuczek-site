import { Suspense } from "react"
import { Section } from "@/components/Section"
import { HeroIntro } from "@/components/sections/HeroIntro"
import { FeaturedQuote } from "@/components/sections/FeaturedQuote"
import { SkillsMap } from "@/components/sections/SkillsMap"
import { ResumeSummary } from "@/components/sections/ResumeSummary"
import { CaseStudyGrid } from "@/components/sections/CaseStudyGrid"
import { CTASection } from "@/components/sections/CTASection"

export default function HomePage() {
  return (
    <>
      <Section className="py-4 md:py-6">
        <HeroIntro />
      </Section>

      <Section>
        <FeaturedQuote />
      </Section>

      <Section>
        <SkillsMap />
      </Section>

      <Section>
        <ResumeSummary />
      </Section>

      <Section id="case-studies">
        <Suspense fallback={
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[200px] animate-pulse bg-muted/50 rounded-lg" />
            ))}
          </div>
        }>
          <CaseStudyGrid />
        </Suspense>
      </Section>

      <Section>
        <CTASection />
      </Section>
    </>
  )
}

