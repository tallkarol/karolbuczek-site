import { allCaseStudies } from "@/lib/resume-data"
import type { CaseStudy } from "@/components/sections/CaseStudyCard"

export interface WhatIDoStat {
  value: string
  label: string
  /** Optional improvement badge, derived from the value's before → after pair */
  delta?: string
}

export interface WhatIDoSpec {
  title: string
  detail: string
}

/** Deep link into the resume's work-experience RoleModal (/resume?role=<roleId>) */
export interface WhatIDoRoleLink {
  label: string
  sublabel?: string
  roleId: string
}

export interface WhatIDoPillar {
  id: "architect" | "integrate" | "build"
  name: string
  /** Short description shown on the homepage card */
  tagline: string
  /** One-line answer to "what does he mean by <name>?" — modal header */
  headline: string
  /** Supporting paragraph in the modal header */
  summary: string
  /** Bullets shown on the homepage card */
  cardSkills: string[]
  /** Real, verifiable numbers only — sourced from resume data */
  stats: WhatIDoStat[]
  /**
   * Working principles that back up the stats and case studies — each bullet
   * is grounded in a specific resume item (role bullet or case-study constraint).
   */
  approach: string[]
  /** Concrete examples with exact specs */
  specs: WhatIDoSpec[]
  caseStudySlugs: string[]
  roleLinks: WhatIDoRoleLink[]
  techStack: string[]
}

export const whatIDoPillars: WhatIDoPillar[] = [
  {
    id: "architect",
    name: "Architect",
    tagline: "Solution design from discovery through deployment.",
    headline: "Owning the solution from first discovery call to deployed system.",
    summary:
      "Scoping requirements directly with stakeholders, choosing the platform trade-offs, documenting the design — and staying hands-on through delivery when the solution requires it.",
    cardSkills: [
      "Pre-sales scoping, requirements analysis, and stakeholder alignment",
      "Cloud architecture on AWS (Lambda, S3, RDS, Cognito, Amplify)",
      "API design, integration layer architecture, and system documentation",
      "Full-stack engineering when the solution requires it",
    ],
    stats: [
      { value: "7 yrs", label: "Hands-on client delivery" },
      { value: "15+ yrs", label: "Coding experience" },
      { value: "SMB → Enterprise", label: "Client range" },
    ],
    approach: [
      "Requirements come from the people who own the problem — scoping happens in discovery calls with stakeholders directly, not through layers of handoff.",
      "Platform choices follow constraints, not preferences: a client with no DevOps team got serverless; NDA-governed audio got on-premise inference; a marketing team that needed WordPress kept it — headless.",
      "Trade-offs are made explicit and documented, so the reasoning behind every platform decision survives the project.",
      "The design isn't the deliverable — the working system is. When the engagement calls for it, I build what I architect, from first commit through production.",
    ],
    specs: [
      {
        title: "Serverless document portal on AWS",
        detail:
          "Multi-tenant portal with Cognito identity, Lambda, S3 Signed-URL delivery, and RDS — role-based access control and audit logging with zero infrastructure management.",
      },
      {
        title: "Decoupled commerce data layer",
        detail:
          "Event-driven sync engine bridging WooCommerce and a centralized Supabase/PostgreSQL backend, so lifecycle automation runs on real commerce events instead of batch jobs.",
      },
      {
        title: "Air-gapped AI pipeline",
        detail:
          "On-premise transcription and action-item extraction using local Whisper inference — zero external data transmission for NDA-governed environments.",
      },
    ],
    // Ordered to match specs[] for combined example cards in the modal
    caseStudySlugs: [
      "secure-document-management-portal",
      "unified-customer-lifecycle-platform",
      "local-ai-meeting-intelligence",
    ],
    roleLinks: [
      {
        label: "Tall Karol — Independent Solutions Architect & Consultant",
        sublabel: "2023 — Present · Client engagements with per-client dashboards",
        roleId: "tall-karol",
      },
    ],
    techStack: [
      "AWS Cognito",
      "AWS Lambda",
      "Amazon S3",
      "Amazon RDS",
      "React",
      "PostgreSQL",
      "Supabase",
      "Serverless Architecture",
    ],
  },
  {
    id: "integrate",
    name: "Integrate",
    tagline: "Connect platforms and orchestrate data across the stack.",
    headline: "Making the platforms a business already runs on talk to each other.",
    summary:
      "CRM, marketing, call center, and commerce systems connected so data moves without manual handoffs — with shared logging and error handling so failures are visible instead of silent.",
    cardSkills: [
      "REST API integrations across CRM, marketing, call center, and ecommerce platforms",
      "Data pipeline architecture — ingestion, transformation, and warehouse delivery",
      "ETL middleware, event-driven automation, and error-handling frameworks",
      "Zapier and custom scripting automation at scale",
    ],
    stats: [
      { value: "8 brands", label: "Cross-brand integration architecture" },
      { value: "24/7", label: "Call-center & CRM operations supported" },
      { value: "5 → 1", label: "Tools replaced by one unified portal", delta: "−80%" },
    ],
    approach: [
      "Failures are visible, never silent — every integration ships with shared logging and error handling, so problems are traceable across systems instead of discovered weeks later.",
      "Modular by default: new platforms onboard through standardized routes without refactoring what's already running.",
      "Built for operations that don't stop — automations supporting 24/7 call-center and CRM workflows have to fail gracefully and recover without manual intervention.",
      "Data moves on real events, not overnight batch jobs — lifecycle automation fires from actual commerce activity, so the data is current when the business acts on it.",
    ],
    specs: [
      {
        title: "Centralized integration API",
        detail:
          "A modular service connecting Five9, Mailchimp, CRM, and internal platforms — a shared logging and error-handling framework made failures traceable across every automation.",
      },
      {
        title: "Multi-brand CRM orchestration",
        detail:
          "Modular integration architecture connecting multiple CRMs and third-party vendors into shared cross-brand workflows across 8 brands.",
      },
      {
        title: "Zero-downtime migrations",
        detail:
          "Server infrastructure migrated across four VPS partitions with no downtime — modernizing legacy PHP and removing deprecated security risks.",
      },
    ],
    // Ordered to match specs[] for combined example cards in the modal
    caseStudySlugs: [
      "uwd-enterprise-integration-api",
      "unified-customer-lifecycle-platform",
      "martech-extension-architecture",
    ],
    roleLinks: [
      {
        label: "Universal Windows Direct — Integration Engineer",
        sublabel: "2021 — 2023 · Enterprise integration infrastructure",
        roleId: "uwd",
      },
      {
        label: "Tall Karol — Great Day Improvements engagement",
        sublabel: "2025 — Present · 8-brand integration architecture",
        roleId: "tall-karol",
      },
    ],
    techStack: [
      "REST APIs",
      "Five9 API",
      "Mailchimp API",
      "Webhooks",
      "PHP",
      "MySQL",
      "Cron Automation",
      "AWS S3",
    ],
  },
  {
    id: "build",
    name: "Build",
    tagline: "Ship production applications from first commit to launch.",
    headline: "Production applications shipped end to end — measured by real numbers.",
    summary:
      "Custom web apps, enterprise WordPress, and the internal tools teams use daily. The proof is in the performance data, not just the launch.",
    cardSkills: [
      "Custom web applications — Next.js/React, TypeScript, and PostgreSQL",
      "Enterprise WordPress engineering — VIP platforms, custom Gutenberg blocks, and plugins",
      "Serverless AWS applications with managed identity and role-based access",
      "Internal tools, dashboards, and reporting infrastructure teams use daily",
    ],
    stats: [
      { value: "51 → 94", label: "Mobile Lighthouse score (B2B rebuild)", delta: "+43 pts" },
      { value: "12.5s → 3.1s", label: "Time to interactive", delta: "4× faster" },
      { value: "314 → 51", label: "Network requests", delta: "−84%" },
    ],
    approach: [
      "Every build is measured before and after — Lighthouse scores, time to interactive, request counts. A launch without numbers is a launch you can't defend.",
      "Software is built to the spec of the people using it daily: lead forms designed with the sales team, analytics dashboards A&R staff actually open, admin tooling marketing runs without developer tickets.",
      "Production means production — role-based access, audit logging, and deployment pipelines are part of the build, not an afterthought.",
      "Systems are handed off maintainable: at Perfect Power Wash I hired and trained the developer who extended what I built after I moved up.",
    ],
    specs: [
      {
        title: "Headless WordPress + React",
        detail:
          "Full B2B rebuild keeping WordPress for content management with a leaner React delivery layer on Vercel — plus qualifying lead forms feeding a custom CRM built to sales-team spec.",
      },
      {
        title: "Production A&R platform",
        detail:
          "Next.js/TypeScript application with a PostgreSQL backend, used daily by A&R staff: role-based analytics, automated chart and social crawls, XLSX reports, and watchlists.",
      },
      {
        title: "Enterprise WordPress VIP",
        detail:
          "Custom Gutenberg blocks, reusable patterns, and templates that let marketing teams build pages without developer tickets — on a consolidated multi-brand platform.",
      },
    ],
    // Ordered to match specs[] for combined example cards in the modal
    caseStudySlugs: [
      "mineralife-b2b-website-rebuild",
      "secure-document-management-portal",
      "martech-extension-architecture",
    ],
    roleLinks: [
      {
        label: "Tall Karol — Independent Solutions Architect & Consultant",
        sublabel: "2023 — Present · Artist House, Mineralife, Bliss & more",
        roleId: "tall-karol",
      },
      {
        label: "Perfect Power Wash — Marketing Systems Engineer → Director",
        sublabel: "2019 — 2021 · Data warehouse & internal tooling",
        roleId: "perfect-power-wash",
      },
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "WordPress VIP",
      "Vercel",
      "PHP",
      "Tailwind CSS",
    ],
  },
]

export function getPillarCaseStudies(pillar: WhatIDoPillar): CaseStudy[] {
  return pillar.caseStudySlugs
    .map((slug) => allCaseStudies.find((cs) => cs.slug === slug))
    .filter((cs): cs is CaseStudy => Boolean(cs))
}
