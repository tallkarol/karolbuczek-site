"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { ResumeSnapshot } from "@/components/resume/ResumeSnapshot"
import { SkillsSection } from "@/components/resume/SkillsSection"
import { WorkExperienceSection } from "@/components/resume/WorkExperienceSection"
import { SystemsList } from "@/components/resume/SystemsList"
import { EducationSection } from "@/components/resume/EducationSection"
import { ReferencesSection } from "@/components/resume/ReferencesSection"
import { getRoleConfig, getCaseStudiesForRole } from "@/lib/role-configs"
import { Typography } from "@/components/typography"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import type { CaseStudy } from "@/components/sections/CaseStudyCard"

export default function ResumeVariantPage() {
  const params = useParams()
  const [mounted, setMounted] = useState(false)
  const [skillsOpen, setSkillsOpen] = useState(true)
  const [workExperienceOpen, setWorkExperienceOpen] = useState(true)
  const [projectsOpen, setProjectsOpen] = useState(true)
  
  useEffect(() => {
    setMounted(true)
    // Auto-trigger print dialog when page loads (for PDF generation)
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && window.location.search.includes("print=true")) {
        window.print()
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Wait for params to be available
  if (!mounted || !params?.variant) {
    return (
      <div className="print-resume">
        <div className="max-w-5xl mx-auto p-6 print:p-4 print:max-w-full">
          <div className="flex items-center justify-center min-h-[400px]">
            <Typography variant="body" className="text-muted-foreground">
              Loading...
            </Typography>
          </div>
        </div>
      </div>
    )
  }

  const variant = params.variant as string
  
  // Get role config and filter
  const roleConfig = getRoleConfig(variant)
  const roleFilter = roleConfig?.roleFilter
  const caseStudies = roleConfig ? getCaseStudiesForRole(variant) : []

  return (
    <div className="print-resume">
      <div className="max-w-5xl mx-auto p-6 print:p-4 print:max-w-full">
        {/* Resume Snapshot */}
        <div className="mb-8 print:mb-6">
          <ResumeSnapshot />
        </div>

        {/* Skills */}
        <div className="mb-8 print:mb-6">
          <SkillsSection isOpen={skillsOpen} onOpenChange={setSkillsOpen} roleFilter={roleFilter} />
        </div>

        {/* Work Experience */}
        <div className="mb-8 print:mb-6">
          <WorkExperienceSection isOpen={workExperienceOpen} onOpenChange={setWorkExperienceOpen} roleFilter={roleFilter} />
        </div>

        {/* Featured Work */}
        <div className="mb-8 print:mb-6">
          <SystemsList isOpen={projectsOpen} onOpenChange={setProjectsOpen} roleFilter={roleFilter} />
        </div>

        {/* Case Studies */}
        {caseStudies.length > 0 && (
          <div className="mb-8 print:mb-6">
            <Card className="border-border/50">
              <CardHeader className="pb-0 border-b-0">
                <CardTitle className="text-lg font-display flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  Featured Case Studies
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <Typography variant="body-sm" className="text-muted-foreground mb-4">
                  Detailed case studies with links to learn more:
                </Typography>
                <div className="space-y-3">
                  {caseStudies.map((caseStudy: CaseStudy) => (
                    <div
                      key={caseStudy.slug}
                      className="p-3 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <Link
                            href={`/case-studies#${caseStudy.slug}`}
                            className="group"
                          >
                            <Typography variant="body-sm" className="font-semibold mb-1 group-hover:text-primary transition-colors">
                              {caseStudy.title}
                            </Typography>
                            <Typography variant="body-sm" className="text-muted-foreground text-xs mb-1">
                              {caseStudy.summary}
                            </Typography>
                            {caseStudy.metric && (
                              <Typography variant="body-sm" className="text-xs text-primary">
                                {caseStudy.metric}
                              </Typography>
                            )}
                          </Link>
                        </div>
                        <Link
                          href={`/case-studies#${caseStudy.slug}`}
                          className="flex-shrink-0 text-muted-foreground hover:text-primary transition-colors"
                          aria-label={`View ${caseStudy.title} case study`}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Education */}
        <div className="mb-8 print:mb-6">
          <EducationSection />
        </div>

        {/* References */}
        <div className="mb-8 print:mb-6">
          <ReferencesSection />
        </div>
      </div>
    </div>
  )
}

