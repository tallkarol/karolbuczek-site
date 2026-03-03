"use client"

import { useEffect } from "react"
import Image from "next/image"
import { Mail, Phone, Globe, Linkedin } from "lucide-react"

export default function ResumePlainTextPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && window.location.search.includes("print=true")) {
        window.print()
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const experience = [
    { period: "2023 — Present", title: "Tall Karol — Principal Solutions Architect", logo: "/tallkarol-monogram-logo.png", bullets: ["Directs the full architectural lifecycle—from pre-sales discovery to production deployment—for enterprise and growth-stage clients.", "Architected a serverless AWS document portal (Amplify, Cognito, Lambda, S3) with role-based access and immutable audit logging to meet enterprise compliance standards.", "Designed a decoupled GCP/Python ETL layer to orchestrate asynchronous data transfers into Databricks, ensuring data integrity and idempotency across heterogeneous systems.", "Engineered air-gapped AI meeting intelligence using local HuggingFace inference, automating deadline extraction while maintaining 100% data residency and privacy.", "Optimized WordPress VIP performance, reducing LCP from 5.5s to 3.2s through render-path refinement and asset orchestration."] },
    { period: "2021 — 2023", title: "Universal Windows Direct — Backend & Integration Engineer", logo: "/uwd-logo.png", bullets: ["Owned the integration architecture and internal tooling for a national enterprise home-services organization.", "Designed a service-oriented integration layer connecting Five9, Mailchimp, and CRM; replaced brittle, manual handoffs with a robust, event-driven automation framework.", "Implemented a shared telemetry and logging framework across the internal ecosystem, significantly reducing MTTR through full request-lifecycle visibility.", "Architected modular lead-ingestion systems that optimized routing logic and capture speed, directly impacting sales-floor conversion velocity."] },
    { period: "2019 — 2021", title: "Perfect Power Wash — Marketing Director / Head of IT", logo: "/ppw.png", bullets: ["Led the technical and strategic expansion of the organization from 1 to 4 markets.", "Architected the internal tech stack for call center and lead management operations; hired and mentored the engineering team to scale custom systems.", "Designed multi-market reporting infrastructure and data dashboards, providing leadership with a unified view of performance metrics across all operational territories."] },
    { period: "2009 — 2019", title: "Freelance Developer / Designer", logo: "/logo.png", bullets: ["Managed full-cycle delivery for mid-market clients, focusing on digital infrastructure strategy.", "Translated business goals into technical architectures for e-commerce and brand systems, developing foundational expertise in requirements gathering and stakeholder management."] },
  ]

  const softSkills = [
    "Stakeholder Orchestration: Translates business goals into rigorous technical requirements for engineering teams.",
    "Organizational Adaptability: Successful in both high-velocity startups and 3,000+ person enterprise environments.",
    "Autonomous Ownership: Leads the architectural lifecycle from discovery through production with zero oversight.",
    "Strategic Scoping: Expert in technical discovery, POC delivery, and SOW definition for high-stakes projects.",
  ]

  return (
    <div className="print-resume min-h-screen bg-background text-foreground" style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "11pt", lineHeight: 1.4 }}>
      <div className="max-w-5xl mx-auto p-8 print:p-6 print:max-w-full">
        {/* Header */}
        <div className="mb-5 print:mb-4 grid grid-cols-[1fr_auto] gap-4 items-center">
          <div>
            <h1 className="text-2xl font-bold mb-0.5 print:text-xl text-foreground">Karol Buczek</h1>
            <p className="text-sm text-muted-foreground print:text-xs">Solutions Architect <span className="text-primary mx-1">|</span> Cloud Systems <span className="text-primary mx-1">|</span> MarTech <span className="text-primary mx-1">|</span> AI</p>
          </div>
          <div className="flex flex-col items-end text-right text-xs text-muted-foreground print:text-[10px] space-y-1">
            <div className="flex items-center gap-2">
              <Mail className="h-3 w-3 print:h-2.5 print:w-2.5 flex-shrink-0" />
              <a href="mailto:karol@karolbuczek.com" className="hover:text-primary transition-colors">karol@karolbuczek.com</a>
              <span className="text-primary mx-1">|</span>
              <Phone className="h-3 w-3 print:h-2.5 print:w-2.5 flex-shrink-0" />
              <a href="tel:+12167744283" className="hover:text-primary transition-colors">(216) 774-4283</a>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-3 w-3 print:h-2.5 print:w-2.5 flex-shrink-0" />
              <a href="https://karolbuczek.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">karolbuczek.com</a>
              <span className="mx-1">·</span>
              <Linkedin className="h-3 w-3 print:h-2.5 print:w-2.5 flex-shrink-0" />
              <a href="https://linkedin.com/in/karolbuczek" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn.com/in/karolbuczek</a>
            </div>
          </div>
        </div>

        <hr className="border-border mb-4 print:mb-3" />

        {/* Summary — full width */}
        <section className="mb-8 print:mb-6 rounded-lg border border-border bg-muted/20 p-4 print:p-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide mb-3 print:text-xs print:mb-2 text-primary">Summary</h2>
          <ul className="space-y-2 text-sm print:text-xs pl-4">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
              <span>10+ years architecting and delivering high-stakes systems across cloud infrastructure, API orchestration, and data pipelines.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
              <span>Combines a Principal Engineering mindset with a Marketing Director background to bridge the gap between complex technical requirements and C-suite business objectives.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
              <span>Expert in designing for observability, security, and ROI.</span>
            </li>
          </ul>
        </section>

        <div className="grid grid-cols-[1fr_60%] gap-8 print:gap-6 mb-4 print:mb-3">
          {/* Left column */}
          <div className="space-y-8 print:space-y-6">
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wide mb-3 print:text-xs print:mb-2 text-primary">Soft Skills</h2>
              <ul className="space-y-2 text-sm print:text-xs pl-0">
                {softSkills.map((skill, i) => {
                  const [label, ...rest] = skill.split(": ")
                  return (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                      <span><strong>{label}:</strong> {rest.join(": ")}</span>
                    </li>
                  )
                })}
              </ul>
            </section>

            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wide mb-3 print:text-xs print:mb-2 text-primary">Technical Skills</h2>
              <div className="space-y-2 text-sm print:text-xs">
                <p><strong>Cloud:</strong> AWS (Amplify, Lambda, Cognito, RDS, S3), GCP, Vercel, Supabase</p>
                <p><strong>Platforms:</strong> WordPress VIP, WooCommerce, GTM, GA4, Mailchimp, Five9, Zapier</p>
                <p><strong>Languages:</strong> PHP, JavaScript, TypeScript, Python, SQL</p>
                <p><strong>Frameworks:</strong> React, Node.js, TailwindCSS</p>
              </div>
            </section>

            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wide mb-3 print:text-xs print:mb-2 text-primary">Certifications</h2>
              <ul className="space-y-2 text-sm print:text-xs pl-0">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                  <span>Google Cloud Digital Leader (GCP-DL)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                  <span>Azure Fundamentals (AZ-900)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                  <span>AWS Solutions Architect Associate (SAA-C03)</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wide mb-3 print:text-xs print:mb-2 text-primary">Education</h2>
              <div className="space-y-2 text-sm print:text-xs">
                <p><strong>Case Western Reserve</strong> — Full Stack Web Development</p>
                <p><strong>Miami University</strong> — International Marketing</p>
              </div>
            </section>
          </div>

          {/* Right column — Professional Experience */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wide mb-3 print:text-xs text-primary">Professional Experience</h2>
            <div className="space-y-5 print:space-y-4">
              {experience.map((item, i) => (
                <div key={i} className="flex gap-3">
                  {item.logo && (
                    <Image src={item.logo} alt="" width={28} height={28} className="flex-shrink-0 h-7 w-7 print:h-6 print:w-6 object-contain" />
                  )}
                  <div className="min-w-0">
                    <div className="mb-1">
                      <strong className="text-sm print:text-xs">{item.title}</strong>
                      <span className="text-primary mx-3">|</span>
                      <span className="text-sm text-muted-foreground print:text-xs">{item.period}</span>
                    </div>
                    <div className="space-y-1.5 text-sm text-muted-foreground print:text-xs">
                      <p>{item.bullets[0]}</p>
                      <ul className="space-y-1.5 pl-2">
                        {item.bullets.slice(1).map((bullet, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* References — full width */}
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide mb-3 print:text-xs print:mb-2 text-primary">References</h2>
          <blockquote className="border-l-2 border-primary/50 pl-4 text-sm italic text-muted-foreground print:text-xs print-keep-accent-border">
            &ldquo;He&apos;s one of the rare professionals who can bridge the gap between deep technical capability and real business understanding. Whether the work involved internal tools, customer-facing platforms, or data connections between legacy systems, he always approached challenges with clarity, logic, and a calm, solutions-focused mindset.&rdquo;
          </blockquote>
          <p className="text-sm font-semibold mt-2 print:text-xs">John Kosmides — Vice President of Marketing, Perfect Power Wash & Universal Windows Direct</p>
        </section>
      </div>
    </div>
  )
}
