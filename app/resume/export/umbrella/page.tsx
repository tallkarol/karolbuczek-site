"use client"

import { useEffect } from "react"
import Image from "next/image"
import { Typography } from "@/components/typography"
import { Card, CardContent } from "@/components/ui/card"

export default function UmbrellaResumePage() {
  useEffect(() => {
    // Auto-trigger print dialog when page loads (for PDF generation)
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && window.location.search.includes("print=true")) {
        window.print()
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="print-resume min-h-screen bg-background" style={{ fontSize: '95%' }}>
      <div className="max-w-4xl mx-auto p-8 print:p-5 print:max-w-full">
        {/* Header */}
        <div className="mb-5 print:mb-3 grid grid-cols-[auto_1fr] gap-4 print:gap-3">
          {/* Logo Column */}
          <div className="flex-shrink-0">
            <div className="h-[112px] print:h-[92px] flex items-center">
              <Image
                src="/logo.png"
                alt="Karol Buczek Logo"
                width={112}
                height={112}
                className="rounded-lg print:w-[92px] print:h-[92px] object-contain"
                priority
              />
            </div>
          </div>
          {/* Text Column */}
          <div className="flex flex-col justify-center leading-tight">
            <Typography variant="h1" as="h1" className="text-[28px] font-display font-bold leading-tight print:text-[22px]">
              KAROL BUCZEK
            </Typography>
            <Typography variant="body" className="text-[15px] leading-tight print:text-[13px]">
              Integration Engineer · Solutions Architect · API & Cloud Automation
            </Typography>
            <Typography variant="body-sm" className="text-muted-foreground text-[13px] leading-tight print:text-[11px] pt-[5px]">
              🔗 karolbuczek.com · LinkedIn.com/in/karolbuczek
            </Typography>
          </div>
        </div>

        {/* Summary */}
        <Card className="mb-4 print:mb-3 border-border/50 bg-muted/20 print:shadow-none">
          <CardContent className="p-4 print:p-3">
            <Typography variant="h3" as="h3" className="text-[17px] font-display font-semibold mb-2 uppercase tracking-wide print:text-[15px] print:mb-1.5">
              SUMMARY
            </Typography>
            <div className="space-y-2 print:space-y-1.5">
              <Typography variant="body" className="text-[13px] leading-relaxed print:text-[11px]">
                Integration engineer and solutions architect with 7 years of hands-on delivery across API integrations, automation, data pipelines, and cloud applications. Former Marketing Director — I now build the systems I wish I&apos;d had. Currently running an independent practice with retained clients; looking for a full-time integration or implementation role.
              </Typography>
            </div>
          </CardContent>
        </Card>

        {/* Core Skills */}
        <Card className="mb-4 print:mb-3 border-border/50 bg-muted/20 print:shadow-none">
          <CardContent className="p-4 print:p-3">
            <Typography variant="h3" as="h3" className="text-[17px] font-display font-semibold mb-2 uppercase tracking-wide print:text-[15px] print:mb-1.5">
              CORE SKILLS
            </Typography>
            <div className="space-y-1 print:space-y-0.5">
              <Typography variant="body-sm" className="text-[13px] print:text-[11px]">
                <strong>Integration:</strong> REST APIs, webhooks, event-driven automation, ETL, Zapier, Workato
              </Typography>
              <Typography variant="body-sm" className="text-[13px] print:text-[11px]">
                <strong>Cloud:</strong> AWS (Lambda, Cognito, S3, RDS, Amplify), GCP, Vercel, Railway, Supabase
              </Typography>
              <Typography variant="body-sm" className="text-[13px] print:text-[11px]">
                <strong>Platforms:</strong> WordPress VIP, WooCommerce, Five9, Mailchimp, GA4/GTM
              </Typography>
              <Typography variant="body-sm" className="text-[13px] print:text-[11px]">
                <strong>Languages & frameworks:</strong> PHP, JavaScript/TypeScript, Python, SQL, React, Next.js, Node.js
              </Typography>
            </div>
          </CardContent>
        </Card>

        {/* Professional Experience */}
        <Card className="mb-4 print:mb-3 border-border/50 bg-muted/20 print:shadow-none">
          <CardContent className="p-4 print:p-3">
            <Typography variant="h3" as="h3" className="text-[17px] font-display font-semibold mb-2.5 uppercase tracking-wide print:text-[15px] print:mb-2">
              PROFESSIONAL EXPERIENCE
            </Typography>
            
            <div className="space-y-3 print:space-y-2">
              {/* Tall Karol */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1 print:mb-0.5">
                  <Typography variant="body" className="font-semibold text-[15px] print:text-[13px]">
                    Tall Karol — Independent Solutions Architect & Consultant
                  </Typography>
                  <Typography variant="body-sm" className="text-muted-foreground text-[13px] print:text-[11px]">
                    Jan 2023 – Present
                  </Typography>
                </div>
                <Typography variant="body-sm" className="text-[13px] leading-relaxed print:text-[11px]">
                  Solo consulting practice for retained and project clients: Great Day Improvements CRM/retail sync and WordPress VIP migration; AWS serverless document portal; Artist House A&R discovery platform (Next.js/PostgreSQL); Mineralife event-driven ecommerce/CRM/email sync and headless B2B site.
                </Typography>
              </div>

              {/* Universal Windows Direct */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1 print:mb-0.5">
                  <Typography variant="body" className="font-semibold text-[15px] print:text-[13px]">
                    Universal Windows Direct (Great Day Improvements) — Integration Engineer, Full Stack
                  </Typography>
                  <Typography variant="body-sm" className="text-muted-foreground text-[13px] print:text-[11px]">
                    Oct 2021 – Jan 2023
                  </Typography>
                </div>
                <Typography variant="body-sm" className="text-[13px] leading-relaxed print:text-[11px]">
                  Built a centralized integration layer connecting 7+ systems (Five9, CRM, Mailchimp, internal platforms) with shared logging; zero-downtime VPS migrations; server-side tagging for attribution and first-party data.
                </Typography>
              </div>

              {/* Perfect Power Wash */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1 print:mb-0.5">
                  <Typography variant="body" className="font-semibold text-[15px] print:text-[13px]">
                    Perfect Power Wash — Marketing Systems Engineer → Marketing Director
                  </Typography>
                  <Typography variant="body-sm" className="text-muted-foreground text-[13px] print:text-[11px]">
                    Apr 2019 – Sep 2021
                  </Typography>
                </div>
                <Typography variant="body-sm" className="text-[13px] leading-relaxed print:text-[11px]">
                  Modernized web and data infrastructure; led marketing and tech stack through expansion from one market to four. Built the first centralized data warehouse and internal tooling across call center, lead management, and automation.
                </Typography>
              </div>

              {/* Early Career */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1 print:mb-0.5">
                  <Typography variant="body" className="font-semibold text-[15px] print:text-[13px]">
                    Early Career — Freelance Development & Startups
                  </Typography>
                  <Typography variant="body-sm" className="text-muted-foreground text-[13px] print:text-[11px]">
                    2009 – 2019
                  </Typography>
                </div>
                <Typography variant="body-sm" className="text-[13px] leading-relaxed print:text-[11px]">
                  Ten years of client-facing full-stack web development and digital infrastructure; co-founded two ventures, raising $340K for one.
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Systems Work & Education - Side by side on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2 print:gap-3 print:mb-0">
          {/* Featured Systems Work */}
          <Card className="border-border/50 bg-muted/20 print:shadow-none">
            <CardContent className="p-4 print:p-3">
              <Typography variant="h3" as="h3" className="text-[17px] font-display font-semibold mb-2 uppercase tracking-wide print:text-[15px] print:mb-1.5">
                FEATURED SYSTEMS WORK
              </Typography>
              <Typography variant="body-sm" className="text-[13px] print:text-[11px]">
                Cross-brand CRM/retail sync · WordPress VIP migration · AWS RBAC document portal · A&R discovery platform · Event-driven ecommerce/CRM lifecycle sync · Centralized 7+ system integration layer
              </Typography>
            </CardContent>
          </Card>

          {/* Education */}
          <Card className="border-border/50 bg-muted/20 print:shadow-none">
            <CardContent className="p-4 print:p-3">
              <Typography variant="h3" as="h3" className="text-[17px] font-display font-semibold mb-2 uppercase tracking-wide print:text-[15px] print:mb-1.5">
                EDUCATION
              </Typography>
              <div className="space-y-1 print:space-y-0.5">
                <Typography variant="body-sm" className="text-[13px] print:text-[11px]">
                  <strong>Case Western Reserve University</strong> — Full Stack Web Development
                </Typography>
                <Typography variant="body-sm" className="text-[13px] print:text-[11px]">
                  <strong>Miami University</strong> — International Marketing
                </Typography>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

