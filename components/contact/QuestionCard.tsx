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
        "rounded-lg border-2 px-4 py-3 text-left text-sm font-medium transition-all font-ui",
        "hover:shadow-sm",
        selected
          ? "border-primary bg-primary/5 text-foreground"
          : "border-border/50 bg-card text-foreground hover:border-border",
        className
      )}
    >
      {label}
    </motion.button>
  )
}

