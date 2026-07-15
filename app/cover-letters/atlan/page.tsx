"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export default function CoverLetterAtlanPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && window.location.search.includes("print=true")) {
        window.print()
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="print-cover-letter min-h-screen bg-background text-foreground" style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "11pt", lineHeight: 1.5 }}>
      <div className="max-w-3xl mx-auto p-8 print:p-6 print:max-w-full">
        <Link href="/cover-letters" className="no-print mb-6 inline-block text-sm text-muted-foreground hover:text-primary transition-colors">
          ← Cover letters
        </Link>

        <div className="mb-8 print:mb-6 flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="Karol Buczek"
            width={48}
            height={48}
            className="flex-shrink-0 h-12 w-12 print:h-10 print:w-10 object-contain"
          />
          <div>
            <h1 className="text-xl font-bold print:text-lg text-foreground">Karol Buczek</h1>
            <p className="text-sm text-muted-foreground print:text-xs">Solutions Architect <span className="text-primary mx-1">|</span> Cloud Systems <span className="text-primary mx-1">|</span> Integrations <span className="text-primary mx-1">|</span> AI</p>
          </div>
        </div>

        <div className="space-y-6 text-foreground">
          <p><strong>Subject:</strong> Solutions Engineer / Implementation – Atlan</p>

          <p>Dear Atlan Team,</p>

          <p>
            I&apos;m excited to apply for a Solutions Engineering role at Atlan. Much of my work has focused on helping organizations make their data usable in practice—connecting fragmented systems, structuring data flows, and building the layers of context required for systems (and increasingly AI) to operate reliably.
          </p>

          <p>
            Over the past decade, I&apos;ve worked across integration architecture, data pipelines, and operational systems, partnering directly with stakeholders to translate ambiguous requirements into production-ready implementations. At Perfect Power Wash, I designed and implemented a centralized data infrastructure that unified marketing and operational data into a single reporting layer, giving leadership visibility into performance across multiple markets. In more recent work, I&apos;ve architected systems that connect CRM, analytics, and operational platforms, with a focus on clean data flow, observability, and long-term extensibility.
          </p>

          <p>
            My experience aligns closely with Atlan&apos;s mission: I&apos;ve spent much of my career working in environments where the biggest challenge isn&apos;t access to data—it&apos;s understanding it. Defining system boundaries, structuring data pipelines, and ensuring that downstream systems (and now AI workflows) operate on reliable, well-contextualized data has been a consistent focus of my work.
          </p>

          <p>
            From a technical perspective, I&apos;m comfortable designing and implementing ETL-style pipelines, API-driven integrations, and event-based workflows across modern cloud stacks. I&apos;ve also worked closely with teams to guide implementation—helping them navigate tradeoffs, identify risks early, and build patterns that scale across systems and use cases.
          </p>

          <p>
            Because my path into architecture began on the stakeholder side, I bring a strong focus on real-world usability. I prioritize systems that are not only technically sound, but understandable, observable, and aligned with how teams actually operate. Silent systems are expensive systems.
          </p>

          <p>
            What stands out about Atlan is the focus on context as a first-class layer—bridging the gap between raw data and meaningful, trusted usage across analytics and AI. That problem space is exactly where I&apos;ve been operating, and I&apos;m particularly interested in helping organizations implement systems where data, metadata, and workflows align into something teams can actually rely on.
          </p>

          <p>
            I&apos;d welcome the opportunity to discuss how my background in integration architecture, data systems, and customer-facing implementation can help Atlan&apos;s customers successfully adopt and scale the platform.
          </p>

          <p>
            Best regards,<br />
            Karol Buczek<br />
            <span className="text-muted-foreground text-sm">karol@karolbuczek.com · (216) 774-4283</span>
          </p>
        </div>
      </div>
    </div>
  )
}
