import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Section } from "@/components/Section"
import { Typography } from "@/components/typography"
import { allCaseStudies } from "@/lib/resume-data"
import type { CaseStudy } from "@/components/sections/CaseStudyCard"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Case Studies Overview | Karol Buczek - Copy Review",
  description: "All case study copy in one place for refinement and analysis.",
}

function CaseStudyContent({ cs }: { cs: CaseStudy }) {
  return (
    <article className="border-b border-border pb-12 mb-12 last:border-0 last:mb-0 last:pb-0">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xs font-mono text-muted-foreground bg-muted/60 px-2 py-1 rounded">
          {cs.slug}
        </span>
      </div>

      <Typography variant="h2" as="h2" className="text-2xl font-display mb-1">
        {cs.title}
      </Typography>
      {cs.subtitle && (
        <Typography variant="body" className="font-medium text-muted-foreground mb-2">
          {cs.subtitle}
        </Typography>
      )}
      <Typography variant="body" className="text-muted-foreground mb-4">
        {cs.summary}
      </Typography>

      <div className="flex flex-wrap gap-2 mb-6">
        {cs.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-ui font-semibold border border-primary/20"
          >
            {tag}
          </span>
        ))}
      </div>

      {cs.image && (
        <div className="relative aspect-video w-full max-w-2xl rounded-lg overflow-hidden bg-muted/30 mb-6">
          <Image src={cs.image} alt={cs.title} fill className="object-cover" />
        </div>
      )}

      {cs.clientDescription && (
        <div className="mb-6">
          <Typography variant="body-sm" as="h3" className="font-semibold mb-2">
            The Client
          </Typography>
          <Typography variant="body-sm" className="text-muted-foreground pl-4">
            {cs.clientDescription}
          </Typography>
        </div>
      )}

      {cs.problem && (
        <div className="mb-6">
          <Typography variant="body-sm" as="h3" className="font-semibold mb-2">
            The Problem
          </Typography>
          <Typography variant="body-sm" className="text-muted-foreground pl-4">
            {cs.problem}
          </Typography>
        </div>
      )}

      {cs.constraints && cs.constraints.length > 0 && (
        <div className="mb-6">
          <Typography variant="body-sm" as="h3" className="font-semibold mb-2">
            The Constraints
          </Typography>
          <ul className="pl-4 space-y-2">
            {cs.constraints.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}

      {cs.solution && (
        <div className="mb-6">
          <Typography variant="body-sm" as="h3" className="font-semibold mb-2">
            The Solution
          </Typography>
          <Typography variant="body-sm" className="text-muted-foreground pl-4">
            {cs.solution}
          </Typography>
        </div>
      )}

      {cs.businessImpact && cs.businessImpact.length > 0 && (
        <div className="mb-6">
          <Typography variant="body-sm" as="h3" className="font-semibold mb-2">
            Business Impact
          </Typography>
          <ul className="pl-4 space-y-2">
            {cs.businessImpact.map((impact, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                {impact}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        {cs.techStack && cs.techStack.length > 0 && (
          <div>
            <Typography variant="body-sm" as="h3" className="font-semibold mb-2">
              Tech Stack
            </Typography>
            <div className="flex flex-wrap gap-2 pl-4">
              {cs.techStack.map((t) => (
                <span
                  key={t}
                  className="inline-flex px-2.5 py-1 rounded-md bg-muted/60 text-muted-foreground text-xs"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
        {cs.skillsApplied && cs.skillsApplied.length > 0 && (
          <div>
            <Typography variant="body-sm" as="h3" className="font-semibold mb-2">
              Skills Applied
            </Typography>
            <ul className="pl-4 space-y-1">
              {cs.skillsApplied.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {cs.previewBusOutcome && (
        <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
          <Typography variant="body-sm" className="font-semibold text-primary">
            Preview outcome: {cs.previewBusOutcome}
          </Typography>
        </div>
      )}

      {cs.additionalImages && cs.additionalImages.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border/50">
          <Typography variant="body-sm" as="h3" className="font-semibold mb-3">
            Additional images
          </Typography>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {cs.additionalImages.map((src, i) => (
              <div
                key={i}
                className="relative aspect-video rounded-lg overflow-hidden bg-muted/30"
              >
                <Image src={src} alt={`${cs.title} ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}

export default function CaseStudiesOverviewPage() {
  return (
    <Section>
      <Link
        href="/case-studies"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to case studies
      </Link>

      <Typography variant="h1" as="h1" className="text-3xl font-display mb-2">
        Case Studies Overview
      </Typography>
      <Typography variant="body" className="text-muted-foreground mb-10">
        All copy in one place. Edit content in{" "}
        <code className="text-xs bg-muted px-1.5 py-0.5 rounded">lib/resume-data.ts</code> — it
        flows to this page, the modal, and cards.
      </Typography>

      <div className="space-y-0">
        {allCaseStudies.map((cs) => (
          <CaseStudyContent key={cs.slug} cs={cs} />
        ))}
      </div>
    </Section>
  )
}
