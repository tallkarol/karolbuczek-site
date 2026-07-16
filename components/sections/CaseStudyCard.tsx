"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export interface CaseStudy {
  slug: string
  title: string
  summary: string
  tags: string[]
  metric?: string
  /** Optional subtitle (e.g. "Customer Data Portal & Lifecycle Automation") */
  subtitle?: string
  /** Optional image path; falls back to placeholder when absent */
  image?: string
  /** How the card image should fit its frame (default: cover) */
  imageFit?: "cover" | "contain"
  /** Tech stack items for modal/detail view */
  techStack?: string[]
  /** Skills applied for modal/detail view */
  skillsApplied?: string[]
  /** Business impact bullets for modal/detail view */
  businessImpact?: string[]
  /** The problem this project addressed */
  problem?: string
  /** Architectural constraints and trade-offs that shaped the solution */
  constraints?: string[]
  /** The solution delivered */
  solution?: string
  /** Additional images shown at the end of the case study (e.g. screenshots, diagrams) */
  additionalImages?: string[]
  /** Client logo path (e.g. /uwd-logo.png) for "The Client" section */
  clientLogo?: string
  /** Multiple client logos for "The Client" section (e.g. Mineralife, Zemvelo, GDI) */
  clientLogos?: string[]
  /** Short description of the client/company */
  clientDescription?: string
  /** Company stage: startup, growth stage, or enterprise */
  clientStage?: "Startup" | "Growth stage" | "Enterprise"
  /** Single business outcome data point shown as a bullet on the card */
  previewBusOutcome?: string
}

const PLACEHOLDER_IMAGE = "/placeholder-image.png"

interface CaseStudyCardProps {
  caseStudy: CaseStudy
  index: number
  onClick?: () => void
  /** When "large", uses taller aspect ratio for the card image (case-studies page) */
  imageSize?: "default" | "large"
}

export function CaseStudyCard({ caseStudy, index, onClick, imageSize = "default" }: CaseStudyCardProps) {
  const imageSrc = caseStudy.image || PLACEHOLDER_IMAGE
  const imageAspect = imageSize === "large" ? "aspect-[16/7]" : "aspect-[16/5]"

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: Math.min(index, 4) * 0.08 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card
        className={`group relative flex h-full cursor-pointer flex-col overflow-hidden border-2 border-navy-700/12 bg-surface-card transition-all duration-300 hover:border-olive-700/40 dark:border-chiffon/12 dark:bg-navy-800 dark:hover:border-olive-700/50 ${onClick ? "cursor-pointer" : ""}`}
        onClick={onClick}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      >
        {/* Olive process marker */}
        <div className="absolute left-0 top-0 z-10 h-1 w-0 bg-olive-700 transition-all duration-300 group-hover:w-full" />

        {/* Image - prominent at top, pills overlay */}
        <div className={`relative ${imageAspect} w-full overflow-hidden bg-navy-900`}>
          <Image
            src={imageSrc}
            alt={caseStudy.title}
            fill
            className={`${caseStudy.imageFit === "contain" ? "object-contain p-6" : "object-cover"} transition-transform duration-300 group-hover:scale-105`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-navy-900/35 opacity-100 transition-opacity duration-300 group-hover:opacity-0" />
          <div className="absolute left-0 right-0 top-0 flex flex-wrap gap-1.5 p-2">
            {caseStudy.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded border border-olive-700/25 bg-chiffon/95 px-2 py-0.5 font-ui text-[10px] font-semibold text-olive-700 shadow-sm backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <CardHeader className="pb-2 pt-4">
          <CardTitle className="mb-0.5 font-display text-lg font-semibold leading-tight transition-colors group-hover:text-navy-700 dark:group-hover:text-chiffon">
            {caseStudy.title}
          </CardTitle>
          {caseStudy.subtitle && (
            <p className="text-xs font-medium uppercase tracking-wide text-slate-ink dark:text-chiffon/70">
              {caseStudy.subtitle}
            </p>
          )}
        </CardHeader>

        <CardContent className="flex-1 pt-0">
          <p className="text-sm leading-snug text-muted-foreground">
            {caseStudy.summary}
          </p>
          {caseStudy.previewBusOutcome && (
            <div className="mt-2 flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-olive-700" />
              <p className="text-sm leading-snug text-muted-foreground">
                {caseStudy.previewBusOutcome}
              </p>
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-2">
          {onClick ? (
            <span className="inline-flex h-9 w-full items-center justify-center border border-navy-700/25 px-4 font-ui text-[13px] font-semibold transition-colors group-hover:border-olive-700/50 group-hover:bg-olive-700/5 dark:border-chiffon/25">
              View case study
              <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </span>
          ) : (
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link href={`/portfolio?cs=${caseStudy.slug}`}>
                View case study
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}

