"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/typography"
import { CaseStudyCard } from "@/components/sections/CaseStudyCard"
import { CaseStudyModal } from "@/components/resume/CaseStudyModal"
import { allCaseStudies } from "@/lib/resume-data"
import type { CaseStudy } from "@/components/sections/CaseStudyCard"
import { Reveal } from "@/components/motion/Reveal"

const HOMEPAGE_FEATURED_SLUGS = [
  "secure-document-management-portal",
  "local-ai-meeting-intelligence",
  "uwd-enterprise-integration-api",
]

interface CaseStudyGridProps {
  /** When "large", card images use taller aspect ratio (portfolio page) */
  imageSize?: "default" | "large"
  /** When set, only show this many case studies. Uses HOMEPAGE_FEATURED_SLUGS for order. */
  limit?: number
  /** When true, show "See full portfolio" button */
  showViewAllButton?: boolean
  /** Homepage carousel with CSS scroll-snap (no JS measure → no CLS) */
  carousel?: boolean
}

function getFeaturedFirstCaseStudies() {
  const featured = HOMEPAGE_FEATURED_SLUGS.map((slug) =>
    allCaseStudies.find((c) => c.slug === slug)
  ).filter((c): c is CaseStudy => c != null)

  const rest = allCaseStudies.filter((c) => !HOMEPAGE_FEATURED_SLUGS.includes(c.slug))
  return [...featured, ...rest]
}

function CaseStudyCarousel({
  studies,
  imageSize,
  onSelect,
}: {
  studies: CaseStudy[]
  imageSize: "default" | "large"
  onSelect: (caseStudy: CaseStudy) => void
}) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const updateNav = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft < maxScroll - 4)
  }, [])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    updateNav()
    el.addEventListener("scroll", updateNav, { passive: true })
    window.addEventListener("resize", updateNav)
    return () => {
      el.removeEventListener("scroll", updateNav)
      window.removeEventListener("resize", updateNav)
    }
  }, [updateNav])

  const scrollByPage = (direction: -1 | 1) => {
    const el = scrollerRef.current
    if (!el) return
    const track = el.firstElementChild as HTMLElement | null
    const card = track?.firstElementChild as HTMLElement | null
    if (!track || !card) return

    // Advance by the number of fully visible cards, landing on a card edge.
    const gap = parseFloat(getComputedStyle(track).columnGap || "0") || 0
    const stride = card.offsetWidth + gap
    const visibleCards = Math.max(1, Math.floor((el.clientWidth + gap) / stride))
    const targetIndex =
      Math.round(el.scrollLeft / stride) + direction * visibleCards
    const maxScroll = el.scrollWidth - el.clientWidth
    const target = Math.min(Math.max(targetIndex * stride, 0), maxScroll)
    el.scrollTo({ left: target, behavior: "smooth" })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 sm:gap-4">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="hidden h-10 w-10 shrink-0 rounded-full border-border/70 bg-background/80 shadow-sm backdrop-blur sm:inline-flex"
          onClick={() => scrollByPage(-1)}
          disabled={!canPrev}
          aria-label="Previous case studies"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div
          ref={scrollerRef}
          className="min-w-0 flex-1 overflow-x-auto overscroll-x-contain scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex snap-x snap-mandatory gap-4 md:gap-6">
            {studies.map((caseStudy, cardIndex) => (
              <div
                key={caseStudy.slug}
                className="w-[min(100%,22rem)] shrink-0 snap-start sm:w-[min(100%,24rem)] md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
              >
                <CaseStudyCard
                  caseStudy={caseStudy}
                  index={cardIndex}
                  onClick={() => onSelect(caseStudy)}
                  imageSize={imageSize}
                />
              </div>
            ))}
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="hidden h-10 w-10 shrink-0 rounded-full border-border/70 bg-background/80 shadow-sm backdrop-blur sm:inline-flex"
          onClick={() => scrollByPage(1)}
          disabled={!canNext}
          aria-label="Next case studies"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center justify-center gap-3 sm:hidden">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full border-border/70 bg-background/80 shadow-sm"
          onClick={() => scrollByPage(-1)}
          disabled={!canPrev}
          aria-label="Previous case studies"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full border-border/70 bg-background/80 shadow-sm"
          onClick={() => scrollByPage(1)}
          disabled={!canNext}
          aria-label="Next case studies"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export function CaseStudyGrid({
  imageSize = "default",
  limit,
  showViewAllButton = false,
  carousel = false,
}: CaseStudyGridProps) {
  const searchParams = useSearchParams()
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const slug = searchParams.get("cs")
    if (!slug) return
    const cs = allCaseStudies.find((c) => c.slug === slug)
    if (cs) {
      setSelectedCaseStudy(cs)
      setIsModalOpen(true)
    }
  }, [searchParams])

  const handleCaseStudyClick = (caseStudy: CaseStudy) => {
    setSelectedCaseStudy(caseStudy)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedCaseStudy(null), 300)
  }

  if (!allCaseStudies.length) return null

  const displayCaseStudies = carousel
    ? getFeaturedFirstCaseStudies()
    : limit
      ? HOMEPAGE_FEATURED_SLUGS.slice(0, limit)
          .map((slug) => allCaseStudies.find((c) => c.slug === slug))
          .filter((c): c is CaseStudy => c != null)
      : allCaseStudies

  return (
    <>
      <div className="space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <Reveal className="space-y-3">
            <Typography variant="eyebrow" className="text-accent-text">
              Case studies
            </Typography>
            <Typography variant="h2" as="h2">
              Selected work
            </Typography>
            <div aria-hidden className="tk-accent-rule" />
            <Typography variant="body" className="max-w-2xl text-muted-foreground">
              Architecture and delivery stories from platform, data, and product work.
            </Typography>
          </Reveal>
        </div>

        {carousel ? (
          <CaseStudyCarousel
            studies={displayCaseStudies}
            imageSize={imageSize}
            onSelect={handleCaseStudyClick}
          />
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
          <div className="flex justify-start">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href="/portfolio">
                View all case studies
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
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
