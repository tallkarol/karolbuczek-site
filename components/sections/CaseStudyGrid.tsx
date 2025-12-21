"use client"

import { useState } from "react"
import { Typography } from "@/components/typography"
import { CaseStudyCard } from "./CaseStudyCard"
import { CaseStudyModal } from "@/components/resume/CaseStudyModal"
import { allCaseStudies } from "@/lib/resume-data"
import type { CaseStudy } from "./CaseStudyCard"

export function CaseStudyGrid() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCaseStudyClick = (caseStudy: CaseStudy) => {
    setSelectedCaseStudy(caseStudy)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedCaseStudy(null), 300) // Delay to allow animation
  }

  return (
    <>
      <div className="space-y-8">
        <div className="space-y-2">
          <Typography variant="h2" as="h2">Featured Case Studies</Typography>
          <Typography variant="body" className="text-muted-foreground">
            Real-world constraints, practical engineering, measurable outcomes.
          </Typography>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allCaseStudies.map((caseStudy, index) => (
            <CaseStudyCard 
              key={caseStudy.slug} 
              caseStudy={caseStudy} 
              index={index}
              onClick={() => handleCaseStudyClick(caseStudy)}
            />
          ))}
        </div>
      </div>

      <CaseStudyModal
        caseStudy={selectedCaseStudy}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}
