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
    {
      period: "Jan 2023 – Present",
      title: "Tall Karol — Independent Solutions Architect & Consultant",
      logo: "/tallkarol-monogram-logo.png",
      intro: "Solo consulting practice: systems integration, automation, cloud application development, and enterprise / multi-site WordPress for retained and project clients.",
      bullets: [
        "Great Day Improvements (retained, Apr 2025 – present) — Enterprise home services, multi-brand. Built automations syncing data between retail store systems and brand CRMs and integrated multiple CRMs into shared cross-brand workflows. Contributing engineer on an enterprise-wide migration consolidating all brand websites onto a single WordPress VIP platform: custom Gutenberg blocks, reusable patterns, and templates that let marketing teams build pages without developer tickets.",
        "Audit & certification provider — Designed and shipped a serverless document portal on AWS, using managed identity and signed-URL file delivery to enforce role-based access with immutable audit logging, replacing email-based file sharing for compliance-sensitive workflows. Ran discovery, scoping, and delivery end to end.",
        "Artist House — Built and shipped a production A&R discovery platform used daily by junior and senior A&R staff: role-based access to artist analytics and reports, automated daily crawls of chart and social data, XLSX report generation, email delivery, and artist watchlists. Built as a Next.js/TypeScript application with a PostgreSQL backend, deployed on Vercel and Railway.",
        "Mineralife Nutraceuticals (retained since 2021) — Ecommerce & B2B. Built an event-driven sync layer unifying WooCommerce, CRM, and email data to trigger lifecycle automation; built a custom B2B sales-workflow interface; re-architected the B2B site as headless WordPress + React, raising mobile Lighthouse from 51 to 94 and cutting TTI from 12.5s to 3.1s.",
      ],
    },
    {
      period: "Oct 2021 – Jan 2023",
      title: "Universal Windows Direct (Great Day Improvements) — Integration Engineer, Full Stack",
      logo: "/uwd-logo.png",
      intro: "Automation infrastructure and API integrations across marketing, sales, and call-center operations at an enterprise home services organization.",
      bullets: [
        "Built a centralized integration layer connecting 7+ systems including Five9, CRM, Mailchimp, and internal platforms, with a shared logging and error-handling framework that made failures traceable across all automations.",
        "Migrated server infrastructure across four VPS partitions with zero downtime, modernizing legacy PHP and removing deprecated security risks.",
        "Implemented server-side tagging, improving attribution reliability and first-party data capture.",
      ],
    },
    {
      period: "Apr 2019 – Sep 2021",
      title: "Perfect Power Wash — Marketing Systems Engineer → Marketing Director",
      logo: "/ppw.png",
      intro: "Recruited to modernize web and data infrastructure; promoted to lead marketing, including ownership of the technology stack, through expansion from one market to four.",
      bullets: [
        "Built the organization's first centralized data warehouse aggregating marketing and operational data for cross-channel attribution.",
        "Developed internal tooling across call-center operations, lead management, and automation, then hired and trained a developer to extend the systems.",
      ],
    },
    {
      period: "2009 – 2019",
      title: "Early Career — Freelance Development & Startups",
      logo: "/logo.png",
      allBullets: true,
      bullets: [
        "Ten years of client-facing full-stack web development and digital infrastructure for small and mid-sized businesses; co-founded two ventures, raising $340K for one.",
      ],
    },
  ]

  const focusAreas = [
    "Systems integration: CRM, call center (Five9), ecommerce, and email platforms connected via REST APIs, webhooks, and event-driven automation",
    "Cloud & full-stack delivery: AWS serverless (Lambda, Cognito, S3) and Next.js/React applications shipped to production, solo when needed",
    "Data pipelines & reporting: ETL, warehousing, and dashboards from raw operational data to leadership visibility",
    "Client discovery & scoping: requirements, SOWs, and architecture decisions run directly with founders and executives",
    "Buyer-side fluency: former Marketing Director; I've owned the budget and the outcomes these systems exist for",
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
              <p className="text-sm text-muted-foreground print:text-xs">Integration Engineer <span className="text-primary mx-1">·</span> Solutions Architect <span className="text-primary mx-1">·</span> API &amp; Cloud Automation</p>
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
          <p className="text-sm print:text-xs text-muted-foreground">
            Integration engineer and solutions architect with 7 years of hands-on delivery across API integrations, automation, data pipelines, and cloud applications. Former Marketing Director — I now build the systems I wish I&apos;d had. Currently running an independent practice with retained clients; looking for a full-time integration or implementation role.
          </p>
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
                          {item.intro && <p className="italic">{item.intro}</p>}
                          <ul className="space-y-1.5 pl-2">
                            {item.bullets.map((bullet, j) => (
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
              <h2 className="text-sm font-semibold uppercase tracking-wide mb-3 print:text-xs print:mb-2 text-primary">Focus Areas</h2>
              <ul className="space-y-2 text-sm print:text-xs pl-0">
                {focusAreas.map((skill, i) => {
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
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" /><span><strong>Integration:</strong> REST APIs, webhooks, event-driven automation, ETL, Zapier, Workato</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" /><span><strong>Cloud:</strong> AWS (Lambda, Cognito, S3, RDS, Amplify), GCP, Vercel, Railway, Supabase</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" /><span><strong>Platforms:</strong> WordPress VIP, WooCommerce, Five9, Mailchimp, GA4/GTM</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" /><span><strong>Languages &amp; frameworks:</strong> PHP, JavaScript/TypeScript, Python, SQL, React, Next.js, Node.js</span></li>
              </ul>
            </section>
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wide mb-3 print:text-xs print:mb-2 text-primary">Certifications</h2>
              <ul className="space-y-2 text-sm print:text-xs pl-0">
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" /><span>Workato Foundations I &amp; II</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" /><span>Google Cloud Digital Leader</span></li>
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
              <h2 className="text-sm font-semibold uppercase tracking-wide mb-3 print:text-xs print:mb-2 text-primary">Reference</h2>
              <blockquote className="border-l-2 border-primary/50 pl-4 text-xs italic text-muted-foreground print:text-[10px] print-keep-accent-border">
                &ldquo;I&apos;ve worked with Karol on a wide variety of API and integration projects spanning sales, marketing, and operations. He is highly technical, incredibly quick to learn new workflows, and remarkably dynamic when it comes to evolving project requirements. ... I highly recommend Karol for any role that requires technical expertise paired with a strong business mindset.&rdquo;
              </blockquote>
              <p className="text-xs mt-2 print:text-[10px] text-muted-foreground">
                <span className="font-semibold text-foreground">Christopher Jarvis</span>
                <span> — VP of Enterprise Digital Marketing, Great Day Improvements (direct manager)</span>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
