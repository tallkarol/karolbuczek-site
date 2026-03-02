"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Typography } from "@/components/typography"
import { BuildIllustration, OptimizeIllustration, ConnectIllustration } from "@/components/illustrations"

const skillCategories = [
  {
    name: "Architect",
    description: "Solution design from discovery through deployment.",
    illustration: BuildIllustration,
    skills: [
      "Pre-sales scoping, requirements analysis, and stakeholder alignment",
      "Cloud architecture on AWS (Lambda, S3, RDS, Cognito, Amplify)",
      "API design, integration layer architecture, and system documentation",
      "Full-stack engineering when the solution requires it",
    ],
  },
  {
    name: "Integrate",
    description: "Connect platforms and orchestrate data across the stack.",
    illustration: ConnectIllustration,
    skills: [
      "REST API integrations across CRM, marketing, call center, and ecommerce platforms",
      "Data pipeline architecture — ingestion, transformation, and warehouse delivery",
      "ETL middleware, event-driven automation, and error-handling frameworks",
      "Zapier and custom scripting automation at scale",
    ],
  },
  {
    name: "Optimize",
    description: "Make existing systems observable, reliable, and measurable.",
    illustration: OptimizeIllustration,
    skills: [
      "UTM and attribution architecture for multi-touch tracking",
      "GTM event schema design and server-side tracking pipelines",
      "Core Web Vitals and site performance remediation",
      "Data normalization, reporting visibility, and dashboard infrastructure",
    ],
  },
]

export function SkillsMap() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Typography variant="h2" as="h2">What I Do</Typography>
        <Typography variant="body" className="text-muted-foreground">
        I work on the parts of the stack where broken handoffs, bad data, and disconnected systems are quietly costing you money — comfortably operating across engineering, product, and business stakeholders at any level of the org.
        </Typography>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {skillCategories.map((category, index) => {
          const Illustration = category.illustration
          return (
            <motion.div
              key={category.name}
              initial={mounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 border border-border/50 rounded-lg bg-card hover:shadow-lg transition-all hover:border-primary/30 overflow-hidden"
            >
              {/* Subtle accent */}
              <div className="absolute top-0 left-0 h-1 w-0 bg-primary group-hover:w-full transition-all duration-300" />
              
              {/* Illustration */}
              <div className="h-24 w-full mb-4 rounded border border-border/30 bg-muted/20 overflow-hidden">
                <Illustration className="h-full w-full" />
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
          )
        })}
      </div>
    </div>
  )
}

