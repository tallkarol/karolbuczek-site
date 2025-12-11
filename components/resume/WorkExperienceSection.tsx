"use client"

import { useState } from "react"
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
}

const timelineData: TimelineItem[] = [
  {
    period: "2025 — Present",
    officialTitle: "Independent Web Engineer",
    reality: "Engineering custom WordPress/React tooling, improving performance, and building integrations that support marketing, product, and operations.",
    systems: [
      "Built attribution frameworks & event pipelines",
      "Developed WordPress plugins and React-based internal tools",
      "Created automation workflows and API integrations",
      "Improved analytics, funnel reliability & data accuracy",
      "Advised on platform architecture & engineering best practices",
    ],
  },
  {
    period: "2021 — 2024",
    officialTitle: "Universal Windows Direct — Full Stack Web Developer",
    officialDates: "Official Role: Oct 2021 – Jan 2023 • Contractor through 2024",
    reality: "Improved performance, tracking accuracy, and operational reliability across marketing and engineering.",
    systems: [
      "VIP-compliant Gutenberg block → LCP 5.5s → 3.2s, Lighthouse 70 → 83",
      "Built UTM Attribution Plugin for reliable multi-touch tracking",
      "Created GTM Event Button Block for standardized events",
      "Developed backend automation pipelines across CRMs & lead providers",
      "Implemented structured logging & error-handling frameworks",
    ],
  },
  {
    period: "2021 — Present",
    officialTitle: "Mineralife Nutraceuticals — Marketing & IT Consultant",
    officialDates: "July 2021 – Present",
    reality: "Enhanced e-commerce performance, marketing data, and lifecycle automation supporting ongoing business growth.",
    systems: [
      "WooCommerce performance tuning & UX improvements",
      "Lifecycle automation with segmentation refinements",
      "Funnel restructuring & product-page optimization",
      "CRM → email → analytics integrations",
    ],
  },
  {
    period: "2019 — 2021",
    officialTitle: "Perfect Power Wash — Marketing Director / Head of IT",
    officialDates: "Apr 2019 – Jul 2021",
    reality: "Built a unified operational engine across marketing, IT, and sales with automated workflows and clearer reporting.",
    systems: [
      "Redesigned WordPress funnels with measurable CRO lift",
      "Built dashboards for call center, lifecycle & ROI",
      "Automated opportunity tracking across all inbound channels",
      "Implemented structured data processes for forecasting",
    ],
  },
  {
    period: "2009 — 2019",
    officialTitle: "Freelance Developer / Designer",
    officialDates: "Jan 2009 – Apr 2019",
    reality: "Delivered custom WordPress builds and internal tools for small businesses and creative teams.",
    systems: [
      "Custom WP themes, plugins & site builds",
      "Basic dashboards and workflow automation",
      "Brand & conversion-focused redesigns",
    ],
  },
  {
    period: "2016 — 2018",
    officialTitle: "Red Light Management — Marketing / Creative Consultant",
    officialDates: "Sept 2016 – Apr 2018",
    reality: "Created scalable digital assets and repeatable content systems supporting touring artists and management teams.",
    systems: [
      "Designed reusable social and digital toolkits",
      "Streamlined content workflows across multiple artists",
      "Supported tour marketing with templates and rapid-turnaround assets",
    ],
  },
  {
    period: "2014 — 2015",
    officialTitle: "Localtopia Columbus — UX / Marketing Consultant",
    officialDates: "Nov 2014 – Jun 2015",
    reality: "Improved product onboarding, user flows, and design alignment for a local startup marketplace.",
    systems: [
      "Led UX redesign",
      "Built onboarding flows and prototypes",
      "Improved alignment between product and marketing goals",
    ],
  },
  {
    period: "2013 — 2014",
    officialTitle: "CUBE Karaoke — Co-founder / Creative Director",
    officialDates: "Jan 2013 – Apr 2014",
    reality: "Built the brand, customer experience, and early marketing tech stack for a concept-stage entertainment venture.",
    systems: [
      "Designed end-to-end customer experience flows",
      "Conducted research for product and brand positioning",
      "Built early marketing tech foundations",
    ],
  },
  {
    period: "2012 — 2013",
    officialTitle: "in2itiv media — Co-founder / CEO",
    officialDates: "Feb 2012 – Jan 2013",
    reality: "Launched and operated a live-events organization with an emphasis on workflow design and digital promotion.",
    systems: [
      "Built operational pipelines for staffing, logistics & coordination",
      "Managed budgets, schedules & team communication",
      "Created promotional web assets and marketing flows",
    ],
  },
  {
    period: "2011 — 2012",
    officialTitle: "Miami University — Print Production Assistant",
    reality: "Supported high-volume print operations with quality, consistency, and workflow efficiency.",
    systems: [
      "Oversaw production processes to ensure consistency",
      "Established repeatable quality standards",
      "Assisted with layout, formatting & production prep",
    ],
  },
  {
    period: "2009 — 2010",
    officialTitle: "Miami University — Marketing Coordinator",
    reality: "Built foundational marketing assets and repeatable templates for university programs.",
    systems: [
      "Developed marketing collateral and reusable templates",
      "Supported digital and on-campus campaigns",
      "Improved workflow efficiency through iterative refinement",
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

  const handleRoleClick = (item: TimelineItem) => {
    const getDummyData = () => {
      return {
        stats: [
          { label: "Lorem Ipsum", value: "123%" },
          { label: "Dolor Sit", value: "45+" },
          { label: "Amet Consectetur", value: "99.9%" },
        ],
        highlights: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          "Sed do eiusmod tempor incididunt ut labore et dolore",
          "Ut enim ad minim veniam, quis nostrud exercitation",
        ],
        relatedCaseStudies: [
          { slug: "case-study-1", title: "Case Study One" },
          { slug: "case-study-2", title: "Case Study Two" },
          { slug: "case-study-3", title: "Case Study Three" },
        ],
        quote: {
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
          author: "Lorem Ipsum",
          role: "Dolor Sit Amet",
        },
        exampleWork: [
          "Lorem ipsum dolor sit amet consectetur",
          "Adipiscing elit sed do eiusmod tempor",
          "Incididunt ut labore et dolore magna",
        ],
      }
    }

    const dummyData = getDummyData()
    
    const roleDetails: RoleDetails = {
      period: item.period,
      officialTitle: item.officialTitle || "",
      officialDates: item.officialDates,
      reality: item.reality,
      keyProjects: item.keyProjects,
      systems: item.systems,
      ...dummyData,
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
        <div>
          <Typography variant="body-sm" className="text-xs text-muted-foreground mb-1 font-medium">
            {item.period}
          </Typography>
          {item.officialTitle && (
            <button
              onClick={() => handleRoleClick(item)}
              className="text-left group cursor-pointer"
            >
              <Typography variant="body" className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {item.officialTitle}
              </Typography>
              <Typography variant="body-sm" className="text-xs text-muted-foreground mt-0.5 group-hover:text-primary/70 transition-colors">
                Click to view details →
              </Typography>
            </button>
          )}
          {item.officialDates && (
            <Typography variant="body-sm" className="text-xs text-muted-foreground italic mt-1">
              {item.officialDates}
            </Typography>
          )}
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
        </div>

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
                    <Typography variant="body-sm" className="font-semibold mb-4 text-foreground uppercase tracking-wide text-xs">
                      Recent (2019 — Present)
                    </Typography>
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

