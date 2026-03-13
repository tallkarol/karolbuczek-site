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
    reality: "Independent consulting practice focused on solutions architecture, cloud infrastructure, and AI-enabled automation for enterprise and growth-stage clients.",
    systems: [
      "Partner with C-suite, VPs, and founders to translate business requirements into scalable systems, owning solution architecture from discovery through production deployment.",
      "Architected a secure serverless AWS document portal with role-based access and immutable audit logging, replacing manual email-based workflows for handling sensitive files.",
      "Architected an air-gapped AI meeting intelligence system using local Whisper inference to transcribe recordings and extract action items, deadlines, and calendar events without sending sensitive data to external services.",
      "Engineered performance-optimized WordPress infrastructure for an enterprise client, including session-persistent UTM attribution and custom container architecture improving Lighthouse (70 → 83) and load time (5.5s → 3.2s).",
    ],
  },
  {
    period: "2021 — Present",
    officialTitle: "Mineralife Nutraceuticals — Marketing Systems Consultant",
    logo: "/mineralife-logo.png",
    reality: "Consulting role focused on ecommerce infrastructure, internal B2B platforms, and marketing automation architecture.",
    systems: [
      "Architected a multi-tenant CDP layer supporting lifecycle automation and segmentation for a flagship product line, enabling retention campaigns and repeat purchase behavior.",
      "Built a custom CRM-style interface to manage the B2B sales workflow from form submission through contact and conversion, improving lead prioritization and filtering out-of-scope inquiries.",
      "Engineered WooCommerce storefront infrastructure improvements, optimizing performance and UX while implementing data and event integrations with email platforms and analytics systems.",
      "Developed an internal WooCommerce data dashboard surfacing order, inventory, and revenue metrics for operational decision-making.",
    ],
  },
  {
    period: "2021 — 2023",
    officialTitle: "Universal Windows Direct — Integration Engineer (Full Stack)",
    logo: "/uwd-logo.png",
    reality: "Full-stack integration engineering role focused on automation infrastructure, internal platforms, and API integrations supporting marketing, sales, and operations across an enterprise home services organization.",
    systems: [
      "Built a custom integration layer connecting call center, CRM, MarTech, and internal systems, including a shared logging and error-handling framework used across all automation scripts.",
      "Migrated server infrastructure across four VPS partitions with zero downtime, modernizing legacy PHP scripts and removing deprecated patterns and security risks.",
      "Implemented server-side tagging improving attribution reliability and first-party signal capture.",
      "Led the full website migration from Joomla to WordPress while preserving all custom functionality.",
    ],
  },
  {
    period: "2019 — 2021",
    officialTitle: "Perfect Power Wash — Marketing Director",
    logo: "/ppw.png",
    reality: "Promoted to lead the entire marketing department, including IT — owning both the strategy and the technology stack during a period of rapid expansion from 1 market to 4.",
    systems: [
      "Directed cross-functional teams across marketing, sales, and operations, collaborating with external agencies on strategy and execution.",
      "Designed a scalable marketing framework supporting multi-market expansion and adapting to pandemic-era operational constraints.",
      "Architected the data infrastructure and reporting dashboards that gave leadership visibility into performance across markets.",
      "Developed internal tooling across call center operations, lead management, and marketing automation, later hiring and training a developer to extend the systems.",
    ],
  },
  {
    period: "2019",
    officialTitle: "Perfect Power Wash — Marketing Systems Engineer",
    logo: "/ppw.png",
    reality: "Recruited to modernize legacy web infrastructure and re-engineer the conversion pipeline, leveraging emerging technologies to architect omni-channel automations across the customer journey.",
    systems: [
      "Built the organization's first centralized data warehouse aggregating marketing and operational data to support cross-channel attribution and ROI modeling.",
      "Implemented a customer engagement platform orchestrating lead capture and lifecycle automation through multi-touch workflows across email, SMS, and direct mail, improving speed-to-lead and engagement consistency.",
      "Re-architected the website around Core Web Vitals and conversion performance through structured A/B testing and UX analysis, increasing lead velocity while improving both organic and paid market penetration.",
    ],
  },
  {
    period: "2009 — 2019",
    officialTitle: "Freelance Designer / Developer",
    logo: "/logo.png",
    reality: "10 years of client-facing freelance work spanning full-stack web development, brand strategy, and digital infrastructure for small and mid-sized businesses.",
    systems: [
      "Worked directly with business owners to translate goals into technical and creative solutions, delivering websites, ecommerce platforms, brand systems, and marketing campaigns.",
      "Led requirements gathering, project scoping, and client communication across the full delivery lifecycle.",
      "Built foundational expertise in frontend and backend development, UX design, and systems thinking that informs current architecture work.",
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

