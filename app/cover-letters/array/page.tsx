"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export default function CoverLetterArrayPage() {
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
          <p><strong>Subject:</strong> Strategic Sales Engineering / Solutions Architecture – Array</p>

          <p>Dear Array Team,</p>

          <p>
            I&apos;m excited to apply for the Sales Engineering role. Much of my work over the past decade has centered on designing and delivering API-driven systems that connect complex SaaS platforms and operational workflows, often while working directly with executive stakeholders to translate business goals into scalable technical architectures.
          </p>

          <p>
            In my consulting work and previous roles, I&apos;ve led structured discovery sessions with product leaders, operational teams, and executive stakeholders to understand how data, integrations, and user experiences intersect across a company&apos;s platform ecosystem. From there I work with teams to define solution architectures, prototype concepts, and guide evaluation processes that ensure the technology delivers measurable business value.
          </p>

          <p>
            My background sits at the intersection of engineering and business operations, which allows me to communicate comfortably with both technical teams and senior leadership. I&apos;m particularly comfortable working through ambiguous problem spaces—helping organizations clarify their goals, identify integration patterns, and design systems that scale across multiple products and business units.
          </p>

          <p>
            From a technical perspective, my work spans API integrations, authentication flows, and complex SaaS ecosystems across marketing, e-commerce, analytics, and operational platforms. I frequently use AI tools and agentic automation systems to accelerate research, prototyping, and system design, both for my own workflows and in collaboration with clients.
          </p>

          <p>
            Array&apos;s mission to help companies bring modern financial products to market through embeddable platforms and APIs is especially compelling because it sits at the intersection of product strategy, platform architecture, and consumer experience. The opportunity to partner with enterprise clients to design scalable solutions that unlock new revenue and engagement opportunities is exactly the kind of work I enjoy.
          </p>

          <p>
            I&apos;d welcome the opportunity to discuss how my background in enterprise systems architecture, integration design, and consultative discovery could support Array&apos;s clients and help drive successful platform deployments.
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
