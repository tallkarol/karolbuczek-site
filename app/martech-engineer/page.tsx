"use client"

import { useState } from "react"
import { Section } from "@/components/Section"
import { PageHero } from "@/components/sections/PageHero"
import { SystemNodes } from "@/components/illustrations"
import { RoleSection } from "@/components/resume/RoleSection"
import { RoleFilter } from "@/components/resume/ResumeFilters"
import { CTASection } from "@/components/sections/CTASection"
export default function MarTechEngineerPage() {
  const [selectedFilter] = useState<RoleFilter>("MarTech / Growth Engineering")

  return (
    <>
      <Section>
        <PageHero
          eyebrow="MarTech Engineer / Marketing Systems Engineer"
          title="Building Marketing Technology Systems That Drive Growth"
          description="I design and implement marketing technology systems—attribution frameworks, event architectures, automation workflows, and data pipelines—that connect marketing efforts to measurable business outcomes."
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
          description="Let's discuss how I can help build marketing systems that deliver measurable results."
        />
      </Section>
    </>
  )
}

