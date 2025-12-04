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

