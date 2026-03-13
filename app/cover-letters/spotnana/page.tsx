"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export default function CoverLetterSpotnanaPage() {
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
          <p><strong>Subject:</strong> Solutions Architect – Spotnana</p>

          <p>Dear Spotnana Team,</p>

          <p>
            I&apos;m excited to apply for the Solutions Architect role. My career has been focused on designing and deploying the kinds of interconnected systems your platform enables—bringing together APIs, SaaS platforms, data pipelines, and operational workflows to solve real business problems.
          </p>

          <p>
            Over the past decade I&apos;ve worked at the intersection of engineering and business operations, leading architecture and implementation for cloud systems, integration layers, and data infrastructure across marketing, sales, and operational platforms. Much of my work has involved exactly what this role requires: analyzing fragmented systems, designing scalable solutions across APIs and third-party platforms, and guiding organizations from technical discovery through deployment and optimization.
          </p>

          <p>
            Because my path into architecture began on the stakeholder side—as a marketing director responsible for revenue systems—I approach solutions with a strong focus on real-world adoption. I&apos;m comfortable working directly with enterprise customers, translating technical constraints into business decisions, and helping teams implement systems that remain flexible as organizations grow.
          </p>

          <p>
            Spotnana&apos;s mission to modernize the infrastructure of travel is particularly compelling because it sits at the center of a complex ecosystem of platforms, partners, and data flows—the kind of systems challenge I enjoy solving.
          </p>

          <p>
            I&apos;d welcome the opportunity to discuss how my background in integration architecture, cloud systems, and enterprise platform delivery could support Spotnana&apos;s customers and partners.
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
