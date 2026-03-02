"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Typography } from "@/components/typography"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"
import {
  SiAmazonwebservices,
  SiGooglecloud,
  SiVercel,
  SiSupabase,
  SiWordpress,
  SiWoocommerce,
  SiGoogletagmanager,
  SiGoogleanalytics,
  SiHuggingface,
  SiZapier,
  SiMailchimp,
  SiPhp,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiMysql,
  SiHtml5,
  SiCss3,
  SiReact,
  SiNodedotjs,
  SiTailwindcss,
} from "react-icons/si"
import type { ComponentType } from "react"

interface TechItem {
  name: string
  icon?: ComponentType<{ className?: string }>
}

const techCategories: { label: string; items: TechItem[] }[] = [
  {
    label: "Cloud & Infrastructure",
    items: [
      { name: "AWS (Amplify, Lambda, Cognito, RDS, S3)", icon: SiAmazonwebservices },
      { name: "GCP", icon: SiGooglecloud },
      { name: "Vercel", icon: SiVercel },
      { name: "Supabase", icon: SiSupabase },
    ],
  },
  {
    label: "Platforms & Tools",
    items: [
      { name: "WordPress (VIP)", icon: SiWordpress },
      { name: "WooCommerce", icon: SiWoocommerce },
      { name: "Google Tag Manager", icon: SiGoogletagmanager },
      { name: "Google Analytics 4", icon: SiGoogleanalytics },
      { name: "HuggingFace", icon: SiHuggingface },
      { name: "Zapier", icon: SiZapier },
      { name: "Five9" },
      { name: "Mailchimp", icon: SiMailchimp },
    ],
  },
  {
    label: "Languages",
    items: [
      { name: "PHP", icon: SiPhp },
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Python", icon: SiPython },
      { name: "SQL", icon: SiMysql },
      { name: "HTML5", icon: SiHtml5 },
      { name: "CSS3", icon: SiCss3 },
    ],
  },
  {
    label: "Frameworks",
    items: [
      { name: "React", icon: SiReact },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "TailwindCSS", icon: SiTailwindcss },
    ],
  },
]

function TechPill({ item }: { item: TechItem }) {
  const Icon = item.icon
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/30 px-2.5 py-1 text-xs text-muted-foreground">
      {Icon && <Icon className="h-3.5 w-3.5 flex-shrink-0" aria-hidden />}
      {item.name}
    </span>
  )
}

interface TechStackSectionProps {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function TechStackSection({ isOpen: controlledIsOpen, onOpenChange }: TechStackSectionProps = {}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen
  const setIsOpen = onOpenChange || ((value: boolean) => setInternalIsOpen(value))

  return (
    <Card id="technical-skills" className="border-border/50 hover:border-primary/30 transition-colors scroll-mt-20">
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
            Technical Skills
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
              <div className="space-y-6">
                {techCategories.map((category) => (
                  <div key={category.label} className="space-y-3">
                    <Typography variant="body-sm" className="font-semibold text-foreground text-xs uppercase tracking-wide">
                      {category.label}
                    </Typography>
                    <div className="flex flex-wrap gap-2 pl-6">
                      {category.items.map((item) => (
                        <TechPill key={item.name} item={item} />
                      ))}
                    </div>
                  </div>
                ))}
                <div className="space-y-3">
                  <Typography variant="body-sm" className="font-semibold text-foreground text-xs uppercase tracking-wide">
                    Core Strengths
                  </Typography>
                  <ul className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2 pl-6">
                    {[
                      "Solution architecture & pre-sales scoping",
                      "API design & integration architecture",
                      "Data pipeline & ETL engineering",
                      "Cloud systems (AWS/GCP)",
                      "Marketing technology & attribution systems",
                      "Workflow automation",
                      "Requirements analysis & stakeholder alignment",
                      "Full-stack engineering",
                      "Core Web Vitals performance optimization",
                      "Privacy-compliant analytics (GDPR/CCPA)",
                    ].map((strength) => (
                      <li key={strength} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                        <Typography variant="body-sm" className="text-muted-foreground text-xs leading-relaxed">
                          {strength}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
