"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export default function CoverLetterPerficientPage() {
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
          <p><strong>Subject:</strong> Workato Integration Architect – Perficient</p>

          <p>Dear Perficient Team,</p>

          <p>
            I&apos;m excited to apply for the Workato Integration Architect role. My work over the past decade has focused on designing and implementing integration architectures that connect fragmented enterprise systems into scalable, reliable, and observable workflows—the core of what this role requires.
          </p>

          <p>
            In my most recent work, I&apos;ve led the design of integration layers connecting CRM, contact center, marketing platforms, and internal systems across enterprise organizations. At Universal Windows Direct, I built a custom API-driven integration layer with shared logging and error handling, enabling consistent orchestration across systems and improving reliability and traceability across automation workflows. In consulting engagements, I&apos;ve partnered directly with executive and operational stakeholders to translate business requirements into production-ready architectures, owning the full lifecycle from discovery through deployment.
          </p>

          <p>
            My experience spans API-driven systems, event-based workflows, and automation across platforms like Zapier and complex SaaS ecosystems, with a strong focus on data mapping, orchestration, and system boundary design. I&apos;ve also completed Workato training and built recipes on the platform, giving me hands-on familiarity with its capabilities and patterns.
          </p>

          <p>
            Because my path into architecture began on the stakeholder side, I approach integration design with a strong focus on real-world system behavior. I prioritize clarity, observability, and failure handling—ensuring systems not only work, but can be trusted and extended as organizations scale. Silent systems are expensive systems.
          </p>

          <p>
            Perficient&apos;s focus on AI-first consulting and enterprise-scale integration is especially compelling. The opportunity to design intelligent automation systems and help organizations modernize their integration architecture is exactly the kind of work I&apos;m looking to deepen.
          </p>

          <p>
            I&apos;d welcome the opportunity to discuss how my background in integration architecture, API-driven systems, and AI-enabled automation can contribute to your team.
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
