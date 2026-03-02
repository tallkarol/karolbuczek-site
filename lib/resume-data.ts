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
    solution: "A serverless portal on AWS (Amplify, Cognito, Lambda, S3, RDS) with role-based access, isolated file storage, and audit logging for every interaction. Zero infrastructure management for operators.",
    tags: ["Cloud Architecture (AWS)", "Solution Architecture", "Serverless", "Identity & Access Management"],
    techStack: ["AWS Amplify", "AWS Cognito", "AWS Lambda", "Amazon S3", "Amazon RDS", "React", "Role-Based Access Control (RBAC)", "Serverless Architecture"],
    skillsApplied: ["Cloud Architecture (AWS)", "Solution Architecture", "Serverless Computing", "Identity & Access Management", "Security Architecture", "Audit Logging", "Full-Stack Development", "Requirements Analysis", "Pre-Sales Scoping"],
    businessImpact: [
      "Eliminated email-based document sharing — reducing security exposure and cutting document retrieval time from XX minutes to under XX seconds",
      "Role-based access control and audit logging provided compliance-ready visibility into every file interaction, supporting operational accountability at scale",
      "Serverless architecture scaled to handle XX concurrent users with zero infrastructure management overhead",
    ],
    image: "/bliss-user-portal-view.png",
    additionalImages: ["/bliss-admin-portal-view.png", "/bliss-dev-portal-view.png", "/bliss-inbox.png"],
    clientLogo: "/bliss-cb.png",
    clientDescription: "Bliss provides secure document sharing and customer portal solutions for regulated and compliance-sensitive industries.",
    clientStage: "Enterprise",
    previewBusOutcome: "Document retrieval from XX minutes to under XX seconds; compliance-ready audit trail for every file interaction.",
  },
  {
    slug: "unified-customer-lifecycle-platform",
    title: "Unified Customer Lifecycle Platform",
    subtitle: "Customer Data Portal & Lifecycle Automation",
    summary: "A fragmented five-tool workflow was creating gaps between commerce data, customer communication, and access control — the fix required a unified portal built around the data, not around the tools.",
    problem: "A manual 5-tool workflow was costing time and causing data discrepancies between WooCommerce and CRM. Customer data lived in silos with no unified view, and lifecycle communication couldn't be triggered from real commerce events.",
    solution: "A unified React portal on Vercel with Supabase auth, ingesting WordPress and WooCommerce data and syncing with Mailchimp. Secure access, synchronized commerce records, and lifecycle-based automation replaced the fragmented workflow.",
    tags: ["Solution Architecture", "API Integration", "Full-Stack Development", "Marketing Automation"],
    techStack: ["React", "Supabase", "PostgreSQL", "JWT Authentication", "Vercel", "WordPress REST API", "WooCommerce API", "Mailchimp API", "Webhooks"],
    skillsApplied: ["Solution Architecture", "API Integration", "Full-Stack Development", "Authentication & Access Control", "Data Synchronization", "Marketing Automation", "Lifecycle Workflow Design", "Requirements Analysis"],
    businessImpact: [
      "Replaced a manual 5-tool workflow with a unified portal — reducing administrative overhead by an estimated XX hours per week",
      "Lifecycle automation triggered by real commerce data increased email relevance, contributing to an estimated XX% improvement in engagement or retention metrics",
      "Synchronized commerce and communication records eliminated data discrepancies between WooCommerce and CRM, improving reporting accuracy across the stack",
    ],
    image: "/mhat-user-dashboard.png",
    additionalImages: ["/mhat-admin-dashboard.png", "/mhat-report-view.png", "/mhat-my-tests.png", "/mhat-dark-mode.png"],
    clientLogo: "/zemvelo-logo.png",
    clientDescription: "Supplement brand offering vitamin and mineral products designed for optimal absorption.",
    clientStage: "Growth stage",
    previewBusOutcome: "Replaced 5-tool workflow with one portal — estimated XX hours per week saved; single source of truth for commerce and CRM.",
  },
  {
    slug: "local-ai-meeting-intelligence",
    title: "Local AI Meeting Intelligence System",
    subtitle: "Private, On-Premise Audio Transcription & Action Item Extraction",
    summary: "Sensitive meeting recordings couldn't go to a cloud service. The solution ran entirely on local hardware — transcription, deadline extraction, and calendar output with zero external data transmission.",
    problem: "Meeting recordings contain sensitive information — client names, financials, strategic decisions, personnel discussions. Sending that audio to a cloud transcription service means accepting unknown data retention policies, unclear training data agreements, and potential compliance exposure. For organizations under NDA, handling client data, or unwilling to feed proprietary conversations into a third-party model, that tradeoff isn't acceptable. The solution couldn't be another SaaS tool; it had to run locally, on hardware the organization controlled, with zero data leaving the environment.",
    solution: "Built a fully local audio-to-text transcription pipeline using open-source AI models running on-premise via HuggingFace — no API calls, no external data transmission, no third-party processing. The system accepts recorded audio from meetings, presentations, and calls, processes it locally, and outputs clean, structured documentation. Multi-language support handles multilingual teams and international client calls without routing audio through external translation services. Beyond raw transcription, the system parses output for dates, deadlines, and time-sensitive commitments — extracting them, notating them in the document, and generating standards-compliant ICS calendar files. Google Calendar and Outlook-compatible links are generated alongside the ICS for teams that prefer browser-based calendar workflows. The result: a meeting ends, and within minutes the team has a structured document, a list of flagged deadlines, and calendar-ready events — all generated locally from audio that never left the building.",
    tags: ["AI Engineering", "Local LLM Deployment", "Privacy-Compliant Architecture", "Workflow Automation"],
    techStack: ["HuggingFace Whisper", "Python", "Local inference (on-premise, no cloud API)", "Multi-language ASR", "ICS file generation", "Google Calendar link generation", "Outlook-compatible calendar links", "Natural language date/deadline extraction"],
    skillsApplied: ["AI Engineering", "Local LLM Deployment", "Python", "Workflow Automation", "Privacy-Compliant Architecture", "Requirements Analysis", "System Design", "Documentation Automation"],
    businessImpact: [
      "Eliminated exposure risk of sensitive meeting content to third-party cloud services — enabling transcription workflows in NDA-governed, compliance-sensitive, and client-facing environments",
      "Reduced post-meeting documentation time from an estimated XX minutes of manual notes to automated structured output generated within minutes of recording completion",
      "Automated deadline extraction and calendar event generation eliminated a manual follow-up step — ensuring time-sensitive commitments captured in meetings were never lost between the recording and someone's calendar",
    ],
    additionalImages: ["/placeholder-image.png", "/placeholder-image.png"],
    clientLogo: "/logo.png",
    clientDescription: "Organization requiring privacy-first, on-premise meeting intelligence for sensitive internal and client discussions.",
    clientStage: "Enterprise",
    previewBusOutcome: "Zero data left the building; structured docs + calendar events in minutes instead of XX minutes of manual notes.",
  },
  {
    slug: "uwd-enterprise-integration-api",
    title: "UWD Enterprise Integration API",
    subtitle: "Centralized Integration Service for Revenue & Customer Platforms",
    summary: "Designed and implemented an integration architecture connecting Five9 (call center), Mailchimp, CRM, and internal systems — eliminating manual data handoffs and creating a single source of truth across sales and marketing operations.",
    problem: "There was no centralized integration layer or standardized framework for onboarding or updating systems, creating operational complexity as the ecosystem expanded.",
    solution: "An API-driven integration service hosted on a VPS, designed as a centralized integration layer between Five9, the CRM, Mailchimp, and internal systems. New integrations were implemented as modular routes with dedicated scripts, allowing the system to expand without structural refactoring. A standardized logging framework was built across all endpoints to trace request lifecycles, surface failures, and monitor data consistency — making the architecture observable, debuggable, and extensible.",
    tags: ["Systems Integration", "API Development", "Integration Architecture", "Backend Engineering"],
    techStack: ["REST APIs", "PHP", "JavaScript", "MySQL", "Five9 API", "Mailchimp API", "Webhook Architecture", "Cron Automation", "Custom Logging Framework", "AWS S3"],
    skillsApplied: ["Systems Integration", "API Development", "Integration Architecture", "Backend Engineering", "Data Pipeline Architecture", "CRM Integration", "Call Center Integration", "Error Handling & Observability", "Workflow Automation"],
    businessImpact: [
      "Eliminated manual data entry between call center and CRM — saving an estimated XX hours per week across sales and marketing operations",
      "Single source of truth across Five9, CRM, and Mailchimp reduced lead duplication and data discrepancies, improving reporting confidence across departments",
      "Shared logging and error handling framework reduced debugging time by an estimated XX% and made the system extensible for future integrations without rearchitecting",
    ],
    additionalImages: ["/placeholder-image.png", "/placeholder-image.png"],
    clientLogo: "/uwd-logo.png",
    clientDescription: "Universal Windows Direct is a home improvement company with national reach, running high-volume call center, CRM, and marketing operations.",
    clientStage: "Enterprise",
    previewBusOutcome: "Estimated XX hours per week saved across sales and marketing; single source of truth across Five9, CRM, and Mailchimp.",
  },
  {
    slug: "martech-extension-architecture",
    title: "MarTech Extension Architecture",
    subtitle: "Custom WordPress Engineering Across Commerce & CRM Environments",
    summary: "Attribution gaps, tracking inconsistencies, and performance bottlenecks across multiple client environments — each requiring a purpose-built WordPress solution rather than an off-the-shelf fix.",
    problem: "Attribution gaps meant marketing couldn't trace first-touch and last-touch across web and CRM. GTM instrumentation required developer tickets, and Core Web Vitals issues hurt organic search.",
    solution: "UTM attribution plugin for first-touch and last-touch visibility, a GTM Event Button Block so marketing could deploy tracking without engineering, and performance remediation (LCP 5.5s → 3.2s, Lighthouse 70 → 83) on a VIP-compliant client site.",
    tags: ["Solution Architecture", "WordPress Engineering", "Attribution Modeling", "MarTech"],
    techStack: ["WordPress", "PHP", "JavaScript", "Google Tag Manager", "Google Analytics 4", "WooCommerce", "REST APIs", "MySQL", "Gutenberg Block API", "Core Web Vitals"],
    skillsApplied: ["Solution Architecture", "WordPress Engineering", "Attribution Modeling", "GTM Event Schema Design", "API Integration", "Performance Optimization", "Data Normalization", "Full-Stack Development", "MarTech"],
    businessImpact: [
      "UTM attribution plugin closed a critical tracking gap — giving marketing teams first-touch and last-touch visibility across web and CRM for the first time, improving campaign attribution accuracy by an estimated XX%",
      "GTM Event Button Block reduced dependency on developer resources for analytics instrumentation — enabling marketing teams to deploy standardized tracking events without engineering tickets",
      "Performance remediation on VIP-compliant client site cut LCP from 5.5s to 3.2s and lifted Lighthouse score from 70 to 83 — directly improving Core Web Vitals standings and organic search performance",
    ],
    additionalImages: ["/placeholder-image.png", "/placeholder-image.png"],
    clientLogo: "/logo.png",
    clientDescription: "Multiple B2B and B2C clients on WordPress VIP and WooCommerce, from growth-stage brands to enterprise.",
    clientStage: "Growth stage",
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
      "Using AI tools in product development to improve quality and efficiency",
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
      "Structured dataLayer + GTM event architectures",
      "First/last-touch UTM persistence & attribution frameworks",
      "CRM sync bridges & data normalization workflows",
      "Modular Zapier architectures replacing brittle chains",
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
      "Engineering alignment across marketing, product & operations",
      "Applying systems thinking to funnels, data flow & platform design",
      "Translating business requirements and workflows into technical solutions",
      "Identifying and communicating pragmatic solutions to complex integration problems",
      "Using AI tools in product development to improve quality and efficiency",
    ],
  },
  {
    name: "Performance Engineering",
    skills: [
      "Core Web Vitals improvements (e.g., LCP 5.5s → 3.2s)",
      "Lighthouse optimization & render-path refinement",
      "Asset strategy & loading performance",
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

