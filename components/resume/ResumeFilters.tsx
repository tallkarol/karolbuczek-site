"use client"

import { motion } from "framer-motion"
import { QuestionCard } from "@/components/contact/QuestionCard"

export type RoleFilter = 
  | "WordPress Engineering"
  | "MarTech / Growth Engineering"
  | "Product & Internal Tools"
  | "Integrations & Automation"
  | "Performance Engineering"
  | "Startup Experience"
  | "all"

interface ResumeFiltersProps {
  selectedFilter: RoleFilter
  onFilterChange: (filter: RoleFilter) => void
}

const filters: RoleFilter[] = [
  "all",
  "WordPress Engineering",
  "MarTech / Growth Engineering",
  "Product & Internal Tools",
  "Integrations & Automation",
  "Performance Engineering",
  "Startup Experience",
]

export function ResumeFilters({ selectedFilter, onFilterChange }: ResumeFiltersProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold font-ui uppercase tracking-wide text-muted-foreground mb-3">
          Select a lens to explore my work:
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filters.map((filter) => (
            <QuestionCard
              key={filter}
              label={filter === "all" ? "All Roles" : filter}
              selected={selectedFilter === filter}
              onClick={() => onFilterChange(filter)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

