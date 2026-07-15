import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Section } from "@/components/Section"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { AboutTheWorkSection } from "@/components/sections/AboutTheWorkSection"

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
      {/* Hero */}
      <Section className="lg:py-24">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch lg:items-center justify-between">
          <div className="max-w-3xl space-y-6 flex-1 min-w-0">
            <Typography variant="eyebrow" className="text-primary font-semibold uppercase tracking-wider">
              About
            </Typography>
            <Typography variant="h1" as="h1" className="max-w-2xl">
              I didn&apos;t pivot into engineering. I came back to it.
            </Typography>
            <Typography variant="body" className="text-lg text-muted-foreground max-w-2xl">
              I wrote my first code at twelve and never stopped — freelance sites and web apps through college, then alongside every job I&apos;ve held since. But the career that found me was marketing, and eventually I was a Marketing Director responsible for leads and conversion across four markets.
            </Typography>
            <Typography variant="body" className="text-lg text-muted-foreground max-w-2xl">
              That seat taught me the lesson that shapes everything I build: strategy is only as good as the pipelines underneath it. The moment a lead hit our systems, manual handoffs and data gaps started eating the results. The bottleneck wasn&apos;t creativity — it was the plumbing. And I was the only one in the room who could fix it.
            </Typography>
            <Typography variant="body" className="text-lg text-muted-foreground max-w-2xl">
              So I went back to building full-time. For the last seven years I&apos;ve shipped the integration and application layers that marketing, operations, and leadership teams actually run on — first as an employee, now as an independent consultant with retained clients.
            </Typography>
          </div>
          <div className="flex flex-1 items-center justify-center min-h-[200px] lg:min-h-[320px] lg:min-w-[320px]">
            <div className="relative w-full max-w-[280px] h-[200px] sm:max-w-[360px] sm:h-[260px] lg:max-w-[420px] lg:h-[320px]">
              <Image
                src="/logo.png"
                alt="Karol Buczek"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* How I Work */}
      <Section className="bg-muted/30">
        <div className="max-w-3xl space-y-8">
          <Typography variant="h2" as="h2">
            How I Work
          </Typography>
          <div className="space-y-6">
            <Typography variant="body" className="text-lg">
              I build for observable failure: systems where problems surface immediately instead of silently. When a pipeline fails, a lead drops, or data drifts — you know. Idempotency, retries, and logging aren&apos;t theory to me; they&apos;re the difference between a weekend fire drill and a Monday morning status update.
            </Typography>
            <blockquote className="border-l-4 border-primary pl-6 py-2">
              <Typography variant="body" className="text-lg italic text-foreground">
                Silent systems are expensive systems.
              </Typography>
            </blockquote>
            <Typography variant="body" className="text-lg text-muted-foreground">
              And I scope from the business backwards. I don&apos;t start with tech choices — I start with what the business needs to measure, ship, or fix, then map back to the smallest architecture that does it. I&apos;ve sat on the buying side of these decisions, and it permanently changed how I make them: tight scope, no gold-plating, and a bias for boring technology that keeps working.
            </Typography>
          </div>
        </div>
      </Section>

      {/* The Work */}
      <AboutTheWorkSection />

      {/* The Arc */}
      <Section className="bg-muted/30">
        <div className="max-w-3xl space-y-8">
          <Typography variant="h2" as="h2">
            The Arc
          </Typography>
          <div className="space-y-6">
            <Typography variant="body" className="text-lg">
              The decade of freelance work and startups came to a head in 2019, when Perfect Power Wash recruited me to modernize their web and data infrastructure — then promoted me to Marketing Director, where I owned both the strategy and the technology stack through an expansion from one market to four. I built their first data warehouse, wrote their internal tooling, and eventually hired and trained a developer to take the systems further than I could alone.
            </Typography>

            {/* Christopher Jarvis testimonial — FeaturedQuote visual style, static */}
            <div className="relative max-w-3xl">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-8 -left-2 md:-left-10 select-none font-serif text-[7rem] md:text-[9rem] leading-none text-primary/10"
              >
                &ldquo;
              </div>
              <div className="relative rounded-lg border border-border/50 bg-muted/20 px-6 py-10 md:px-14 md:py-12 overflow-hidden">
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0" />
                <blockquote>
                  <p className="font-display text-xl leading-snug tracking-tight text-foreground sm:text-2xl md:text-[1.75rem] md:leading-[2.35rem]">
                    &ldquo;I highly recommend Karol for any role that requires technical expertise paired with a strong business mindset.&rdquo;
                  </p>
                </blockquote>
                <div className="mt-6 flex flex-col items-center gap-1 text-center">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-primary/40" />
                    <Typography variant="body-sm" className="font-semibold text-foreground">
                      Christopher Jarvis
                    </Typography>
                    <span className="h-px w-8 bg-primary/40" />
                  </div>
                  <Typography variant="body-sm" className="text-muted-foreground">
                    VP of Enterprise Digital Marketing, Great Day Improvements — Direct Manager
                  </Typography>
                </div>
                <div className="mt-3 flex items-center justify-center">
                  <div className="relative h-8 w-20 opacity-70">
                    <Image
                      src="/gdi-logo.svg"
                      alt="Great Day Improvements"
                      fill
                      className="object-contain"
                      sizes="80px"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Typography variant="body" className="text-lg text-muted-foreground">
              In 2021 I went fully technical as an Integration Engineer at Universal Windows Direct. In 2023 I went independent. Two years later, Great Day Improvements — UWD&apos;s parent company — brought me back as a retained contractor. My former employer became my client, and they&apos;re still one today.
            </Typography>
            <Typography variant="body" className="text-lg text-muted-foreground">
              That&apos;s the part of consulting I&apos;m proudest of: the people who&apos;ve seen my work up close keep hiring me.
            </Typography>
          </div>
        </div>
      </Section>

      {/* What I'm Looking For */}
      <Section className="lg:py-24 bg-primary/10">
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-lg border border-primary/20 bg-background/60 px-6 py-12 text-center shadow-sm sm:px-10 md:px-14 md:py-16 space-y-8">
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0" />
          <Typography variant="h2" as="h2">
            What I&apos;m Looking For
          </Typography>
          <div className="space-y-5">
            <Typography variant="body" className="text-lg text-muted-foreground">
              Here&apos;s the transparent version. I like the building more than the selling. Consulting taught me discovery, scoping, and how to run a client relationship end to end — but the hours I want to fill are the engineering hours: integrations, cloud applications, data pipelines, enterprise WordPress.
            </Typography>
            <Typography variant="body" className="text-lg text-muted-foreground">
              So I&apos;m looking for a full-time integration, implementation, or solutions role where that end-to-end range is useful — somewhere I can run discovery with a stakeholder in the morning and ship the fix in the afternoon. I&apos;m keeping a small number of retained clients, and I&apos;m open to select consulting engagements in the meantime.
            </Typography>
            <Typography variant="body" className="text-lg font-medium text-foreground">
              If that sounds like your team, let&apos;s talk.
            </Typography>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/contact">Get in Touch</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-border/50 hover:border-primary">
              <Link href="/resume">View Resume</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
