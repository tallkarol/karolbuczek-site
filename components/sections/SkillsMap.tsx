"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"
import { Typography } from "@/components/typography"
import { BuildIllustration, OptimizeIllustration, ConnectIllustration } from "@/components/illustrations"
import { WhatIDoModal } from "@/components/sections/WhatIDoModal"
import { whatIDoPillars, type WhatIDoPillar } from "@/lib/what-i-do"

const pillarIllustrations: Record<WhatIDoPillar["id"], React.ComponentType<{ className?: string }>> = {
  architect: BuildIllustration,
  integrate: ConnectIllustration,
  build: OptimizeIllustration,
}

export function SkillsMap() {
  const [mounted, setMounted] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const openPillar = (index: number) => {
    setSelectedIndex(index)
    setModalOpen(true)
  }

  const closePillar = () => {
    setModalOpen(false)
    setTimeout(() => setSelectedIndex(null), 300)
  }

  const selectedPillar = selectedIndex !== null ? whatIDoPillars[selectedIndex] : null

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
        {whatIDoPillars.map((pillar, index) => {
          const Illustration = pillarIllustrations[pillar.id]
          return (
            <motion.button
              key={pillar.id}
              type="button"
              onClick={() => openPillar(index)}
              initial={mounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="kb-surface-app group relative flex flex-col overflow-hidden rounded-lg border border-border bg-surface-card p-6 text-left transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {/* Accent process marker */}
              <div className="absolute left-0 top-0 h-1 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              <div className="mb-3 flex items-center justify-between">
                <span className="font-ui text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-accent-text">
                  0{index + 1}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground/50 transition-colors group-hover:text-accent-text" />
              </div>

              {/* Illustration */}
              <div className="mb-4 h-24 w-full overflow-hidden rounded border border-border bg-background-alt">
                <Illustration className="h-full w-full" />
              </div>

              <Typography variant="h3" as="h3" className="mb-3 text-heading transition-colors group-hover:text-accent-text">
                {pillar.name}
              </Typography>
              <Typography variant="body-sm" className="mb-4 text-muted-foreground">
                {pillar.tagline}
              </Typography>
              <ul className="space-y-2">
                {pillar.cardSkills.map((skill) => (
                  <li key={skill} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                    <Typography variant="body-sm" className="text-muted-foreground">
                      {skill}
                    </Typography>
                  </li>
                ))}
              </ul>

              <span className="mt-auto pt-4 font-ui text-xs font-semibold uppercase tracking-[0.08em] text-accent-text opacity-0 transition-opacity group-hover:opacity-100">
                See examples & proof
              </span>
            </motion.button>
          )
        })}
      </div>

      <WhatIDoModal
        pillar={selectedPillar}
        illustration={selectedPillar ? pillarIllustrations[selectedPillar.id] : undefined}
        index={selectedIndex ?? 0}
        isOpen={modalOpen}
        onClose={closePillar}
      />
    </div>
  )
}
