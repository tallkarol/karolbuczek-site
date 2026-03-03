import type { Metadata } from "next"
import Link from "next/link"
import { Section } from "@/components/Section"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { AboutBattleTestedSection } from "@/components/sections/AboutBattleTestedSection"

export const metadata: Metadata = {
  title: "About | Karol Buczek — Solutions Architect",
  description: "From Marketing Director to Solutions Architect. I build systems where great strategy doesn't die in broken pipelines. Solutions Architect with owner-mindset and ROI fluency.",
  openGraph: {
    title: "About | Karol Buczek — Solutions Architect",
    description: "From Marketing Director to Solutions Architect. I build systems where great strategy doesn't die in broken pipelines.",
    url: "https://karolbuczek.com/about",
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

export default function AboutPage() {
  return (
    <>
      {/* 1. THE HOOK */}
      <Section className="lg:py-24">
        <div className="max-w-3xl space-y-6">
          <Typography variant="eyebrow" className="text-primary font-semibold uppercase tracking-wider">
            About
          </Typography>
          <Typography variant="h1" as="h1" className="max-w-2xl">
            Great marketing dies in broken systems.
          </Typography>
          <Typography variant="body" className="text-lg text-muted-foreground max-w-2xl">
            I learned that as a Marketing Director before I became an Architect. I was responsible for strategy, campaigns, and conversion — but the moment leads hit our systems, those systems hit their ceiling. Manual handoffs. Data gaps. Friction at every handoff. I realized the bottleneck wasn't creativity or budget. It was architecture.
          </Typography>
          <Typography variant="body" className="text-lg text-muted-foreground max-w-2xl">
            I evolved into the layer that makes marketing — and the business — possible. I've spent the last five years designing and building the systems that C-Suite and Marketing teams depend on. The translation layer. The integration layer. The layer that determines whether a great strategy actually lands.
          </Typography>
        </div>
      </Section>

      {/* 2. THE PHILOSOPHY */}
      <Section className="bg-muted/30">
        <div className="max-w-3xl space-y-8">
          <Typography variant="h2" as="h2">
            How I Approach Architecture
          </Typography>
          <div className="space-y-6">
            <Typography variant="body" className="text-lg">
              I build for <strong className="text-foreground">Observable Failure</strong>: systems where problems surface immediately instead of silently. When a pipeline fails, a lead drops, or data drifts — you know it. Idempotency, retries, and governance aren't theoretical. They're the difference between a weekend fire drill and a Monday morning status update.
            </Typography>
            <blockquote className="border-l-4 border-primary pl-6 py-2">
              <Typography variant="body" className="text-lg italic text-foreground">
                Silent systems are expensive systems.
              </Typography>
            </blockquote>
            <Typography variant="body" className="text-lg text-muted-foreground">
              I scope by <strong className="text-foreground">Business-Driven Outcomes</strong>. I don't start with tech choices. I start with what the business needs to measure, ship, or scale — then I map backwards to the architecture. That keeps scope tight, avoids gold-plating, and ensures ROI is baked into the design. Governance and scalability follow from the problem, not from a checklist.
            </Typography>
          </div>
        </div>
      </Section>

      {/* 3. THE BATTLE-TESTED IC */}
      <AboutBattleTestedSection />

      {/* 4. STANDARDIZING FOR SCALE */}
      <Section className="bg-muted/30">
        <div className="max-w-3xl space-y-8">
          <Typography variant="h2" as="h2">
            Standardizing for Scale
          </Typography>
          <div className="space-y-6">
            <Typography variant="body" className="text-lg">
              I've spent a decade solving integration, governance, and scalability problems in high-stakes environments. My current focus is translating those battle-tested solutions into the standardized frameworks of the major cloud providers.
            </Typography>
            <Typography variant="body" className="text-lg text-muted-foreground">
              Moving from custom-built middleware to AWS, Azure, and GCP isn't a pivot—it's an upgrade in tooling. These certifications (AZ-900, GCP-DL, and AWS SAA in progress) represent the formalization of my architectural patterns into enterprise-grade services. They are the building blocks I use to ensure my designs meet the rigorous demands of modern security reviews and architecture review boards. I'm not just learning the cloud; I'm optimizing my experience for the enterprise ecosystem.
            </Typography>
          </div>
        </div>
      </Section>

      {/* 5. THE CLOSING */}
      <Section className="lg:py-24">
        <div className="max-w-3xl space-y-8">
          <Typography variant="h2" as="h2">
            For Hiring Managers
          </Typography>
          <div className="space-y-6">
            <Typography variant="body" className="text-lg">
              If you're looking for a Solutions Architect who thinks like an owner — who understands ROI, speaks to Marketing and C-Suite stakeholders, and ships without hand-holding — I'm your candidate. I bring a unique trifecta to your team: the strategic lens of a Director, the tactical execution of an Engineer, and the systemic oversight of a Principal Architect.
            </Typography>
            <Typography variant="body" className="text-lg text-muted-foreground">
              I don't see a divide between "business goals" and "technical requirements." My background allows me to build with a dual perspective: engineering systems that are technically rigorous and strategically aligned. I build infrastructure that acts as a multiplier for business strategy.
            </Typography>
          </div>
          <div className="pt-6 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Get in Touch</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/resume">View Resume</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
