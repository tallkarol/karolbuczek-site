import { Section } from "@/components/Section"
import { HeroIntro } from "@/components/sections/HeroIntro"
import { FeaturedQuote } from "@/components/sections/FeaturedQuote"
import { SkillsMap } from "@/components/sections/SkillsMap"
import { WhoIWorkBestWith } from "@/components/sections/WhoIWorkBestWith"
import { Philosophy } from "@/components/sections/Philosophy"
import { WhatImNot } from "@/components/sections/WhatImNot"
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
        <WhoIWorkBestWith />
      </Section>

      <Section>
        <Philosophy />
      </Section>

      <Section>
        <WhatImNot />
      </Section>

      <Section id="case-studies">
        <CaseStudyGrid />
      </Section>

      <Section>
        <CTASection />
      </Section>
    </>
  )
}

