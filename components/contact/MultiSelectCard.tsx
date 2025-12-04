"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MultiSelectCardProps {
  title: string
  description?: string
  selected: boolean
  onClick: () => void
  className?: string
}

export function MultiSelectCard({
  title,
  description,
  selected,
  onClick,
  className,
}: MultiSelectCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative rounded-xl border-2 p-6 text-left transition-all",
        "hover:shadow-md",
        selected
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-border/50 bg-card hover:border-border",
        className
      )}
    >
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary"
        >
          <svg
            className="h-4 w-4 text-primary-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>
      )}
      <div className="pr-8">
        <h3
          className={cn(
            "mb-1 font-semibold font-display text-base",
            selected ? "text-foreground" : "text-foreground"
          )}
        >
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground font-body">{description}</p>
        )}
      </div>
    </motion.button>
  )
}

