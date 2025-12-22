"use client"

import { useState, useEffect } from "react"
import { Typography } from "@/components/typography"
import { CaseStudyCard } from "./CaseStudyCard"
import { CaseStudyModal } from "@/components/resume/CaseStudyModal"
import { allCaseStudies } from "@/lib/resume-data"
import type { CaseStudy } from "./CaseStudyCard"

export function CaseStudyGrid() {
  const [mounted, setMounted] = useState(false)
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCaseStudyClick = (caseStudy: CaseStudy) => {
    if (!caseStudy) return
    setSelectedCaseStudy(caseStudy)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    // Clear case study after animation completes
    setTimeout(() => {
      setSelectedCaseStudy(null)
    }, 300)
  }

  // Ensure we have case studies before rendering
  if (!allCaseStudies || allCaseStudies.length === 0) {
    return null
  }

  // Prevent hydration mismatch by only rendering after mount
  if (!mounted) {
    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <Typography variant="h2" as="h2">Featured Case Studies</Typography>
          <Typography variant="body" className="text-muted-foreground">
            Real-world constraints, practical engineering, measurable outcomes.
          </Typography>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allCaseStudies.map((caseStudy) => (
            <div key={caseStudy.slug} className="h-[200px] animate-pulse bg-muted/50 rounded-lg" />
          ))}
        </div>
      </div>
    )
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
