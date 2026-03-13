"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export default function CoverLetterShipiumPage() {
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
          <p><strong>Subject:</strong> Senior Solutions Engineer – Shipium</p>

          <p>Dear Shipium Team,</p>

          <p>
            I&apos;m excited to apply for the Senior Solutions Engineer role. Much of my work over the past decade has focused on designing and validating the kinds of API-driven systems and integrations that power complex operational platforms.
          </p>

          <p>
            In my current consulting work and previous roles, I&apos;ve led technical discovery with business and operational stakeholders to understand how systems interact across CRM, e-commerce, analytics, and internal tools. From there I architect integration approaches, define evaluation plans, and guide teams through implementation while ensuring the solution aligns with the operational goals behind the project.
          </p>

          <p>
            My background sits at the intersection of engineering and business operations, which makes me particularly comfortable translating technical architecture into clear business outcomes. Whether designing integration layers, structuring data pipelines, or evaluating how a new platform fits into an existing ecosystem, I focus on helping teams understand trade-offs, reduce operational friction, and move toward scalable solutions.
          </p>

          <p>
            From a technical perspective, my work spans API integrations, cloud platforms including AWS and Google Cloud, and complex SaaS ecosystems across e-commerce, marketing, and operational platforms. I&apos;m comfortable working across fragmented systems and turning them into coherent architectures that support automation and reliable data flow.
          </p>

          <p>
            Shipium&apos;s mission to transform supply chain infrastructure is compelling because it sits at the center of one of the most complex operational ecosystems in modern commerce. The challenge of connecting fragmented systems, validating solutions with real operational data, and translating those architectures into measurable business value is exactly the kind of work I enjoy.
          </p>

          <p>
            I&apos;d welcome the opportunity to discuss how my background in systems architecture, integration design, and stakeholder-driven discovery could support Shipium&apos;s enterprise sales efforts.
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
