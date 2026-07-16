"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, X } from "lucide-react"
import { Typography } from "@/components/typography"
import { CaseStudyModal } from "@/components/resume/CaseStudyModal"
import { getPillarCaseStudies, type WhatIDoPillar } from "@/lib/what-i-do"
import type { CaseStudy } from "@/components/sections/CaseStudyCard"
import { websiteBuilds } from "@/lib/website-builds"

const PLACEHOLDER_IMAGE = "/placeholder-image.png"
const FEATURED_WEBSITES = websiteBuilds.slice(0, 3)

interface WhatIDoModalProps {
  pillar: WhatIDoPillar | null
  /** Card illustration reused as the modal's visual (placeholder until dedicated art exists) */
  illustration?: React.ComponentType<{ className?: string }>
  isOpen: boolean
  onClose: () => void
}

/** Before → after values get an accent-tinted arrow so the change reads at a glance */
function StatValue({ value }: { value: string }) {
  if (!value.includes("→")) return <>{value}</>
  return (
    <>
      {value.split("→").map((part, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-0.5 text-accent-text">→</span>}
          {part.trim()}
        </span>
      ))}
    </>
  )
}

export function WhatIDoModal({ pillar, illustration: Illustration, isOpen, onClose }: WhatIDoModalProps) {
  const [mounted, setMounted] = useState(false)
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null)
  const [caseStudyOpen, setCaseStudyOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      setCaseStudyOpen(false)
      setSelectedCaseStudy(null)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen || caseStudyOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen, caseStudyOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !caseStudyOpen) onClose()
    }
    if (isOpen) window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose, caseStudyOpen])

  const caseStudies = pillar ? getPillarCaseStudies(pillar) : []

  /** Pair each practice spec with its case study into one rich example card. */
  const combinedExamples =
    pillar?.specs.map((spec, i) => ({
      spec,
      caseStudy: caseStudies[i] ?? null,
    })) ?? []

  const openCaseStudy = (cs: CaseStudy) => {
    setSelectedCaseStudy(cs)
    setCaseStudyOpen(true)
  }

  if (!mounted) return null

  return createPortal(
    <>
      <AnimatePresence mode="wait">
        {isOpen && pillar && (
          <motion.div
            key={pillar.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="kb-surface-app fixed inset-0 z-[100] flex flex-col overflow-hidden bg-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`What I do · ${pillar.name}`}
          >
              {/* Modal context tab — solid primary chrome; flush to viewport top */}
              <div className="flex w-full shrink-0 items-center justify-between gap-3 bg-primary px-4 py-3 text-primary-foreground md:px-8 md:py-3.5 [padding-top:max(0.75rem,env(safe-area-inset-top))]">
                <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.16em]">
                  What I do · {pillar.name}
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:p-8 md:pb-[max(2rem,env(safe-area-inset-bottom))]">
                <div className="mx-auto w-full max-w-[1100px]">
                {/* Header */}
                <div className="mb-8 border-b border-border/40 pb-6">
                  <div className="flex items-start gap-4">
                    {Illustration && (
                      <div className="hidden h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-background-alt sm:block">
                        <Illustration className="h-full w-full" />
                      </div>
                    )}
                    <div className="min-w-0 space-y-2">
                      <Typography variant="h2" as="h2" className="leading-snug">
                        {pillar.headline}
                      </Typography>
                      <Typography variant="body" className="max-w-3xl pt-1 text-muted-foreground">
                        {pillar.summary}
                      </Typography>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <section className="mb-8">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:gap-4">
                    {pillar.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="relative overflow-hidden rounded-xl border border-border/60 bg-muted/30 py-4 pl-5 pr-4"
                      >
                        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-accent/85 to-accent/30" />
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                          <div
                            className={`font-display font-semibold tracking-tight text-heading ${
                              stat.value.length > 10 ? "text-base md:text-lg" : "text-lg md:text-xl"
                            }`}
                          >
                            <StatValue value={stat.value} />
                          </div>
                          {stat.delta && (
                            <span className="rounded-full border border-accent/25 bg-accent/10 px-2 py-0.5 font-ui text-[0.7rem] font-semibold text-accent-text">
                              {stat.delta}
                            </span>
                          )}
                        </div>
                        <div className="mt-1.5 font-ui text-sm font-medium leading-snug text-muted-foreground">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Working principles that back the stats and case studies */}
                {pillar.approach.length > 0 && (
                  <section className="mb-8">
                    <Typography variant="body-sm" as="h3" className="mb-4 font-semibold uppercase tracking-wider text-accent-text">
                      How I Work
                    </Typography>
                    <ul className="max-w-3xl space-y-3">
                      {pillar.approach.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-[0.55rem] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                          <Typography variant="body-sm" className="leading-relaxed text-foreground/85">
                            {item}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Practice specs + case studies merged into rich example cards */}
                {combinedExamples.length > 0 && (
                  <section className="mb-8">
                    <Typography variant="body-sm" as="h3" className="mb-4 font-semibold uppercase tracking-wider text-accent-text">
                      Case Studies
                    </Typography>
                    <div className="flex flex-col gap-4">
                      {combinedExamples.map(({ spec, caseStudy }) => {
                        const content = (
                          <>
                            <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-muted/40 sm:aspect-auto sm:h-full sm:min-h-[11rem] sm:w-[42%] md:w-[38%]">
                              <Image
                                src={caseStudy?.image || PLACEHOLDER_IMAGE}
                                alt=""
                                fill
                                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                                sizes="(max-width: 640px) 100vw, 360px"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-background/20" />
                            </div>
                            <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 p-5 md:p-6">
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0 space-y-1">
                                  <Typography variant="h3" as="h4" className="text-lg leading-snug md:text-xl">
                                    {spec.title}
                                  </Typography>
                                  {caseStudy?.title && (
                                    <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-text">
                                      {caseStudy.title}
                                    </p>
                                  )}
                                </div>
                                {caseStudy && (
                                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent-text" />
                                )}
                              </div>
                              <Typography variant="body-sm" className="leading-relaxed text-muted-foreground">
                                {spec.detail}
                              </Typography>
                              {caseStudy && (
                                <span className="mt-1 font-ui text-xs font-semibold text-accent-text transition-colors group-hover:underline">
                                  View case study
                                </span>
                              )}
                            </div>
                          </>
                        )

                        if (!caseStudy) {
                          return (
                            <div
                              key={spec.title}
                              className="overflow-hidden rounded-xl border border-border/60 bg-background-alt/60"
                            >
                              <div className="flex flex-col sm:flex-row">{content}</div>
                            </div>
                          )
                        }

                        return (
                          <button
                            key={spec.title}
                            type="button"
                            onClick={() => openCaseStudy(caseStudy)}
                            className="group overflow-hidden rounded-xl border border-border/60 bg-background-alt/60 text-left shadow-sm transition-all hover:border-accent/45 hover:bg-background-alt hover:shadow-md"
                          >
                            <div className="flex flex-col sm:flex-row">{content}</div>
                          </button>
                        )
                      })}
                    </div>
                  </section>
                )}

                {/* Build: featured marketing/brand sites from portfolio */}
                {pillar.id === "build" && (
                  <section className="mb-8">
                    <Typography variant="body-sm" as="h3" className="mb-4 font-semibold uppercase tracking-wider text-accent-text">
                      Websites
                    </Typography>
                    <div className="grid gap-4 sm:grid-cols-3">
                      {FEATURED_WEBSITES.map((site) => (
                        <a
                          key={site.url}
                          href={site.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group overflow-hidden rounded-xl border border-border/60 bg-background-alt/60 text-left shadow-sm transition-all hover:border-accent/45 hover:bg-background-alt hover:shadow-md"
                        >
                          <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/40">
                            <Image
                              src={site.image}
                              alt={`${site.name} homepage`}
                              fill
                              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                              sizes="(max-width: 640px) 100vw, 30vw"
                            />
                            <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100">
                              <ArrowUpRight className="h-4 w-4" />
                              <span className="sr-only">Open {site.name}</span>
                            </span>
                          </div>
                          <div className="space-y-1.5 p-4">
                            <div className="flex flex-wrap gap-1.5">
                              {site.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded border border-accent/20 bg-accent/10 px-2 py-0.5 font-ui text-[10px] font-semibold text-accent-text"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <Typography variant="body-sm" className="font-semibold leading-snug text-foreground transition-colors group-hover:text-accent-text">
                              {site.name}
                            </Typography>
                            <Typography variant="body-sm" className="text-xs leading-relaxed text-muted-foreground">
                              {site.description}
                            </Typography>
                          </div>
                        </a>
                      ))}
                    </div>
                  </section>
                )}

                {/* Work experience deep links */}
                {pillar.roleLinks.length > 0 && (
                  <section className="mb-8">
                    <Typography variant="body-sm" as="h3" className="mb-4 font-semibold uppercase tracking-wider text-accent-text">
                      Work History
                    </Typography>
                    <div className="grid gap-3 md:grid-cols-2">
                      {pillar.roleLinks.map((link) => (
                        <Link
                          key={`${link.roleId}-${link.label}`}
                          href={`/resume?role=${link.roleId}`}
                          className="group rounded-xl border border-border/50 bg-muted/10 p-4 transition-all hover:border-accent/50 hover:bg-muted/25"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <Typography variant="body-sm" className="font-semibold text-foreground transition-colors group-hover:text-accent-text">
                                {link.label}
                              </Typography>
                              {link.sublabel && (
                                <Typography variant="body-sm" className="mt-0.5 text-xs text-muted-foreground">
                                  {link.sublabel}
                                </Typography>
                              )}
                            </div>
                            <ArrowUpRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground group-hover:text-accent-text" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {/* Tech chips */}
                <section className="mb-2">
                  <Typography variant="body-sm" as="h3" className="mb-4 font-semibold uppercase tracking-wider text-accent-text">
                    Typical stack
                  </Typography>
                  <div className="flex flex-wrap gap-2">
                    {pillar.techStack.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center rounded-md border border-border/40 bg-muted/60 px-2.5 py-1.5 text-xs font-medium text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </section>
                </div>
              </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CaseStudyModal
        caseStudy={selectedCaseStudy}
        isOpen={caseStudyOpen}
        onClose={() => {
          setCaseStudyOpen(false)
          setTimeout(() => setSelectedCaseStudy(null), 200)
        }}
      />
    </>,
    document.body
  )
}
