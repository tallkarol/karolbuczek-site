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
      <Section>
        <PageHero
          eyebrow="Director, Marketing Technology"
          title="Leading Marketing Technology Strategy & Systems Architecture"
          description="I lead marketing technology strategy and systems architecture, building scalable MarTech infrastructure that drives measurable business growth. I bridge engineering, marketing, and product teams to deliver systems that solve real business problems."
          illustration={<SystemNodes />}
        />
      </Section>

      <Section>
        <div className="space-y-8 max-w-5xl mx-auto">
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

