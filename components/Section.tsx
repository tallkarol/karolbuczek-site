import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "mx-auto max-w-7xl px-6 py-12 sm:px-6 lg:px-8 lg:py-16",
        className
      )}
    >
      {children}
    </section>
  )
}

