"use client"

import { useState } from "react"
import { Section } from "@/components/Section"
import { PageHero } from "@/components/sections/PageHero"
import { SystemNodes } from "@/components/illustrations"
import { RoleSection } from "@/components/resume/RoleSection"
import { RoleFilter } from "@/components/resume/ResumeFilters"
import { CTASection } from "@/components/sections/CTASection"

export default function DirectorMarketingTechnologyPage() {
  const [selectedFilter] = useState<RoleFilter>("MarTech / Growth Engineering")

  return (
    <>
      <div className="kb-hero-inverse">
        <Section className="py-8 lg:py-16">
          <PageHero
            eyebrow="Director, Marketing Technology"
            title="Leading Marketing Technology Strategy & Systems Architecture"
            description="I lead marketing technology strategy and systems architecture, building scalable MarTech infrastructure that drives measurable business growth. I bridge engineering, marketing, and product teams to deliver systems that solve real business problems."
            illustration={<SystemNodes />}
          />
        </Section>
      </div>

      <Section>
        <div className="space-y-8">
          <RoleSection role={selectedFilter} isVisible={true} />
        </div>
      </Section>

      <Section>
        <CTASection
          heading="Interested in working together?"
          description="Let's discuss how I can help build a marketing technology infrastructure that scales and delivers measurable results."
        />
      </Section>
    </>
  )
}

