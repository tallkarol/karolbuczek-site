"use client"

import { useState } from "react"
import Link from "next/link"
import { Section } from "@/components/Section"
import { Typography } from "@/components/typography"
import { PageHero } from "@/components/sections/PageHero"
import { ResumeIllustration } from "@/components/illustrations"
import { RoleFilter } from "@/components/resume/ResumeFilters"
import { ResumeSnapshot } from "@/components/resume/ResumeSnapshot"
import { RoleSection } from "@/components/resume/RoleSection"
import { EducationSection } from "@/components/resume/EducationSection"
import { SkillsSection } from "@/components/resume/SkillsSection"
import { WorkExperienceSection } from "@/components/resume/WorkExperienceSection"
import { LensDropdown } from "@/components/resume/LensDropdown"
import { SystemsList } from "@/components/resume/SystemsList"
import { LookingFor } from "@/components/resume/LookingFor"
import { ReferencesSection } from "@/components/resume/ReferencesSection"

export default function ResumePage() {
  const [selectedFilter, setSelectedFilter] = useState<RoleFilter>("all")
  const [skillsOpen, setSkillsOpen] = useState(false)
  const [workExperienceOpen, setWorkExperienceOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)

  const handleSkillsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setSkillsOpen(true)
    setTimeout(() => {
      document.getElementById("skills")?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }

  const handleWorkExperienceClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setWorkExperienceOpen(true)
    setTimeout(() => {
      document.getElementById("work-experience")?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }

  const handleReferencesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setTimeout(() => {
      document.getElementById("references")?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }

  const handleProjectsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setProjectsOpen(true)
    setTimeout(() => {
      document.getElementById("featured-work")?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }

  return (
    <>
      <Section>
        <PageHero
          eyebrow="Interactive Resume"
          title="My Engineering Work Across WordPress, React & Integrations"
          description="A structured, interactive overview of my roles, skills, and contributions across engineering, automation, and cross-platform workflows."
          illustration={<ResumeIllustration />}
          buttons={
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#work-experience"
                onClick={handleWorkExperienceClick}
                className="text-sm text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
              >
                Work Experience
              </a>
              <span className="text-muted-foreground/30">·</span>
              <a
                href="#skills"
                onClick={handleSkillsClick}
                className="text-sm text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
              >
                Skill Summary
              </a>
              <span className="text-muted-foreground/30">·</span>
              <a
                href="#references"
                onClick={handleReferencesClick}
                className="text-sm text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
              >
                References
              </a>
              <span className="text-muted-foreground/30">·</span>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
              >
                Download Resume
              </a>
            </div>
          }
        />
      </Section>

      <Section>
        <div className="space-y-8 max-w-5xl mx-auto">

          {/* Snapshot */}
          <ResumeSnapshot />

          {/* Lens Filter */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <Typography variant="body-sm" className="text-muted-foreground font-medium">
              Filter by focus area:
            </Typography>
            <LensDropdown selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} />
          </div>

          {/* Filtered View */}
          {selectedFilter !== "all" && (
            <RoleSection role={selectedFilter} isVisible={true} />
          )}

          {/* Full Resume View */}
          {selectedFilter === "all" && (
            <div className="space-y-8 pt-4">
              {/* Skills */}
              <SkillsSection isOpen={skillsOpen} onOpenChange={setSkillsOpen} />

              {/* Work Experience */}
              <WorkExperienceSection isOpen={workExperienceOpen} onOpenChange={setWorkExperienceOpen} />

              {/* Featured Work */}
              <SystemsList isOpen={projectsOpen} onOpenChange={setProjectsOpen} />

              {/* Education */}
              <EducationSection />

              {/* References */}
              <ReferencesSection />

              {/* What I'm Looking For */}
              <div className="pt-4 border-t border-border/50">
                <LookingFor />
              </div>
            </div>
          )}
        </div>
      </Section>
    </>
  )
}

