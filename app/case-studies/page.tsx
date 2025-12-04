import type { Metadata } from "next"
import { Section } from "@/components/Section"
import { PageHero } from "@/components/sections/PageHero"
import { CaseStudiesIllustration } from "@/components/illustrations"
import { CaseStudyGrid } from "@/components/sections/CaseStudyGrid"

export const metadata: Metadata = {
  title: "Case Studies | Karol Buczek",
  description: "Real problems, constraints, solutions, and measurable outcomes from my work.",
}

export default function CaseStudiesPage() {
  return (
    <>
      <Section>
        <PageHero
          eyebrow="Case Studies"
          title="Real problems, constraints, solutions, and measurable outcomes"
          description="Each case study represents a real business challenge, the constraints I worked within, the solution I built, and the measurable impact it delivered."
          illustration={<CaseStudiesIllustration />}
        />
      </Section>

      <Section>
        <CaseStudyGrid />
      </Section>
    </>
  )
}

