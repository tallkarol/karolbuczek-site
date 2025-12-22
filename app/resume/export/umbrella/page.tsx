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
              Web Systems Engineer • Marketing Technology & Business Systems
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
                Systems engineer and marketing technology specialist with 10+ years building the operational infrastructure behind digital businesses. Strong track record designing full-stack web platforms, internal tools, data pipelines, attribution frameworks, performance remediation, and automation across websites, call centers, CRMs, and ecommerce.
              </Typography>
              <Typography variant="body" className="text-[13px] leading-relaxed print:text-[11px]">
                Known for translating complex business goals into reliable technical architecture and measurable outcomes. Work directly with marketing, sales, and operations leaders to define needs, design system solutions, and guide projects from planning to delivery.
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
                <strong>Engineering:</strong> PHP, JavaScript, TypeScript, React, Node.js, SQL, AWS, TailwindCSS, WordPress block/plugin development
              </Typography>
              <Typography variant="body-sm" className="text-[13px] print:text-[11px]">
                <strong>Systems & Ops:</strong> data pipelines, event schemas, reporting visibility, automation, APIs
              </Typography>
              <Typography variant="body-sm" className="text-[13px] print:text-[11px]">
                <strong>MarTech:</strong> Google Analytics, Google Tag Manager, Mailchimp, WooCommerce, Five9, Birdeye, Zapier
              </Typography>
              <Typography variant="body-sm" className="text-[13px] print:text-[11px]">
                <strong>Focus Areas:</strong> lead routing, attribution, lifecycle automation, system integrations, Core Web Vitals, performance tuning
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
                    Tall Karol — Systems Architect & Full-Stack Developer
                  </Typography>
                  <Typography variant="body-sm" className="text-muted-foreground text-[13px] print:text-[11px]">
                    2023 — Present
                  </Typography>
                </div>
                <Typography variant="body-sm" className="text-[13px] leading-relaxed print:text-[11px]">
                  Architecting full-stack solutions and operational systems: UTM attribution engine, data warehouse ingestion pipelines, AWS-based internal tools (Amplify, Cognito, Lambda, RDS, S3), and reusable GTM event schemas to standardize analytics and marketing automation.
                </Typography>
              </div>

              {/* Universal Windows Direct */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1 print:mb-0.5">
                  <Typography variant="body" className="font-semibold text-[15px] print:text-[13px]">
                    Universal Windows Direct — Backend & Integration Engineer (Full Stack)
                  </Typography>
                  <Typography variant="body-sm" className="text-muted-foreground text-[13px] print:text-[11px]">
                    2021 — 2023
                  </Typography>
                </div>
                <Typography variant="body-sm" className="text-[13px] leading-relaxed print:text-[11px]">
                  Built PHP/SQL automation frameworks for lead routing, attribution logic, and CRM/ops workflows. Managed API integrations (Five9, Mailchimp, Hover, Birdeye) and engineered data ingestion pipelines + VPS infrastructure improvements supporting marketing and operations.
                </Typography>
              </div>

              {/* Mineralife */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1 print:mb-0.5">
                  <Typography variant="body" className="font-semibold text-[15px] print:text-[13px]">
                    Mineralife Nutraceuticals — Web & Marketing Systems Consultant
                  </Typography>
                  <Typography variant="body-sm" className="text-muted-foreground text-[13px] print:text-[11px]">
                    2021 — Present
                  </Typography>
                </div>
                <Typography variant="body-sm" className="text-[13px] leading-relaxed print:text-[11px]">
                  Developing ecommerce and workflow automation: WooCommerce data dashboards, lifecycle automation, segmentation, performance/UX optimization, and analytics/event integrations for marketing visibility and retention.
                </Typography>
              </div>

              {/* Perfect Power Wash */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1 print:mb-0.5">
                  <Typography variant="body" className="font-semibold text-[15px] print:text-[13px]">
                    Perfect Power Wash — Marketing Director / Head of IT (Systems & Ops Engineering)
                  </Typography>
                  <Typography variant="body-sm" className="text-muted-foreground text-[13px] print:text-[11px]">
                    2019 — 2021
                  </Typography>
                </div>
                <Typography variant="body-sm" className="text-[13px] leading-relaxed print:text-[11px]">
                  Owned technology + marketing ops during multi-market expansion. Built internal workflow and lead systems, call center data operations, forecasting/reporting dashboards, and cross-department automation connecting ops, sales, and marketing.
                </Typography>
              </div>

              {/* Freelance */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1 print:mb-0.5">
                  <Typography variant="body" className="font-semibold text-[15px] print:text-[13px]">
                    Freelance Developer / Designer
                  </Typography>
                  <Typography variant="body-sm" className="text-muted-foreground text-[13px] print:text-[11px]">
                    2009 — 2019
                  </Typography>
                </div>
                <Typography variant="body-sm" className="text-[13px] leading-relaxed print:text-[11px]">
                  Full-stack web development, UX design, branding, ecommerce builds, and small-business digital infrastructure projects.
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
                UTM attribution & tracking engine · Data warehouse ingestion pipelines · GTM event schema framework · Lead normalization & routing logic · Core Web Vitals performance remediation · RBAC AWS document portal
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
                  <strong>Miami University</strong> — International Studies (with Marketing Coursework)
                </Typography>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

