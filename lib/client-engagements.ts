import type { CaseStudyPerformance } from "@/lib/case-study-performance"

export type ClientMetricRow = {
  label: string
  before?: string
  after?: string
  value?: string
}

export type ClientDashboard = {
  id: string
  /** Matches engagement.client in WorkExperienceSection */
  client: string
  role: string
  period: string
  logo?: string
  coverImage: string
  images: string[]
  imageFit?: "cover" | "contain"
  summary: string
  bullets: string[]
  metrics: ClientMetricRow[]
  techStack: string[]
  performanceSlug?: string
  portfolioSlug?: string
}

/** Tall Karol client dashboards — single source for resume engagement modals. */
export const clientDashboards: ClientDashboard[] = [
  {
    id: "gdi",
    client: "Great Day Improvements",
    role: "Systems Integration & WordPress VIP Engineering",
    period: "Apr 2025 – Present",
    logo: "/gdi-logo.svg",
    coverImage: "/wordpress-mhat-portal-plugin.png",
    images: [
      "/wordpress-mhat-portal-plugin.png",
      "/wordpress-persistent-utm.png",
      "/wordpress-webvitals-block.png",
    ],
    summary:
      "Modular integration architecture across 8 brands, plus contributing engineering on the enterprise WordPress VIP migration for marketing self-serve.",
    bullets: [
      "Built a modular integration architecture across 8 brands, connecting multiple CRMs and third-party vendors into shared cross-brand workflows.",
      "Contributing engineer on an enterprise-wide migration consolidating all brand websites onto a single WordPress VIP platform: custom Gutenberg blocks, reusable patterns, and templates that let marketing teams build pages without developer tickets.",
    ],
    metrics: [
      { label: "Brands integrated", value: "8" },
      { label: "Lighthouse performance", before: "70", after: "83" },
      { label: "LCP", before: "5.5s", after: "3.2s" },
      { label: "Platform", value: "WordPress VIP" },
    ],
    techStack: ["WordPress VIP", "Gutenberg", "PHP", "JavaScript", "REST APIs", "CRM integrations"],
    performanceSlug: "martech-extension-architecture",
    portfolioSlug: "martech-extension-architecture",
  },
  {
    id: "mineralife",
    client: "Mineralife Nutraceuticals",
    role: "Marketing Systems Consultant — Ecommerce & B2B",
    period: "2021 – Present",
    logo: "/mineralife-logo.png",
    coverImage: "/website-builds/mineralife-b2b.jpg",
    images: [
      "/website-builds/mineralife-b2b.jpg",
      "/mineralife-logo.png",
    ],
    summary:
      "Headless WordPress + React B2B rebuild, qualified lead capture, and lifecycle systems — with a custom CRM path built to sales-team specifications.",
    bullets: [
      "Built a custom B2B sales-workflow interface to qualify inquiries and manage opportunities from submission through conversion.",
      "Re-architected the B2B website as a headless WordPress + React application, preserving WordPress for content management while replacing the legacy frontend with a leaner delivery layer.",
    ],
    metrics: [
      { label: "Mobile Lighthouse", before: "67", after: "94" },
      { label: "Time to Interactive", before: "14.6s", after: "3.1s" },
      { label: "Network requests", before: "109", after: "51" },
      { label: "Page weight", before: "~13.3 MB", after: "~535 KB" },
    ],
    techStack: ["WordPress (headless)", "React", "Next.js", "TypeScript", "Vercel", "CRM integration"],
    performanceSlug: "mineralife-b2b-website-rebuild",
    portfolioSlug: "mineralife-b2b-website-rebuild",
  },
  {
    id: "bliss",
    client: "Bliss",
    role: "Audit & certification provider — Secure Document Portal",
    period: "Project engagement",
    logo: "/bliss-cb.png",
    coverImage: "/bliss-user-portal-view.png",
    images: [
      "/bliss-user-portal-view.png",
      "/bliss-admin-portal-view.png",
      "/bliss-dev-portal-view.png",
      "/bliss-inbox.png",
    ],
    summary:
      "Serverless AWS document portal with managed identity, signed-URL delivery, RBAC, and immutable audit logging — replacing email-based file sharing.",
    bullets: [
      "Designed and shipped a serverless document portal on AWS using managed identity and signed-URL file delivery to enforce role-based access with immutable audit logging.",
      "Replaced email-based file sharing for compliance-sensitive workflows.",
    ],
    metrics: [
      { label: "Architecture", value: "Serverless AWS" },
      { label: "Access model", value: "RBAC + Cognito" },
      { label: "File delivery", value: "Signed URLs" },
      { label: "Audit trail", value: "Immutable" },
    ],
    techStack: ["AWS Amplify", "AWS Cognito", "AWS Lambda", "Amazon S3", "Amazon RDS", "React"],
    portfolioSlug: "secure-document-management-portal",
  },
  {
    id: "artist-house",
    client: "Artist House",
    role: "Full-Stack Engineer — A&R Discovery Platform",
    period: "Project engagement",
    logo: "/artisthouse_logo_square.png",
    coverImage: "/artisthouse_logo_square.png",
    images: ["/artisthouse_logo_square.png", "/artisthouse_logo.webp"],
    imageFit: "contain",
    summary:
      "Production A&R discovery platform used daily by junior and senior A&R staff — analytics, crawls, reports, and watchlists.",
    bullets: [
      "Built and shipped a production A&R discovery platform used daily by junior and senior A&R staff: role-based analytics, automated chart/social crawls, XLSX reports, email delivery, and artist watchlists.",
      "Next.js/TypeScript application with a PostgreSQL backend, deployed on Vercel and Railway.",
    ],
    metrics: [
      { label: "Stack", value: "Next.js + PostgreSQL" },
      { label: "Users", value: "A&R staff (daily)" },
      { label: "Deploy", value: "Vercel + Railway" },
      { label: "Outputs", value: "XLSX · email · watchlists" },
    ],
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Vercel", "Railway"],
  },
]

export function getClientDashboard(client: string): ClientDashboard | undefined {
  return clientDashboards.find((d) => d.client === client)
}

/** Compact headline rows for dashboard tables when full performance data exists. */
export function performanceToMetricRows(data: CaseStudyPerformance): ClientMetricRow[] {
  if (!data.headline?.length) return []
  return data.headline.map((h) => ({
    label: h.label,
    before: `${h.before}${typeof h.before === "number" && h.unit ? h.unit : ""}`,
    after: `${h.after}${typeof h.after === "number" && h.unit ? h.unit : ""}`,
  }))
}
