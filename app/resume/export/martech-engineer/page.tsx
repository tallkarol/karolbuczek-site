"use client"

import { useEffect } from "react"
import Image from "next/image"
import { Typography } from "@/components/typography"
import { Card, CardContent } from "@/components/ui/card"

export default function MartechEngineerResumePage() {
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
      <div className="max-w-4xl mx-auto p-8 print:p-4 print:max-w-full">
        {/* Header */}
        <div className="mb-5 print:mb-2.5 grid grid-cols-[auto_1fr] gap-4 print:gap-2">
          {/* Left Column: Logo + Name + Title */}
          <div className="flex items-start gap-3 print:gap-2">
            <div className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Karol Buczek Logo"
                width={60}
                height={60}
                className="rounded-lg print:w-[45px] print:h-[45px] object-contain"
                priority
              />
            </div>
            <div className="flex flex-col leading-tight">
              <Typography variant="h1" as="h1" className="text-[28px] font-display font-bold leading-tight print:text-[21px] text-foreground">
                KAROL BUCZEK
              </Typography>
              <Typography variant="body" className="text-[15px] leading-tight print:text-[12px] text-foreground">
                Senior Software Engineer, Marketing Technology
              </Typography>
            </div>
          </div>
          {/* Right Column: Tagline + Links (right-aligned) */}
          <div className="flex flex-col justify-end items-end text-right leading-tight">
            <Typography variant="body-sm" className="text-muted-foreground text-[13px] leading-tight print:text-[10px] mb-1 print:mb-0">
              Web Systems • Analytics • Attribution
            </Typography>
            <Typography variant="body-sm" className="text-muted-foreground text-[13px] leading-tight print:text-[10px]">
              🔗 karolbuczek.com · LinkedIn.com/in/karolbuczek
            </Typography>
          </div>
        </div>

        {/* Summary */}
        <Card className="mb-4 print:mb-2.5 border-border/50 bg-muted/20 print:shadow-none">
          <CardContent className="p-4 print:p-2.5">
            <Typography variant="h3" as="h3" className="text-[17px] font-display font-semibold mb-2 uppercase tracking-wide print:text-[14px] print:mb-1 text-foreground">
              SUMMARY
            </Typography>
            <div className="space-y-2 print:space-y-1.5">
              <Typography variant="body" className="text-[13px] leading-relaxed print:text-[10px] print:leading-relaxed text-foreground">
                Senior software engineer specializing in marketing technology, analytics, and attribution systems. 10+ years working across marketing, data, and engineering roles, with deep experience designing and maintaining privacy-compliant tracking architectures across GA4, GTM, ad platforms, ecommerce, and CRM environments.
              </Typography>
              <Typography variant="body" className="text-[13px] leading-relaxed print:text-[10px] print:leading-relaxed text-foreground">
                Known for building durable event schemas, attribution frameworks, and automation that marketing teams can trust—particularly in regulated, high-risk, or multi-channel contexts. Experienced collaborating with engineering, marketing, and compliance teams to translate business goals into scalable, privacy-first technical solutions. AI-forward in practice, using LLM-based tooling to support analysis, validation, and system iteration where appropriate.
              </Typography>
            </div>
          </CardContent>
        </Card>

        {/* Core Skills */}
        <Card className="mb-4 print:mb-2.5 border-border/50 bg-muted/20 print:shadow-none">
          <CardContent className="p-4 print:p-2.5">
            <Typography variant="h3" as="h3" className="text-[17px] font-display font-semibold mb-2 uppercase tracking-wide print:text-[14px] print:mb-1 text-foreground">
              CORE SKILLS
            </Typography>
            <div className="space-y-1 print:space-y-1">
              <Typography variant="body-sm" className="text-[13px] print:text-[10px] print:leading-relaxed text-foreground">
                <strong className="text-foreground">Marketing Technology & Analytics:</strong> Google Tag Manager (GTM), Google Analytics 4 (GA4), ad pixels, server-side conversions, attribution modeling, event schemas, data layers, consent management, privacy compliance (GDPR, CCPA, CPRA)
              </Typography>
              <Typography variant="body-sm" className="text-[13px] print:text-[10px] print:leading-relaxed text-foreground">
                <strong className="text-foreground">Software Engineering:</strong> JavaScript, TypeScript, PHP, SQL, APIs, Node.js, React, AWS (Lambda, RDS, S3), WordPress block and plugin development
              </Typography>
              <Typography variant="body-sm" className="text-[13px] print:text-[10px] print:leading-relaxed text-foreground">
                <strong className="text-foreground">Platforms & Integrations:</strong> Meta Ads, Google Ads, ecommerce tracking (DTC & B2B), CRM integrations, data ingestion pipelines, reporting validation
              </Typography>
            </div>
          </CardContent>
        </Card>

        {/* Professional Experience */}
        <Card className="mb-4 print:mb-2.5 border-border/50 bg-muted/20 print:shadow-none">
          <CardContent className="p-4 print:p-2.5">
            <Typography variant="h3" as="h3" className="text-[17px] font-display font-semibold mb-2.5 uppercase tracking-wide print:text-[14px] print:mb-1.5 text-foreground">
              PROFESSIONAL EXPERIENCE
            </Typography>
            
            <div className="space-y-3 print:space-y-2">
              {/* Tall Karol */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-0.5 print:mb-0">
                  <Typography variant="body" className="font-semibold text-[15px] print:text-[12px] leading-tight text-foreground">
                    Tall Karol — Systems Architect & Principal Consultant
                  </Typography>
                  <Typography variant="body-sm" className="text-muted-foreground text-[13px] print:text-[10px]">
                    2023 — Present
                  </Typography>
                </div>
                <Typography variant="body-sm" className="text-[13px] leading-relaxed print:text-[10px] print:leading-relaxed text-foreground">
                  Design and implement marketing technology systems with a focus on attribution integrity, analytics reliability, and privacy-aware data collection. Architected reusable GTM event schemas, UTM attribution engines, server-side tracking pipelines, and AWS-based internal tools supporting marketing, operations, and analytics workflows. Partner closely with stakeholders to translate business requirements into scalable, compliant technical architectures.
                </Typography>
              </div>

              {/* Divider */}
              <div className="border-t border-border/20 print:border-border/10" />

              {/* Universal Windows Direct */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-0.5 print:mb-0">
                  <Typography variant="body" className="font-semibold text-[15px] print:text-[12px] leading-tight text-foreground">
                    Universal Windows Direct — Backend & Integration Engineer (Full Stack)
                  </Typography>
                  <Typography variant="body-sm" className="text-muted-foreground text-[13px] print:text-[10px]">
                    2021 — 2023
                  </Typography>
                </div>
                <Typography variant="body-sm" className="text-[13px] leading-relaxed print:text-[10px] print:leading-relaxed text-foreground">
                  Built and maintained automation frameworks for lead routing, attribution logic, and CRM workflows using PHP, SQL, GTM, and server-side integrations. Implemented pixel-based and server-side tracking across advertising platforms, ecommerce funnels, and call-center systems. Collaborated with marketing and data teams to improve attribution accuracy and reporting consistency across environments.
                </Typography>
              </div>

              {/* Divider */}
              <div className="border-t border-border/20 print:border-border/10" />

              {/* Mineralife */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-0.5 print:mb-0">
                  <Typography variant="body" className="font-semibold text-[15px] print:text-[12px] leading-tight text-foreground">
                    Mineralife Nutraceuticals — Marketing & Systems Consultant
                  </Typography>
                  <Typography variant="body-sm" className="text-muted-foreground text-[13px] print:text-[10px]">
                    2021 — Present
                  </Typography>
                </div>
                <Typography variant="body-sm" className="text-[13px] leading-relaxed print:text-[10px] print:leading-relaxed text-foreground">
                  Develop and maintain ecommerce and marketing data systems across B2B and B2C brands operating in U.S. and EU markets. Implemented GDPR-aware cookie consent strategies, server-side conversion tracking for paid media, and GCLID-based attribution for lead generation. Supported higher-risk supplement payment environments through compliant tracking configurations and custom checkout flows.
                </Typography>
              </div>

              {/* Divider */}
              <div className="border-t border-border/20 print:border-border/10" />

              {/* Perfect Power Wash */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-0.5 print:mb-0">
                  <Typography variant="body" className="font-semibold text-[15px] print:text-[12px] leading-tight text-foreground">
                    Perfect Power Wash — Marketing Director / Head of IT
                  </Typography>
                  <Typography variant="body-sm" className="text-muted-foreground text-[13px] print:text-[10px]">
                    2019 — 2021
                  </Typography>
                </div>
                <Typography variant="body-sm" className="text-[13px] leading-relaxed print:text-[10px] print:leading-relaxed text-foreground">
                  Owned marketing technology and operational systems during multi-market expansion. Designed analytics and attribution frameworks, pixel implementations, and data pipelines supporting paid media, call centers, and field operations. Built internal dashboards and automation to improve performance visibility, forecasting, and cross-department alignment.
                </Typography>
              </div>

              {/* Divider */}
              <div className="border-t border-border/20 print:border-border/10" />

              {/* Freelance */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-0.5 print:mb-0">
                  <Typography variant="body" className="font-semibold text-[15px] print:text-[12px] leading-tight text-foreground">
                    Freelance Designer / Developer
                  </Typography>
                  <Typography variant="body-sm" className="text-muted-foreground text-[13px] print:text-[10px]">
                    2009 — 2019
                  </Typography>
                </div>
                <Typography variant="body-sm" className="text-[13px] leading-relaxed print:text-[10px] print:leading-relaxed text-foreground">
                  Delivered full-stack web development, ecommerce systems, and digital infrastructure for small and mid-sized businesses. Early work across UX, frontend, backend, and systems integration established a foundation for later specialization in marketing technology and analytics engineering.
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Systems Work & Education - Side by side on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2 print:gap-2 print:mb-0">
          {/* Featured Systems Work */}
          <Card className="border-border/50 bg-muted/20 print:shadow-none">
            <CardContent className="p-4 print:p-2.5">
              <Typography variant="h3" as="h3" className="text-[17px] font-display font-semibold mb-2 uppercase tracking-wide print:text-[14px] print:mb-1 text-foreground">
                FEATURED SYSTEMS WORK
              </Typography>
              <Typography variant="body-sm" className="text-[13px] print:text-[10px] leading-tight text-foreground">
                UTM attribution and persistence engine · Server-side conversion tracking (Meta, Google Ads) · GTM data layer and event schema frameworks · Lead normalization and routing systems · Privacy-aware analytics instrumentation · AWS-based internal tools and document portals
              </Typography>
            </CardContent>
          </Card>

          {/* Education */}
          <Card className="border-border/50 bg-muted/20 print:shadow-none">
            <CardContent className="p-4 print:p-2.5">
              <Typography variant="h3" as="h3" className="text-[17px] font-display font-semibold mb-2 uppercase tracking-wide print:text-[14px] print:mb-1 text-foreground">
                EDUCATION
              </Typography>
              <div className="space-y-1 print:space-y-0">
                <Typography variant="body-sm" className="text-[13px] print:text-[10px] leading-tight text-foreground">
                  <strong className="text-foreground">Case Western Reserve University</strong> — Full Stack Web Development
                </Typography>
                <Typography variant="body-sm" className="text-[13px] print:text-[10px] leading-tight text-foreground">
                  <strong className="text-foreground">Miami University</strong> — International Studies (Marketing Coursework)
                </Typography>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

