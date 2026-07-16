"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, X } from "lucide-react"
import { Typography } from "@/components/typography"
import { CaseStudyModal } from "@/components/resume/CaseStudyModal"
import { getPillarCaseStudies, type WhatIDoPillar } from "@/lib/what-i-do"
import type { CaseStudy } from "@/components/sections/CaseStudyCard"

const PLACEHOLDER_IMAGE = "/placeholder-image.png"

interface WhatIDoModalProps {
  pillar: WhatIDoPillar | null
  /** Card illustration reused as the modal's visual (placeholder until dedicated art exists) */
  illustration?: React.ComponentType<{ className?: string }>
  index?: number
  isOpen: boolean
  onClose: () => void
}

export function WhatIDoModal({ pillar, illustration: Illustration, index = 0, isOpen, onClose }: WhatIDoModalProps) {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null)
  const [caseStudyOpen, setCaseStudyOpen] = useState(false)

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

  const openCaseStudy = (cs: CaseStudy) => {
    setSelectedCaseStudy(cs)
    setCaseStudyOpen(true)
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen && pillar && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-[2.5vmin]"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-background/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative flex h-full w-full flex-col overflow-hidden rounded-none border-2 border-border/50 bg-card shadow-2xl md:h-auto md:max-h-[90vh] md:w-[95vw] md:max-w-[1100px] md:rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute left-0 top-0 z-10 h-1 w-full bg-gradient-to-r from-accent/0 via-accent/60 to-accent/0" />

              <button
                onClick={onClose}
                className="absolute right-3 top-3 z-20 rounded-lg p-2 transition-colors hover:bg-muted md:right-4 md:top-4"
                aria-label="Close modal"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>

              <div className="flex-1 overflow-y-auto p-4 md:p-8">
                {/* Header */}
                <div className="mb-8 border-b border-border/40 pb-6 pr-10 md:pr-12">
                  <div className="flex items-start gap-4">
                    {Illustration && (
                      <div className="hidden h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-background-alt sm:block">
                        <Illustration className="h-full w-full" />
                      </div>
                    )}
                    <div className="min-w-0 space-y-2">
                      <Typography variant="eyebrow">
                        What I do · 0{index + 1} {pillar.name}
                      </Typography>
                      <Typography variant="h2" as="h2" className="text-xl md:text-2xl">
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
                        className="relative overflow-hidden rounded-xl border border-border/50 bg-muted/20 px-4 py-5 text-center"
                      >
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
                        <div className="mb-1 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                          {stat.value}
                        </div>
                        <Typography variant="body-sm" className="text-xs uppercase tracking-wider text-muted-foreground">
                          {stat.label}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Specs — concrete examples */}
                <section className="mb-8">
                  <Typography variant="body-sm" as="h3" className="mb-4 font-semibold uppercase tracking-wider text-muted-foreground">
                    What this looks like in practice
                  </Typography>
                  <div className="grid gap-3 md:grid-cols-3">
                    {pillar.specs.map((spec) => (
                      <div key={spec.title} className="rounded-xl border border-border/50 bg-muted/10 p-4">
                        <Typography variant="body-sm" className="mb-1.5 font-semibold text-foreground">
                          {spec.title}
                        </Typography>
                        <Typography variant="body-sm" className="text-xs leading-relaxed text-muted-foreground">
                          {spec.detail}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Case studies — open nested modal */}
                {caseStudies.length > 0 && (
                  <section className="mb-8">
                    <Typography variant="body-sm" as="h3" className="mb-1 font-semibold uppercase tracking-wider text-muted-foreground">
                      Proof — case studies
                    </Typography>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Open one for the problem, constraints, architecture, and outcomes.
                    </p>
                    <div className="grid gap-4 sm:grid-cols-3">
                      {caseStudies.map((cs) => (
                        <button
                          key={cs.slug}
                          type="button"
                          onClick={() => openCaseStudy(cs)}
                          className="group overflow-hidden rounded-xl border border-border/50 bg-card text-left transition-all hover:border-accent/50 hover:shadow-lg"
                        >
                          <div className="relative aspect-[16/9] w-full bg-muted/30">
                            <Image
                              src={cs.image || PLACEHOLDER_IMAGE}
                              alt=""
                              fill
                              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                              sizes="(max-width: 640px) 100vw, 30vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
                          </div>
                          <div className="p-3">
                            <div className="flex items-start justify-between gap-2">
                              <Typography variant="body-sm" className="font-semibold leading-snug text-foreground transition-colors group-hover:text-accent-text">
                                {cs.title}
                              </Typography>
                              <ArrowUpRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground group-hover:text-accent-text" />
                            </div>
                            {cs.subtitle && (
                              <Typography variant="body-sm" className="mt-0.5 text-xs text-muted-foreground">
                                {cs.subtitle}
                              </Typography>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </section>
                )}

                {/* Work experience deep links */}
                {pillar.roleLinks.length > 0 && (
                  <section className="mb-8">
                    <Typography variant="body-sm" as="h3" className="mb-4 font-semibold uppercase tracking-wider text-muted-foreground">
                      Where I did this
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
                  <Typography variant="body-sm" as="h3" className="mb-4 font-semibold uppercase tracking-wider text-muted-foreground">
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
            </motion.div>
          </div>
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
    </>
  )
}
