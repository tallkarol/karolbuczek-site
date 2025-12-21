"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Typography } from "@/components/typography"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"
const softSkills = [
  "Strong cross-functional communication — comfortable working with engineering, product, marketing, and leadership teams.",
  "High ownership and autonomy — able to take a problem from definition to delivery without heavy oversight.",
  "Fast, pragmatic problem-solver — prioritizes outcomes and uses AI tools to speed up iteration and QA.",
  "Operates well in ambiguity — can make decisions with incomplete information and move projects forward.",
  "Systems-level thinking — understands how technical decisions affect business outcomes and user experience.",
  "Leadership-oriented collaboration — experienced guiding discussions, managing expectations, and presenting solutions to stakeholders.",
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
                {softSkills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                    <Typography variant="body-sm" className="text-muted-foreground text-xs leading-relaxed">
                      {skill}
                    </Typography>
                  </li>
                ))}
              </ul>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

