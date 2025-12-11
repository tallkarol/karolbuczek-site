import { CaseStudy } from "@/components/sections/CaseStudyCard"
import { RoleFilter } from "@/components/resume/ResumeFilters"

// Case studies with lens mappings
export const allCaseStudies: CaseStudy[] = [
  {
    slug: "cwv-optimization-block",
    title: "Enterprise Core Web Vitals Optimization",
    summary: "VIP-compliant block + loading strategy. LCP: 5.5s → 3.2s, Lighthouse 70 → 83.",
    tags: ["WordPress Engineering", "Performance Engineering"],
    metric: "LCP: 5.5s → 3.2s | Lighthouse: 70 → 83",
  },
  {
    slug: "utm-persistence-plugin",
    title: "UTM Persistence & Attribution Plugin",
    summary: "WordPress plugin storing UTMs across sessions. First-touch + last-touch attribution.",
    tags: ["WordPress Engineering", "MarTech / Growth Engineering"],
    metric: "Solves attribution gaps, supports better spend decisions",
  },
  {
    slug: "gtm-event-button-block",
    title: "Custom GTM Event Button Block",
    summary: "Gutenberg block emitting structured GTM events. Marketer-friendly configuration.",
    tags: ["WordPress Engineering", "MarTech / Growth Engineering"],
    metric: "Reduces friction, speeds up tracking implementations",
  },
  {
    slug: "aws-secure-file-portal",
    title: "Secure File Sharing Portal on AWS",
    summary: "Full-stack AWS app (Amplify, Cognito, S3, RDS, Lambda). Role-based access, audit logging.",
    tags: ["Product & Internal Tools"],
    metric: "Secure, compliant document workflows with role-based access",
  },
  {
    slug: "backend_workflow_automations",
    title: "Backend Workflow Automations & Data Pipelines",
    summary: "PHP/SQL cron scripts integrating Mailchimp, Birdeye, Five9, CRMs. Custom error handling.",
    tags: ["Integrations & Automation"],
    metric: "Automated workflows with custom error handling",
  },
  {
    slug: "zapier_subzap_refactors",
    title: "Modular Zapier Architecture",
    summary: "Refactored 70+ step Zaps into modular SubZap systems. 22 structured steps, easier to extend.",
    tags: ["MarTech / Growth Engineering", "Integrations & Automation"],
    metric: "70+ steps → 22 structured steps, easier to extend",
  },
]

// Map lens filters to case study slugs
export const lensToCaseStudies: Record<RoleFilter, string[]> = {
  "all": [],
  "WordPress Engineering": [
    "cwv-optimization-block",
    "utm-persistence-plugin",
    "gtm-event-button-block",
  ],
  "MarTech / Growth Engineering": [
    "utm-persistence-plugin",
    "gtm-event-button-block",
    "zapier_subzap_refactors",
  ],
  "Product & Internal Tools": [
    "aws-secure-file-portal",
  ],
  "Integrations & Automation": [
    "backend_workflow_automations",
    "zapier_subzap_refactors",
  ],
  "Performance Engineering": [
    "cwv-optimization-block",
  ],
  "Startup Experience": [],
  "Implementation Engineer": [
    "backend_workflow_automations",
    "zapier_subzap_refactors",
    "aws-secure-file-portal",
    "utm-persistence-plugin",
    "gtm-event-button-block",
  ],
}

// Map lens filters to related roles/positions
export const lensToRoles: Record<RoleFilter, string[]> = {
  "all": [],
  "WordPress Engineering": [
    "Universal Windows Direct — Full Stack Web Developer (2021-2023)",
    "Mineralife Nutraceuticals — Marketing & IT Consultant (2021-Present)",
    "Freelance Developer / Designer (2009-2019)",
  ],
  "MarTech / Growth Engineering": [
    "Universal Windows Direct — Full Stack Web Developer (2021-2023)",
    "Perfect Power Wash — Marketing Director / Head of IT (2019-2021)",
    "Mineralife Nutraceuticals — Marketing & IT Consultant (2021-Present)",
  ],
  "Product & Internal Tools": [
    "Independent Web Systems Engineer (2025-Present)",
    "Perfect Power Wash — Marketing Director / Head of IT (2019-2021)",
  ],
  "Integrations & Automation": [
    "Universal Windows Direct — Full Stack Web Developer (2021-2023)",
    "Mineralife Nutraceuticals — Marketing & IT Consultant (2021-Present)",
  ],
  "Performance Engineering": [
    "Universal Windows Direct — Full Stack Web Developer (2021-2023)",
  ],
  "Startup Experience": [
    "CUBE Karaoke — Co-founder / Creative Director (2013-2014)",
    "in2itiv media — Co-founder / CEO (2012-2013)",
    "Freelance Developer / Designer (2009-2019)",
  ],
  "Implementation Engineer": [
    "Universal Windows Direct — Full Stack Web Developer (2021-2023)",
    "Mineralife Nutraceuticals — Marketing & IT Consultant (2021-Present)",
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
    "Tools & Platforms",
  ],
  "MarTech / Growth Engineering": [
    "MarTech / Growth Engineering",
    "Core Engineering",
    "Tools & Platforms",
  ],
  "Product & Internal Tools": [
    "Product & Systems Design",
    "Core Engineering",
    "Tools & Platforms",
  ],
  "Integrations & Automation": [
    "Core Engineering",
    "MarTech / Growth Engineering",
    "Tools & Platforms",
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
    "Tools & Platforms",
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
  {
    name: "Tools & Platforms",
    skills: [
      "WordPress, WP Engine, Local",
      "React, Tailwind, Vite",
      "AWS Amplify, GitHub, Vercel",
      "Supabase, SQL Server",
      "Zapier, Mailchimp, Birdeye, Five9",
      "WooCommerce, Gravity Forms, ACF",
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
  "Internal Error & Logging Systems": ["Product & Internal Tools", "Core Engineering"],
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

