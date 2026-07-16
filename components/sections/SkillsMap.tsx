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
    name: "Build",
    description: "Ship production applications from first commit to launch.",
    illustration: OptimizeIllustration,
    skills: [
      "Custom web applications — Next.js/React, TypeScript, and PostgreSQL",
      "Enterprise WordPress engineering — VIP platforms, custom Gutenberg blocks, and plugins",
      "Serverless AWS applications with managed identity and role-based access",
      "Internal tools, dashboards, and reporting infrastructure teams use daily",
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
      <div className="space-y-3">
        <Typography variant="h2" as="h2">What I Do</Typography>
        <div aria-hidden className="tk-accent-rule" />
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
              className="kb-surface-app group relative overflow-hidden rounded-lg border border-border bg-surface-card p-6 transition-all hover:border-accent/50"
            >
              {/* Accent process marker */}
              <div className="absolute left-0 top-0 h-1 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              <div className="mb-3 font-ui text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-accent-text">
                0{index + 1}
              </div>

              {/* Illustration */}
              <div className="mb-4 h-24 w-full overflow-hidden rounded border border-border bg-background-alt">
                <Illustration className="h-full w-full" />
              </div>

              <Typography variant="h3" as="h3" className="mb-3 text-heading transition-colors group-hover:text-accent-text">
                {category.name}
              </Typography>
              <Typography variant="body-sm" className="mb-4 text-muted-foreground">
                {category.description}
              </Typography>
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li key={skill} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                    <Typography variant="body-sm" className="text-muted-foreground">
                      {skill}
                    </Typography>
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

