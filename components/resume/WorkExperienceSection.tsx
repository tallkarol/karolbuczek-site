"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Typography } from "@/components/typography"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { CareerTimeline } from "./CareerTimeline"
import { RoleModal, RoleDetails } from "./RoleModal"
import { RoleFilter } from "@/components/resume/ResumeFilters"
import { lensToRoles } from "@/lib/resume-data"

interface TimelineItem {
  period: string
  officialTitle?: string
  officialDates?: string
  reality?: string
  keyProjects?: string[]
  systems?: string[]
  logo?: string
}

const timelineData: TimelineItem[] = [
  {
    period: "2023 — Present",
    officialTitle: "Tall Karol — Principal Solutions Architect",
    logo: "/tallkarol-monogram-logo.png",
    reality: "Directs the architectural lifecycle from pre-sales discovery to production deployment, specializing in cloud infrastructure, high-scale API orchestration, and MarTech governance for growth-stage and enterprise clients.",
    systems: [
      "Architected a serverless, multi-tenant document portal on AWS (Amplify, Cognito, Lambda, S3, RDS) with strict data isolation and immutable audit logging to meet enterprise compliance requirements.",
      "Designed a decoupled ETL middleware layer on GCP using Python to orchestrate asynchronous data transfers into Databricks; ensured data integrity and idempotency across heterogeneous systems.",
      "Engineered a centralized data warehouse and ingestion pipeline to aggregate fragmented business sources, delivering real-time observability and predictive revenue forecasting.",
      "Standardized cross-platform governance by architecting integration bridges between CRMs and lead sources, eliminating data silos through automated schema normalization.",
      "Developed a persistent UTM attribution engine to solve first-touch/last-touch visibility gaps, enabling accurate marketing ROI modeling for the first time.",
      "Architected an air-gapped AI meeting intelligence system using HuggingFace Whisper; engineered local inference to eliminate data residency risks while automating deadline extraction.",
      "Created a reusable GTM event schema and component architecture, enabling marketing teams to deploy standardized tracking events without engineering intervention.",
      "Optimized enterprise WordPress architecture for VIP environments; refined the render path and asset orchestration to reduce LCP from 5.5s to 3.2s and lift Lighthouse scores to 83.",
    ],
  },
  {
    period: "2021 — 2023",
    officialTitle: "Universal Windows Direct — Backend & Integration Engineer (Full Stack)",
    logo: "/uwd-logo.png",
    reality: "Owned the integration architecture and internal tooling for a national enterprise home services organization, focusing on system reliability and operational scalability.",
    systems: [
      "Designed a centralized, service-oriented integration layer connecting Five9, Mailchimp, and CRM; replaced brittle, manual handoffs with a robust, event-driven automation framework.",
      "Implemented a shared telemetry and logging framework across the internal automation ecosystem, reducing Mean Time to Recovery (MTTR) by providing full request-lifecycle visibility.",
      "Architected a modular lead management and intake system that optimized routing logic and capture speed, directly impacting sales-floor responsiveness.",
      "Engineered resilient cron-based data pipelines on VPS infrastructure to transform and clean high-volume datasets prior to distribution across marketing and sales systems.",
      "Managed critical infrastructure operations, including a zero-downtime migration across 4 VPS partitions and a complex platform transition from legacy Joomla to WordPress.",
    ],
  },
  {
    period: "2021 — Present",
    officialTitle: "Mineralife Nutraceuticals — Web & Marketing Systems Consultant",
    logo: "/mineralife-logo.png",
    reality: "Engineering improvements across B2C and B2B ecommerce platforms, improving data visibility, lifecycle automation, and marketing system reliability.",
    systems: [
      "Optimized Core Web Vitals and UX across WooCommerce B2C and B2B environments, focusing on checkout performance and conversion-path friction.",
      "Designed an internal dashboard with operations and marketing stakeholders to surface order, inventory, and revenue data for decision-making.",
      "Developed complex lifecycle automation workflows and segmentation logic to maximize customer lifetime value (CLV) and retention.",
      "Architected data and event integrations between commerce platforms and marketing CRMs to ensure synchronized customer records and reporting accuracy.",
    ],
  },
  {
    period: "2019 — 2021",
    officialTitle: "Perfect Power Wash — Marketing Director / Head of IT",
    logo: "/ppw.png",
    reality: "Owned both the business strategy and the technology stack during a period of rapid expansion from 1 market to 4; bridged the gap between C-suite goals and engineering execution.",
    systems: [
      "Architected the internal tech stack supporting high-volume call center operations and lead management; hired and mentored a development team to extend these custom systems.",
      "Engineered a data-driven conversion framework via systematic A/B testing, resulting in a 237% increase in conversion rate and a 175% improvement in CTR.",
      "Designed the multi-market data infrastructure and reporting dashboards that provided leadership with a unified view of performance across all territories.",
      "Navigated pandemic-era operational restrictions by rapidly adapting the marketing framework and data-capture workflows to support remote operations.",
      "Directed cross-functional teams across marketing, sales, and operations to align technical roadmap with brand and revenue objectives.",
    ],
  },
  {
    period: "2009 — 2019",
    officialTitle: "Freelance Developer / Designer",
    logo: "/logo.png",
    reality: "A decade of client-facing work spanning full-stack development and digital infrastructure, translating high-level business goals into scalable technical architectures.",
    systems: [
      "Worked directly with business owners to translate strategic goals into technical outcomes—including ecommerce builds and complex brand systems.",
      "Developed core competencies in requirements gathering, project scoping, and stakeholder management across the full delivery lifecycle.",
      "Applied systems thinking to frontend and backend development to ensure long-term platform viability and maintainability for small-to-mid-sized businesses.",
    ],
  },
]

interface WorkExperienceSectionProps {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  roleFilter?: RoleFilter
}

export function WorkExperienceSection({ isOpen: controlledIsOpen, onOpenChange, roleFilter }: WorkExperienceSectionProps = {}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen
  const setIsOpen = onOpenChange || ((value: boolean) => setInternalIsOpen(value))
  const [showEarlyYears, setShowEarlyYears] = useState(false)
  const [selectedRole, setSelectedRole] = useState<RoleDetails | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Split timeline into recent (2019+) and early years (2018 and earlier)
  const recentItems = timelineData.filter((item) => {
    const startYear = parseInt(item.period.split("—")[0]?.trim() || item.period.split("–")[0]?.trim() || "0")
    const endPart = item.period.split("—")[1] || item.period.split("–")[1] || ""
    const endYear = endPart.includes("Present") ? 9999 : parseInt(endPart.trim().split(" ")[0] || "0")
    
    return startYear >= 2019 || endYear >= 2019
  })
  
  const earlyItems = timelineData.filter((item) => {
    const startYear = parseInt(item.period.split("—")[0]?.trim() || item.period.split("–")[0]?.trim() || "0")
    const endPart = item.period.split("—")[1] || item.period.split("–")[1] || ""
    const endYear = endPart.includes("Present") ? 9999 : parseInt(endPart.trim().split(" ")[0] || "0")
    
    return startYear <= 2018 && endYear < 2019
  })

  const getRoleModalData = (item: TimelineItem): Partial<RoleDetails> => {
    const title = item.officialTitle || ""
    if (title.includes("Tall Karol")) {
      return {
        relatedCaseStudies: [
          { slug: "secure-document-management-portal", title: "Bliss Secure File Share" },
          { slug: "unified-customer-lifecycle-platform", title: "MHAT Platform" },
          { slug: "uwd-enterprise-integration-api", title: "UWD Enterprise Integration API" },
          { slug: "local-ai-meeting-intelligence", title: "Local AI Meeting Intelligence" },
          { slug: "martech-extension-architecture", title: "MarTech Extension Architecture" },
        ],
      }
    }
    if (title.includes("Universal Windows Direct")) {
      return {
        relatedCaseStudies: [
          { slug: "uwd-enterprise-integration-api", title: "UWD Enterprise Integration API" },
        ],
        quote: {
          text: "He's one of the rare professionals who can bridge the gap between deep technical capability and real business understanding. His integration work created a lasting impact across multiple systems and departments.",
          author: "John Kosmides",
          role: "Vice President of Marketing — Direct Manager",
        },
      }
    }
    if (title.includes("Mineralife")) {
      return {
        relatedCaseStudies: [
          { slug: "unified-customer-lifecycle-platform", title: "MHAT Platform" },
        ],
      }
    }
    if (title.includes("Perfect Power Wash")) {
      return {
        stats: [
          { label: "Conversion rate increase", value: "237%" },
          { label: "CTR improvement", value: "175%" },
        ],
        quote: {
          text: "He's one of the rare professionals who can bridge the gap between deep technical capability and real business understanding. He never just built a solution, he understood the business case behind it.",
          author: "John Kosmides",
          role: "Vice President of Marketing — Direct Manager",
        },
      }
    }
    if (title.includes("Freelance")) {
      return {
        quote: {
          text: "Karol is a wildly multi-talented man with an absurd amount of expertise in numerous fields. He's an incredible mentor and played a critical role on my path to software development.",
          author: "Julian Quesada",
          role: "Software Engineer — Direct Report",
        },
      }
    }
    return {}
  }

  const handleRoleClick = (item: TimelineItem) => {
    const modalData = getRoleModalData(item)
    const roleDetails: RoleDetails = {
      period: item.period,
      officialTitle: item.officialTitle || "",
      officialDates: item.officialDates,
      reality: item.reality,
      keyProjects: item.keyProjects,
      systems: item.systems,
      ...modalData,
    }
    setSelectedRole(roleDetails)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedRole(null), 300)
  }

  const renderTimelineItem = (item: TimelineItem, index: number, isEarly = false) => {
    // Check if this role is relevant to the filter
    const relevantRoles = roleFilter && roleFilter !== "all" ? lensToRoles[roleFilter] || [] : []
    // Extract company/title part (before dates) for matching
    const itemTitleForMatching = item.officialTitle?.split("(")[0]?.trim() || ""
    const isRelevant = !roleFilter || roleFilter === "all" || relevantRoles.some(role => {
      // Extract company/title part from lens role string (before dates)
      const roleTitleForMatching = role.split("(")[0]?.trim() || ""
      return itemTitleForMatching === roleTitleForMatching || 
             itemTitleForMatching.includes(roleTitleForMatching) ||
             roleTitleForMatching.includes(itemTitleForMatching)
    })
    
    return (
    <div
      key={index}
      className={`relative pl-6 border-l-2 pb-8 last:pb-0 last:border-l-0 ${
        roleFilter && roleFilter !== "all" && isRelevant
          ? "border-primary/50"
          : "border-border/50"
      }`}
    >
      <div className={`absolute -left-[7px] top-0 h-3 w-3 rounded-full border-2 border-background ${
        roleFilter && roleFilter !== "all" && isRelevant
          ? "bg-primary"
          : "bg-primary/50"
      }`} />
      
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          {item.logo && (
            <Image
              src={item.logo}
              alt=""
              width={40}
              height={40}
              className="flex-shrink-0 h-12 w-12 object-contain mt-0.5"
            />
          )}
          <div className="flex-1 min-w-0">
            <Typography variant="body-sm" className="text-xs text-muted-foreground font-medium">
              {item.period}
            </Typography>
            {item.officialTitle && (
              <button
                onClick={() => handleRoleClick(item)}
                className="text-left group cursor-pointer w-full mt-0.5"
              >
                <Typography variant="body-sm" className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {item.officialTitle}
                </Typography>
              </button>
            )}
            {item.officialDates && (
              <Typography variant="body-sm" className="text-xs text-muted-foreground italic mt-1">
                {item.officialDates}
              </Typography>
            )}
          </div>
        </div>
        {item.reality && (
          <div className={`mt-2 p-3 rounded-lg border ${
            roleFilter && roleFilter !== "all" && isRelevant
              ? "bg-primary/5 border-primary/30"
              : "bg-muted/30 border-border/50"
          }`}>
            <Typography variant="body-sm" className="text-muted-foreground italic text-xs">
              {item.reality}
            </Typography>
          </div>
        )}
        {item.systems && item.systems.length > 0 && (
          <div>
            <Typography variant="body-sm" className="font-semibold mb-2 text-foreground text-xs">
              Highlights:
            </Typography>
            <ul className="space-y-1.5">
              {item.systems.map((system, pIndex) => (
                <li key={pIndex} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                  <Typography variant="body-sm" className="text-muted-foreground text-xs">
                    {system}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
  }

  return (
    <>
      <Card id="work-experience" className="border-border/50 hover:border-primary/30 transition-colors scroll-mt-20">
        <CardHeader className="pb-0 border-b-0">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              setIsOpen(!isOpen)
            }}
            className="w-full flex items-center justify-between gap-3 pb-4 border-b border-border/30 hover:opacity-70 transition-opacity group cursor-pointer"
          >
            <CardTitle className="text-lg font-display flex items-center gap-2 group-hover:text-primary transition-colors pointer-events-none">
              <span className="h-1 w-1 rounded-full bg-primary" />
              Work Experience
            </CardTitle>
            {isOpen ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground pointer-events-none" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground pointer-events-none" />
            )}
          </button>
        </CardHeader>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <CardContent className="pt-6">
                <div className="space-y-8">
                  {/* Recent work */}
                  <div>
                    <div className="space-y-0">
                      {recentItems.map((item, index) => renderTimelineItem(item, index))}
                    </div>
                  </div>

                  {/* Early years - collapsible */}
                  {earlyItems.length > 0 && (
                    <div className="pt-4 border-t border-border/50">
                      <Button
                        variant="ghost"
                        onClick={() => setShowEarlyYears(!showEarlyYears)}
                        className="w-full justify-between p-0 h-auto hover:bg-transparent"
                      >
                        <Typography variant="body-sm" className="font-semibold text-foreground uppercase tracking-wide text-xs">
                          2018 & Earlier
                        </Typography>
                        {showEarlyYears ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                      {showEarlyYears && (
                        <div className="mt-4 space-y-0">
                          {earlyItems.map((item, index) => renderTimelineItem(item, index, true))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Early Career Experience — not part of timeline */}
                  <div className="pt-6 border-t border-border/50">
                    <Typography variant="body-sm" className="font-semibold text-foreground uppercase tracking-wide text-xs mb-3">
                      Early Career Experience
                    </Typography>
                    <ul className="space-y-1.5 pl-4">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        <Typography variant="body-sm" className="text-muted-foreground text-xs">
                          Marketing / Design — Red Light Management <span className="text-muted-foreground/70">(2016 — 2018)</span>
                        </Typography>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        <Typography variant="body-sm" className="text-muted-foreground text-xs">
                          Marketing & IT Consultant — Localtopia <span className="text-muted-foreground/70">(2014 — 2015)</span>
                        </Typography>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        <Typography variant="body-sm" className="text-muted-foreground text-xs">
                          Co-Founder / Creative Director — CUBE Karaoke LLC <span className="text-muted-foreground/70">(2013 — 2014)</span>
                        </Typography>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        <Typography variant="body-sm" className="text-muted-foreground text-xs">
                          Co-Founder / CEO — in2itiv media LLC <span className="text-muted-foreground/70">(2012 — 2013)</span>
                        </Typography>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      <RoleModal
        role={selectedRole}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}

