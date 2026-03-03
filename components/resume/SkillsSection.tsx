"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Typography } from "@/components/typography"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"
const softSkills = [
  "Stakeholder Orchestration: Translates business objectives into technical requirements; communicates ROI and risk mitigation to C-suite and engineering teams alike.",
  "Organizational Adaptability: Scalable experience across high-growth startups and 3,000+ person enterprise environments.",
  "Autonomous Ownership: Leads the full architectural lifecycle—discovery, POC, and deployment—with zero oversight required.",
  "Strategic Scoping: Expert in technical discovery and SOW definition, balancing business velocity with technical feasibility.",
  "Systems Thinking: Aligns architectural decisions with long-term business outcomes to ensure technology serves as a revenue multiplier.",
  "Cross-Functional Leadership: Builds consensus across engineering, product, and marketing to drive complex, multi-departmental initiatives.",
  "AI-Forward Practice: Utilizes AI/LLM tooling to accelerate documentation, system iteration, and architectural analysis.",
]

interface SkillsSectionProps {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function SkillsSection({ isOpen: controlledIsOpen, onOpenChange }: SkillsSectionProps = {}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen
  const setIsOpen = onOpenChange || ((value: boolean) => setInternalIsOpen(value))

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
            Soft Skills
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
              <ul className="space-y-2">
                {softSkills.map((skill, skillIndex) => {
                  const [label, ...rest] = skill.split(": ")
                  const description = rest.join(": ")
                  return (
                    <li key={skillIndex} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                      <Typography variant="body-sm" className="text-muted-foreground text-xs leading-relaxed">
                        <strong className="font-semibold text-foreground">{label}:</strong> {description}
                      </Typography>
                    </li>
                  )
                })}
              </ul>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

