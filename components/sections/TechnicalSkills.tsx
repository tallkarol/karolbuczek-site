"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Typography } from "@/components/typography"
import { ChevronDown, ChevronUp } from "lucide-react"

const skillCategories = [
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

export function TechnicalSkills() {
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set())

  const toggleCategory = (categoryName: string) => {
    const newOpen = new Set(openCategories)
    if (newOpen.has(categoryName)) {
      newOpen.delete(categoryName)
    } else {
      newOpen.add(categoryName)
    }
    setOpenCategories(newOpen)
  }

  return (
    <div className="space-y-6">
      <div>
        <Typography variant="h2" as="h2" className="mb-2">
          Technical Skills
        </Typography>
        <Typography variant="body" className="text-muted-foreground">
          Detailed breakdown of my technical capabilities across different domains.
        </Typography>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, index) => {
          const isOpen = openCategories.has(category.name)
          
          return (
            <div
              key={index}
              className="border border-border/50 rounded-lg overflow-hidden hover:border-primary/30 transition-colors"
            >
              <button
                onClick={() => toggleCategory(category.name)}
                className="w-full px-4 py-3 text-left flex items-center justify-between gap-3 hover:bg-muted/30 transition-colors group"
              >
                <Typography variant="body-sm" className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </Typography>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                )}
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-3 pt-2 border-t border-border/30">
                      <ul className="space-y-2">
                        {category.skills.map((skill, skillIndex) => (
                          <li key={skillIndex} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                            <Typography variant="body-sm" className="text-muted-foreground text-xs leading-relaxed">
                              {skill}
                            </Typography>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}

