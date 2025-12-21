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
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/typography"
import { Download, Mail, Linkedin } from "lucide-react"

export default function ResumePage() {
  const [skillsOpen, setSkillsOpen] = useState(true)
  const [techStackOpen, setTechStackOpen] = useState(true)
  const [workExperienceOpen, setWorkExperienceOpen] = useState(true)
  const [projectsOpen, setProjectsOpen] = useState(true)

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
          eyebrow="Resume"
          title="Web Systems Engineer & Full-Stack Developer"
          description="Building internal tools, automation pipelines, and performance-focused web systems across modern stacks."
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
            {/* Technical Skills */}
            <TechStackSection isOpen={techStackOpen} onOpenChange={setTechStackOpen} />

            {/* Work Experience */}
            <WorkExperienceSection isOpen={workExperienceOpen} onOpenChange={setWorkExperienceOpen} />

            {/* Featured Work */}
            <SystemsList isOpen={projectsOpen} onOpenChange={setProjectsOpen} />

            {/* Soft Skills */}
            <SkillsSection isOpen={skillsOpen} onOpenChange={setSkillsOpen} />

            {/* Education */}
            <EducationSection />

            {/* References */}
            <ReferencesSection />
          </div>

          {/* CTA Section */}
          <div className="relative rounded-lg border border-border/50 bg-muted/30 p-8 md:p-12 text-center space-y-6 overflow-hidden mt-12">
            {/* Subtle accent */}
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0" />
            
            <div className="space-y-2">
              <Typography variant="h2" as="h2" className="text-2xl md:text-3xl">
                Open to new engineering roles and select consulting engagements.
              </Typography>
              <Typography variant="body" className="text-muted-foreground">
                If you're hiring or exploring a systems/automation project, feel free to reach out.
              </Typography>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild className="rounded-full px-6 py-2 text-sm font-semibold font-ui">
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Get in touch
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-6 py-2 text-sm font-ui border-border/50 hover:border-primary transition-colors">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-6 py-2 text-sm font-ui border-border/50 hover:border-primary transition-colors">
                <a
                  href="https://www.linkedin.com/in/karolbuczek/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

