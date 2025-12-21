import type { Metadata } from "next"
import { Section } from "@/components/Section"
import { WhoIWorkBestWith } from "@/components/sections/WhoIWorkBestWith"
import { Philosophy } from "@/components/sections/Philosophy"
import { WhatImNot } from "@/components/sections/WhatImNot"
import { LookingFor } from "@/components/resume/LookingFor"

export const metadata: Metadata = {
  title: "About | Karol Buczek",
  description: "Learn about how I work, who I work best with, and what I'm not.",
  openGraph: {
    title: "About | Karol Buczek",
    description: "Learn about how I work, who I work best with, and what I'm not.",
    url: "https://karolbuczek.com/about",
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
    </>
  )
}

