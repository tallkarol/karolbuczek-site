"use client"

import { Typography } from "@/components/typography"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RoleFilter } from "./ResumeFilters"
import { getCaseStudiesForLens, lensToRoles } from "@/lib/resume-data"
import { CaseStudyCard } from "@/components/sections/CaseStudyCard"

interface RoleSectionProps {
  role: RoleFilter
  isVisible: boolean
}

const roleContent: Record<RoleFilter, { title: string; items: string[] }> = {
  "all": { title: "", items: [] },
  "WordPress Engineering": {
    title: "WordPress Engineering",
    items: [
      "Custom WordPress plugins and Gutenberg blocks",
      "Performance Block (LCP 5.5 → 3.2) — Built a VIP-compliant Gutenberg performance block reducing LCP 5.5s → 3.2s; Lighthouse 70 → 83",
      "UTM Attribution Plugin — Enables reliable direct-mail → digital tracking",
      "GTM Event Button Block — Standardizes events for marketers",
      "Headless WordPress (React + ACF) — Early-stage architecture for decoupled WordPress",
    ],
  },
  "MarTech / Growth Engineering": {
    title: "MarTech / Growth Engineering",
    items: [
      "Attribution, Funnels & Event Architecture — Built multi-touch attribution layers for direct mail → digital funnels",
      "Designed standardized dataLayer event schemas for GTM across enterprise sites",
      "Refactored massive Zapier flows (70+ steps) into modular SubZap systems",
      "Automated ingestion & syncing of leads, CRM data, call center stats",
      "Produced dashboards for sales efficiency, ROI, and channel performance",
      "APIs integrated: Mailchimp, Birdeye, Five9, ServiceTitan, LeadPerfection, Hover, HatchApp, Various CRMs",
    ],
  },
  "Product & Internal Tools": {
    title: "Product & Internal Tools",
    items: [
      "AWS Secure File Portal (Amplify App) — A role-based system for secure document workflows",
      "Tech: React, Amplify, Cognito, S3, RDS, Lambda",
      "Features: Folder isolation via Lambda on user creation, Signed URLs, Delete-protection & retention windows, Audit logs, Admin + User + Dev roles, Error trace dashboard",
      "Built end-to-end: architecture → database → frontend → deployment",
    ],
  },
  "Integrations & Automation": {
    title: "Integrations & Automation",
    items: [
      "Backend Workflow Systems (PHP + SQL + Cron) — Wrote production scripts handling workflow routing, notifications, funnel logic, follow-up sequences, and API interactions",
      "Large-table SQL operations for sales/marketing datasets",
      "Error logging frameworks + tracing utilities for maintainability",
      "Lead Ingestion Pipelines — Normalized and transformed incoming aggregator payloads. Synced into CRMs + downstream workflows",
    ],
  },
  "Performance Engineering": {
    title: "Performance Engineering",
    items: [
      "Core Web Vitals Optimization — Identified render inefficiencies in hero blocks & image delivery",
      "Built a VIP-compliant plugin to replace the slow components",
      "Improvements (averaged Lighthouse tests): LCP: 5.5s → 3.2s, Performance Score: 70 → 83, Speed Index: 5.9s → 5.7s",
    ],
  },
  "Startup Experience": {
    title: "Startup Experience",
    items: [
      "CUBE Karaoke (2013-2014) — Co-founder / Creative Director. Designed full customer experience, conducted product research, built marketing tech flows and brand systems",
      "in2itiv media (2012-2013) — Co-founder / CEO. Developed event operations pipelines, coordinated teams/logistics/budgets, built early promotional systems and web assets",
      "Early freelance work (2009-2019) — Full-stack WordPress builds, early internal tool development, brand systems, API-based customizations. Foundation for later systems thinking",
      "These experiences taught product ownership, cross-functional collaboration, and building systems from scratch — skills that translate directly to internal tools and product engineering roles",
    ],
  },
  "Implementation Engineer": {
    title: "Implementation Engineer",
    items: [
      "5+ years integrating Web APIs and providing technical consultation for complex integration projects",
      "Experience working with distributed systems, database design, and systems architecture",
      "Translating business requirements and workflows into technical solutions that deliver value",
      "Identifying and communicating pragmatic solutions to complex integration problems",
      "Empathetic to customer and end-user needs with ability to bridge technical and business perspectives",
      "Comfortable leading meetings with high-level decision makers and navigating ambiguity",
      "Proven ability to quickly learn new technologies, understand complex systems (APIs, databases, SDKs), and improve technical acumen",
      "Backend workflow systems integrating Mailchimp, Birdeye, Five9, CRMs, and lead aggregators",
      "Modular Zapier architectures replacing brittle 70+ step workflows with maintainable systems",
      "Full-stack AWS implementations (Amplify, Cognito, S3, RDS, Lambda) with role-based access and audit logging",
      "API integrations and data pipelines handling large datasets with custom error handling",
    ],
  },
}

export function RoleSection({ role, isVisible }: RoleSectionProps) {
  if (!isVisible || role === "all") return null

  const content = roleContent[role]
  if (!content) return null

  const relatedRoles = lensToRoles[role] || []
  const relatedCaseStudies = getCaseStudiesForLens(role)

  return (
    <div className="space-y-8">
      <Card className="border-border/50 bg-card">
        <CardHeader className="pb-4 border-b border-border/30">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-1 w-1 rounded-full bg-primary" />
            <CardTitle className="text-lg font-display">Lens: {content.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {relatedRoles.length > 0 && (
            <div>
              <Typography variant="body-sm" className="font-semibold mb-2 text-foreground">
                Related Roles & Positions:
              </Typography>
              <ul className="space-y-1">
                {relatedRoles.map((relatedRole, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <Typography variant="body-sm" className="text-muted-foreground">
                      {relatedRole}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div>
            <Typography variant="body-sm" className="font-semibold mb-4 text-foreground">
              Highlights:
            </Typography>
            <ul className="space-y-3">
              {content.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3 group">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 group-hover:scale-125 transition-transform" />
                  <Typography variant="body-sm" className="text-muted-foreground leading-relaxed flex-1">
                    {item}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {relatedCaseStudies.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-primary" />
            <Typography variant="h3" as="h3" className="text-lg font-display font-semibold">
              Related Case Studies
            </Typography>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedCaseStudies.map((caseStudy, index) => (
              <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

