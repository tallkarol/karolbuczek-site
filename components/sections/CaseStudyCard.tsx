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
  /** Tech stack items for modal/detail view */
  techStack?: string[]
  /** Skills applied for modal/detail view */
  skillsApplied?: string[]
  /** Business impact bullets for modal/detail view */
  businessImpact?: string[]
  /** The problem this project addressed */
  problem?: string
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card
        className={`group h-full flex flex-col hover:shadow-xl transition-all duration-300 border-2 border-border/50 hover:border-primary/40 relative overflow-hidden ${onClick ? "cursor-pointer" : ""}`}
        onClick={onClick}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      >
        {/* Accent line - full width on hover */}
        <div className="absolute top-0 left-0 h-1 w-0 bg-primary group-hover:w-full transition-all duration-300 z-10" />

        {/* Image - prominent at top, pills overlay */}
        <div className={`relative ${imageAspect} w-full overflow-hidden bg-muted/30`}>
          <Image
            src={imageSrc}
            alt={caseStudy.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-primary opacity-[0.3] group-hover:opacity-0 transition-opacity duration-300" />
          {/* Tags over photo - top */}
          <div className="absolute top-0 left-0 right-0 p-2 flex flex-wrap gap-1.5">
            {caseStudy.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded bg-card/90 backdrop-blur-sm text-primary font-ui font-semibold border border-primary/20 shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-lg font-display font-semibold leading-tight mb-0.5 group-hover:text-primary transition-colors">
            {caseStudy.title}
          </CardTitle>
          {caseStudy.subtitle && (
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {caseStudy.subtitle}
            </p>
          )}
        </CardHeader>

        <CardContent className="flex-1 pt-0">
          <p className="text-sm text-muted-foreground leading-snug">
            {caseStudy.summary}
          </p>
          {caseStudy.previewBusOutcome && (
            <div className="mt-2 flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
              <p className="text-sm text-muted-foreground leading-snug">
                {caseStudy.previewBusOutcome}
              </p>
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-2">
          {onClick ? (
            <span className="inline-flex items-center justify-center w-full rounded-full border-2 border-border/50 font-ui text-sm py-2 px-4 group-hover:border-primary group-hover:bg-primary/5 transition-colors">
              View case study
              <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </span>
          ) : (
            <Button asChild variant="outline" size="sm" className="w-full rounded-full border-2 border-border/50 font-ui hover:border-primary hover:bg-primary/5 transition-colors">
              <Link href={`/case-studies/${caseStudy.slug}`}>
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

