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
  quote?: {
    text: string
    author: string
    role?: string
  }
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

// Helper to get role config by RoleFilter
export function getRoleConfigByFilter(roleFilter: RoleFilter): RoleConfig | null {
  const config = Object.values(roleConfigs).find(config => config.roleFilter === roleFilter)
  return config || null
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
  "director-marketing-technology": {
    id: "director-marketing-technology",
    label: "Director, Marketing Technology",
    shortDescription: "Leading marketing technology strategy, systems architecture, and cross-functional teams to build scalable MarTech infrastructure that drives measurable business growth.",
    landingPath: "/director-marketing-technology",
    targetTitles: [
      "Director Marketing Technology",
      "Marketing Technology Director",
      "Marketing Technology Manager",
      "Director Marketing Systems",
      "Marketing Systems Director",
      "Marketing Systems Manager",
      "Head of Marketing Technology",
      "VP Marketing Technology",
    ],
    roleFilter: "MarTech / Growth Engineering",
    outreachTemplates: {
      linkedin: `Hi [Name],

I saw the [Job Title] role at [Company] and wanted to reach out. I lead marketing technology strategy and systems architecture, building scalable MarTech infrastructure that drives measurable business growth.

I've architected enterprise marketing technology systems including multi-touch attribution frameworks, standardized dataLayer event architectures, and automation workflows that connect marketing efforts to measurable outcomes. I've also led cross-functional teams, bridging engineering, marketing, and product to deliver systems that solve real business problems.

My experience includes:
• Leading marketing technology strategy and systems architecture
• Building attribution frameworks & event pipelines that provide accurate ROI measurement
• Architecting automation workflows across CRMs, email platforms, and lead systems
• Cross-functional leadership bridging marketing, product, and engineering
• 10+ years building web platforms, internal tools & data workflows

I'd love to discuss how I can help [Company] build a marketing technology infrastructure that scales and delivers measurable results.

Here's my role-specific landing page: https://karolbuczek.com/director-marketing-technology

Best,
Karol`,
      email: `Subject: Director, Marketing Technology Role at [Company]

Hi [Name],

I'm reaching out regarding the Director, Marketing Technology position at [Company]. I lead marketing technology strategy and systems architecture, building scalable MarTech infrastructure that drives measurable business growth.

My experience includes:
• Leading marketing technology strategy and systems architecture for enterprise organizations
• Building attribution frameworks & event pipelines that provide accurate ROI measurement
• Architecting automation workflows across CRMs, email platforms, and lead systems
• Cross-functional leadership bridging marketing, product, and engineering teams
• 10+ years building web platforms, internal tools & data workflows
• Deep experience with APIs, automation pipelines & PHP/SQL engineering
• WordPress/VIP/WooCommerce engineering + plugin/block/system architecture
• AWS stack experience (Amplify, Cognito, Lambda, RDS, S3)

I've built multi-touch attribution layers for direct mail → digital funnels, designed standardized dataLayer event schemas for GTM across enterprise sites, refactored complex automation workflows into maintainable systems, and produced dashboards for sales efficiency, ROI, and channel performance.

I'd welcome the opportunity to discuss how my leadership experience and technical expertise can help [Company] build a marketing technology infrastructure that scales.

You can learn more about my MarTech leadership work here: https://karolbuczek.com/director-marketing-technology

Best regards,
Karol Buczek`,
    },
    resumeVariantId: "director-marketing-technology",
    copyableBullets: [
      "Leading marketing technology strategy and systems architecture for enterprise organizations",
      "Building attribution frameworks & event pipelines that provide accurate ROI measurement",
      "Architecting automation workflows across CRMs, email platforms, and lead systems",
      "Cross-functional leadership bridging marketing, product, and engineering teams",
      "10+ years building web platforms, internal tools & data workflows",
      "Deep experience with APIs, automation pipelines & PHP/SQL engineering",
      "WordPress/VIP/WooCommerce engineering + plugin/block/system architecture",
      "AWS stack experience (Amplify, Cognito, Lambda, RDS, S3)",
      "Multi-touch attribution layers for direct mail → digital funnels",
      "Standardized dataLayer event schemas for GTM across enterprise sites",
      "Refactored complex automation workflows (70+ steps) into maintainable systems",
      "Dashboards for sales efficiency, ROI, and channel performance",
      "Cross-team communication & stakeholder leadership",
    ],
    quote: {
      text: "He's one of the rare professionals who can bridge the gap between deep technical capability and real business understanding. His integration work created a lasting impact across multiple systems and departments, with an incredible ability to simplify complexity and design solutions that actually solved the root problem instead of just addressing the symptoms.",
      author: "John Kosmides",
      role: "Vice President of Marketing — Perfect Power Wash & Universal Windows Direct",
    },
  },
  "business-solutions-manager": {
    id: "business-solutions-manager",
    label: "Business Solutions Manager",
    shortDescription: "Translating business requirements into technical solutions. I bridge the gap between business stakeholders and engineering teams to deliver systems that solve real problems and drive measurable outcomes.",
    landingPath: "/business-solutions-manager",
    targetTitles: [
      "Business Solutions Manager",
      "Solutions Manager",
      "Technical Solutions Manager",
      "Business Systems Manager",
      "Solutions Architect",
      "Technical Solutions Architect",
      "Product Solutions Manager",
      "Customer Solutions Manager",
    ],
    roleFilter: "Product & Internal Tools",
    outreachTemplates: {
      linkedin: `Hi [Name],

I saw the [Job Title] role at [Company] and wanted to reach out. I translate business requirements into technical solutions, bridging the gap between business stakeholders and engineering teams.

I've worked with cross-functional teams to understand business needs, translate workflows into technical specifications, and deliver systems that solve real problems. My experience includes architecting internal tools, designing workflow platforms, and building solutions that align engineering with business goals.

My experience includes:
• Translating business requirements and workflows into technical solutions
• Identifying and communicating pragmatic solutions to complex integration problems
• Engineering alignment across marketing, product & operations
• Architecting internal tools & workflow platforms
• Cross-functional communication & stakeholder leadership
• 10+ years building web platforms, internal tools & data workflows

I'd love to discuss how I can help [Company] bridge the gap between business needs and technical implementation.

Here's my role-specific landing page: https://karolbuczek.com/business-solutions-manager

Best,
Karol`,
      email: `Subject: Business Solutions Manager Role at [Company]

Hi [Name],

I'm reaching out regarding the Business Solutions Manager position at [Company]. I translate business requirements into technical solutions, bridging the gap between business stakeholders and engineering teams.

My experience includes:
• Translating business requirements and workflows into technical solutions that deliver value
• Identifying and communicating pragmatic solutions to complex integration problems
• Engineering alignment across marketing, product & operations
• Architecting internal tools & workflow platforms
• Applying systems thinking to funnels, data flow & platform design
• Cross-functional communication & stakeholder leadership
• 10+ years building web platforms, internal tools & data workflows
• Deep experience with APIs, automation pipelines & PHP/SQL engineering
• AWS stack experience (Amplify, Cognito, Lambda, RDS, S3)

I've architected internal tools & workflow platforms, designed secure document systems with RBAC, and built solutions that enhance efficiency across sales, operations, and marketing handoffs. I'm comfortable leading meetings with high-level decision makers and navigating ambiguity to make decisions that pull in the right people.

I'd welcome the opportunity to discuss how my experience bridging business and technical teams can help [Company] deliver solutions that solve real business problems.

You can learn more about my solutions management work here: https://karolbuczek.com/business-solutions-manager

Best regards,
Karol Buczek`,
    },
    resumeVariantId: "business-solutions-manager",
    copyableBullets: [
      "Translating business requirements and workflows into technical solutions that deliver value",
      "Identifying and communicating pragmatic solutions to complex integration problems",
      "Engineering alignment across marketing, product & operations",
      "Architecting internal tools & workflow platforms",
      "Applying systems thinking to funnels, data flow & platform design",
      "Cross-functional communication & stakeholder leadership",
      "Comfortable leading meetings with high-level decision makers",
      "Navigates ambiguity and makes decisions by pulling in the right people",
      "10+ years building web platforms, internal tools & data workflows",
      "Deep experience with APIs, automation pipelines & PHP/SQL engineering",
      "AWS stack experience (Amplify, Cognito, Lambda, RDS, S3)",
      "Architected internal tools & workflow platforms",
      "Designed secure document systems with RBAC (AWS)",
      "Built solutions that enhance efficiency across sales, operations, and marketing handoffs",
    ],
    quote: {
      text: "He's one of the rare professionals who can bridge the gap between deep technical capability and real business understanding. He never just built a solution, he understood the business case behind it. Whether the work involved internal tools, customer-facing platforms, or data connections between legacy systems, he always approached challenges with clarity, logic, and a calm, solutions-focused mindset.",
      author: "John Kosmides",
      role: "Vice President of Marketing — Universal Windows Direct",
    },
  },
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
    quote: {
      text: "He's one of the rare professionals who can bridge the gap between deep technical capability and real business understanding. His integration work created a lasting impact across multiple systems and departments, with an incredible ability to simplify complexity and design solutions that actually solved the root problem instead of just addressing the symptoms.",
      author: "John Kosmides",
      role: "Vice President of Marketing — Perfect Power Wash & Universal Windows Direct",
    },
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
    quote: {
      text: "He never just built a solution, he understood the business case behind it. His integration work created a lasting impact across multiple systems and departments, with an incredible ability to simplify complexity, work collaboratively with other departments, and design solutions that actually solved the root problem instead of just addressing the symptoms.",
      author: "John Kosmides",
      role: "Vice President of Marketing — Perfect Power Wash",
    },
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
    quote: {
      text: "His skillset allows him to operate as an expert in nearly every aspect of a business. Whether you need someone to lead or support you in any role, Karol is your man.",
      author: "Julian Quesada",
      role: "Software Engineer — Direct Report",
    },
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
    quote: {
      text: "He's one of the rare professionals who can bridge the gap between deep technical capability and real business understanding. He never just built a solution, he understood the business case behind it. Whether the work involved internal tools, customer-facing platforms, or data connections between legacy systems, he always approached challenges with clarity, logic, and a calm, solutions-focused mindset.",
      author: "John Kosmides",
      role: "Vice President of Marketing — Universal Windows Direct",
    },
  },
}

