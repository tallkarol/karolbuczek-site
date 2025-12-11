import { RoleFilter } from "@/components/resume/ResumeFilters"
import { getCaseStudiesForLens, lensToRoles, getSkillsForLens, getWorkExperienceForLens, getSystemsForLens } from "@/lib/resume-data"
import type { CaseStudy } from "@/components/sections/CaseStudyCard"

export interface RoleConfig {
  id: string
  label: string
  shortDescription: string
  landingPath: string
  targetTitles: string[]
  roleFilter: RoleFilter
  outreachTemplates: {
    linkedin: string
    email: string
  }
  resumeVariantId: string
  copyableBullets?: string[] // Optional - can be auto-generated
}

// Helper function to get case studies dynamically
export function getCaseStudiesForRole(roleId: string): CaseStudy[] {
  const config = roleConfigs[roleId]
  if (!config) return []
  return getCaseStudiesForLens(config.roleFilter)
}

// Helper function to get related roles dynamically
export function getRelatedRolesForRole(roleId: string): string[] {
  const config = roleConfigs[roleId]
  if (!config) return []
  return lensToRoles[config.roleFilter] || []
}

// Helper to get role config by ID
export function getRoleConfig(roleId: string): RoleConfig | null {
  return roleConfigs[roleId] || null
}

// Generate copyable bullets dynamically based on role filter
export function getCopyableBulletsForRole(roleId: string): string[] {
  const config = roleConfigs[roleId]
  if (!config) return []
  
  // If manual bullets are provided, use them (backward compatibility)
  if (config.copyableBullets && config.copyableBullets.length > 0) {
    return config.copyableBullets
  }
  
  // Otherwise, auto-generate from resume data
  const lens = config.roleFilter
  const bullets: string[] = []
  
  // Add skills relevant to the role
  const skills = getSkillsForLens(lens)
  bullets.push(...skills)
  
  // Add work experience highlights (from systems in timeline)
  const workExp = getWorkExperienceForLens(lens)
  // Work experience items are role titles, so we'll add them as context
  // The actual highlights come from the systems arrays in WorkExperienceSection
  
  // Add systems/projects relevant to the role
  const systems = getSystemsForLens(lens)
  bullets.push(...systems)
  
  // Remove duplicates and return
  return Array.from(new Set(bullets))
}

export const roleConfigs: Record<string, RoleConfig> = {
  "implementation-engineer": {
    id: "implementation-engineer",
    label: "Implementation Engineer",
    shortDescription: "5+ years integrating Web APIs, providing technical consultation, and translating business requirements into technical solutions.",
    landingPath: "/implementation-engineer",
    targetTitles: [
      "Implementation Engineer",
      "Solutions Engineer",
      "Integration Engineer",
      "Technical Implementation Specialist",
    ],
    roleFilter: "Implementation Engineer",
    outreachTemplates: {
      linkedin: `Hi [Name],

I saw the [Job Title] role at [Company] and wanted to reach out. I have 5+ years of experience integrating Web APIs, providing technical consultation, and translating business requirements into technical solutions.

I've built backend workflow systems integrating Mailchimp, Birdeye, Five9, CRMs, and lead aggregators. I've also created modular Zapier architectures replacing brittle 70+ step workflows with maintainable systems, and built full-stack AWS implementations with role-based access and audit logging.

I'd love to discuss how I can help [Company] implement solutions that deliver value.

Here's my role-specific landing page: https://karolbuczek.com/implementation-engineer

Best,
Karol`,
      email: `Subject: Implementation Engineer Role at [Company]

Hi [Name],

I'm reaching out regarding the Implementation Engineer position at [Company]. With 5+ years of experience integrating Web APIs and providing technical consultation, I'm excited about the opportunity to help [Company] build robust integration solutions.

My experience includes:
• 5+ years integrating Web APIs and providing technical consultation for complex integration projects
• Experience working with distributed systems, database design, and systems architecture
• Translating business requirements and workflows into technical solutions that deliver value
• Identifying and communicating pragmatic solutions to complex integration problems

I've built backend workflow systems integrating multiple platforms (Mailchimp, Birdeye, Five9, CRMs, lead aggregators), refactored complex Zapier workflows into maintainable systems, and implemented full-stack AWS solutions with role-based access and audit logging.

I'd welcome the opportunity to discuss how my experience aligns with [Company]'s needs.

You can learn more about my implementation engineering work here: https://karolbuczek.com/implementation-engineer

Best regards,
Karol Buczek`,
    },
    resumeVariantId: "implementation-engineer",
    copyableBullets: [
      "5+ years integrating Web APIs and providing technical consultation for complex integration projects",
      "Experience working with distributed systems, database design, and systems architecture",
      "Translating business requirements and workflows into technical solutions that deliver value",
      "Identifying and communicating pragmatic solutions to complex integration problems",
      "Empathetic to customer and end-user needs with ability to bridge technical and business perspectives",
      "Comfortable leading meetings with high-level decision makers and navigating ambiguity",
      "Backend workflow systems integrating Mailchimp, Birdeye, Five9, CRMs, and lead aggregators",
      "Modular Zapier architectures replacing brittle 70+ step workflows with maintainable systems",
      "Full-stack AWS implementations (Amplify, Cognito, S3, RDS, Lambda) with role-based access and audit logging",
    ],
  },
  "martech-engineer": {
    id: "martech-engineer",
    label: "MarTech Engineer / Marketing Systems Engineer",
    shortDescription: "Building marketing technology systems—attribution frameworks, event architectures, automation workflows, and data pipelines—that connect marketing efforts to measurable business outcomes.",
    landingPath: "/martech-engineer",
    targetTitles: [
      "MarTech Engineer",
      "Marketing Systems Engineer",
      "Growth Engineer",
      "Marketing Automation Engineer",
      "Marketing Technology Specialist",
    ],
    roleFilter: "MarTech / Growth Engineering",
    outreachTemplates: {
      linkedin: `Hi [Name],

I noticed the [Job Title] role at [Company] and wanted to connect. I specialize in building marketing technology systems—attribution frameworks, event architectures, automation workflows, and data pipelines—that connect marketing efforts to measurable business outcomes.

I've built multi-touch attribution layers for direct mail → digital funnels, designed standardized dataLayer event schemas for GTM across enterprise sites, and refactored massive Zapier flows (70+ steps) into modular SubZap systems. I've also automated ingestion & syncing of leads, CRM data, and call center stats, and produced dashboards for sales efficiency, ROI, and channel performance.

I'd love to discuss how I can help [Company] build marketing systems that deliver measurable results.

Here's my MarTech-focused work: https://karolbuczek.com/martech-engineer

Best,
Karol`,
      email: `Subject: MarTech Engineer Role at [Company]

Hi [Name],

I'm writing to express interest in the MarTech Engineer position at [Company]. I build marketing technology systems that connect marketing efforts to measurable business outcomes.

My experience includes:
• Attribution, Funnels & Event Architecture — Built multi-touch attribution layers for direct mail → digital funnels
• Designed standardized dataLayer event schemas for GTM across enterprise sites
• Refactored massive Zapier flows (70+ steps) into modular SubZap systems
• Automated ingestion & syncing of leads, CRM data, call center stats
• Produced dashboards for sales efficiency, ROI, and channel performance

I've integrated APIs including Mailchimp, Birdeye, Five9, ServiceTitan, LeadPerfection, Hover, HatchApp, and various CRMs. I'm passionate about building systems that make marketing data actionable and measurable.

I'd welcome the opportunity to discuss how my MarTech experience can contribute to [Company]'s growth.

Learn more about my MarTech work: https://karolbuczek.com/martech-engineer

Best regards,
Karol Buczek`,
    },
    resumeVariantId: "martech-engineer",
    copyableBullets: [
      "Attribution, Funnels & Event Architecture — Built multi-touch attribution layers for direct mail → digital funnels",
      "Designed standardized dataLayer event schemas for GTM across enterprise sites",
      "Refactored massive Zapier flows (70+ steps) into modular SubZap systems",
      "Automated ingestion & syncing of leads, CRM data, call center stats",
      "Produced dashboards for sales efficiency, ROI, and channel performance",
      "APIs integrated: Mailchimp, Birdeye, Five9, ServiceTitan, LeadPerfection, Hover, HatchApp, Various CRMs",
      "Structured dataLayer + GTM event architectures",
      "First/last-touch UTM persistence & attribution frameworks",
      "CRM sync bridges & data normalization workflows",
    ],
  },
  "web-systems-engineer": {
    id: "web-systems-engineer",
    label: "Web Systems Engineer",
    shortDescription: "Architecting and building web systems—internal tools, workflow platforms, secure document systems, and full-stack applications—that solve real business problems with clean architecture and maintainable code.",
    landingPath: "/web-systems-engineer",
    targetTitles: [
      "Web Systems Engineer",
      "Systems Engineer",
      "Platform Engineer",
      "Internal Tools Engineer",
      "Product Engineer",
    ],
    roleFilter: "Product & Internal Tools",
    outreachTemplates: {
      linkedin: `Hi [Name],

I saw the [Job Title] role at [Company] and wanted to reach out. I architect and build web systems—internal tools, workflow platforms, secure document systems, and full-stack applications—that solve real business problems.

I've built end-to-end systems including an AWS Secure File Portal with role-based access, audit logging, and folder isolation. I've also architected internal tools & workflow platforms, secure document systems with RBAC, and applied systems thinking to funnels, data flow & platform design.

I'd love to discuss how I can help [Company] build web systems that solve your business challenges.

Check out my systems engineering work: https://karolbuczek.com/web-systems-engineer

Best,
Karol`,
      email: `Subject: Web Systems Engineer Role at [Company]

Hi [Name],

I'm reaching out regarding the Web Systems Engineer position at [Company]. I architect and build web systems that solve real business problems with clean architecture and maintainable code.

My experience includes:
• Architecting internal tools & workflow platforms
• Secure document systems with RBAC (AWS)
• Logging, monitoring & resilience patterns
• Engineering alignment across marketing, product & operations
• Applying systems thinking to funnels, data flow & platform design

I've built end-to-end systems including an AWS Secure File Portal (Amplify App) with React, Amplify, Cognito, S3, RDS, and Lambda. Features include folder isolation via Lambda on user creation, signed URLs, delete-protection & retention windows, audit logs, and role-based access (Admin + User + Dev roles).

I'd welcome the opportunity to discuss how my systems engineering experience can help [Company] build scalable solutions.

Learn more: https://karolbuczek.com/web-systems-engineer

Best regards,
Karol Buczek`,
    },
    resumeVariantId: "web-systems-engineer",
    copyableBullets: [
      "Architecting internal tools & workflow platforms",
      "Secure document systems with RBAC (AWS)",
      "Logging, monitoring & resilience patterns",
      "Engineering alignment across marketing, product & operations",
      "Applying systems thinking to funnels, data flow & platform design",
      "AWS Secure File Portal (Amplify App) — Built end-to-end: architecture → database → frontend → deployment",
      "Tech: React, Amplify, Cognito, S3, RDS, Lambda",
      "Features: Folder isolation, Signed URLs, Delete-protection & retention windows, Audit logs, Role-based access",
    ],
  },
  "web-dev-wordpress": {
    id: "web-dev-wordpress",
    label: "Web Developer / WordPress Engineer",
    shortDescription: "Building custom WordPress plugins, Gutenberg blocks, and performance-optimized WordPress solutions. From VIP-compliant architecture to headless implementations, delivering WordPress systems that are fast, maintainable, and scalable.",
    landingPath: "/web-dev-wordpress",
    targetTitles: [
      "WordPress Developer",
      "WordPress Engineer",
      "Senior WordPress Developer",
      "Full-Stack WordPress Developer",
      "WordPress Architect",
    ],
    roleFilter: "WordPress Engineering",
    outreachTemplates: {
      linkedin: `Hi [Name],

I noticed the [Job Title] role at [Company] and wanted to connect. I build custom WordPress plugins, Gutenberg blocks, and performance-optimized WordPress solutions.

I've built VIP-compliant Gutenberg blocks that reduced LCP from 5.5s to 3.2s (Lighthouse 70 → 83), created WordPress plugins for UTM attribution and GTM event tracking, and architected headless WordPress implementations using React + ACF.

I'd love to discuss how I can help [Company] build WordPress solutions that perform and scale.

Here's my WordPress work: https://karolbuczek.com/web-dev-wordpress

Best,
Karol`,
      email: `Subject: WordPress Developer Role at [Company]

Hi [Name],

I'm writing to express interest in the WordPress Developer position at [Company]. I build WordPress solutions that are fast, maintainable, and scalable.

My experience includes:
• Custom WordPress plugins and Gutenberg blocks
• Performance Block (LCP 5.5 → 3.2) — Built a VIP-compliant Gutenberg performance block reducing LCP 5.5s → 3.2s; Lighthouse 70 → 83
• UTM Attribution Plugin — Enables reliable direct-mail → digital tracking
• GTM Event Button Block — Standardizes events for marketers
• Headless WordPress (React + ACF) — Early-stage architecture for decoupled WordPress

I specialize in VIP-compliant architecture & coding standards, WooCommerce performance & checkout optimization, Core Web Vitals debugging & LCP-first improvements, and headless WordPress using React + ACF.

I'd welcome the opportunity to discuss how my WordPress expertise can contribute to [Company]'s platform.

Learn more: https://karolbuczek.com/web-dev-wordpress

Best regards,
Karol Buczek`,
    },
    resumeVariantId: "web-dev-wordpress",
    copyableBullets: [
      "Custom WordPress plugins and Gutenberg blocks",
      "Performance Block (LCP 5.5 → 3.2) — Built a VIP-compliant Gutenberg performance block reducing LCP 5.5s → 3.2s; Lighthouse 70 → 83",
      "UTM Attribution Plugin — Enables reliable direct-mail → digital tracking",
      "GTM Event Button Block — Standardizes events for marketers",
      "Headless WordPress (React + ACF) — Early-stage architecture for decoupled WordPress",
      "Performance-focused plugin & block development",
      "VIP-compliant architecture & coding standards",
      "WooCommerce performance & checkout optimization",
      "Core Web Vitals debugging & LCP-first improvements",
    ],
  },
}

