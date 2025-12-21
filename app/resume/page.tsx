"use client"

import { useState } from "react"
import Link from "next/link"
import { Section } from "@/components/Section"
import { PageHero } from "@/components/sections/PageHero"
import { ResumeIllustration } from "@/components/illustrations"
import { EducationSection } from "@/components/resume/EducationSection"
import { SkillsSection } from "@/components/resume/SkillsSection"
import { TechStackSection } from "@/components/resume/TechStackSection"
import { WorkExperienceSection } from "@/components/resume/WorkExperienceSection"
import { SystemsList } from "@/components/resume/SystemsList"
import { ReferencesSection } from "@/components/resume/ReferencesSection"

export default function ResumePage() {
  const [skillsOpen, setSkillsOpen] = useState(true)
  const [techStackOpen, setTechStackOpen] = useState(true)
  const [workExperienceOpen, setWorkExperienceOpen] = useState(true)
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
          title="My name is Karol Buczek and I am a Full-Stack Web Engineer who works across WordPress, React & Integrations"
          description="I build high-impact web tools and workflows using WordPress and React, and I develop the integrations, automation, and backend logic that connect them to the platforms and software your business runs on."
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

      <Section className="pt-4 md:pt-6">
        <div className="space-y-8 max-w-5xl mx-auto">
          {/* Resume Content */}
          <div className="space-y-8">
            {/* Skills */}
            <SkillsSection isOpen={skillsOpen} onOpenChange={setSkillsOpen} />

            {/* Tech Stack */}
            <TechStackSection isOpen={techStackOpen} onOpenChange={setTechStackOpen} />

            {/* Work Experience */}
            <WorkExperienceSection isOpen={workExperienceOpen} onOpenChange={setWorkExperienceOpen} />

            {/* Featured Work */}
            <SystemsList isOpen={projectsOpen} onOpenChange={setProjectsOpen} />

            {/* Education */}
            <EducationSection />

            {/* References */}
            <ReferencesSection />
          </div>
        </div>
      </Section>
    </>
  )
}

