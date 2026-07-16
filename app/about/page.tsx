import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { AboutHero } from "@/components/about/AboutHero"
import { AboutArc } from "@/components/about/AboutArc"
import { AboutPrinciples } from "@/components/about/AboutPrinciples"
import { AboutWork } from "@/components/about/AboutWork"
import { BrandTrustBar } from "@/components/sections/BrandTrustBar"

const aboutTitle = "About | Karol Buczek — Full-Stack Engineer & Solutions Architect"
const aboutDescription =
  "Former Marketing Director turned engineer. Custom web applications, enterprise WordPress, and systems integration — the career arc, the working philosophy, and what I'm looking for."

export const metadata: Metadata = {
  title: aboutTitle,
  description: aboutDescription,
  openGraph: {
    title: aboutTitle,
    description: aboutDescription,
    url: "https://karolbuczek.com/about",
    images: [
      {
        url: "/logo-square.png",
        width: 512,
        height: 512,
        alt: "Karol Buczek — Full-Stack Engineer & Solutions Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: aboutTitle,
    description: aboutDescription,
    images: ["/logo-square.png"],
  },
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      <AboutArc />

      <AboutPrinciples />

      <BrandTrustBar />

      <AboutWork />

      {/* What I'm Looking For */}
      <section className="w-full bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-6 lg:px-8 lg:py-32">
          <div className="relative max-w-3xl space-y-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-8 -left-2 select-none font-serif text-[9rem] leading-none text-background/10 md:-top-12 md:-left-4 md:text-[12rem]"
            >
              &ldquo;
            </div>

            <div className="relative space-y-4">
              <Typography
                variant="eyebrow"
                className="font-semibold uppercase tracking-wider text-primary"
              >
                Next chapter
              </Typography>
              <Typography variant="h2" as="h2" className="text-background">
                What I&apos;m Looking For
              </Typography>
            </div>

            <div className="relative space-y-5">
              <Typography variant="body" className="text-lg text-background/75">
                Full transparency? I like the building more than the selling — that&apos;s why I&apos;m open to full-time roles that present a good fit, alongside the right consulting and project opportunities.
              </Typography>
              <Typography variant="body" className="text-lg text-background/75">
                The hours I want to fill are the engineering hours: integrations, cloud applications, data pipelines, enterprise WordPress. If you need someone who&apos;s quick to understand business objectives and reliable at turning them into working systems, that&apos;s the job I want.
              </Typography>
            </div>

            <div className="relative space-y-6 border-t border-background/15 pt-10">
              <Typography
                variant="body"
                className="font-display text-xl font-semibold tracking-tight text-background md:text-2xl"
              >
                If that sounds like your team, let&apos;s talk.
              </Typography>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  className="rounded-full bg-primary px-7 py-2.5 text-sm font-semibold font-ui text-primary-foreground hover:bg-primary/90"
                >
                  <Link href="/contact">
                    Get in Touch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-background/35 bg-transparent px-7 py-2.5 text-sm font-ui text-background hover:bg-background/10 hover:text-background"
                >
                  <Link href="/resume">View Resume</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
