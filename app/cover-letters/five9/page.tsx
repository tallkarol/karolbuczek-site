"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export default function CoverLetterFive9Page() {
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
        {/* Back link - hidden when printing */}
        <Link href="/cover-letters" className="no-print mb-6 inline-block text-sm text-muted-foreground hover:text-primary transition-colors">
          ← Cover letters
        </Link>

        {/* Header */}
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
          <p><strong>Subject:</strong> Automation Engineer – Professional Services – Five9</p>

          <p>Dear Five9 Team,</p>

          <p>
            I&apos;m excited to apply for the Automation Engineer – Professional Services role. I&apos;ve worked with Five9 at the enterprise level for three large multi-market home services organizations, designing automation and API integrations connecting the contact center with CRM, marketing platforms, and internal systems. Much of my recent work aligns closely with the integration and customer-facing architecture described in the posting.
          </p>

          <p>
            Because my path into architecture began on the stakeholder side—as a marketing director responsible for revenue systems—I&apos;m particularly comfortable working with cross-functional teams and enterprise customers. I focus on helping teams understand their options clearly, especially when it comes to where platform capabilities are the right fit and where thoughtful customization or integration makes more sense.
          </p>

          <p>
            From a technical perspective, my work spans modern API integrations (REST, JSON), cloud platforms, and complex SaaS ecosystems across CRM, marketing automation, and contact center systems. I use AI tools daily to support both my own workflows and client projects, including building agentic automation systems and a localized meeting transcription and action-extraction tool using machine learning libraries and air-gapped inference to maintain strict data privacy.
          </p>

          <p>
            Five9&apos;s work in AI-powered contact center platforms is compelling because it sits at the center of a complex ecosystem of communication systems, integrations, and customer data—the type of systems challenge I enjoy working on.
          </p>

          <p>
            I&apos;d welcome the opportunity to discuss how my experience in integration architecture, cloud systems, and enterprise platform delivery could support Five9&apos;s customers and professional services team.
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
