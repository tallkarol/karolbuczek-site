"use client"

import { useState } from "react"
import { Section } from "@/components/Section"
import { PageHero } from "@/components/sections/PageHero"
import { SystemNodes } from "@/components/illustrations"
import { RoleSection } from "@/components/resume/RoleSection"
import { RoleFilter } from "@/components/resume/ResumeFilters"
import { CTASection } from "@/components/sections/CTASection"
import { ApplyPackModal } from "@/components/resume/ApplyPackModal"
import { Button } from "@/components/ui/button"
import { Briefcase } from "lucide-react"

export default function WebDevWordPressPage() {
  const [selectedFilter] = useState<RoleFilter>("WordPress Engineering")
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Section>
        <PageHero
          eyebrow="Web Developer / WordPress Engineer"
          title="WordPress Development That Performs"
          description="I build custom WordPress plugins, Gutenberg blocks, and performance-optimized WordPress solutions. From VIP-compliant architecture to headless implementations, I deliver WordPress systems that are fast, maintainable, and scalable."
          illustration={<SystemNodes />}
          buttons={
            <Button
              onClick={() => setIsModalOpen(true)}
              className="rounded-full px-6 py-2 text-sm font-semibold font-ui"
            >
              <Briefcase className="mr-2 h-4 w-4" />
              Open Apply Pack
            </Button>
          }
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
          description="Let's discuss how I can help build WordPress solutions that perform and scale."
        />
      </Section>

      <ApplyPackModal
        roleId="web-dev-wordpress"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

