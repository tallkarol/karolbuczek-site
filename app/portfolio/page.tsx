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
      <div className="kb-hero-inverse">
        <Section className="py-8 lg:py-16">
          <PageHero
            className="lg:min-h-[320px]"
            eyebrow="Portfolio"
            title={
              <Typography variant="h1" as="h1" className="text-ink dark:text-text-inverse">
                Real problems.
                <br />
                Real constraints.
                <br />
                Real outcomes.
              </Typography>
            }
            description="Each study represents a unique business challenge, the reality it was built in, and the measurable impact it delivered."
            illustration={<CaseStudiesIllustration priority />}
            illustrationClassName="max-w-[275px] aspect-[427/719] md:max-w-[350px]"
            columnGapClassName="gap-3 md:gap-4"
          />
        </Section>
      </div>

      <section className="kb-section-background w-full">
        <div className="kb-content-rail py-12 lg:py-16">
          <Suspense fallback={<div className="grid h-48 gap-6 md:grid-cols-2 lg:grid-cols-3" />}>
            <CaseStudyGrid imageSize="large" />
          </Suspense>
        </div>
      </section>

      <section className="w-full bg-background-elevated dark:bg-navy-900">
        <div className="kb-content-rail py-12 lg:py-16">
          <WebsiteBuilds />
        </div>
      </section>

      <section className="kb-section-inverse w-full pb-0">
        <div className="kb-content-rail py-12 lg:py-16">
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
