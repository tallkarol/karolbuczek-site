"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export default function CoverLetterIManagePage() {
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
          <p><strong>Subject:</strong> Solutions Engineer – iManage</p>

          <p>Dear iManage Team,</p>

          <p>
            I&apos;m excited to apply for the Solutions Engineer role. Much of my work over the past decade has focused on helping organizations evaluate and adopt complex SaaS platforms by translating operational requirements into scalable solution architectures and integration strategies.
          </p>

          <p>
            In my consulting work and previous roles, I regularly lead discovery sessions with business, product, and technical stakeholders to understand how systems interact across an organization&apos;s platform ecosystem. From there I design integration approaches, prototype workflows, and guide teams through technical evaluations that demonstrate how a platform can address real operational challenges.
          </p>

          <p>
            My background sits at the intersection of engineering and business operations, which allows me to communicate comfortably with both technical teams and executive stakeholders. I&apos;m particularly comfortable working through ambiguous problem spaces—helping organizations clarify their requirements, identify integration patterns, and understand how a new platform fits into their broader technology stack.
          </p>

          <p>
            From a technical perspective, my work spans API integrations, cloud platforms, and complex SaaS ecosystems across CRM, marketing, analytics, and operational platforms. I also regularly use AI tools and agentic automation systems to accelerate research, prototyping, and system design, including work around AI-enabled knowledge and workflow systems.
          </p>

          <p>
            What excites me about iManage is the opportunity to help organizations adopt advanced technology in a way that is both practical and transformative. The combination of enterprise platform architecture, AI capabilities, and customer-facing solution design is exactly the kind of work I enjoy.
          </p>

          <p>
            I&apos;d welcome the opportunity to discuss how my background in solution architecture, integration design, and technical discovery could support iManage&apos;s pre-sales engineering team and help customers successfully adopt the platform.
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
