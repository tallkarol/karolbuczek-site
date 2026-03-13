"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export default function CoverLetterServiceTitanPage() {
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
          <p><strong>Subject:</strong> Solutions Engineer – ServiceTitan</p>

          <p>Dear ServiceTitan Team,</p>

          <p>
            I&apos;m excited to apply for the Solutions Engineer role. Much of my work over the past several years has centered on helping trades organizations understand how operational software can improve the way their businesses run—particularly through my time at Perfect Power Wash, where I owned the technical side of the ServiceTitan platform while leading marketing and revenue systems for a rapidly growing multi-market home services business.
          </p>

          <p>
            In that role, I worked closely with operations and leadership teams to translate real business workflows into systems that supported dispatch, campaign tracking, reporting, and integrations with CRM, marketing automation, and internal tools. Because I&apos;ve worked directly inside a trades organization, I understand how these systems affect scheduling, job flow, and revenue in day-to-day operations.
          </p>

          <p>
            That experience makes it natural for me to explain complex software concepts in practical business terms. Whether working with technical teams or business owners, I focus on helping stakeholders understand how a platform fits into their workflow and how it can improve the way their teams operate.
          </p>

          <p>
            From a technical perspective, my background spans API integrations, SaaS platforms, and cloud-based systems across operational, marketing, and analytics environments. I&apos;m also comfortable using AI tools and automation to improve workflows and accelerate how teams analyze and act on data.
          </p>

          <p>
            What excites me about ServiceTitan is the opportunity to help trades businesses see how the right technology can unlock real operational improvements. Having experienced that transformation firsthand, I enjoy helping others understand how platforms like ServiceTitan can support growth, efficiency, and better decision-making.
          </p>

          <p>
            I&apos;d welcome the opportunity to discuss how my background in systems architecture and firsthand experience operating within the trades could help ServiceTitan&apos;s Sales Engineering team demonstrate the value of the platform to new customers.
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
