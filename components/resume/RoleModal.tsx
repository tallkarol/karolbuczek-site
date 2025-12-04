"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Typography } from "@/components/typography"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export interface RoleDetails {
  period: string
  officialTitle: string
  officialDates?: string
  reality?: string
  keyProjects?: string[]
  systems?: string[]
  exampleWork?: string[]
  highlights?: string[]
  relatedCaseStudies?: Array<{
    slug: string
    title: string
  }>
  quote?: {
    text: string
    author: string
    role?: string
  }
  stats?: Array<{
    label: string
    value: string
  }>
}

interface RoleModalProps {
  role: RoleDetails | null
  isOpen: boolean
  onClose: () => void
}

export function RoleModal({ role, isOpen, onClose }: RoleModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleEscape)
    }
    return () => {
      window.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen || !role) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-[90vw] h-[90vh] bg-card border border-border/50 rounded-lg shadow-lg overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>

              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                {/* Header */}
                <div className="pr-10 mb-6 pb-6 border-b border-border/50">
                  <Typography variant="h2" as="h2" className="mb-2">
                    {role.officialTitle}
                  </Typography>
                  <div className="space-y-1">
                    <Typography variant="body-sm" className="font-semibold text-foreground">
                      {role.period}
                    </Typography>
                    {role.officialDates && (
                      <Typography variant="body-sm" className="text-muted-foreground italic">
                        {role.officialDates}
                      </Typography>
                    )}
                    {role.reality && (
                      <div className="mt-3 p-3 rounded-lg bg-muted/30 border border-border/50">
                        <Typography variant="body-sm" className="text-muted-foreground italic">
                          {role.reality}
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats */}
                {role.stats && role.stats.length > 0 && (
                  <div className="mb-6 pb-6 border-b border-border/50">
                    <Typography variant="h3" as="h3" className="mb-4 font-display text-base">
                      Key Metrics
                    </Typography>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {role.stats.map((stat, index) => (
                        <div key={index} className="text-center p-4 rounded-lg bg-muted/20 border border-border/30">
                          <Typography variant="h3" as="div" className="text-2xl font-display font-semibold mb-1 text-primary">
                            {stat.value}
                          </Typography>
                          <Typography variant="body-sm" className="text-muted-foreground">
                            {stat.label}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quote */}
                {role.quote && (
                  <Card className="mb-6 border-border/50 bg-muted/30">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <div className="text-4xl text-primary/20 font-serif leading-none mt-1">"</div>
                        <div className="flex-1">
                          <Typography variant="body" className="italic text-foreground mb-4 leading-relaxed">
                            {role.quote.text}
                          </Typography>
                          <div className="pt-3 border-t border-border/30">
                            <Typography variant="body-sm" className="font-semibold">
                              {role.quote.author}
                            </Typography>
                            {role.quote.role && (
                              <Typography variant="body-sm" className="text-muted-foreground">
                                {role.quote.role}
                              </Typography>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Highlights */}
                {role.highlights && role.highlights.length > 0 && (
                  <div className="mb-6 pb-6 border-b border-border/50">
                    <Typography variant="h3" as="h3" className="mb-4 font-display text-base">
                      Highlights
                    </Typography>
                    <div className="grid gap-3 md:grid-cols-2">
                      {role.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-start gap-2 p-3 rounded-lg bg-muted/20 border border-border/30">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                          <Typography variant="body-sm" className="text-muted-foreground">
                            {highlight}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Projects */}
                {role.keyProjects && role.keyProjects.length > 0 && (
                  <div className="mb-6 pb-6 border-b border-border/50">
                    <Typography variant="h3" as="h3" className="mb-4 font-display text-base">
                      Key Projects
                    </Typography>
                    <ul className="space-y-3">
                      {role.keyProjects.map((project, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                          <Typography variant="body-sm" className="text-muted-foreground">
                            {project}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Related Case Studies */}
                {role.relatedCaseStudies && role.relatedCaseStudies.length > 0 && (
                  <div className="mb-6 pb-6 border-b border-border/50">
                    <Typography variant="h3" as="h3" className="mb-4 font-display text-base">
                      Related Case Studies
                    </Typography>
                    <div className="grid gap-3 md:grid-cols-2">
                      {role.relatedCaseStudies.map((caseStudy, index) => (
                        <Link
                          key={index}
                          href={`/case-studies/${caseStudy.slug}`}
                          className="p-4 rounded-lg border border-border/50 bg-card hover:border-primary/50 hover:bg-muted/20 transition-all group"
                        >
                          <Typography variant="body-sm" className="font-semibold group-hover:text-primary transition-colors">
                            {caseStudy.title}
                          </Typography>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Example Work */}
                {role.exampleWork && role.exampleWork.length > 0 && (
                  <div className="mb-6 pb-6 border-b border-border/50">
                    <Typography variant="h3" as="h3" className="mb-4 font-display text-base">
                      Example Work
                    </Typography>
                    <ul className="space-y-3">
                      {role.exampleWork.map((work, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                          <Typography variant="body-sm" className="text-muted-foreground">
                            {work}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Systems & Engineering */}
                {role.systems && role.systems.length > 0 && (
                  <div>
                    <Typography variant="h3" as="h3" className="mb-4 font-display text-base">
                      Systems & Engineering
                    </Typography>
                    <ul className="space-y-3">
                      {role.systems.map((system, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                          <Typography variant="body-sm" className="text-muted-foreground">
                            {system}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

