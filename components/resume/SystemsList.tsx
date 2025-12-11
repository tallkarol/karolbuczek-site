"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Typography } from "@/components/typography"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react"
import Link from "next/link"
import { RoleFilter } from "@/components/resume/ResumeFilters"
import { getSystemsForLens } from "@/lib/resume-data"

const systems = [
  "UTM Attribution Engine",
  "GTM Event Schema & Block",
  "Core Web Vitals Optimization Framework",
  "Lead Ingestion Normalizer",
  "Workflow Automation Engine",
  "Secure File Portal (AWS)",
  "Headless WordPress Architecture",
  "Zapier Modularization Framework",
  "CRM Sync Bridges",
  "Sales Efficiency Dashboards",
  "Internal Error & Logging Systems",
]

interface SystemsListProps {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  roleFilter?: RoleFilter
}

export function SystemsList({ isOpen: controlledIsOpen, onOpenChange, roleFilter }: SystemsListProps = {}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen
  const setIsOpen = onOpenChange || ((value: boolean) => setInternalIsOpen(value))
  
  // Filter systems based on role filter
  const relevantSystems = roleFilter && roleFilter !== "all" 
    ? getSystemsForLens(roleFilter)
    : []
  
  // If there's a filter, show relevant systems; otherwise show all
  const displayedSystems = roleFilter && roleFilter !== "all" && relevantSystems.length > 0
    ? relevantSystems.slice(0, 5)
    : systems.slice(0, 5)
  
  // Helper to check if a system is relevant
  const isSystemRelevant = (system: string) => {
    if (!roleFilter || roleFilter === "all") return false
    return relevantSystems.includes(system)
  }
  
  return (
    <Card id="featured-work" className="border-border/50 hover:border-primary/30 transition-colors scroll-mt-20">
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
            Featured Work
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
              <Typography variant="body-sm" className="text-muted-foreground mb-6">
                A few things you can dive deeper into:
              </Typography>
              <div className="grid gap-3 sm:grid-cols-2 mb-6">
                {displayedSystems.map((system, index) => {
                  const isRelevant = isSystemRelevant(system)
                  return (
                  <Link
                    key={index}
                    href={`/case-studies#${system.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`group flex items-center justify-between gap-3 p-3 rounded-lg border transition-all ${
                      roleFilter && roleFilter !== "all" && isRelevant
                        ? "border-primary/50 bg-primary/5 hover:border-primary/70 hover:bg-primary/10"
                        : "border-border/50 bg-muted/20 hover:border-primary/50 hover:bg-muted/40"
                    }`}
                  >
                    <Typography variant="body-sm" className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {system}
                    </Typography>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </Link>
                  )
                })}
              </div>
              <Link
                href="/case-studies"
                className="group flex items-center justify-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                View all case studies
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

