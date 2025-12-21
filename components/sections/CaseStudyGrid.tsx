"use client"

import { Typography } from "@/components/typography"
import { CaseStudyCard } from "./CaseStudyCard"
import { allCaseStudies } from "@/lib/resume-data"

export function CaseStudyGrid() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Typography variant="h2" as="h2">Featured Case Studies</Typography>
        <Typography variant="body" className="text-muted-foreground">
          Real-world constraints, practical engineering, measurable outcomes.
        </Typography>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allCaseStudies.map((caseStudy, index) => (
          <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} index={index} />
        ))}
      </div>
    </div>
  )
}
