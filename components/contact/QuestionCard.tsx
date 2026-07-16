"use client"

import { motion } from "framer-motion"
import type { MouseEventHandler } from "react"
import { cn } from "@/lib/utils"

interface QuestionCardProps {
  label: string
  selected: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
  className?: string
}

export function QuestionCard({
  label,
  selected,
  onClick,
  className,
}: QuestionCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "rounded-lg border-2 px-4 py-3 text-left text-sm font-medium font-ui transition-all",
        selected
          ? "border-olive-700 bg-olive-700 text-chiffon"
          : "border-navy-700/15 bg-surface-card text-navy-900 hover:border-navy-700/35 dark:border-chiffon/15 dark:bg-navy-900 dark:text-chiffon dark:hover:border-chiffon/35",
        className
      )}
    >
      {label}
    </motion.button>
  )
}
