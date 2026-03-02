"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, Code2 } from "lucide-react"
import {
  SiReact,
  SiPostgresql,
  SiVercel,
  SiWordpress,
  SiWoocommerce,
  SiPhp,
  SiJavascript,
  SiMysql,
  SiAmazon,
} from "react-icons/si"
import { Typography } from "@/components/typography"
import { Card, CardContent } from "@/components/ui/card"
import type { CaseStudy } from "@/components/sections/CaseStudyCard"

const PLACEHOLDER_IMAGE = "/placeholder-image.png"

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null
  isOpen: boolean
  onClose: () => void
}

// Map tech names (case-insensitive substring match) to icons
const TECH_ICON_MAP: Array<{ match: RegExp | string; Icon: React.ComponentType<{ className?: string }> }> = [
  { match: /^react$/i, Icon: SiReact },
  { match: /postgresql|postgres/i, Icon: SiPostgresql },
  { match: /vercel/i, Icon: SiVercel },
  { match: /wordpress/i, Icon: SiWordpress },
  { match: /woocommerce|woo/i, Icon: SiWoocommerce },
  { match: /^php$/i, Icon: SiPhp },
  { match: /javascript|js\b/i, Icon: SiJavascript },
  { match: /mysql/i, Icon: SiMysql },
  { match: /aws|amplify|cognito|lambda|s3|rds|amazon/i, Icon: SiAmazon },
]

function getTechIcon(name: string) {
  const normalized = name.trim()
  for (const { match, Icon } of TECH_ICON_MAP) {
    if (typeof match === "string" ? normalized.toLowerCase().includes(match.toLowerCase()) : match.test(normalized)) {
      return Icon
    }
  }
  return Code2
}

function TechStackLine({ items }: { items: string[] }) {
  return (
    <div className="grid gap-x-4 gap-y-2 justify-start" style={{ gridTemplateColumns: "max-content max-content" }}>
      {items.map((item) => {
        const Icon = getTechIcon(item)
        return (
          <span
            key={item}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-muted/60 text-muted-foreground text-xs font-medium border border-border/40"
          >
            <Icon className="h-3.5 w-3.5 flex-shrink-0 text-foreground/70" />
            {item}
          </span>
        )
      })}
    </div>
  )
}

export function CaseStudyModal({ caseStudy, isOpen, onClose }: CaseStudyModalProps) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen) setLightboxImage(null)
  }, [isOpen])

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
        if (lightboxImage) setLightboxImage(null)
        else onClose()
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleEscape)
    }
    return () => {
      window.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose, lightboxImage])

  return (
    <>
      {/* Image lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/95 backdrop-blur-sm"
            onClick={() => setLightboxImage(null)}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors z-10"
              aria-label="Close"
            >
              <X className="h-6 w-6 text-muted-foreground" />
            </button>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxImage}
                alt="Enlarged view"
                fill
                className="object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
      {isOpen && caseStudy && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-[2.5vmin]"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-background/85 backdrop-blur-sm"
          />

          {/* Modal - 100% on mobile, 95vw x 95vh on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full h-full md:w-[95vw] md:h-[95vh] md:max-w-[1400px] md:max-h-[90vh] bg-card border-2 border-border/50 rounded-none md:rounded-xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 md:top-4 md:right-4 p-2 rounded-lg hover:bg-muted transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
              {/* Header with placeholder image */}
              <div className="mb-6 pr-10 md:pr-12">
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6">
                  <button
                    type="button"
                    onClick={() => setLightboxImage(caseStudy.image || PLACEHOLDER_IMAGE)}
                    className="relative aspect-video md:aspect-[21/9] w-full md:w-2/5 rounded-lg overflow-hidden bg-muted/30 flex-shrink-0 cursor-zoom-in hover:opacity-95 transition-opacity"
                  >
                    <Image
                      src={caseStudy.image || PLACEHOLDER_IMAGE}
                      alt={caseStudy.title}
                      fill
                      className="object-cover"
                    />
                  </button>
                  <div className="flex-1 min-w-0">
                    <Typography variant="h2" as="h2" className="text-xl md:text-2xl font-display mb-1">
                      {caseStudy.title}
                    </Typography>
                    {caseStudy.subtitle && (
                      <Typography variant="body" className="font-medium text-muted-foreground mb-2">
                        {caseStudy.subtitle}
                      </Typography>
                    )}
                    <Typography variant="body-sm" className="text-muted-foreground mb-3">
                      {caseStudy.summary}
                    </Typography>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-ui font-semibold border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {caseStudy.metric && (
                      <div className="mt-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                        <Typography variant="body-sm" className="font-semibold text-primary">
                          {caseStudy.metric}
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* The Problem */}
              {caseStudy.problem && (
                <div className="mb-6">
                  <Typography variant="body-sm" as="h3" className="font-semibold mb-2">The Problem</Typography>
                  <div className="pl-4">
                    <Typography variant="body-sm" className="text-muted-foreground">
                      {caseStudy.problem}
                    </Typography>
                  </div>
                </div>
              )}

              

              {/* The Solution */}
              {caseStudy.solution && (
                <div className="mb-6">
                  <Typography variant="body-sm" as="h3" className="font-semibold mb-2">The Solution</Typography>
                  <div className="pl-4">
                    <Typography variant="body-sm" className="text-muted-foreground">
                      {caseStudy.solution}
                    </Typography>
                  </div>
                </div>
              )}


              {/* The Client */}
              {(caseStudy.clientLogo || (caseStudy.clientLogos && caseStudy.clientLogos.length > 0) || caseStudy.clientDescription || caseStudy.clientStage) && (
                <div className="mb-6">
                  <Typography variant="body-sm" as="h3" className="font-semibold mb-2">The Client(s)</Typography>
                  <div className="pl-4 flex flex-wrap items-center gap-4">
                    {caseStudy.clientLogos && caseStudy.clientLogos.length > 0 ? (
                      <div className="flex flex-wrap gap-6 items-center">
                        {caseStudy.clientLogos.map((src, i) => (
                          <div key={i} className={`relative h-12 flex-shrink-0 ${i === 0 ? "w-10" : "w-24"}`}>
                            <Image
                              src={src}
                              alt={`Client logo ${i + 1}`}
                              fill
                              className="object-contain object-left"
                            />
                          </div>
                        ))}
                      </div>
                    ) : caseStudy.clientLogo ? (
                      <div className="relative h-12 w-32 flex-shrink-0">
                        <Image
                          src={caseStudy.clientLogo}
                          alt="Client logo"
                          fill
                          className="object-contain object-left"
                        />
                      </div>
                    ) : null}
                    <div className="space-y-2 min-w-0 flex-1">
                      {caseStudy.clientStage && (
                        <span className="inline-block text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded bg-primary/10 text-primary border border-primary/20">
                          {caseStudy.clientStage}
                        </span>
                      )}
                      {caseStudy.clientDescription && (
                        <Typography variant="body-sm" className="text-muted-foreground">
                          {caseStudy.clientDescription}
                        </Typography>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Business Impact - one per line */}
              {caseStudy.businessImpact && caseStudy.businessImpact.length > 0 && (
                <div className="mb-6">
                  <Typography variant="body-sm" as="h3" className="font-semibold mb-3">Business Impact</Typography>
                  <ul className="space-y-2 pl-4">
                    {caseStudy.businessImpact.map((impact, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                        {impact}
                      </li>
                    ))}
                  </ul>
                </div>
              )}


              {/* Tech Stack + Skills Applied - two columns on same line */}
              {(caseStudy.techStack?.length || caseStudy.skillsApplied?.length) ? (
                <div className="grid gap-6 md:grid-cols-2 md:gap-8">
                  {caseStudy.techStack && caseStudy.techStack.length > 0 && (
                    <div>
                      <Typography variant="body-sm" as="h3" className="font-semibold mb-3">Tech Stack</Typography>
                      <div className="pl-4">
                        <TechStackLine items={caseStudy.techStack} />
                      </div>
                    </div>
                  )}
                  {caseStudy.skillsApplied && caseStudy.skillsApplied.length > 0 && (
                    <div>
                      <Typography variant="body-sm" as="h3" className="font-semibold mb-3">Skills Applied</Typography>
                      <ul className="space-y-2 pl-4">
                        {caseStudy.skillsApplied.map((skill) => (
                          <li key={skill} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : null}

              {/* Additional images at the end */}
              {caseStudy.additionalImages && caseStudy.additionalImages.length > 0 && (
                <div className="mt-8 pt-6 border-t border-border/50">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {caseStudy.additionalImages.map((src, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setLightboxImage(src)}
                        className="relative aspect-video rounded-lg overflow-hidden bg-muted/30 cursor-zoom-in hover:opacity-95 transition-opacity"
                      >
                        <Image
                          src={src}
                          alt={`${caseStudy.title} screenshot ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {!caseStudy.problem && !caseStudy.solution && !caseStudy.techStack?.length && !caseStudy.skillsApplied?.length && !caseStudy.businessImpact?.length && (
                <Card className="border-border/50 bg-muted/20">
                  <CardContent className="p-4">
                    <Typography variant="body-sm" className="text-muted-foreground text-center italic">
                      Full case study details coming soon. For now, this provides a quick overview of the project.
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    </>
  )
}
