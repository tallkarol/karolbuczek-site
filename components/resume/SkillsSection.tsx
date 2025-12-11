"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Typography } from "@/components/typography"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"
import { 
  SiPhp, 
  SiJavascript, 
  SiTypescript, 
  SiReact, 
  SiNodedotjs,
  SiMysql,
  SiWordpress,
  SiAmazon,
  SiGit,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiVercel,
  SiSupabase
} from "react-icons/si"
import { Database } from "lucide-react"

const techCategories = [
  {
    name: "Languages",
    items: [
      { name: "PHP", icon: SiPhp, color: "text-[#777BB4]" },
      { name: "JavaScript", icon: SiJavascript, color: "text-[#F7DF1E]" },
      { name: "TypeScript", icon: SiTypescript, color: "text-[#3178C6]" },
      { name: "SQL", icon: SiMysql, color: "text-[#4479A1]" },
      { name: "HTML5", icon: SiHtml5, color: "text-[#E34F26]" },
      { name: "CSS3", icon: SiCss3, color: "text-[#1572B6]" },
    ],
  },
  {
    name: "Libraries & Frameworks",
    items: [
      { name: "React", icon: SiReact, color: "text-[#61DAFB]" },
      { name: "Node.js", icon: SiNodedotjs, color: "text-[#339933]" },
      { name: "TailwindCSS", icon: SiTailwindcss, color: "text-[#06B6D4]" },
    ],
  },
  {
    name: "Platforms & Tools",
    items: [
      { name: "WordPress", icon: SiWordpress, color: "text-[#21759B]" },
      { name: "AWS", icon: SiAmazon, color: "text-[#FF9900]" },
      { name: "Vercel", icon: SiVercel, color: "text-[#000000]" },
      { name: "Supabase", icon: SiSupabase, color: "text-[#3ECF8E]" },
      { name: "SQL Server", icon: Database, color: "text-[#CC2927]" },
      { name: "Git", icon: SiGit, color: "text-[#F05032]" },
    ],
  },
]

const softSkills = [
  "Engineering mindset with cross-functional fluency",
  "Communicates clearly with product, marketing & dev teams",
  "Comfortable leading meetings with high-level decision makers",
  "Fast problem solver; uses AI tools to improve product quality and development efficiency",
  "Navigates ambiguity and makes decisions by pulling in the right people",
  "Growth mindset with a bias toward action",
  "Empathetic to customer and end-user needs",
  "High ownership & autonomy",
  "UX-aware without being a designer",
]

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

interface SkillsSectionProps {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function SkillsSection({ isOpen: controlledIsOpen, onOpenChange }: SkillsSectionProps = {}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen
  const setIsOpen = onOpenChange || ((value: boolean) => setInternalIsOpen(value))
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
    <Card id="skills" className="border-border/50 hover:border-primary/30 transition-colors scroll-mt-20">
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
            Skills
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
        {/* Tech Stack Tiles */}
        <div className="mb-8 pb-6 border-b border-border/30">
          <div className="space-y-6">
            {techCategories.map((category, catIndex) => (
              <div key={category.name} className="space-y-3">
                <Typography variant="body-sm" className="font-semibold text-foreground text-xs uppercase tracking-wide">
                  {category.name}
                </Typography>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-3">
                  {category.items.map((item, index) => {
                    const Icon = item.icon
                    const globalIndex = catIndex * 10 + index
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: globalIndex * 0.03 }}
                        className="group flex flex-col items-center gap-2 p-3 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-muted/20 transition-all cursor-default"
                      >
                        <Icon className={`h-6 w-6 ${item.color} group-hover:scale-110 transition-transform`} />
                        <Typography variant="body-sm" className="text-xs text-muted-foreground text-center group-hover:text-foreground transition-colors">
                          {item.name}
                        </Typography>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Soft Skills / Work Style - Full Width, Always Visible */}
        <div className="mb-8 pb-6 border-b border-border/30">
          <div className="border border-border/50 rounded-lg overflow-hidden hover:border-primary/30 transition-colors">
            <div className="px-4 py-3 border-b border-border/30">
              <Typography variant="body-sm" className="font-semibold text-foreground">
                Soft Skills / Work Style
              </Typography>
            </div>
            <div className="px-4 pb-3 pt-2">
              <ul className="space-y-2">
                {softSkills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                    <Typography variant="body-sm" className="text-muted-foreground text-xs leading-relaxed">
                      {skill}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Skill Categories Dropdowns */}
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
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

