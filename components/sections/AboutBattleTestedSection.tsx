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

export function AboutBattleTestedSection() {
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
            Battle-Tested, No Oversight Required
          </Typography>
          <Typography variant="body" className="text-lg">
            My philosophy isn't academic; it was forged in production environments where downtime has a direct dollar value.
          </Typography>
          <div className="space-y-6">
            <Typography variant="body" className="text-lg">
              At <strong className="text-foreground">Tall Karol</strong>, I operate as Principal Solutions Architect — scoping, designing, and shipping end-to-end. I designed secure, multi-tenant document portals to meet compliance requirements in regulated industries where data cannot leave the environment. I architected a decoupled ETL middleware layer to preserve data integrity and idempotency as raw business data flows into analytics-ready tables. I engineered custom observability pipelines so leadership could measure ROI and forecast revenue from a single source of truth. The goal: eliminate silos, centralize governance, and make the stack a multiplier for business strategy — not a bottleneck.
            </Typography>
            {documentPortalCaseStudy && (
              <Button variant="outline" size="sm" onClick={handleOpenDocumentModal} className="gap-2">
                <FileText className="h-4 w-4" />
                View secure document portal case study
              </Button>
            )}
            <Typography variant="body" className="text-lg text-muted-foreground">
              At <strong className="text-foreground">Universal Windows Direct</strong>, I designed a shared logging and telemetry framework to reduce MTTR and make failures traceable across a diverse set of integrations (Five9, Mailchimp, CRM, and many others) — under high-volume, zero-downtime constraints. I chose a modular API strategy so each integration could be added or updated without structural refactoring. I delivered senior-level architectural results because the business required them, regardless of the formal title on my desk.
            </Typography>
            {uwdCaseStudy && (
              <Button variant="outline" size="sm" onClick={handleOpenUwdModal} className="gap-2">
                <FileText className="h-4 w-4" />
                View UWD Enterprise Integration case study
              </Button>
            )}
            <Typography variant="body" className="text-lg text-muted-foreground">
              The complexity is real: multi-system orchestration, data consistency across boundaries, governance at scale. I've shipped it.
            </Typography>
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
