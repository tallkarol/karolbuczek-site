"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Mail, Phone, Globe, Linkedin, ArrowLeft } from "lucide-react"

export default function SolutionIntegrationEngineerOneSheetPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && window.location.search.includes("print=true")) {
        window.print()
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const experience = [
    { period: "2023 — Present", title: "Tall Karol — Principal Solutions Architect", logo: "/tallkarol-monogram-logo.png", bullets: ["Independent consulting practice — solutions architecture and integration engineering for enterprise and growth-stage clients.", "Standardized cross-platform governance by architecting integration bridges between CRMs and lead sources, eliminating data silos through automated schema normalization.", "Developed a persistent UTM attribution engine to solve first-touch/last-touch visibility gaps, enabling accurate marketing ROI modeling.", "Created a reusable GTM event schema and component architecture, enabling marketing teams to deploy standardized tracking events without engineering intervention.", "Architected data and event integrations between commerce platforms and marketing CRMs for synchronized customer records and reporting."] },
    { period: "2021 — Present", title: "Mineralife Nutraceuticals — Marketing Systems Consultant", logo: "/mineralife-logo.png", bullets: ["Consulting role focused on ecommerce infrastructure, internal B2B platforms, and marketing automation architecture.", "Architected a multi-tenant CDP layer supporting event-driven lifecycle automation and segmentation for a flagship product line.", "Built a custom CRM-style interface to manage the B2B sales workflow from form submission through contact and conversion, improving lead prioritization."] },
    { period: "2021 — 2023", title: "Universal Windows Direct — Integration Engineer (Full Stack)", logo: "/uwd-logo.png", bullets: ["Full-stack integration engineering role focused on automation infrastructure, internal platforms, and API integrations across an enterprise home services organization.", "Built a custom integration layer connecting call center, CRM, MarTech, and internal systems, including a shared logging and error-handling framework.", "Migrated server infrastructure across four VPS partitions with zero downtime, modernizing legacy PHP scripts and removing security risks."] },
    { period: "2019 — 2021", title: "Perfect Power Wash — Marketing Director", logo: "/ppw.png", bullets: ["Leadership role responsible for marketing strategy, execution, and ownership of the organization's technology stack during expansion from one market to four.", "Built the organization's first centralized data warehouse aggregating marketing and operational data for cross-channel attribution and performance reporting.", "Implemented a customer engagement platform orchestrating multi-touch lifecycle automation across email, SMS, and direct mail.", "Designed multi-market reporting infrastructure and dashboards providing leadership with unified visibility into operational performance."] },
    { period: "2009 — 2019", title: "Freelance Developer / Designer", logo: "/logo.png", allBullets: true, bullets: ["10 years of client-facing freelance work spanning full-stack web development, brand strategy, and digital infrastructure for small and mid-sized businesses.", "Built ecommerce systems, API integrations, and brand platforms with emphasis on data flow and system interconnectivity."] },
  ]

  const softSkills = [
    "Stakeholder Orchestration: Translates business objectives into technical requirements; communicates ROI and risk mitigation to C-suite and engineering teams alike.",
    "Implementation Ownership: Leads end-to-end delivery from design to deployment with zero oversight required.",
    "Integration Architecture: Designs modular, maintainable systems that connect disparate platforms (CRM, call center, martech) without vendor lock-in.",
    "Systems Thinking: Aligns technical decisions with business outcomes to ensure integrations serve as revenue multipliers.",
    "Cross-Functional Collaboration: Works across marketing, sales, and operations to align technical roadmap with business goals.",
  ]

  return (
    <div className="print-resume min-h-screen bg-background text-foreground" style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "11pt", lineHeight: 1.4 }}>
      <div className="max-w-5xl mx-auto p-8 print:p-6 print:max-w-full">
        {/* Back link - hidden when printing */}
        <Link href="/resume/one-sheet" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground print:hidden">
          <ArrowLeft className="h-4 w-4" />
          All one-sheets
        </Link>

        {/* Header */}
        <div className="mb-5 print:mb-4 grid grid-cols-[1fr_auto] gap-4 items-center">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Karol Buczek" width={56} height={56} className="flex-shrink-0 h-14 w-14 print:h-12 print:w-12 object-contain" />
            <div>
              <h1 className="text-2xl font-bold mb-0.5 print:text-xl text-foreground">Karol Buczek</h1>
              <p className="text-sm text-muted-foreground print:text-xs">Integration Engineer <span className="text-primary mx-1">|</span> Cloud Systems <span className="text-primary mx-1">|</span> MarTech <span className="text-primary mx-1">|</span> AI</p>
            </div>
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

        <section className="mb-5 print:mb-4 rounded-lg border border-border bg-muted/20 p-4 print:p-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide mb-3 print:text-xs print:mb-2 text-primary">Summary</h2>
          <ul className="space-y-2 text-sm print:text-xs pl-4">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
              <span><strong>Integration Engineer:</strong> 10+ years building API integrations, CRM bridges, and internal tooling — connecting call center, marketing, and operations systems into unified workflows.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
              <span><strong>Hands-On Implementation:</strong> End-to-end delivery from requirements through deployment — logging frameworks, server migrations, GTM/GA4 instrumentation, and lifecycle automation.</span>
            </li>
          </ul>
        </section>

        <div className="grid grid-cols-[65%_1fr] gap-8 print:gap-6 mb-4 print:mb-3">
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wide mb-3 print:text-xs text-primary">Professional Experience</h2>
            <div className="space-y-5 print:space-y-4">
              {experience.map((item, i) => (
                <div key={i} className="flex gap-3">
                  {item.logo && <Image src={item.logo} alt="" width={28} height={28} className="flex-shrink-0 h-7 w-7 print:h-6 print:w-6 object-contain" />}
                  <div className="min-w-0">
                    <div className="mb-1">
                      <strong className="text-sm print:text-xs">{item.title}</strong>
                      <span className="text-primary mx-3">|</span>
                      <span className="text-sm text-muted-foreground print:text-xs">{item.period}</span>
                    </div>
                    <div className="space-y-1.5 text-sm text-muted-foreground print:text-xs">
                      {item.allBullets ? (
                        <ul className="space-y-1.5 pl-2">
                          {item.bullets.map((bullet, j) => (
                            <li key={j} className="flex items-start gap-2">
                              <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <>
                          <p>{item.bullets[0]}</p>
                          <ul className="space-y-1.5 pl-2">
                            {item.bullets.slice(1).map((bullet, j) => (
                              <li key={j} className="flex items-start gap-2">
                                <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <div className="space-y-8 print:space-y-6">
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wide mb-3 print:text-xs print:mb-2 text-primary">Core Strengths</h2>
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
              <ul className="space-y-2 text-sm print:text-xs pl-0">
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" /><span><strong>Integrations:</strong> Five9, Mailchimp, WooCommerce, CRMs, Zapier, Webhooks</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" /><span><strong>Platforms:</strong> WordPress, GTM, GA4, Meta Pixel, server-side tagging</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" /><span><strong>Cloud:</strong> AWS, GCP, Vercel, Supabase</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" /><span><strong>Languages:</strong> PHP, JavaScript, TypeScript, Python, SQL</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" /><span><strong>Frameworks:</strong> React, Node.js</span></li>
              </ul>
            </section>
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wide mb-3 print:text-xs print:mb-2 text-primary">Certifications</h2>
              <ul className="space-y-2 text-sm print:text-xs pl-0">
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" /><span>Google Cloud Digital Leader</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" /><span>AWS Solutions Architect Associate</span></li>
              </ul>
            </section>
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wide mb-3 print:text-xs print:mb-2 text-primary">Education</h2>
              <ul className="space-y-2 text-sm print:text-xs pl-0">
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" /><span><strong>Case Western Reserve</strong> — Full Stack Web Development</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" /><span><strong>Miami University</strong> — International Marketing</span></li>
              </ul>
            </section>
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wide mb-3 print:text-xs print:mb-2 text-primary">References</h2>
              <blockquote className="border-l-2 border-primary/50 pl-4 text-xs italic text-muted-foreground print:text-[10px] print-keep-accent-border">
                &ldquo;He&apos;s one of the rare professionals who can bridge the gap between deep technical capability and real business understanding. Whether the work involved internal tools, customer-facing platforms, or data connections between legacy systems, he always approached challenges with clarity, logic, and a calm, solutions-focused mindset.&rdquo;
              </blockquote>
              <p className="text-xs mt-2 print:text-[10px] text-muted-foreground">
              <span className="font-semibold text-foreground">John Kosmides</span>
              <span> — Vice President of Marketing, Perfect Power Wash & Universal Windows Direct</span>
            </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
