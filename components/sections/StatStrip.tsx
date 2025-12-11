"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Typography } from "@/components/typography"

const focusAreas = [
  {
    title: "WordPress Engineering",
    description: "Custom plugins, Gutenberg blocks, VIP-compliant code",
  },
  {
    title: "Backend Automation",
    description: "PHP/SQL scripts, cron jobs, API integrations, data pipelines",
  },
  {
    title: "MarTech Systems",
    description: "Attribution tracking, GTM dataLayer, CRM integrations",
  },
  {
    title: "Cloud Architecture",
    description: "AWS (Amplify, Cognito, S3, RDS, Lambda), secure portals",
  },
]

export function StatStrip() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="border-y border-border/50 py-10 bg-muted/20">
      <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {focusAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={mounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative space-y-1.5 pl-4 border-l-2 border-border/30 hover:border-primary transition-colors"
            >
              <Typography variant="h3" as="h3" className="text-base font-display font-semibold group-hover:text-primary transition-colors">
                {area.title}
              </Typography>
              <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
                {area.description}
              </Typography>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

