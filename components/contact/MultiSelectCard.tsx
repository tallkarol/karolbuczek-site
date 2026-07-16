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
        selected
          ? "border-olive-700 bg-olive-700 text-chiffon shadow-sm"
          : "border-navy-700/15 bg-surface-card text-navy-900 hover:border-navy-700/35 dark:border-chiffon/15 dark:bg-navy-900 dark:text-chiffon dark:hover:border-chiffon/35",
        className
      )}
    >
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-chiffon"
        >
          <svg
            className="h-4 w-4 text-olive-800"
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
            "mb-1 font-display text-base font-semibold",
            selected ? "text-chiffon" : "text-navy-900 dark:text-chiffon"
          )}
        >
          {title}
        </h3>
        {description && (
          <p
            className={cn(
              "font-body text-sm",
              selected ? "text-chiffon/80" : "text-muted-foreground"
            )}
          >
            {description}
          </p>
        )}
      </div>
    </motion.button>
  )
}
