"use client"

import { useState } from "react"
import { Section } from "@/components/Section"
import { PageHero } from "@/components/sections/PageHero"
import { SystemNodes } from "@/components/illustrations"
import { RoleSection } from "@/components/resume/RoleSection"
import { RoleFilter } from "@/components/resume/ResumeFilters"
import { CTASection } from "@/components/sections/CTASection"
export default function ImplementationEngineerPage() {
  const [selectedFilter] = useState<RoleFilter>("Implementation Engineer")

  return (
    <>
      <Section>
        <PageHero
          eyebrow="Implementation Engineer"
          title="Integrating Web APIs, Systems, and Customer Needs"
          description="5+ years of experience integrating Web APIs, providing technical consultation, and translating business requirements into technical solutions. I bridge the gap between complex systems and customer value."
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
          description="Let's discuss how I can help implement solutions that deliver value."
        />
      </Section>
    </>
  )
}

