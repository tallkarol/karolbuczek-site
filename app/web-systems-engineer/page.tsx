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

export default function WebSystemsEngineerPage() {
  const [selectedFilter] = useState<RoleFilter>("Product & Internal Tools")
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Section>
        <PageHero
          eyebrow="Web Systems Engineer"
          title="Building Web Systems That Scale"
          description="I architect and build web systems—internal tools, workflow platforms, secure document systems, and full-stack applications—that solve real business problems with clean architecture and maintainable code."
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
          description="Let's discuss how I can help build web systems that solve your business challenges."
        />
      </Section>

      <ApplyPackModal
        roleId="web-systems-engineer"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

