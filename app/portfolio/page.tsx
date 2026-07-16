import type { Metadata } from "next"
import { Suspense } from "react"
import { Section } from "@/components/Section"
import { PageHero } from "@/components/sections/PageHero"
import { CaseStudiesIllustration } from "@/components/illustrations"
import { CaseStudyGrid } from "@/components/sections/CaseStudyGrid"
import { WebsiteBuilds } from "@/components/sections/WebsiteBuilds"
import { CTASection } from "@/components/sections/CTASection"
import { Typography } from "@/components/typography"

export const metadata: Metadata = {
  title: "Portfolio | Karol Buczek - Real Problems & Measurable Solutions",
  description: "Portfolio showcasing solutions architecture, MarTech automation, API integrations, and full-stack development projects with measurable business outcomes.",
  openGraph: {
    title: "Portfolio | Karol Buczek - Real Problems & Measurable Solutions",
    description: "Portfolio showcasing solutions architecture, MarTech automation, API integrations, and full-stack development projects with measurable business outcomes.",
    url: "https://karolbuczek.com/portfolio",
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

export default function PortfolioPage() {
  return (
    <>
      <Section>
        <PageHero
          eyebrow="Portfolio"
          title={
            <Typography variant="h1" as="h1">
              Real problems.
              <br />
              Real constraints.
              <br />
              Real outcomes.
            </Typography>
          }
          description="Each study represents a unique business challenge, the reality it was built in, and the measurable impact it delivered."
          illustration={<CaseStudiesIllustration />}
        />
      </Section>

      <Section>
        <Suspense fallback={<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 h-48" />}>
          <CaseStudyGrid imageSize="large" />
        </Suspense>
      </Section>

      <section className="w-full bg-muted/40">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-6 lg:px-8 lg:py-16">
          <WebsiteBuilds />
        </div>
      </section>

      <section className="w-full bg-primary pb-0 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-6 lg:px-8 lg:py-16">
          <CTASection
            fullWidth
            heading="Want to talk about a role or a project?"
            description="Let's connect."
          />
        </div>
      </section>
    </>
  )
}
