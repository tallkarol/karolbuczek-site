"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export default function CoverLetterCoinbasePage() {
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
          <p><strong>Subject:</strong> Solutions Architect – Coinbase</p>

          <p>Dear Coinbase Team,</p>

          <p>
            I&apos;m applying for the Solutions Architect role because the work described — partnering directly with customers, solving ambiguous technical problems, and extending platforms through real implementation — is exactly where I operate best.
          </p>

          <p>
            My path into architecture is somewhat unconventional. I began on the stakeholder side of the table in marketing leadership roles, responsible for revenue outcomes and operational performance. That experience fundamentally shaped how I approach systems today. I design architecture not in isolation, but around the operational realities of the people who depend on it.
          </p>

          <p>
            Over the past decade I&apos;ve worked across full-stack development, systems integration, and cloud architecture, building platforms that connect fragmented tools and data into coherent systems. Through my consulting practice and prior engineering roles, I&apos;ve architected secure serverless infrastructure, designed integration layers connecting CRM, analytics, and operational platforms, and built internal tools that replace manual workflows with reliable software systems.
          </p>

          <p>
            The thread through all of that work is translation: understanding the real problem behind a system request, defining the boundaries of the solution, and then building the architecture that makes it work in production.
          </p>

          <p>
            That skill set maps closely to the role Coinbase describes. I&apos;m comfortable operating at the intersection of customer engagement and engineering — gathering requirements, proposing architectures, prototyping solutions, and working through the inevitable implementation friction with both technical and non-technical stakeholders. Many of the systems I&apos;ve built required integrating modern APIs with legacy infrastructure, designing observability into distributed workflows, and iterating quickly with customers as real-world constraints emerged.
          </p>

          <p>
            I&apos;m also deeply interested in the broader shift toward programmable financial infrastructure. The move toward open APIs, programmable settlement layers, and verifiable systems mirrors many of the architectural principles I&apos;ve focused on throughout my career: composability, transparency, and systems that are observable rather than opaque.
          </p>

          <p>
            Coinbase&apos;s mission to increase economic freedom by building the onchain platform for global finance is ambitious, and the problems involved are inherently complex. That&apos;s exactly the kind of environment where I do my best work.
          </p>

          <p>
            I&apos;d welcome the opportunity to contribute as a Solutions Architect helping customers successfully build on Coinbase&apos;s platform.
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
