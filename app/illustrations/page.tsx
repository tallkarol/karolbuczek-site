"use client"

import { Section } from "@/components/Section"
import { PageHero } from "@/components/sections/PageHero"
import { Typography } from "@/components/typography"
import {
  CodeToSystem,
  BuildOperateConnect,
  WordPressFlow,
  BrokenCode,
  SystemNodes,
  CodeFlow,
  ResumeTimeline,
  ResumeIllustration,
  CaseStudiesIllustration,
  ContactIllustration,
} from "@/components/illustrations"

const illustrations = [
  {
    name: "Resume Illustration",
    component: ResumeIllustration,
    description: "Document with sections and timeline elements representing an interactive resume",
  },
  {
    name: "Case Studies Illustration",
    component: CaseStudiesIllustration,
    description: "Grid of project cards showing multiple case studies",
  },
  {
    name: "Contact Illustration",
    component: ContactIllustration,
    description: "Form submission transforming into successful connection",
  },
  {
    name: "Code to System",
    component: CodeToSystem,
    description: "Code transforming into a system",
  },
  {
    name: "Build Operate Connect",
    component: BuildOperateConnect,
    description: "Three connected nodes representing build, operate, and connect",
  },
  {
    name: "WordPress Flow",
    component: WordPressFlow,
    description: "WordPress block transforming into frontend output",
  },
  {
    name: "Broken Code",
    component: BrokenCode,
    description: "Animated code snippet with errors",
  },
  {
    name: "System Nodes",
    component: SystemNodes,
    description: "Central node with orbiting nodes and connection lines",
  },
  {
    name: "Code Flow",
    component: CodeFlow,
    description: "Animated code lines flowing",
  },
  {
    name: "Resume Timeline",
    component: ResumeTimeline,
    description: "Animated timeline with nodes representing career progression",
  },
]

export default function IllustrationsGalleryPage() {
  return (
    <>
      <Section>
        <PageHero
          eyebrow="Illustration Gallery"
          title="CSS Graphic Illustrations"
          description="A collection of animated illustrations used throughout the site."
        />
      </Section>

      <Section>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-2">
          {illustrations.map((illustration, index) => {
            const IllustrationComponent = illustration.component
            return (
              <div
                key={index}
                className="group space-y-4"
              >
                {/* Illustration container */}
                <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl border border-border/50 bg-[hsl(var(--paper))] dark:bg-[hsl(var(--paper))]/80 p-8 transition-all hover:border-primary/30 hover:shadow-lg">
                  <IllustrationComponent className="h-full w-full" />
                </div>

                {/* Illustration info */}
                <div className="space-y-2">
                  <Typography variant="h3" as="h3" className="font-semibold">
                    {illustration.name}
                  </Typography>
                  <Typography variant="body-sm" className="text-muted-foreground">
                    {illustration.description}
                  </Typography>
                </div>
              </div>
            )
          })}
        </div>
      </Section>
    </>
  )
}

