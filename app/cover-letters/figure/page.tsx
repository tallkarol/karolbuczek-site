"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export default function CoverLetterFigurePage() {
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
          <p><strong>Subject:</strong> Solutions Engineer – Figure</p>

          <p>Dear Figure Team,</p>

          <p>
            I&apos;m excited to apply for the Solutions Engineer role. My work has centered on designing and delivering API-driven integration architectures that connect complex systems into reliable, scalable workflows—particularly in environments where onboarding speed, data integrity, and real-world operational constraints matter.
          </p>

          <p>
            In my recent work, I&apos;ve led technical discovery and solution design across CRM, contact center, marketing, and internal platforms, working directly with stakeholders to translate business requirements into production-ready integrations. At Universal Windows Direct, I built a custom API-driven integration layer connecting multiple systems with shared logging and error handling, enabling consistent orchestration and visibility across workflows. In consulting engagements, I regularly partner with executive and engineering teams to design end-to-end system architectures, define integration patterns, and guide implementations from initial discovery through early production.
          </p>

          <p>
            Much of my work aligns closely with this role: designing REST-based integrations, structuring webhook-driven workflows, handling data mapping and transformation, and ensuring systems are observable and resilient under real usage. I&apos;m comfortable guiding partners through implementation details—authentication flows, edge cases, and system constraints—while also helping them understand tradeoffs and long-term scalability considerations.
          </p>

          <p>
            Because my path into architecture began on the stakeholder side, I focus heavily on how systems behave in production. I prioritize clarity in integration design, proactive identification of failure points, and building patterns that can be reused and extended across partners. Silent systems are expensive systems.
          </p>

          <p>
            What stands out to me about Figure is the combination of blockchain infrastructure and real-world financial products at scale. The challenge of helping partners integrate into a system that spans APIs, identity, and capital markets workflows is exactly the kind of problem space I enjoy—where strong architecture directly impacts speed, reliability, and business outcomes.
          </p>

          <p>
            I&apos;d welcome the opportunity to discuss how my experience in integration architecture, partner-facing solution design, and API-driven systems can help accelerate onboarding and scale Figure&apos;s partner ecosystem.
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
