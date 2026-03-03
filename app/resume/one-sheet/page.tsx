"use client"

import { useEffect } from "react"
import Image from "next/image"
import { Mail, Phone, Globe, Linkedin } from "lucide-react"
import { Typography } from "@/components/typography"
import { Card, CardContent } from "@/components/ui/card"

export default function ResumeOneSheetPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && window.location.search.includes("print=true")) {
        window.print()
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="print-resume min-h-screen bg-background" style={{ fontSize: "95%" }}>
      <div className="max-w-4xl mx-auto p-8 print:p-4 print:max-w-full">
        {/* Header */}
        <div className="mb-4 print:mb-2.5 grid grid-cols-[auto_1fr] gap-4 print:gap-2 items-center">
          <div className="flex items-center gap-3 print:gap-2">
            <Image
              src="/logo.png"
              alt="Karol Buczek Logo"
              width={60}
              height={60}
              className="rounded-lg print:w-[45px] print:h-[45px] object-contain flex-shrink-0"
              priority
            />
            <div className="flex flex-col leading-tight">
              <Typography variant="h1" as="h1" className="text-[28px] font-display font-bold leading-tight print:text-[20px] text-foreground">
                KAROL BUCZEK
              </Typography>
              <Typography variant="body" className="text-[12px] leading-tight print:text-[10px] text-foreground">
                Solutions Architect <span className="text-primary mx-1">|</span> Cloud Systems <span className="text-primary mx-1">|</span> MarTech <span className="text-primary mx-1">|</span> AI
              </Typography>
            </div>
          </div>
          <div className="flex flex-col items-end text-right leading-tight space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground text-[10px] leading-tight print:text-[8px]">
              <Mail className="h-3 w-3 print:h-2.5 print:w-2.5 flex-shrink-0" />
              <a href="mailto:karol@karolbuczek.com" className="hover:text-primary transition-colors">karol@karolbuczek.com</a>
              <span className="text-primary">|</span>
              <Phone className="h-3 w-3 print:h-2.5 print:w-2.5 flex-shrink-0" />
              <a href="tel:+12167744283" className="hover:text-primary transition-colors">(216) 774-4283</a>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-[10px] leading-tight print:text-[8px]">
              <Globe className="h-3 w-3 print:h-2.5 print:w-2.5 flex-shrink-0" />
              <a href="https://karolbuczek.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">karolbuczek.com</a>
              <span className="text-muted-foreground">·</span>
              <Linkedin className="h-3 w-3 print:h-2.5 print:w-2.5 flex-shrink-0" />
              <a href="https://linkedin.com/in/karolbuczek" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn.com/in/karolbuczek</a>
            </div>
          </div>
        </div>

        {/* Summary */}
        <Card className="mb-3 print:mb-2 border-border/50 bg-muted/20 print:shadow-none">
          <CardContent className="pt-3 px-4 pb-4 print:pt-1 print:px-2 print:pb-2">
            <Typography variant="h3" as="h3" className="text-[12px] font-display font-semibold mb-1.5 uppercase tracking-wide print:text-[10px] text-foreground">
              Summary
            </Typography>
            <ul className="space-y-1 print:space-y-0.5 pl-4">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                <Typography variant="body-sm" className="text-[11px] leading-relaxed print:text-[9px] text-foreground">
                  10+ years designing and delivering systems across cloud infrastructure, API integrations, data pipelines, and marketing technology.
                </Typography>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                <Typography variant="body-sm" className="text-[11px] leading-relaxed print:text-[9px] text-foreground">
                  Full-stack engineering and marketing leadership background — understand what systems need to do for the business, not just how to build them.
                </Typography>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Professional Experience — timeline style */}
        <Card className="mb-3 print:mb-2 border-border/50 bg-muted/20 print:shadow-none print-flat">
          <CardContent className="pt-3 px-4 pb-4 print:pt-1 print:px-2 print:pb-2">
            <Typography variant="h3" as="h3" className="text-[12px] font-display font-semibold mb-2 uppercase tracking-wide print:text-[10px] text-foreground">
              Professional Experience
            </Typography>
            <div className="space-y-0 print-timeline pl-4 print:pl-3">
              {[
                {
                  period: "2023 — Present",
                  title: "Tall Karol — Principal Solutions Architect",
                  logo: "/tallkarol-monogram-logo.png",
                  bullets: [
                    "Scoping, designing, and shipping systems end-to-end across cloud infrastructure, API integrations, and MarTech — from pre-sales discovery through production deployment.",
                    "AWS document portals, Python ETL pipelines, UTM attribution, locally-hosted AI transcription (HuggingFace), GTM components, WordPress VIP performance (LCP 5.5s→3.2s).",
                    "AI-forward — LLM tooling for analysis, docs, and iteration; local AI tooling for inference, automation, and workflows without external data.",
                  ],
                },
                {
                  period: "2021 — 2023",
                  title: "Universal Windows Direct — Backend & Integration Engineer",
                  logo: "/uwd-logo.png",
                  bullets: [
                    "Automation infrastructure, API integrations, and internal tooling for marketing, sales, and operations.",
                    "Custom API connecting Five9, Mailchimp, CRM; shared logging framework; lead management systems; cron-based data pipelines; Joomla→WordPress migration with zero downtime.",
                  ],
                },
                {
                  period: "2021 — Present",
                  title: "Mineralife Nutraceuticals — Web & Marketing Systems Consultant",
                  logo: "/mineralife-logo.png",
                  bullets: [
                    "Engineering improvements across B2C ecommerce and B2B.",
                    "WooCommerce data dashboard for order/inventory/revenue; lifecycle automation and segmentation; integrations between WooCommerce, email, and analytics.",
                  ],
                },
                {
                  period: "2019 — 2021",
                  title: "Perfect Power Wash — Marketing Director / Head of IT",
                  logo: "/ppw.png",
                  bullets: [
                    "Owned strategy and technology stack during expansion from 1 to 4 markets.",
                    "Internal tooling for call center, lead management, marketing automation; hired and trained developer.",
                    "237% conversion increase, 175% CTR via A/B testing; data infrastructure and dashboards for multi-market visibility.",
                  ],
                },
                {
                  period: "2009 — 2019",
                  title: "Freelance Developer / Designer",
                  logo: "/logo.png",
                  bullets: [
                    "10 years of client-facing work: full-stack web development, brand strategy, ecommerce builds, digital infrastructure.",
                    "Expertise in requirements gathering, project scoping, and systems thinking that underpins current architecture work.",
                  ],
                },
              ].map((item, index, arr) => (
                <div
                  key={index}
                  className={`relative pl-4 border-l-2 pb-6 print:pb-4 last:pb-0 last:border-l-0 border-border/50 print-timeline-item`}
                >
                  <div className="absolute -left-[7px] top-0 h-2.5 w-2.5 print:h-2 print:w-2 rounded-full border-2 border-background bg-primary/50 print-timeline-dot" />
                  <div className="space-y-2 print:space-y-1">
                    <div className="flex items-center gap-2 print:gap-1.5">
                      {item.logo && (
                        <Image
                          src={item.logo}
                          alt=""
                          width={32}
                          height={32}
                          className="flex-shrink-0 h-8 w-8 print:h-6 print:w-6 object-contain"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <Typography variant="body" className="font-semibold text-[11px] print:text-[9px] text-foreground block">
                          {item.title}
                        </Typography>
                        <Typography variant="body-sm" className="text-[11px] print:text-[9px] text-muted-foreground font-medium">
                          {item.period}
                        </Typography>
                      </div>
                    </div>
                    <ul className="mt-1 p-2 print:p-0 print:mt-0.5 rounded-lg border bg-muted/30 border-border/50 print-flat space-y-1 print:space-y-0.5 pl-0">
                      {item.bullets.map((bullet, bi) => (
                        <li key={bi} className="flex items-start gap-2">
                          <span className="mt-1 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                          <Typography variant="body-sm" className="text-[11px] leading-relaxed print:text-[8px] text-muted-foreground italic">
                            {bullet}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Early Career Experience — two columns */}
            <div className="early-career-print-flat pt-4 print:pt-2 mt-4 print:mt-2 border-t border-border/50 print-flat">
              <Typography variant="body-sm" className="font-semibold text-foreground uppercase tracking-wide text-[12px] mb-2 print:mb-1 print:text-[10px]">
                Early Career Experience
              </Typography>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1 print:gap-x-4 pl-4">
                <ul className="space-y-1 print:space-y-0.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                    <Typography variant="body-sm" className="text-[11px] print:text-[9px] text-foreground">
                      <span className="font-semibold">Red Light Management</span> — Marketing / Design <span className="text-muted-foreground italic">(2016–18)</span>
                    </Typography>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                    <Typography variant="body-sm" className="text-[11px] print:text-[9px] text-foreground">
                      <span className="font-semibold">Localtopia</span> — Marketing & IT Consultant <span className="text-muted-foreground italic">(2014–15)</span>
                    </Typography>
                  </li>
                </ul>
                <ul className="space-y-1 print:space-y-0.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                    <Typography variant="body-sm" className="text-[11px] print:text-[9px] text-foreground">
                      <span className="font-semibold">CUBE Karaoke LLC</span> — Co-Founder / Creative Director <span className="text-muted-foreground italic">(2013–14)</span>
                    </Typography>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                    <Typography variant="body-sm" className="text-[11px] print:text-[9px] text-foreground">
                      <span className="font-semibold">in2itiv media LLC</span> — Co-Founder / CEO <span className="text-muted-foreground italic">(2012–13)</span>
                    </Typography>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Soft Skills */}
        <Card className="mb-3 print:mb-2 border-border/50 bg-muted/20 print:shadow-none">
          <CardContent className="pt-3 px-4 pb-4 print:pt-1 print:px-2 print:pb-2">
            <Typography variant="h3" as="h3" className="text-[12px] font-display font-semibold mb-1.5 uppercase tracking-wide print:text-[10px] text-foreground">
              Soft Skills
            </Typography>
            <ul className="space-y-1 print:space-y-0.5 pl-4">
              {[
                "Stakeholder Orchestration: Translates business objectives into technical requirements; communicates ROI and risk mitigation to C-suite and engineering teams alike.",
                "Autonomous Ownership: Leads the full architectural lifecycle—discovery, POC, and deployment—with zero oversight required.",
                "Strategic Scoping: Expert in technical discovery and SOW definition, balancing business velocity with technical feasibility.",
                "Systems Thinking: Aligns architectural decisions with long-term business outcomes to ensure technology serves as a revenue multiplier.",
                "Cross-Functional Leadership: Builds consensus across engineering, product, and marketing to drive complex, multi-departmental initiatives.",
              ].map((skill) => {
                const [label, ...rest] = skill.split(": ")
                return (
                  <li key={skill} className="flex items-start gap-2">
                    <span className="mt-1 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                    <Typography variant="body-sm" className="text-[11px] leading-relaxed print:text-[9px] text-foreground">
                      <strong>{label}:</strong> {rest.join(": ")}
                    </Typography>
                  </li>
                )
              })}
            </ul>
          </CardContent>
        </Card>

        {/* Technical Skills — own row */}
        <Card className="mb-3 print:mb-2 border-border/50 bg-muted/20 print:shadow-none">
          <CardContent className="pt-3 px-4 pb-4 print:pt-1 print:px-2 print:pb-2">
            <Typography variant="h3" as="h3" className="text-[12px] font-display font-semibold mb-1.5 uppercase tracking-wide print:text-[10px] text-foreground">
              Technical Skills
            </Typography>
            <div className="pl-4 space-y-1.5 print:space-y-1">
              <div className="grid grid-cols-1 sm:grid-cols-[11fr_9fr] gap-x-6 gap-y-1 print:grid-cols-[11fr_9fr] print:gap-x-4">
                <div className="space-y-1 print:space-y-0.5">
                  <Typography variant="body-sm" className="text-[11px] print:text-[9px] leading-tight text-foreground">
                    <strong>Cloud:</strong> AWS (Amplify, Lambda, Cognito, RDS, S3), GCP, Vercel, Supabase
                  </Typography>
                  <Typography variant="body-sm" className="text-[11px] print:text-[9px] leading-tight text-foreground">
                    <strong>Platforms:</strong> WordPress VIP, WooCommerce, GTM, GA4, Mailchimp, Five9, Zapier
                  </Typography>
                </div>
                <div className="space-y-1 print:space-y-0.5">
                  <Typography variant="body-sm" className="text-[11px] print:text-[9px] leading-tight text-foreground">
                    <strong>Languages:</strong> PHP, JavaScript, TypeScript, Python, SQL
                  </Typography>
                  <Typography variant="body-sm" className="text-[11px] print:text-[9px] leading-tight text-foreground">
                    <strong>Frameworks:</strong> React, Node.js, TailwindCSS
                  </Typography>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Education + Certifications — grid */}
        <div className="grid grid-cols-1 md:grid-cols-[9fr_11fr] gap-4 print:grid-cols-[9fr_11fr] print:gap-2 print:mb-0">
          <Card className="border-border/50 bg-muted/20 print:shadow-none">
            <CardContent className="pt-3 px-4 pb-4 print:pt-1 print:px-2 print:pb-2">
              <Typography variant="h3" as="h3" className="text-[12px] font-display font-semibold mb-1.5 uppercase tracking-wide print:text-[10px] text-foreground">
                Education
              </Typography>
              <div className="space-y-0.5 print:space-y-0 pl-4">
                <Typography variant="body-sm" className="text-[11px] print:text-[9px] text-foreground">
                  <strong>Case Western Reserve</strong> — Full Stack Web Development
                </Typography>
                <Typography variant="body-sm" className="text-[11px] print:text-[9px] text-foreground">
                  <strong>Miami University</strong> — International Marketing
                </Typography>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-muted/20 print:shadow-none">
            <CardContent className="pt-3 px-4 pb-4 print:pt-1 print:px-2 print:pb-2">
              <Typography variant="h3" as="h3" className="text-[12px] font-display font-semibold mb-1.5 uppercase tracking-wide print:text-[10px] text-foreground">
                Certifications
              </Typography>
              <div className="space-y-1 print:space-y-0.5 pl-4">
                <Typography variant="body-sm" className="text-[11px] print:text-[9px] text-foreground">
                  Google Cloud Digital Leader (GCP-DL) <span className="text-primary mx-1">|</span> Azure Fundamentals (AZ-900)
                </Typography>
                <Typography variant="body-sm" className="text-[11px] print:text-[9px] text-foreground">
                  AWS Solutions Architect Associate (SAA-C03)
                </Typography>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* References — bottom */}
        <Card className="mt-3 print:mt-2 border-border/50 bg-muted/20 print:shadow-none">
          <CardContent className="pt-3 px-4 pb-4 print:pt-1 print:px-2 print:pb-2">
            <Typography variant="h3" as="h3" className="text-[12px] font-display font-semibold mb-1.5 uppercase tracking-wide print:text-[10px] text-foreground">
              References
            </Typography>
            <div className="space-y-2 print:space-y-1.5 pl-4">
              <blockquote className="border-l-2 border-primary/40 pl-3 print-flat print-keep-accent-border">
                <Typography variant="body-sm" className="text-[11px] leading-relaxed print:text-[9px] italic text-foreground">
                  &ldquo;He&apos;s one of the rare professionals who can bridge the gap between deep technical capability and real business understanding. Whether the work involved internal tools, customer-facing platforms, or data connections between legacy systems, he always approached challenges with clarity, logic, and a calm, solutions-focused mindset.&rdquo;
                </Typography>
                <Typography variant="body-sm" className="text-[11px] print:text-[9px] font-semibold mt-1 text-foreground">
                  John Kosmides — Vice President of Marketing, Perfect Power Wash & Universal Windows Direct
                </Typography>
              </blockquote>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
