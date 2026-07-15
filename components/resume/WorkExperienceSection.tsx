"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Typography } from "@/components/typography"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { RoleModal, RoleDetails } from "./RoleModal"
import { RoleFilter } from "@/components/resume/ResumeFilters"
import { lensToRoles } from "@/lib/resume-data"

interface ClientEngagement {
  client: string
  role: string
  period: string
  logo?: string
  bullets: string[]
}

interface TimelineItem {
  period: string
  officialTitle?: string
  officialDates?: string
  reality?: string
  keyProjects?: string[]
  systems?: string[]
  engagements?: ClientEngagement[]
  logo?: string
}

const timelineData: TimelineItem[] = [
  {
    period: "2023 — Present",
    officialTitle: "Tall Karol — Independent Solutions Architect & Consultant",
    logo: "/tallkarol-monogram-logo.png",
    reality: "Solo consulting practice: systems integration, automation, cloud application development, and enterprise / multi-site WordPress for retained and project clients.",
    engagements: [
      {
        client: "Great Day Improvements",
        role: "Systems Integration & WordPress VIP Engineering",
        period: "Apr 2025 – Present",
        logo: "/gdi-logo.svg",
        bullets: [
          "Built a modular integration architecture across 8 brands, connecting multiple CRMs and third-party vendors into shared cross-brand workflows.",
          "Contributing engineer on an enterprise-wide migration consolidating all brand websites onto a single WordPress VIP platform: custom Gutenberg blocks, reusable patterns, and templates that let marketing teams build pages without developer tickets.",
        ],
      },
      {
        client: "Mineralife Nutraceuticals",
        role: "Marketing Systems Consultant — Ecommerce & B2B",
        period: "2021 – Present",
        logo: "/mineralife-logo.png",
        bullets: [
          "Built a custom B2B sales-workflow interface to qualify inquiries and manage opportunities from submission through conversion.",
          "Re-architected the B2B website as a headless WordPress + React application, preserving WordPress for content management while replacing the legacy frontend with a leaner delivery layer. Raised mobile Lighthouse performance from 51 to 94, cut time to interactive from 12.5s to 3.1s, and reduced network requests from 314 to 51.",
        ],
      },
      {
        client: "Bliss",
        role: "Audit & certification provider — Secure Document Portal",
        period: "Project engagement",
        logo: "/bliss-cb.png",
        bullets: [
          "Designed and shipped a serverless document portal on AWS using managed identity and signed-URL file delivery to enforce role-based access with immutable audit logging.",
          "Replaced email-based file sharing for compliance-sensitive workflows.",
        ],
      },
      {
        client: "Artist House",
        role: "Full-Stack Engineer — A&R Discovery Platform",
        period: "Project engagement",
        logo: "/artisthouse_logo_square.png",
        bullets: [
          "Built and shipped a production A&R discovery platform used daily by junior and senior A&R staff: role-based analytics, automated chart/social crawls, XLSX reports, email delivery, and artist watchlists.",
          "Next.js/TypeScript application with a PostgreSQL backend, deployed on Vercel and Railway.",
        ],
      },
    ],
  },
  {
    period: "2021 — 2023",
    officialTitle: "Universal Windows Direct (Great Day Improvements) — Integration Engineer",
    logo: "/uwd-logo.png",
    reality: "Automation infrastructure and API integrations across marketing, sales, and call-center operations at an enterprise home services organization.",
    systems: [
      "Expanded and organized a centralized PHP script-based integration API connecting multiple systems including Five9, CRM, Mailchimp, and internal platforms. Implemented modular routes and a shared logging and error-handling framework that made failures traceable across all automations.",
      "Migrated server infrastructure across four VPS partitions with zero downtime, modernizing legacy PHP and removing deprecated security risks.",
    ],
  },
  {
    period: "2019 — 2021",
    officialTitle: "Perfect Power Wash — Marketing Systems Engineer → Marketing Director",
    logo: "/ppw.png",
    reality: "Recruited to modernize web and data infrastructure; promoted to lead marketing, including ownership of the technology stack.",
    systems: [
      "Built the organization's first centralized data warehouse aggregating marketing and operational data for cross-channel attribution.",
      "Developed internal tooling across call-center operations, lead management, and automation, then hired and trained a developer to extend the systems.",
      "Built and standardized scalable marketing systems and technology that supported brand expansion from one market to four.",
    ],
  },
  {
    period: "2009 — 2019",
    officialTitle: "Early Career — Freelance Development & Startups",
    logo: "/logo.png",
    reality: "Ten years of client-facing full-stack web development and digital infrastructure for small and mid-sized businesses; co-founded two ventures, raising $340K for one.",
    systems: [
      "Marketing / Design — Red Light Management (2016 — 2018)",
      "Marketing & IT Consultant — Localtopia (2014 — 2015)",
      "Co-Founder / CEO — Garcia L8r (2013 — 2016)",
      // TODO(karol): reconcile CUBE title with LinkedIn
      "Co-Founder / Creative Director — CUBE Karaoke LLC (2013 — 2014)",
      // TODO(karol): reconcile in2itiv dates with LinkedIn
      "Co-Founder / CEO — in2itiv media LLC (2012 — 2013)",
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
          { slug: "mineralife-b2b-website-rebuild", title: "Mineralife B2B Website Rebuild" },
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
          text: "I've worked with Karol on a wide variety of API and integration projects spanning sales, marketing, and operations. He is highly technical, incredibly quick to learn new workflows, and remarkably dynamic when it comes to evolving project requirements. I highly recommend Karol for any role that requires technical expertise paired with a strong business mindset.",
          author: "Christopher Jarvis",
          role: "VP of Enterprise Digital Marketing, Great Day Improvements — Direct Manager",
        },
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
    if (title.includes("Freelance") || title.includes("Early Career")) {
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
    const systemsFromEngagements = item.engagements?.flatMap((engagement) =>
      engagement.bullets.map((bullet) => `${engagement.client}: ${bullet}`)
    )
    const roleDetails: RoleDetails = {
      period: item.period,
      officialTitle: item.officialTitle || "",
      officialDates: item.officialDates,
      reality: item.reality,
      keyProjects: item.keyProjects,
      systems: item.systems || systemsFromEngagements,
      ...modalData,
    }
    setSelectedRole(roleDetails)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedRole(null), 300)
  }

  const renderEngagements = (engagements: ClientEngagement[]) => (
    <div className="mt-5 ml-1 border-l border-border/40 pl-4 space-y-5">
      <Typography variant="body-sm" className="font-semibold text-muted-foreground text-[11px] uppercase tracking-[0.14em]">
        Client engagements under Tall Karol
      </Typography>
      {engagements.map((engagement) => {
        const isSvg = engagement.logo?.endsWith(".svg")
        return (
          <div key={`${engagement.client}-${engagement.period}`} className="relative space-y-2.5">
            <div className="absolute -left-[21px] top-3 h-2 w-2 rounded-full border-2 border-background bg-primary/40" />
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md border border-border/50 bg-muted/25 p-1.5">
                {engagement.logo ? (
                  isSvg ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={engagement.logo}
                      alt={`${engagement.client} logo`}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <Image
                      src={engagement.logo}
                      alt={`${engagement.client} logo`}
                      width={40}
                      height={40}
                      className="h-full w-full object-contain"
                    />
                  )
                ) : (
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {engagement.client.slice(0, 2)}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <Typography variant="body-sm" className="font-semibold text-foreground text-sm leading-snug">
                  {engagement.client}
                </Typography>
                <Typography variant="body-sm" className="mt-0.5 text-foreground text-xs font-medium">
                  {engagement.role}
                </Typography>
                <Typography variant="body-sm" className="mt-0.5 text-muted-foreground text-xs">
                  {engagement.period}
                </Typography>
              </div>
            </div>
            <ul className="space-y-1.5 pl-[3.75rem]">
              {engagement.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                  <Typography variant="body-sm" className="text-muted-foreground text-xs leading-relaxed">
                    {bullet}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )

  const renderTimelineItem = (item: TimelineItem, index: number) => {
    const relevantRoles = roleFilter && roleFilter !== "all" ? lensToRoles[roleFilter] || [] : []
    const itemTitleForMatching = item.officialTitle?.split("(")[0]?.trim() || ""
    const isRelevant = !roleFilter || roleFilter === "all" || relevantRoles.some((role) => {
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
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md border border-border/50 bg-muted/30 p-1.5">
                <Image
                  src={item.logo}
                  alt=""
                  width={40}
                  height={40}
                  className="h-full w-full object-contain"
                />
              </div>
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
          {item.engagements && item.engagements.length > 0 && renderEngagements(item.engagements)}
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
                  <div>
                    <div className="space-y-0">
                      {recentItems.map((item, index) => renderTimelineItem(item, index))}
                    </div>
                  </div>

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
                          {earlyItems.map((item, index) => renderTimelineItem(item, index))}
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
