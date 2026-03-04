"use client"

import { useState } from "react"
import Link from "next/link"
import { Section } from "@/components/Section"
import { PageHero } from "@/components/sections/PageHero"
import { ResumeIllustration } from "@/components/illustrations"
import { EducationSection } from "@/components/resume/EducationSection"
import { CertificationsSection } from "@/components/resume/CertificationsSection"
import { SkillsSection } from "@/components/resume/SkillsSection"
import { TechStackSection } from "@/components/resume/TechStackSection"
import { WorkExperienceSection } from "@/components/resume/WorkExperienceSection"
import { SystemsList } from "@/components/resume/SystemsList"
import { CaseStudyModal } from "@/components/resume/CaseStudyModal"
import { ReferencesSection } from "@/components/resume/ReferencesSection"
import { allCaseStudies } from "@/lib/resume-data"
import type { CaseStudy } from "@/components/sections/CaseStudyCard"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/typography"
import { Download, Mail, Linkedin } from "lucide-react"

const featuredCaseStudies = [
  { slug: "unified-customer-lifecycle-platform", title: "MHAT Platform", subtitle: "Customer Data Portal & Lifecycle Automation", logo: "/zemvelo-logo.png" },
  { slug: "secure-document-management-portal", title: "Bliss Secure File Share", subtitle: "Enterprise Document Portal on AWS", logo: "/bliss-cb.png" },
  { slug: "uwd-enterprise-integration-api", title: "UWD Enterprise Integration API", subtitle: "Centralized Integration Layer", logo: "/uwd-logo.png" },
  { slug: "local-ai-meeting-intelligence", title: "Local AI Meeting Intelligence", subtitle: "Private On-Premise Transcription System", logo: "/tallkarol-monogram-logo.png" },
  { slug: "martech-extension-architecture", title: "MarTech Extension Architecture", subtitle: "Custom WordPress Engineering", logo: "/tallkarol-monogram-logo.png" },
]

export default function ResumePage() {
  const [skillsOpen, setSkillsOpen] = useState(true)
  const [techStackOpen, setTechStackOpen] = useState(true)
  const [workExperienceOpen, setWorkExperienceOpen] = useState(true)
  const [projectsOpen, setProjectsOpen] = useState(true)
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCaseStudyClick = (slug: string) => {
    const cs = allCaseStudies.find((c) => c.slug === slug)
    if (cs) {
      setSelectedCaseStudy(cs)
      setIsModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedCaseStudy(null), 300)
  }

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
          title="Solutions Architect with over a decade of experience"
          description={
            <ul className="space-y-2 [&_li]:flex [&_li]:items-start [&_li]:gap-2">
              <li>
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                <Typography variant="body" as="span">
                  <strong>Strategic Architect:</strong> 10+ years designing web systems, cloud infrastructure, API integrations, and data pipelines — bridging the gap between full-stack engineering and C-suite business objectives.
                </Typography>
              </li>
              <li>
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                <Typography variant="body" as="span">
                  <strong>Systems Leader:</strong> Expert in technical discovery and autonomous project ownership, aligning architectural decisions with long-term revenue and operational efficiency.
                </Typography>
              </li>
            </ul>
          }
          illustration={<ResumeIllustration />}
          buttons={
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="sm" className="rounded-full">
                <a
                  href="/resume-karol-buczek.pdf"
                  download="resume-karol-buczek.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </Button>
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

            {/* Certifications */}
            <CertificationsSection />

            {/* Soft Skills */}
            <SkillsSection isOpen={skillsOpen} onOpenChange={setSkillsOpen} />

            {/* Work Experience */}
            <WorkExperienceSection isOpen={workExperienceOpen} onOpenChange={setWorkExperienceOpen} />

            {/* Featured Work */}
            <SystemsList
              isOpen={projectsOpen}
              onOpenChange={setProjectsOpen}
              caseStudies={featuredCaseStudies}
              onCaseStudyClick={handleCaseStudyClick}
            />

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
                Open to solutions architect roles and select consulting engagements.
              </Typography>
              <Typography variant="body" className="text-muted-foreground">
                If you're hiring or exploring an architecture engagement—discovery, scoping, or system design—feel free to reach out.
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
                  href="/resume-karol-buczek.pdf"
                  download="resume-karol-buczek.pdf"
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

      <CaseStudyModal
        caseStudy={selectedCaseStudy}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}

