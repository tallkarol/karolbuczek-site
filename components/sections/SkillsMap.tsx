"use client"

import { motion } from "framer-motion"
import { Typography } from "@/components/typography"
import { SystemNodes } from "@/components/illustrations"

const skillCategories = [
  {
    name: "Build",
    description: "Custom engineering that solves real business problems.",
    skills: [
      "WordPress plugins, blocks, VIP-compliant code",
      "Internal tools, React apps, AWS architecture",
      "PHP/SQL automation, cron jobs",
      "WooCommerce optimization",
      "Using AI tools in product development to improve quality and efficiency",
    ],
  },
  {
    name: "Optimize",
    description: "MarTech, attribution, analytics, and performance systems.",
    skills: [
      "UTM persistence & attribution",
      "GTM event/dataLayer architecture",
      "Core Web Vitals",
      "Funnel + lead workflow design",
      "Analytics dashboards",
    ],
  },
  {
    name: "Connect",
    description: "Integration and orchestration across the stack.",
    skills: [
      "CRM integrations (Mailchimp, Five9, Birdeye…)",
      "Modular Zapier architectures",
      "API + data pipelines",
      "Error-handling frameworks",
    ],
  },
]

export function SkillsMap() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Typography variant="h2" as="h2">What I Do</Typography>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative p-6 border border-border/50 rounded-lg hover:shadow-lg transition-all hover:border-primary/30 overflow-hidden"
          >
            {/* Subtle accent */}
            <div className="absolute top-0 left-0 h-1 w-0 bg-primary group-hover:w-full transition-all duration-300" />
            
            {/* Illustration */}
            <div className="h-24 w-full mb-4 rounded border border-border/30 bg-muted/20 overflow-hidden">
              <SystemNodes className="h-full w-full" />
            </div>
            
            <Typography variant="h3" as="h3" className="mb-3 group-hover:text-primary transition-colors">{category.name}</Typography>
            <Typography variant="body-sm" className="mb-4 text-muted-foreground">{category.description}</Typography>
            <ul className="space-y-2">
              {category.skills.map((skill) => (
                <li key={skill} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                  <Typography variant="body-sm" className="text-muted-foreground">{skill}</Typography>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

