"use client"

import { useState } from "react"
import { Typography } from "@/components/typography"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RoleModal, RoleDetails } from "./RoleModal"

interface TimelineItem {
  period: string
  officialTitle?: string
  officialDates?: string
  reality?: string
  keyProjects?: string[]
  systems?: string[]
  narrative?: string
}

const timelineData: TimelineItem[] = [
  {
    period: "2025 — Present",
    officialTitle: "Independent Web Systems Engineer",
    keyProjects: [
      "Headless WordPress (React + ACF) — early architecture for decoupled CMS workflows",
      "AI-side projects — workout tracker (progressive overload logic), AI-assisted shopping list with pantry state, recipe recommendation logic",
      "WooCommerce migration (Astra → Shoptimizer) including checkout flow restructuring and performance enhancements",
      "ShipStation Live Rates plugin (planned/underway) — custom shipping integration for WooCommerce",
      "Portfolio build-out: TallKarol (React/Tailwind) + KarolBuczek.com (technical showcase)",
    ],
  },
  {
    period: "2021 — 2024",
    officialTitle: "Universal Windows Direct — Full Stack Web Developer",
    officialDates: "Official Position: Oct 2021 – Jan 2023",
    reality: "Delivered backend automation and systems engineering solutions across WordPress, APIs, and data pipelines.",
    systems: [
      "Custom performance block (WordPress VIP-compliant) — Built a top-funnel block that reduced LCP ~5.5s → 3.2s and Lighthouse 70 → 83",
      "UTM Attribution Plugin — Persisted UTMs with cookies/localStorage; injected into Gravity Forms; improved direct-mail → digital attribution",
      "GTM Event Button Block — Enabled structured GTM tracking via marketer-friendly controls (dropdown/text inputs)",
      "Backend Automation (PHP + SQL + Cron) — Workflow scripts for routing customers, updating statuses, follow-up logic. Large-table SQL operations for data syncing + sales funnel logic",
      "API integrations with Mailchimp, Birdeye, Five9, CRMs, Hover, lead aggregators",
      "Lead Ingestion Framework — Normalized incoming aggregator payloads; synced into CRM pipelines",
      "Logging & Debug Framework — Custom error tracing for VPS cron jobs and automation scripts",
      "Zapier → SubZap Refactoring — Reduced 70+ step 'monster zaps' to ~22 modular flows. Dramatically improved maintainability + feature rollout speed",
    ],
  },
  {
    period: "2021 — Present",
    officialTitle: "Mineralife Nutraceuticals — Marketing & IT Consultant",
    officialDates: "Official Position: July 2021 – Present",
    reality: "Delivered systems work across both engagements simultaneously, focusing on e-commerce optimization and marketing automation.",
    systems: [
      "WooCommerce configuration + optimization",
      "Migrating and improving product pages and funnels",
      "Email/SMS improvements (metrics to be added later)",
      "Analytics + GTM + GA4 enhancements",
      "Performance tuning and page restructuring where needed",
      "Integrations with Hover, Mailchimp, and other marketing ops tools",
    ],
  },
  {
    period: "2019 — 2021",
    officialTitle: "Perfect Power Wash — Marketing Director / Head of IT",
    officialDates: "Official Position: Apr 2019 – Jul 2021",
    reality: "Delivered MarTech engineering solutions and internal tool development, including dashboards, analytics models, and automation systems.",
    systems: [
      "Designed and improved WordPress funnels with significant CRO gains",
      "Built dashboards for call center and sales performance",
      "Automated opportunity tracking across every channel",
      "Built analytics models for spend, ROI, lead quality, and attribution",
      "Directed tech integrations (LeadPerfection, Birdeye, Five9)",
      "Oversaw infrastructure migrations and standardized tool usage",
    ],
  },
  {
    period: "2013 — 2019",
    officialTitle: "Freelance Developer / Designer",
    officialDates: "Official Position: Jan 2009 – Apr 2019",
    reality: "Built full-stack WordPress solutions, early internal tools, and brand systems for small businesses and creatives.",
    systems: [
      "Full-stack WordPress builds for small businesses and creatives",
      "Early internal tool development (basic dashboards, workflow logic)",
      "Brand systems + UI + conversion-focused redesigns",
      "API-based customizations and theme/plugin-level logic for special features",
      "Photography/video + UX-driven design work integrated into site builds",
    ],
  },
  {
    period: "2016 — 2018",
    officialTitle: "Red Light Management — Marketing / Graphic Design Consultant",
    officialDates: "Official Position: Sept 2016 – Apr 2018",
    systems: [
      "Built digital assets, content systems, and toolkits for touring artists",
      "Delivered scalable systems for repeated use across brands",
    ],
  },
  {
    period: "2014 — 2015",
    officialTitle: "Localtopia Columbus — Marketing Consultant / UX Designer",
    officialDates: "Official Position: Nov 2014 – Jun 2015",
    systems: [
      "Led UX redesign",
      "Built onboarding flows & standardized processes",
      "Created prototypes to align business & engineering requirements",
    ],
  },
  {
    period: "2013 — 2014",
    officialTitle: "CUBE Karaoke — Co-founder / Creative Director",
    officialDates: "Official Position: Jan 2013 – Apr 2014",
    systems: [
      "Designed the full customer experience",
      "Conducted research to refine product positioning",
      "Built marketing tech flows and brand systems",
      "Coordinated cross-functional operations and product development",
    ],
  },
  {
    period: "2012 — 2013",
    officialTitle: "in2itiv media — Co-founder / CEO",
    officialDates: "Official Position: Feb 2012 – Jan 2013",
    systems: [
      "Developed event operations pipelines",
      "Coordinated teams, logistics, and budgets",
      "Built early promotional systems and web assets",
    ],
  },
  {
    period: "2011 — 2012",
    officialTitle: "Miami University — Print Production Assistant",
    systems: [
      "Designed and produced printed assets at scale",
      "Implemented quality control processes and ensured system consistency",
    ],
  },
  {
    period: "2009 — 2010",
    officialTitle: "Miami University — Marketing Coordinator (Outdoor Pursuit Center)",
    systems: [
      "Built promotional systems, templates, and workflows",
      "Implemented iterative design processes with continuous improvement cycles",
    ],
  },
]

export function CareerTimeline() {
  const [showEarlyYears, setShowEarlyYears] = useState(false)
  const [selectedRole, setSelectedRole] = useState<RoleDetails | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Split timeline into recent (2019+) and early years (2018 and earlier)
  const recentItems = timelineData.filter((item) => {
    const startYear = parseInt(item.period.split("—")[0]?.trim() || item.period.split("–")[0]?.trim() || "0")
    const endPart = item.period.split("—")[1] || item.period.split("–")[1] || ""
    const endYear = endPart.includes("Present") ? 9999 : parseInt(endPart.trim().split(" ")[0] || "0")
    
    // Keep if starts 2019+, or if it spans into recent years (ends 2019+)
    return startYear >= 2019 || endYear >= 2019
  })
  
  const earlyItems = timelineData.filter((item) => {
    const startYear = parseInt(item.period.split("—")[0]?.trim() || item.period.split("–")[0]?.trim() || "0")
    const endPart = item.period.split("—")[1] || item.period.split("–")[1] || ""
    const endYear = endPart.includes("Present") ? 9999 : parseInt(endPart.trim().split(" ")[0] || "0")
    
    // Early years: starts 2018 or earlier AND ends before 2019
    return startYear <= 2018 && endYear < 2019
  })

  const handleRoleClick = (item: TimelineItem) => {
    // Generic dummy data with Lorem Ipsum
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

  const renderTimelineItem = (item: TimelineItem, index: number, isEarly = false) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-6 border-l-2 border-border/50 pb-8 last:pb-0 last:border-l-0"
    >
      <div className="absolute -left-[7px] top-0 h-3 w-3 rounded-full bg-primary border-2 border-background" />
      
      <div className="space-y-3">
        <div>
          <Typography variant="h3" as="h3" className="text-base font-display font-semibold mb-1">
            {item.period}
          </Typography>
          {item.officialTitle && (
            <button
              onClick={() => handleRoleClick(item)}
              className="text-left group cursor-pointer"
            >
              <Typography variant="body-sm" className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {item.officialTitle}
              </Typography>
              <Typography variant="body-sm" className="text-xs text-muted-foreground mt-0.5 group-hover:text-primary/70 transition-colors">
                Click to view details →
              </Typography>
            </button>
          )}
          {item.officialDates && (
            <Typography variant="body-sm" className="text-muted-foreground italic">
              {item.officialDates}
            </Typography>
          )}
          {item.reality && (
            <div className="mt-2 p-3 rounded-lg bg-muted/30 border border-border/50">
            <Typography variant="body-sm" className="text-muted-foreground italic">
              {item.reality}
            </Typography>
            </div>
          )}
        </div>

        {item.keyProjects && item.keyProjects.length > 0 && (
          <div>
            <Typography variant="body-sm" className="font-semibold mb-2 text-foreground">
              Key Projects:
            </Typography>
            <ul className="space-y-2">
              {item.keyProjects.map((project, pIndex) => (
                <li key={pIndex} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  <Typography variant="body-sm" className="text-muted-foreground">
                    {project}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>
        )}

        {item.systems && item.systems.length > 0 && (
          <div>
            <Typography variant="body-sm" className="font-semibold mb-2 text-foreground">
              Systems & Engineering:
            </Typography>
            <ul className="space-y-2">
              {item.systems.map((system, sIndex) => (
                <li key={sIndex} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  <Typography variant="body-sm" className="text-muted-foreground">
                    {system}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  )

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-6 border-b border-border/30">
        <CardTitle className="text-lg font-display">Career & Project Timeline</CardTitle>
        <Typography variant="body-sm" className="text-muted-foreground mt-2">
          A blend of official roles and the systems built during each period.
        </Typography>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-8">
          {recentItems.map((item, index) => renderTimelineItem(item, index))}
          
          {earlyItems.length > 0 && (
            <div>
              <Button
                onClick={() => setShowEarlyYears(!showEarlyYears)}
                variant="ghost"
                className="w-full justify-between p-4 h-auto hover:bg-muted/50"
              >
                <Typography variant="h3" as="h3" className="text-base font-display font-semibold">
                  The Early Years (2018 & Earlier)
                </Typography>
                {showEarlyYears ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </Button>
              
              <AnimatePresence>
                {showEarlyYears && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 space-y-8">
                      {earlyItems.map((item, index) => renderTimelineItem(item, index, true))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </CardContent>

      <RoleModal
        role={selectedRole}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </Card>
  )
}

