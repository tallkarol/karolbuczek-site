"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Typography } from "@/components/typography"
import { Card, CardContent } from "@/components/ui/card"
import type { CaseStudy } from "@/components/sections/CaseStudyCard"

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null
  isOpen: boolean
  onClose: () => void
}

export function CaseStudyModal({ caseStudy, isOpen, onClose }: CaseStudyModalProps) {
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

  if (!isOpen || !caseStudy) return null

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
            className="relative w-full max-w-2xl max-h-[90vh] bg-card border border-border/50 rounded-lg shadow-lg overflow-hidden flex flex-col"
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
              <div className="mb-6 pr-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {caseStudy.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-muted/50 text-muted-foreground font-ui font-medium border border-border/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Typography variant="h2" as="h2" className="text-2xl font-display mb-2">
                  {caseStudy.title}
                </Typography>
                <Typography variant="body-sm" className="text-muted-foreground">
                  {caseStudy.summary}
                </Typography>
                {caseStudy.metric && (
                  <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <Typography variant="body-sm" className="font-semibold text-primary">
                      {caseStudy.metric}
                    </Typography>
                  </div>
                )}
              </div>

              {/* Additional content can be added here when case study detail pages are created */}
              <Card className="border-border/50 bg-muted/20">
                <CardContent className="p-4">
                  <Typography variant="body-sm" className="text-muted-foreground text-center italic">
                    Full case study details coming soon. For now, this provides a quick overview of the project.
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
