"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Mail, Phone, Globe, Linkedin, ArrowLeft } from "lucide-react"

type Engagement = {
  client: string
  role: string
  period: string
  logo: string
  bullets: string[]
}

type ExperienceItem = {
  period: string
  title: string
  logo: string
  intro?: string
  bullets?: string[]
  allBullets?: boolean
  engagements?: Engagement[]
}

function EngagementLogo({ src, alt }: { src: string; alt: string }) {
  if (src.endsWith(".svg")) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className="h-full w-full object-contain" />
  }
  return <Image src={src} alt={alt} width={36} height={36} className="h-full w-full object-contain" />
}

export default function SolutionIntegrationEngineerOneSheetPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && window.location.search.includes("print=true")) {
        window.print()
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const experience: ExperienceItem[] = [
    {
      period: "Jan 2023 – Present",
      title: "Tall Karol — Independent Solutions Architect & Consultant",
      logo: "/tallkarol-monogram-logo.png",
      intro: "Solo consulting practice: systems integration, automation, cloud application development, and enterprise / multi-site WordPress for retained and project clients.",
      engagements: [
        {
          client: "Great Day Improvements",
          role: "Systems Integration & WordPress VIP Engineering",
          period: "Apr 2025 – Present",
          logo: "/gdi-logo.svg",
          bullets: [
            "Built a modular integration architecture across 8 brands, connecting multiple CRMs and third-party vendors into shared cross-brand workflows.",
            "Contributing engineer on an enterprise-wide migration consolidating all brand websites onto a single WordPress VIP platform: custom Gutenberg blocks, reusable patterns, and templates that let marketing teams build pages without developer tickets.",
          ],
        },
        {
          client: "Mineralife Nutraceuticals",
          role: "Marketing Systems Consultant — Ecommerce & B2B",
          period: "2021 – Present",
          logo: "/mineralife-logo.png",
          bullets: [
            "Built a custom B2B sales-workflow interface to qualify inquiries and manage opportunities from submission through conversion.",
            "Re-architected the B2B site as headless WordPress + React, raising mobile Lighthouse from 51 to 94 and cutting TTI from 12.5s to 3.1s.",
          ],
        },
        {
          client: "Bliss",
          role: "Audit & certification provider — Secure Document Portal",
          period: "Project engagement",
          logo: "/bliss-cb.png",
          bullets: [
            "Designed and shipped a serverless document portal on AWS, using managed identity and signed-URL file delivery to enforce role-based access with immutable audit logging.",
            "Replaced email-based file sharing for compliance-sensitive workflows.",
          ],
        },
        {
          client: "Artist House",
          role: "Full-Stack Engineer — A&R Discovery Platform",
          period: "Project engagement",
          logo: "/artisthouse_logo_square.png",
          bullets: [
            "Built and shipped a production A&R discovery platform used daily by junior and senior A&R staff: role-based analytics, automated chart/social crawls, XLSX reports, email delivery, and artist watchlists.",
            "Next.js/TypeScript application with a PostgreSQL backend, deployed on Vercel and Railway.",
          ],
        },
      ],
    },
    {
      period: "Oct 2021 – Jan 2023",
      title: "Universal Windows Direct (GDI) — Integration Engineer",
      logo: "/uwd-logo.png",
      intro: "Automation infrastructure and API integrations across marketing, sales, and call-center operations at an enterprise home services organization.",
      bullets: [
        "Expanded and organized a centralized PHP script-based integration API connecting multiple systems including Five9, CRM, Mailchimp, and internal platforms. Implemented modular routes and a shared logging and error-handling framework that made failures traceable across all automations.",
        "Migrated server infrastructure across four VPS partitions with zero downtime, modernizing legacy PHP and removing deprecated security risks.",
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
      intro: "Ten years of client-facing full-stack web development and digital infrastructure for small and mid-sized businesses; co-founded two ventures, raising $340K for one.",
      bullets: [
        "Marketing / Design — Red Light Management (2016 — 2018)",
        "Marketing & IT Consultant — Localtopia (2014 — 2015)",
        // TODO(karol): reconcile CUBE title with LinkedIn
        "Co-Founder / Creative Director — CUBE Karaoke LLC (2013 — 2014)",
        // TODO(karol): reconcile in2itiv dates with LinkedIn
        "Co-Founder / CEO — in2itiv media LLC (2012 — 2013)",
      ],
    },
  ]

  const focusAreas = [
    "Systems integration: CRM, call center (Five9), ecommerce, and email platforms connected via REST APIs, webhooks, and event-driven automation",
    "Cloud & full-stack delivery: AWS serverless (Lambda, Cognito, S3) and Next.js/React applications shipped to production",
    "Data pipelines & reporting: ETL, warehousing, and dashboards from raw operational data to leadership visibility",
    "Client discovery & scoping: requirements, SOWs, and architecture decisions run directly with founders and executives",
    "Buyer-side fluency: former Marketing Director; I've owned the budget and the KPIs these systems have to answer to",
  ]

  return (
    <div className="print-resume min-h-screen bg-background text-foreground" style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "11pt", lineHeight: 1.4 }}>
      <div className="max-w-5xl mx-auto p-8 print:p-6 print:max-w-full">
        <Link href="/resume/one-sheet" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground print:hidden">
          <ArrowLeft className="h-4 w-4" />
          All one-sheets
        </Link>

        <div className="mb-5 print:mb-4 grid grid-cols-[1fr_auto] gap-4 items-center">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Karol Buczek" width={56} height={56} className="flex-shrink-0 h-14 w-14 print:h-12 print:w-12 object-contain" />
            <div>
              <h1 className="text-2xl font-bold mb-0.5 print:text-xl text-foreground">Karol Buczek</h1>
              <p className="text-sm text-muted-foreground print:text-xs">Integration Engineer <span className="text-primary mx-1">·</span> Solutions Architect</p>
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
          <ul className="space-y-2 text-sm print:text-xs text-muted-foreground pl-0">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
              <span>7 years of hands-on delivery for SMB, mid-market, and enterprise clients; 15+ years of coding experience.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
              <span>Specializing in custom web applications, enterprise WordPress, and systems integration.</span>
            </li>
          </ul>
        </section>

        <div className="grid grid-cols-[65%_1fr] gap-8 print:gap-6 mb-4 print:mb-3">
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wide mb-3 print:text-xs text-primary">Professional Experience</h2>
            <div className="space-y-5 print:space-y-4">
              {experience.map((item, i) => (
                <div key={i} className="flex gap-3">
                  {item.logo && (
                    <div className="flex h-7 w-7 print:h-6 print:w-6 flex-shrink-0 items-center justify-center rounded-md border border-border/50 bg-muted/25 p-1">
                      <Image src={item.logo} alt="" width={28} height={28} className="h-full w-full object-contain" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="mb-1">
                      <strong className="text-sm print:text-xs">{item.title}</strong>
                      <span className="text-primary mx-3">|</span>
                      <span className="text-sm text-muted-foreground print:text-xs">{item.period}</span>
                    </div>
                    <div className="space-y-1.5 text-sm text-muted-foreground print:text-xs">
                      {item.intro && <p className="italic">{item.intro}</p>}

                      {item.engagements && item.engagements.length > 0 && (
                        <div className="mt-3 ml-1 border-l border-border/40 pl-3 space-y-3.5 print:space-y-3">
                          <p className="font-semibold text-muted-foreground text-[10px] uppercase tracking-[0.14em]">
                            Client engagements under Tall Karol
                          </p>
                          {item.engagements.map((engagement) => (
                            <div key={`${engagement.client}-${engagement.period}`} className="relative space-y-1.5">
                              <div className="absolute -left-[16px] top-2.5 h-1.5 w-1.5 rounded-full border border-background bg-primary/40" />
                              <div className="flex items-start gap-2.5">
                                <div className="flex h-9 w-9 print:h-8 print:w-8 flex-shrink-0 items-center justify-center rounded-md border border-border/50 bg-muted/25 p-1">
                                  <EngagementLogo src={engagement.logo} alt={`${engagement.client} logo`} />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="font-semibold text-foreground text-sm print:text-xs leading-snug">
                                    {engagement.client}
                                  </div>
                                  <div className="mt-0.5 text-foreground text-xs print:text-[10px] font-medium">
                                    {engagement.role}
                                  </div>
                                  <div className="mt-0.5 text-muted-foreground text-xs print:text-[10px]">
                                    {engagement.period}
                                  </div>
                                </div>
                              </div>
                              <ul className="space-y-1 pl-11 print:pl-10">
                                {engagement.bullets.map((bullet) => (
                                  <li key={bullet} className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                                    <span>{bullet}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}

                      {item.bullets && item.bullets.length > 0 && (
                        <ul className="space-y-1.5 pl-2">
                          {item.bullets.map((bullet, j) => (
                            <li key={j} className="flex items-start gap-2">
                              <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
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
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" /><span><strong>Miami University</strong> — International Marketing, China Business Program</span></li>
              </ul>
            </section>
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wide mb-3 print:text-xs print:mb-2 text-primary">Reference</h2>
              <blockquote className="border-l-2 border-primary/50 pl-4 text-xs italic text-muted-foreground print:text-[10px] print-keep-accent-border">
                &ldquo;I&apos;ve worked with Karol on a wide variety of API and integration projects spanning sales, marketing, and operations. He is highly technical, incredibly quick to learn new workflows, and remarkably dynamic when it comes to evolving project requirements. ... I highly recommend Karol for any role that requires technical expertise paired with a strong business mindset.&rdquo;
              </blockquote>
              <p className="text-xs mt-2 print:text-[10px] text-muted-foreground">
                <span className="font-semibold text-foreground">Christopher Jarvis</span>
                <span> — VP of Enterprise Digital Marketing, Great Day Improvements — Direct Manager</span>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
