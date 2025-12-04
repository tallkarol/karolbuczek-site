"use client"

import { useState } from "react"
import { ChevronDown, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RoleFilter } from "./ResumeFilters"

interface LensDropdownProps {
  selectedFilter: RoleFilter
  onFilterChange: (filter: RoleFilter) => void
}

const filterLabels: Record<RoleFilter, string> = {
  "all": "All Experience",
  "WordPress Engineering": "WordPress Engineering",
  "MarTech / Growth Engineering": "MarTech / Growth",
  "Product & Internal Tools": "Product & Internal Tools",
  "Integrations & Automation": "Integrations & Automation",
  "Performance Engineering": "Performance Engineering",
  "Startup Experience": "Startup Experience",
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

export function LensDropdown({ selectedFilter, onFilterChange }: LensDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full sm:w-auto justify-between gap-2 border-border/50 hover:border-primary transition-colors"
      >
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="text-sm font-medium">
            {filterLabels[selectedFilter]}
          </span>
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-full sm:w-64 z-50 bg-card border border-border/50 rounded-lg shadow-lg overflow-hidden">
            <div className="p-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    onFilterChange(filter)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2 rounded-md text-sm transition-colors ${
                    selectedFilter === filter
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-foreground hover:bg-muted/50"
                  }`}
                >
                  {filterLabels[filter]}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

