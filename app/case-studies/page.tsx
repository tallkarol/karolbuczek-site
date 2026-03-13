import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { Section } from "@/components/Section"
import { PageHero } from "@/components/sections/PageHero"
import { CaseStudiesIllustration } from "@/components/illustrations"
import { CaseStudyGrid } from "@/components/sections/CaseStudyGrid"
import { FileText } from "lucide-react"

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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <PageHero
            eyebrow="Case Studies"
            title="Real problems. Real constraints. Real outcomes."
            description="Each study represents a unique business challenge, the reality it was built in, and the measurable impact it delivered."
            illustration={<CaseStudiesIllustration />}
          />
          <Link
            href="/case-studies/overview"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground shrink-0"
          >
            <FileText className="h-4 w-4" />
            Copy overview
          </Link>
        </div>
      </Section>

      <Section>
        <Suspense fallback={<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 h-48" />}>
          <CaseStudyGrid imageSize="large" />
        </Suspense>
      </Section>
    </>
  )
}

