import type { Metadata } from "next"
import { Suspense } from "react"
import { Section } from "@/components/Section"
import { PageHero } from "@/components/sections/PageHero"
import { CaseStudiesIllustration } from "@/components/illustrations"
import { CaseStudyGrid } from "@/components/sections/CaseStudyGrid"

export const metadata: Metadata = {
  title: "Case Studies | Karol Buczek - Real Problems & Measurable Solutions",
  description: "Case studies showcasing solutions architecture, MarTech automation, API integrations, and full-stack development projects with measurable business outcomes.",
  openGraph: {
    title: "Case Studies | Karol Buczek - Real Problems & Measurable Solutions",
    description: "Case studies showcasing solutions architecture, MarTech automation, API integrations, and full-stack development projects with measurable business outcomes.",
    url: "https://karolbuczek.com/case-studies",
    images: [
      {
        url: "/logo-square.png",
        width: 512,
        height: 512,
        alt: "Karol Buczek - Solutions Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/logo-square.png"],
  },
}

export default function CaseStudiesPage() {
  return (
    <>
      <Section>
        <PageHero
          eyebrow="Case Studies"
          title="Real problems. Real constraints. Real outcomes."
          description="Each study represents a unique business challenge, the reality it was built in, and the measurable impact it delivered."
          illustration={<CaseStudiesIllustration />}
        />
      </Section>

      <Section>
        <Suspense fallback={<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 h-48" />}>
          <CaseStudyGrid imageSize="large" />
        </Suspense>
      </Section>
    </>
  )
}

