"use client"

import { useState } from "react"
import { Section } from "@/components/Section"
import { PageHero } from "@/components/sections/PageHero"
import { CTASection } from "@/components/sections/CTASection"
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
import { Download } from "lucide-react"

const featuredCaseStudies = [
  { slug: "unified-customer-lifecycle-platform", title: "MHAT Platform", subtitle: "Customer Data Portal & Lifecycle Automation", logo: "/zemvelo-logo.png" },
  { slug: "secure-document-management-portal", title: "Bliss Secure File Share", subtitle: "Secure Document Portal on AWS", logo: "/bliss-cb.png" },
  { slug: "uwd-enterprise-integration-api", title: "UWD Enterprise Integration API", subtitle: "Centralized Integration Layer", logo: "/uwd-logo.png" },
  { slug: "local-ai-meeting-intelligence", title: "On-Premise Meeting Transcription", subtitle: "Private Speech-to-Text & Action-Item Pipeline", logo: "/tallkarol-monogram-logo.png" },
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
      <div className="kb-hero-inverse">
      <Section className="py-8 lg:py-16">
        <PageHero
          className="lg:min-h-[320px]"
          eyebrow="Resume"
          title={
            <Typography variant="h1" as="h1" className="text-ink dark:text-text-inverse">
              Full-Stack Engineer
              <br />
              & Solutions Architect
            </Typography>
          }
          description={
            <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                  <Typography variant="body" className="text-muted-foreground">
                    7 years of hands-on delivery for SMB, mid-market, and enterprise clients; 15+ years of coding experience.
                  </Typography>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                  <Typography variant="body" className="text-muted-foreground">
                    Specializing in custom web applications, enterprise WordPress, and systems integration.
                  </Typography>
                </li>
            </ul>
          }
          illustration={<ResumeIllustration priority />}
          illustrationClassName="max-w-[275px] aspect-[425/709] md:max-w-[350px]"
          columnGapClassName="gap-3 md:gap-4"
          buttons={
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="sm">
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
                Focus Areas
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
      </div>

      <section className="w-full bg-chiffon-100 pt-4 dark:bg-navy-950 md:pt-6">
        <div className="kb-content-rail space-y-8 py-12 lg:py-16">
          <WorkExperienceSection isOpen={workExperienceOpen} onOpenChange={setWorkExperienceOpen} />
          <SkillsSection isOpen={skillsOpen} onOpenChange={setSkillsOpen} />
          <TechStackSection isOpen={techStackOpen} onOpenChange={setTechStackOpen} />
          <CertificationsSection />
          <SystemsList
            isOpen={projectsOpen}
            onOpenChange={setProjectsOpen}
            caseStudies={featuredCaseStudies}
            onCaseStudyClick={handleCaseStudyClick}
          />
          <EducationSection />
          <ReferencesSection />
        </div>
      </section>

      <section className="kb-section-inverse w-full pb-0">
        <div className="kb-content-rail py-12 lg:py-16">
          <CTASection
            fullWidth
            heading="Looking for a full-time integration or implementation role."
            description="Open to select consulting engagements as well — discovery, scoping, or system design. Feel free to reach out."
          />
        </div>
      </section>

      <CaseStudyModal
        caseStudy={selectedCaseStudy}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}

