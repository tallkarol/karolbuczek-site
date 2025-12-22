import type { Metadata } from "next"
import { Section } from "@/components/Section"
import { WhoIWorkBestWith } from "@/components/sections/WhoIWorkBestWith"
import { Philosophy } from "@/components/sections/Philosophy"
import { WhatImNot } from "@/components/sections/WhatImNot"
import { LookingFor } from "@/components/resume/LookingFor"
import { TechnicalSkills } from "@/components/sections/TechnicalSkills"

export const metadata: Metadata = {
  title: "About | Karol Buczek - How I Work & Who I Work Best With",
  description: "Learn how I approach engineering problems, who I collaborate best with, and my philosophy on building systems that solve real business challenges.",
  openGraph: {
    title: "About | Karol Buczek - How I Work & Who I Work Best With",
    description: "Learn how I approach engineering problems, who I collaborate best with, and my philosophy on building systems that solve real business challenges.",
    url: "https://karolbuczek.com/about",
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

export default function AboutPage() {
  return (
    <>
      <Section>
        <WhoIWorkBestWith />
      </Section>

      <Section>
        <Philosophy />
      </Section>

      <Section>
        <WhatImNot />
      </Section>

      <Section>
        <LookingFor />
      </Section>

      <Section>
        <TechnicalSkills />
      </Section>
    </>
  )
}

