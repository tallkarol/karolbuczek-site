"use client"

import { useState } from "react"
import { Section } from "@/components/Section"
import { PageHero } from "@/components/sections/PageHero"
import { SystemNodes } from "@/components/illustrations"
import { RoleSection } from "@/components/resume/RoleSection"
import { RoleFilter } from "@/components/resume/ResumeFilters"
import { CTASection } from "@/components/sections/CTASection"
export default function WebDevWordPressPage() {
  const [selectedFilter] = useState<RoleFilter>("WordPress Engineering")

  return (
    <>
      <div className="kb-hero-inverse">
        <Section className="py-8 lg:py-16">
          <PageHero
            eyebrow="Web Developer / WordPress Engineer"
            title="WordPress Development That Performs"
            description="I build custom WordPress plugins, Gutenberg blocks, and performance-optimized WordPress solutions. From VIP-compliant architecture to headless implementations, I deliver WordPress systems that are fast, maintainable, and scalable."
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
          description="Let's discuss how I can help build WordPress solutions that perform and scale."
        />
      </Section>
    </>
  )
}

