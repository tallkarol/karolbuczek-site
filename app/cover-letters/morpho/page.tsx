"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export default function CoverLetterMorphoPage() {
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
          <p><strong>Subject:</strong> Integration Engineer / Solutions – Morpho</p>

          <p>Dear Morpho Team,</p>

          <p>
            I&apos;m excited to apply for this role. My work sits at the intersection of integration architecture, partner-facing implementation, and hands-on system design—helping teams go from initial technical discovery to working integrations as quickly and reliably as possible.
          </p>

          <p>
            Over the past decade, I&apos;ve worked across API-driven systems, building integration layers that connect complex platforms and operational workflows. At Universal Windows Direct, I designed and implemented a centralized integration layer connecting CRM, contact center, and marketing systems, including shared logging and error handling to ensure reliability and observability across workflows. In my consulting work, I regularly partner directly with technical teams to scope integrations, build proofs of concept, and guide implementations through to production.
          </p>

          <p>
            Much of my experience aligns closely with what you&apos;re looking for: joining technical conversations early, translating requirements into clear implementation paths, and unblocking teams during integration. I&apos;m comfortable working hands-on—building small tools, testing endpoints, structuring data flows, and helping teams navigate edge cases in real time—while also stepping back to improve patterns, documentation, and onboarding processes.
          </p>

          <p>
            While my background is primarily in API ecosystems and cloud-based systems, I&apos;ve been actively working with blockchain-adjacent architectures and understand the core patterns around smart contract interaction, event-driven systems, and wallet-based authentication. What draws me to Morpho is the opportunity to work closer to the protocol layer—supporting integrators building directly on top of a system where performance, transparency, and correctness are critical.
          </p>

          <p>
            I also place a strong emphasis on communication and documentation. I&apos;ve found that the fastest way to scale integrations is not just solving problems for partners, but turning those solutions into reusable patterns, clear documentation, and better onboarding experiences for the next team.
          </p>

          <p>
            Because my path into architecture began on the stakeholder side, I&apos;m particularly focused on how systems behave in the real world—where integrations break, where assumptions fail, and how to design systems that remain understandable and reliable as they scale. Silent systems are expensive systems.
          </p>

          <p>
            Morpho&apos;s vision of building an open, internet-native financial system is exactly the kind of technical frontier I&apos;m looking to move closer to—where strong integration support directly impacts ecosystem growth.
          </p>

          <p>
            I&apos;d welcome the opportunity to discuss how my background in integration architecture, partner-facing engineering, and rapid implementation can help accelerate Morpho&apos;s expansion across the Americas.
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
