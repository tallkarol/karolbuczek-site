"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { CaseStudyCard } from "./CaseStudyCard"
import { CaseStudyModal } from "@/components/resume/CaseStudyModal"
import { allCaseStudies } from "@/lib/resume-data"
import type { CaseStudy } from "./CaseStudyCard"

const HOMEPAGE_FEATURED_SLUGS = [
  "secure-document-management-portal",
  "local-ai-meeting-intelligence",
  "uwd-enterprise-integration-api",
]

function useVisibleCount() {
  const [visibleCount, setVisibleCount] = useState(1)

  useEffect(() => {
    const mqDesktop = window.matchMedia("(min-width: 1024px)")
    const mqTablet = window.matchMedia("(min-width: 768px)")

    const update = () => {
      if (mqDesktop.matches) setVisibleCount(3)
      else if (mqTablet.matches) setVisibleCount(2)
      else setVisibleCount(1)
    }

    update()
    mqDesktop.addEventListener("change", update)
    mqTablet.addEventListener("change", update)
    return () => {
      mqDesktop.removeEventListener("change", update)
      mqTablet.removeEventListener("change", update)
    }
  }, [])

  return visibleCount
}

function getFeaturedFirstCaseStudies() {
  const featured = HOMEPAGE_FEATURED_SLUGS.map((slug) =>
    allCaseStudies.find((c) => c.slug === slug)
  ).filter((c): c is CaseStudy => c != null)

  const rest = allCaseStudies.filter((c) => !HOMEPAGE_FEATURED_SLUGS.includes(c.slug))
  return [...featured, ...rest]
}

interface CaseStudyGridProps {
  /** When "large", card images use taller aspect ratio (case-studies page) */
  imageSize?: "default" | "large"
  /** When set, only show this many case studies. Uses HOMEPAGE_FEATURED_SLUGS for order. */
  limit?: number
  /** When limit is set, show "See full portfolio" button */
  showViewAllButton?: boolean
  /** Homepage carousel with manual arrow navigation */
  carousel?: boolean
}

export function CaseStudyGrid({
  imageSize = "default",
  limit,
  showViewAllButton = false,
  carousel = false,
}: CaseStudyGridProps) {
  const searchParams = useSearchParams()
  const visibleCount = useVisibleCount()
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [itemWidth, setItemWidth] = useState(0)
  const [index, setIndex] = useState(0)
  const [animate, setAnimate] = useState(true)
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const measure = useCallback(() => {
    if (containerRef.current) {
      setItemWidth(containerRef.current.offsetWidth / visibleCount)
    }
  }, [visibleCount])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [measure])

  useEffect(() => {
    setIndex(0)
    setAnimate(false)
    requestAnimationFrame(() => setAnimate(true))
  }, [visibleCount])

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
    setTimeout(() => {
      setSelectedCaseStudy(null)
    }, 300)
  }

  if (!allCaseStudies || allCaseStudies.length === 0) {
    return null
  }

  const displayCaseStudies = carousel
    ? getFeaturedFirstCaseStudies()
    : limit
      ? HOMEPAGE_FEATURED_SLUGS.slice(0, limit)
          .map((slug) => allCaseStudies.find((c) => c.slug === slug))
          .filter((c): c is CaseStudy => c != null)
      : allCaseStudies

  const maxIndex = Math.max(0, displayCaseStudies.length - visibleCount)
  const canLoop = maxIndex > 0

  const goPrev = () => {
    if (!canLoop) return
    setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }
  const goNext = () => {
    if (!canLoop) return
    setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const skeletonCount = carousel ? 3 : limit ? Math.min(limit, 3) : allCaseStudies.length

  const header = (
    <div className="space-y-3 mb-8">
      <Typography variant="h2" as="h2">
        Portfolio
      </Typography>
      <div aria-hidden className="tk-accent-rule" />
      <Typography variant="body" className="text-muted-foreground">
        Real-world constraints, practical architecture, measurable outcomes.
      </Typography>
    </div>
  )

  if (!mounted) {
    return (
      <div className="space-y-8">
        {header}
        <div className={carousel ? "h-[420px] animate-pulse rounded-lg bg-muted/50" : "grid gap-6 md:grid-cols-2 lg:grid-cols-3"}>
          {!carousel &&
            Array.from({ length: skeletonCount }).map((_, i) => (
              <div key={i} className="h-[200px] animate-pulse rounded-lg bg-muted/50" />
            ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-8">
        {header}

        {carousel ? (
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={goPrev}
              disabled={!canLoop}
              aria-label="Previous portfolio items"
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-border/50 bg-background text-foreground transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div ref={containerRef} className="min-w-0 flex-1 overflow-hidden">
              <motion.div
                className="flex items-stretch"
                animate={itemWidth > 0 ? { x: -index * itemWidth } : undefined}
                transition={
                  animate
                    ? { duration: 0.45, ease: [0.4, 0, 0.2, 1] }
                    : { duration: 0 }
                }
              >
                {displayCaseStudies.map((caseStudy) => (
                  <div
                    key={caseStudy.slug}
                    className="flex-shrink-0 px-2 sm:px-3"
                    style={{ width: itemWidth > 0 ? itemWidth : `${100 / visibleCount}%` }}
                  >
                    <CaseStudyCard
                      caseStudy={caseStudy}
                      index={0}
                      onClick={() => handleCaseStudyClick(caseStudy)}
                      imageSize={imageSize}
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            <button
              type="button"
              onClick={goNext}
              disabled={!canLoop}
              aria-label="Next portfolio items"
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-border/50 bg-background text-foreground transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayCaseStudies.map((caseStudy, cardIndex) => (
              <CaseStudyCard
                key={caseStudy.slug}
                caseStudy={caseStudy}
                index={cardIndex}
                onClick={() => handleCaseStudyClick(caseStudy)}
                imageSize={imageSize}
              />
            ))}
          </div>
        )}

        {showViewAllButton && (
          <div className="flex justify-start pt-4">
            <Button asChild variant="outline">
              <Link href="/portfolio">See full portfolio</Link>
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
