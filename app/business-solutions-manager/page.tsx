"use client"

import { useState } from "react"
import { Section } from "@/components/Section"
import { PageHero } from "@/components/sections/PageHero"
import { SystemNodes } from "@/components/illustrations"
import { RoleSection } from "@/components/resume/RoleSection"
import { RoleFilter } from "@/components/resume/ResumeFilters"
import { CTASection } from "@/components/sections/CTASection"

export default function BusinessSolutionsManagerPage() {
  const [selectedFilter] = useState<RoleFilter>("Product & Internal Tools")

  return (
    <>
      <Section>
        <PageHero
          eyebrow="Business Solutions Manager"
          title="Translating Business Requirements Into Technical Solutions"
          description="I bridge the gap between business stakeholders and engineering teams to deliver systems that solve real problems and drive measurable outcomes. I translate workflows into technical specifications and ensure solutions align with business goals."
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
          description="Let's discuss how I can help bridge the gap between business needs and technical implementation."
        />
      </Section>
    </>
  )
}

