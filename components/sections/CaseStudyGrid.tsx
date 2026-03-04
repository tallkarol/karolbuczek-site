"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { CaseStudyCard } from "./CaseStudyCard"
import { CaseStudyModal } from "@/components/resume/CaseStudyModal"
import { allCaseStudies } from "@/lib/resume-data"
import type { CaseStudy } from "./CaseStudyCard"

const HOMEPAGE_FEATURED_SLUGS = [
  "secure-document-management-portal",
  "unified-customer-lifecycle-platform",
  "uwd-enterprise-integration-api",
]

interface CaseStudyGridProps {
  /** When "large", card images use taller aspect ratio (case-studies page) */
  imageSize?: "default" | "large"
  /** When set, only show this many case studies (homepage: 3). Uses HOMEPAGE_FEATURED_SLUGS for order. */
  limit?: number
  /** When limit is set, show "See rest of case studies" button */
  showViewAllButton?: boolean
}

export function CaseStudyGrid({ imageSize = "default", limit, showViewAllButton = false }: CaseStudyGridProps) {
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const slug = searchParams.get("cs")
    if (!slug || !mounted || !allCaseStudies) return
    const cs = allCaseStudies.find((c) => c.slug === slug)
    if (cs) {
      setSelectedCaseStudy(cs)
      setIsModalOpen(true)
    }
  }, [searchParams, mounted])

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

  const displayCaseStudies = limit
    ? HOMEPAGE_FEATURED_SLUGS.slice(0, limit)
        .map((slug) => allCaseStudies.find((c) => c.slug === slug))
        .filter((c): c is CaseStudy => c != null)
    : allCaseStudies

  const skeletonCount = limit ? Math.min(limit, 3) : allCaseStudies.length

  // Prevent hydration mismatch by only rendering after mount
  if (!mounted) {
    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <Typography variant="h2" as="h2">Featured Case Studies</Typography>
          <Typography variant="body" className="text-muted-foreground">
            Real-world constraints, practical architecture, measurable outcomes.
          </Typography>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <div key={i} className="h-[200px] animate-pulse bg-muted/50 rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-8">
        <div className="space-y-2 mb-8">
          <Typography variant="h2" as="h2">Featured Case Studies</Typography>
          <Typography variant="body" className="text-muted-foreground">
            Real-world constraints, practical architecture, measurable outcomes.
          </Typography>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayCaseStudies.map((caseStudy, index) => (
            <CaseStudyCard 
              key={caseStudy.slug} 
              caseStudy={caseStudy} 
              index={index}
              onClick={() => handleCaseStudyClick(caseStudy)}
              imageSize={imageSize}
            />
          ))}
        </div>
        {showViewAllButton && (
          <div className="flex justify-start pt-4">
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/case-studies">See rest of case studies</Link>
            </Button>
          </div>
        )}
      </div>

      <CaseStudyModal
        caseStudy={selectedCaseStudy}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}
