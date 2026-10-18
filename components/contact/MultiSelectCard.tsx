"use client"

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
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn("type-card", selected && "is-selected", className)}
    >
      <span className="type-copy">
        <span className="type-title">{title}</span>
        {description && <span className="type-desc">{description}</span>}
      </span>
      <span className="type-mark" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path
            d="M5 13l4 4L19 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  )
}
