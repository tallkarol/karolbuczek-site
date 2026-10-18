"use client"

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
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn("choice", selected && "is-selected", className)}
    >
      <span className="choice-mark" aria-hidden="true" />
      <span>{label}</span>
    </button>
  )
}
