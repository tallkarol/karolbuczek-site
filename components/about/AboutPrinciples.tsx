"use client"

import { motion } from "framer-motion"
import { Activity, Crosshair, Wrench } from "lucide-react"
import { Typography } from "@/components/typography"

const principles = [
  {
    icon: Activity,
    title: "Build for observable failure",
    body: "Problems should surface immediately, not silently. When a pipeline fails, a lead drops, or data drifts — you know. Idempotency, retries, and logging are the difference between a weekend fire drill and a Monday morning status update.",
  },
  {
    icon: Crosshair,
    title: "Scope from the business backwards",
    body: "I don't start with tech choices. I start with what the business needs to measure, ship, or fix — then map back to the smallest architecture that does it. I've sat on the buying side of these decisions, and it permanently changed how I make them.",
  },
  {
    icon: Wrench,
    title: "Bias for boring technology",
    body: "Tight scope, no gold-plating, and tools that keep working long after launch. The best systems are the ones nobody has to think about.",
  },
]

export function AboutPrinciples() {
  return (
    <section className="kb-section-secondary w-full">
      <div className="kb-content-rail py-16 lg:py-24">
        <div className="mb-12 max-w-3xl space-y-4">
          <Typography variant="eyebrow" className="font-semibold uppercase tracking-wider text-chiffon/70">
            How I Work
          </Typography>
          <Typography variant="h2" as="h2" className="text-chiffon">
            Silent systems are expensive systems
          </Typography>
          <div aria-hidden className="h-px w-24 bg-gradient-to-r from-chiffon/50 to-transparent" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {principles.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-lg border border-chiffon/15 bg-olive-800 p-6 md:p-8"
              >
                <div className="absolute left-0 top-0 h-1 w-0 bg-chiffon transition-all duration-300 group-hover:w-full" />
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-chiffon/20 bg-olive-700 text-chiffon">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-3 font-display text-lg font-semibold tracking-tight text-chiffon">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-chiffon/75">{p.body}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
