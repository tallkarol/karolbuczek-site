import { CaseStudy } from "@/components/sections/CaseStudyCard"
import { RoleFilter } from "@/components/resume/ResumeFilters"

// Case studies with lens mappings
export const allCaseStudies: CaseStudy[] = [
  {
    slug: "secure-document-management-portal",
    title: "Secure Document Management Portal",
    subtitle: "Enterprise Document Portal on AWS",
    summary: "A compliance-sensitive client needed secure, auditable document sharing across a distributed team — without email, without a generic file tool, and without data leaving their environment.",
    problem: "Email-based document sharing exposed sensitive files and made retrieval slow. No audit trail for compliance, and scaling meant infrastructure management overhead.",
    constraints: [
      "Zero-Ops: Chose serverless over managed VMs to eliminate infrastructure management — the client had no dedicated DevOps team.",
      "Data Residency: Sensitive documents could not leave the environment; required strict tenant isolation and S3 Signed URLs instead of public buckets.",
      "Compliance: Every file interaction needed an audit trail for regulatory accountability — RBAC and logging were non-negotiable.",
    ],
    solution: "Architected a serverless, multi-tenant portal on AWS to eliminate infrastructure management while enforcing strict data isolation. Leveraged AWS Cognito for identity, S3 with Signed URLs for secure file delivery, and a serverless backend to ensure high availability and automatic scaling without operational overhead.",
    tags: ["Cloud Architecture (AWS)", "Solution Architecture", "Serverless", "Identity & Access Management"],
    techStack: ["AWS Amplify", "AWS Cognito", "AWS Lambda", "Amazon S3", "Amazon RDS", "React", "Role-Based Access Control (RBAC)", "Serverless Architecture"],
    skillsApplied: ["Cloud Architecture (AWS)", "Solution Architecture", "Serverless Computing", "Identity & Access Management", "Security Architecture", "Audit Logging", "Full-Stack Development", "Requirements Analysis", "Pre-Sales Scoping"],
    businessImpact: [
      "Architected role-based access control (RBAC) and audit logging to provide compliance-ready visibility, supporting enterprise accountability at scale.",
      "Eliminated email-based document sharing — reducing security exposure and cutting document retrieval time from XX minutes to under XX seconds.",
      "Serverless architecture scaled to handle XX concurrent users with zero infrastructure management overhead.",
    ],
    image: "/bliss-user-portal-view.png",
    additionalImages: ["/bliss-admin-portal-view.png", "/bliss-dev-portal-view.png", "/bliss-inbox.png"],
    clientDescription: "Growth-stage audit and certification provider serving manufacturing facilities and supply chains, with accredited third-party audits, internal audits, and training—requiring secure, auditable document sharing across distributed teams and stakeholders.",
    previewBusOutcome: "Document retrieval from XX minutes to under XX seconds; compliance-ready audit trail for every file interaction.",
  },
  {
    slug: "unified-customer-lifecycle-platform",
    title: "Unified Customer Lifecycle Platform",
    subtitle: "Customer Data Portal & Lifecycle Automation",
    summary: "A fragmented five-tool workflow was creating gaps between commerce data, customer communication, and access control — the fix required a unified portal built around the data, not around the tools.",
    problem: "A manual 5-tool workflow was costing time and causing data discrepancies between WooCommerce and CRM. Customer data lived in silos with no unified view, and lifecycle communication couldn't be triggered from real commerce events.",
    constraints: [
      "Data Silos: Commerce (WooCommerce) and marketing (Mailchimp) lived in separate systems — required a decoupled sync layer to bridge them without vendor lock-in.",
      "Real-Time Requirement: Lifecycle automation had to be triggered by actual commerce events, not batch jobs — chose event-driven sync over nightly ETL.",
    ],
    solution: "Designed a decoupled architecture to bridge commerce data with lifecycle marketing. Engineered a sync engine between WooCommerce and a centralized Supabase/PostgreSQL backend, allowing for real-time commerce-driven event triggers that were previously locked in silos.",
    tags: ["Solution Architecture", "API Integration", "Full-Stack Development", "Marketing Automation"],
    techStack: ["React", "Supabase", "PostgreSQL", "JWT Authentication", "Vercel", "WordPress REST API", "WooCommerce API", "Mailchimp API", "Webhooks"],
    skillsApplied: ["Solution Architecture", "API Integration", "Full-Stack Development", "Authentication & Access Control", "Data Synchronization", "Marketing Automation", "Lifecycle Workflow Design", "Requirements Analysis"],
    businessImpact: [
      "Eliminated data discrepancies between WooCommerce and CRM through a unified synchronization layer, ensuring a single source of truth for customer lifecycle reporting.",
      "Replaced a manual 5-tool workflow with a unified portal — reducing administrative overhead by an estimated XX hours per week.",
      "Lifecycle automation triggered by real commerce data increased email relevance, contributing to an estimated XX% improvement in engagement or retention metrics.",
    ],
    image: "/mhat-user-dashboard.png",
    additionalImages: ["/mhat-admin-dashboard.png", "/mhat-report-view.png", "/mhat-my-tests.png", "/mhat-dark-mode.png"],
    clientDescription: "Growth-stage ecommerce brand with B2C and B2B operations, needing unified commerce data and lifecycle automation across multiple platforms.",
    previewBusOutcome: "Replaced 5-tool workflow with one portal — estimated XX hours per week saved; single source of truth for commerce and CRM.",
  },
  {
    slug: "local-ai-meeting-intelligence",
    title: "Local AI Meeting Intelligence System",
    subtitle: "Private, On-Premise Audio Transcription & Action Item Extraction",
    summary: "Sensitive meeting recordings couldn't go to a cloud service. The solution ran entirely on local hardware — transcription, deadline extraction, and calendar output with zero external data transmission.",
    problem: "Meeting recordings contain sensitive information — client names, financials, strategic decisions, personnel discussions. Sending that audio to a cloud transcription service means accepting unknown data retention policies, unclear training data agreements, and potential compliance exposure. For organizations under NDA, handling client data, or unwilling to feed proprietary conversations into a third-party model, that tradeoff isn't acceptable. The solution couldn't be another SaaS tool; it had to run locally, on hardware the organization controlled, with zero data leaving the environment.",
    constraints: [
      "Data Residency: Chose local inference over cloud APIs — audio could not leave the building; HuggingFace Whisper on-premise was the only compliant path.",
      "NDA/Compliance: Third-party SaaS transcription was unacceptable; required 100% on-premise, air-gapped processing with no external API calls.",
    ],
    solution: "Architected an air-gapped transcription and intelligence pipeline to meet strict NDA and compliance requirements. Designed the system to run entirely on on-premise hardware using HuggingFace Whisper models, ensuring zero data transmission to third-party cloud services.",
    tags: ["AI Engineering", "Local LLM Deployment", "Privacy-Compliant Architecture", "Workflow Automation"],
    techStack: ["HuggingFace Whisper", "Python", "Local inference (on-premise, no cloud API)", "Multi-language ASR", "ICS file generation", "Google Calendar link generation", "Outlook-compatible calendar links", "Natural language date/deadline extraction"],
    skillsApplied: ["AI Engineering", "Local LLM Deployment", "Python", "Workflow Automation", "Privacy-Compliant Architecture", "Requirements Analysis", "System Design", "Documentation Automation"],
    businessImpact: [
      "Automated the extraction of actionable commitments and calendar events directly from raw audio, removing manual follow-up friction while maintaining 100% data residency.",
      "Eliminated exposure risk of sensitive meeting content to third-party cloud services — enabling transcription workflows in NDA-governed, compliance-sensitive, and client-facing environments.",
      "Reduced post-meeting documentation time from an estimated XX minutes of manual notes to automated structured output generated within minutes of recording completion.",
    ],
    image: "/podrick-user-dashboard.png",
    additionalImages: [
      "/podrick-meetings-dashboard.png",
      "/podrick-meeting-details.png",
      "/podrick-action-items-dashboard.png",
      "/podrick-action-item-details.png",
      "/podrick-dark-mode.png",
    ],
    clientDescription: "Enterprise organization requiring privacy-first, on-premise meeting intelligence for sensitive internal and client discussions.",
    previewBusOutcome: "Zero data left the building; structured docs + calendar events in minutes instead of XX minutes of manual notes.",
  },
  {
    slug: "uwd-enterprise-integration-api",
    title: "UWD Enterprise Integration API",
    subtitle: "Centralized Integration Service for Revenue & Customer Platforms",
    summary: "Designed and implemented an integration architecture connecting Five9 (call center), Mailchimp, CRM, and internal systems — eliminating manual data handoffs and creating a single source of truth across sales and marketing operations.",
    problem: "There was no centralized integration layer or standardized framework for onboarding or updating systems, creating operational complexity as the ecosystem expanded.",
    constraints: [
      "High-Volume, Zero-Downtime: Call center and CRM operations ran 24/7 — integrations had to fail gracefully and recover without manual intervention.",
      "Observability: Chose a shared logging/telemetry framework over per-integration logging — needed full request-lifecycle visibility across Five9, CRM, and Mailchimp to reduce MTTR.",
      "Extensibility: New platforms would be onboarded regularly — modular route architecture allowed additions without structural refactoring.",
    ],
    solution: "Designed a centralized, service-oriented integration layer to replace fragmented, brittle connections between Five9, CRM, and Mailchimp. Implemented a modular route architecture and a standardized logging framework to ensure the entire system was observable and extensible for future platform onboarding.",
    tags: ["Systems Integration", "API Development", "Integration Architecture", "Backend Engineering"],
    techStack: ["REST APIs", "PHP", "JavaScript", "MySQL", "Five9 API", "Mailchimp API", "Webhook Architecture", "Cron Automation", "Custom Logging Framework", "AWS S3"],
    skillsApplied: ["Systems Integration", "API Development", "Integration Architecture", "Backend Engineering", "Data Pipeline Architecture", "CRM Integration", "Call Center Integration", "Error Handling & Observability", "Workflow Automation"],
    businessImpact: [
      "Reduced mean time to recovery (MTTR) by implementing a shared telemetry framework that provided full request-lifecycle visibility across all third-party API interactions.",
      "Eliminated manual data entry between call center and CRM — saving an estimated XX hours per week across sales and marketing operations.",
      "Single source of truth across Five9, CRM, and Mailchimp reduced lead duplication and data discrepancies, improving reporting confidence across departments.",
    ],
    image: "/uwd-crm-parent-files.png",
    clientDescription: "Enterprise home services company with national reach, running high-volume call center, CRM, and marketing operations.",
    previewBusOutcome: "Estimated XX hours per week saved across sales and marketing; single source of truth across Five9, CRM, and Mailchimp.",
  },
  {
    slug: "martech-extension-architecture",
    title: "MarTech Extension Architecture",
    subtitle: "Custom WordPress Engineering Across Commerce & CRM Environments",
    summary: "Attribution gaps, tracking inconsistencies, and performance bottlenecks across multiple client environments — each requiring a purpose-built WordPress solution rather than an off-the-shelf fix.",
    problem: "Attribution gaps meant marketing couldn't trace first-touch and last-touch across web and CRM. GTM instrumentation required developer tickets, and Core Web Vitals issues hurt organic search.",
    constraints: [
      "VIP Compliance: Client sites had to meet WordPress VIP standards — required render-path refinement and asset orchestration within strict performance budgets.",
      "Attribution Integrity: First-touch and last-touch data had to persist from web through CRM — chose a persistent UTM engine over session-only tracking to support downstream attribution.",
    ],
    solution: "Engineered high-performance WordPress extensions to solve attribution and performance bottlenecks on enterprise VIP environments. Architected a persistent UTM attribution engine to maintain data integrity from first-touch through CRM conversion.",
    tags: ["Solution Architecture", "WordPress Engineering", "Attribution Modeling", "MarTech"],
    techStack: ["WordPress", "PHP", "JavaScript", "Google Tag Manager", "Google Analytics 4", "WooCommerce", "REST APIs", "MySQL", "Gutenberg Block API", "Core Web Vitals"],
    skillsApplied: ["Solution Architecture", "WordPress Engineering", "Attribution Modeling", "GTM Event Schema Design", "API Integration", "Performance Optimization", "Data Normalization", "Full-Stack Development", "MarTech"],
    businessImpact: [
      "Optimized Core Web Vitals (LCP 5.5s → 3.2s) through render-path refinement and asset orchestration, directly impacting organic search performance for high-traffic environments.",
      "UTM attribution plugin closed a critical tracking gap — giving marketing teams first-touch and last-touch visibility across web and CRM for the first time, improving campaign attribution accuracy by an estimated XX%.",
      "GTM Event Button Block reduced dependency on developer resources for analytics instrumentation — enabling marketing teams to deploy standardized tracking events without engineering tickets.",
    ],
    image: "/wordpress-mhat-portal-plugin.png",
    additionalImages: ["/wordpress-persistent-utm.png", "/wordpress-webvitals-block.png"],
    clientDescription: "Enterprise clients across ecommerce and professional services, each with distinct attribution, tracking, and performance requirements.",
    previewBusOutcome: "LCP 5.5s → 3.2s, Lighthouse 70 → 83; first-touch and last-touch attribution across web and CRM.",
  },
]

// Map lens filters to case study slugs
export const lensToCaseStudies: Record<RoleFilter, string[]> = {
  "all": [],
  "WordPress Engineering": ["martech-extension-architecture"],
  "MarTech / Growth Engineering": ["unified-customer-lifecycle-platform", "martech-extension-architecture"],
  "Product & Internal Tools": ["unified-customer-lifecycle-platform", "secure-document-management-portal", "local-ai-meeting-intelligence"],
  "Integrations & Automation": ["uwd-enterprise-integration-api", "unified-customer-lifecycle-platform"],
  "Performance Engineering": ["martech-extension-architecture"],
  "Startup Experience": [],
  "Implementation Engineer": [
    "unified-customer-lifecycle-platform",
    "secure-document-management-portal",
    "uwd-enterprise-integration-api",
    "martech-extension-architecture",
    "local-ai-meeting-intelligence",
  ],
}

// Map lens filters to related roles/positions
export const lensToRoles: Record<RoleFilter, string[]> = {
  "all": [],
  "WordPress Engineering": [
    "Universal Windows Direct — Backend & Integration Engineer (Full Stack) (2021-2023)",
    "Mineralife Nutraceuticals — Web & Marketing Systems Consultant (2021-Present)",
    "Freelance Developer / Designer (2009-2019)",
  ],
  "MarTech / Growth Engineering": [
    "Universal Windows Direct — Backend & Integration Engineer (Full Stack) (2021-2023)",
    "Perfect Power Wash — Marketing Director / Head of IT (2019-2021)",
    "Mineralife Nutraceuticals — Web & Marketing Systems Consultant (2021-Present)",
  ],
  "Product & Internal Tools": [
    "Tall Karol — Principal Solutions Architect (2023-Present)",
    "Perfect Power Wash — Marketing Director / Head of IT (2019-2021)",
  ],
  "Integrations & Automation": [
    "Universal Windows Direct — Backend & Integration Engineer (Full Stack) (2021-2023)",
    "Mineralife Nutraceuticals — Web & Marketing Systems Consultant (2021-Present)",
  ],
  "Performance Engineering": [
    "Universal Windows Direct — Backend & Integration Engineer (Full Stack) (2021-2023)",
  ],
  "Startup Experience": [
    "Freelance Developer / Designer (2009-2019)",
  ],
  "Implementation Engineer": [
    "Universal Windows Direct — Backend & Integration Engineer (Full Stack) (2021-2023)",
    "Mineralife Nutraceuticals — Web & Marketing Systems Consultant (2021-Present)",
    "Perfect Power Wash — Marketing Director / Head of IT (2019-2021)",
  ],
}

// Personal projects
export const personalProjects: CaseStudy[] = [
  {
    slug: "workout-tracker-app",
    title: "Workout Tracker App",
    summary: "Progressive overload logic and workout planning system. Built for personal use to track training progress and optimize workout routines.",
    tags: ["Personal Project", "Product"],
    metric: "Custom workout planning and progress tracking",
  },
  {
    slug: "spanish-exam-prep-app",
    title: "Spanish Exam Prep App",
    summary: "Study tool designed for exam preparation with practice questions, vocabulary drills, and progress tracking.",
    tags: ["Personal Project", "Product"],
    metric: "Personalized study system for exam preparation",
  },
  {
    slug: "personal-website-build",
    title: "Personal Website Build",
    summary: "Portfolio and technical showcase site built with React, Tailwind, and Next.js. Demonstrates modern web development practices and systems thinking.",
    tags: ["Personal Project", "Product"],
    metric: "Modern portfolio and technical showcase",
  },
]

// Get case studies for a lens
export function getCaseStudiesForLens(lens: RoleFilter): CaseStudy[] {
  const slugs = lensToCaseStudies[lens] || []
  return allCaseStudies.filter(cs => slugs.includes(cs.slug))
}

// Map lens filters to skill categories
// This maps skill category names to the lenses they're relevant for
export const lensToSkillCategories: Record<RoleFilter, string[]> = {
  "all": [],
  "WordPress Engineering": [
    "WordPress Engineering",
    "Core Engineering",
    "Performance Engineering",
  ],
  "MarTech / Growth Engineering": [
    "MarTech / Growth Engineering",
    "Core Engineering",
  ],
  "Product & Internal Tools": [
    "Product & Systems Design",
    "Core Engineering",
  ],
  "Integrations & Automation": [
    "Core Engineering",
    "MarTech / Growth Engineering",
  ],
  "Performance Engineering": [
    "Performance Engineering",
    "WordPress Engineering",
    "Core Engineering",
  ],
  "Startup Experience": [
    "Product & Systems Design",
    "Core Engineering",
  ],
  "Implementation Engineer": [
    "Core Engineering",
    "Product & Systems Design",
    "Integrations & Automation",
    "MarTech / Growth Engineering",
  ],
}

// Skill categories data (extracted from SkillsSection for reference)
export const skillCategoriesData = [
  {
    name: "Core Engineering",
    skills: [
      "Custom WordPress plugins & Gutenberg blocks",
      "React applications & internal tools",
      "SQL for analytics, pipelines, and large-dataset operations",
      "API design & integrations with CRMs and marketing platforms",
      "3+ years integrating Web APIs and providing technical consultation",
      "Distributed systems design and architecture",
      "Database design and optimization",
      "AWS: Amplify, Lambda, Cognito, RDS, S3 signed URLs",
      "Backend automation: cron jobs, workflow engines, queue-like execution",
      "Git workflows for feature development & production releases",
      "AI-Augmented Engineering: Leverages LLM-based tooling to accelerate system analysis, documentation, and iterative design—increasing velocity and output quality.",
    ],
  },
  {
    name: "WordPress Engineering",
    skills: [
      "Performance-focused plugin & block development",
      "VIP-compliant architecture & coding standards",
      "WooCommerce performance & checkout optimization",
      "Core Web Vitals debugging & LCP-first improvements",
      "Headless WordPress using React + ACF",
    ],
  },
  {
    name: "MarTech / Growth Engineering",
    skills: [
      "Structured dataLayer & GTM event architectures",
      "First/last-touch UTM persistence & attribution frameworks",
      "CRM sync bridges & data normalization workflows",
      "Modular integration architectures replacing brittle chains",
      "Lifecycle automation (email, SMS, retargeting)",
      "KPI dashboards for funnels, sales efficiency & channel ROI",
    ],
  },
  {
    name: "Product & Systems Design",
    skills: [
      "Architecting internal tools & workflow platforms",
      "Secure document systems with RBAC (AWS)",
      "Logging, monitoring & resilience patterns",
      "Multilingual Stakeholder Orchestration: Translating high-level business objectives into rigorous technical requirements for engineering and non-technical stakeholders.",
      "Organizational Adaptability: Demonstrated success across startups and 3,000+ person enterprise environments.",
      "Autonomous End-to-End Ownership: Executing the full architectural lifecycle from discovery to production deployment with zero oversight required.",
      "Systems-level business alignment: Analyzes technical decisions through long-term business outcomes; ensures infrastructure acts as a revenue multiplier.",
      "Identifying and communicating pragmatic solutions to complex integration problems",
      "AI-Augmented Engineering: Leverages LLM-based tooling to accelerate analysis, documentation, and design—increasing velocity and output quality.",
    ],
  },
  {
    name: "Performance Engineering",
    skills: [
      "Core Web Vitals optimization (e.g., LCP 5.5s → 3.2s)",
      "Lighthouse optimization & render-path refinement",
      "Asset strategy & loading performance for high-traffic environments",
    ],
  },
]

// Get skills for a lens
export function getSkillsForLens(lens: RoleFilter): string[] {
  if (lens === "all") return []
  
  const relevantCategories = lensToSkillCategories[lens] || []
  const skills: string[] = []
  
  skillCategoriesData.forEach(category => {
    if (relevantCategories.includes(category.name)) {
      skills.push(...category.skills)
    }
  })
  
  return skills
}

// Get work experience items for a lens
export function getWorkExperienceForLens(lens: RoleFilter): string[] {
  if (lens === "all") return []
  return lensToRoles[lens] || []
}

// Map systems to lenses based on case study tags
const systemToLensMap: Record<string, RoleFilter[]> = {
  "UTM Attribution Engine": ["MarTech / Growth Engineering", "WordPress Engineering", "Implementation Engineer"],
  "GTM Event Schema & Block": ["MarTech / Growth Engineering", "WordPress Engineering", "Implementation Engineer"],
  "Core Web Vitals Optimization Framework": ["Performance Engineering", "WordPress Engineering"],
  "Lead Ingestion Normalizer": ["MarTech / Growth Engineering", "Integrations & Automation", "Implementation Engineer"],
  "Workflow Automation Engine": ["Integrations & Automation", "MarTech / Growth Engineering", "Implementation Engineer"],
  "Secure File Portal (AWS)": ["Product & Internal Tools", "Implementation Engineer"],
  "Headless WordPress Architecture": ["WordPress Engineering", "Product & Internal Tools"],
  "Zapier Modularization Framework": ["MarTech / Growth Engineering", "Integrations & Automation", "Implementation Engineer"],
  "CRM Sync Bridges": ["MarTech / Growth Engineering", "Integrations & Automation", "Implementation Engineer"],
  "Sales Efficiency Dashboards": ["MarTech / Growth Engineering", "Product & Internal Tools"],
  "Internal Error & Logging Systems": ["Product & Internal Tools", "Implementation Engineer"],
}

// Get systems for a lens
export function getSystemsForLens(lens: RoleFilter): string[] {
  if (lens === "all") return []
  
  const systems: string[] = []
  Object.entries(systemToLensMap).forEach(([system, relevantLenses]) => {
    if (relevantLenses.includes(lens)) {
      systems.push(system)
    }
  })
  
  return systems
}

