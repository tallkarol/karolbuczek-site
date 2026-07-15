"use client"

import { useState } from "react"
import { Section } from "@/components/Section"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { CaseStudyModal } from "@/components/resume/CaseStudyModal"
import { allCaseStudies } from "@/lib/resume-data"
import type { CaseStudy } from "@/components/sections/CaseStudyCard"
import { FileText } from "lucide-react"

const DOCUMENT_PORTAL_SLUG = "secure-document-management-portal"
const UWD_CASE_STUDY_SLUG = "uwd-enterprise-integration-api"

export function AboutTheWorkSection() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const documentPortalCaseStudy = allCaseStudies.find((c) => c.slug === DOCUMENT_PORTAL_SLUG) as CaseStudy | undefined
  const uwdCaseStudy = allCaseStudies.find((c) => c.slug === UWD_CASE_STUDY_SLUG) as CaseStudy | undefined

  const handleOpenDocumentModal = (e: React.MouseEvent) => {
    e.preventDefault()
    setSelectedCaseStudy(documentPortalCaseStudy ?? null)
    setIsModalOpen(true)
  }

  const handleOpenUwdModal = (e: React.MouseEvent) => {
    e.preventDefault()
    setSelectedCaseStudy(uwdCaseStudy ?? null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedCaseStudy(null)
  }

  return (
    <>
      <Section>
        <div className="max-w-3xl space-y-8">
          <Typography variant="h2" as="h2">
            The Work
          </Typography>
          <div className="space-y-6">
            <Typography variant="body" className="text-lg">
              At Universal Windows Direct, I expanded and organized a centralized integration API connecting 7+ systems — Five9, CRM, Mailchimp, and internal platforms — with a shared logging and error-handling framework that made failures traceable across every automation. Modular routes meant new integrations could be added without structural refactoring. I also migrated the server infrastructure across four VPS partitions with zero downtime.
            </Typography>
            {uwdCaseStudy && (
              <Button variant="outline" size="sm" onClick={handleOpenUwdModal} className="gap-2">
                <FileText className="h-4 w-4" />
                View UWD Enterprise Integration case study
              </Button>
            )}
            <Typography variant="body" className="text-lg text-muted-foreground">
              As an independent consultant, I&apos;ve designed and shipped: a serverless AWS document portal with managed identity, signed-URL delivery, role-based access, and immutable audit logging for a compliance-sensitive audit provider; a production A&R analytics platform (Next.js/TypeScript, PostgreSQL) used daily by a music label&apos;s discovery team; a headless WordPress + React rebuild that took mobile Lighthouse from 51 to 94; and a modular integration architecture connecting CRMs and third-party vendors across 8 brands at Great Day Improvements.
            </Typography>
            {documentPortalCaseStudy && (
              <Button variant="outline" size="sm" onClick={handleOpenDocumentModal} className="gap-2">
                <FileText className="h-4 w-4" />
                View secure document portal case study
              </Button>
            )}
          </div>
        </div>
      </Section>

      {selectedCaseStudy && (
        <CaseStudyModal
          caseStudy={selectedCaseStudy}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  )
}
