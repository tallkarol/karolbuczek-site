import type { Metadata } from "next"
import { Section } from "@/components/Section"
import { PageHero } from "@/components/sections/PageHero"
import { CaseStudiesIllustration } from "@/components/illustrations"
import { CaseStudyGrid } from "@/components/sections/CaseStudyGrid"

export const metadata: Metadata = {
  title: "Case Studies | Karol Buczek - Real Problems & Measurable Solutions",
  description: "Case studies showcasing web systems engineering, MarTech automation, API integrations, and full-stack development projects with measurable business outcomes.",
  openGraph: {
    title: "Case Studies | Karol Buczek - Real Problems & Measurable Solutions",
    description: "Case studies showcasing web systems engineering, MarTech automation, API integrations, and full-stack development projects with measurable business outcomes.",
    url: "https://karolbuczek.com/case-studies",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Karol Buczek - Web Systems Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/logo.png"],
  },
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

