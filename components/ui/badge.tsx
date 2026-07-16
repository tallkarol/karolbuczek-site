import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Status badge — tones map to the functional status tier (success/warning/danger/info)
 * plus brand accent + neutral. Subtle tint + tone-colored text by default; `solid`
 * variant for high-emphasis "active" states. All tokens auto-adapt to light/dark.
 */
const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2 py-0.5 font-ui text-[10px] font-semibold uppercase tracking-wide",
  {
    variants: {
      tone: {
        neutral: "bg-muted text-muted-foreground",
        accent: "bg-accent/15 text-accent",
        success: "bg-success/15 text-success",
        warning: "bg-warning/15 text-warning",
        danger: "bg-danger/15 text-danger",
        info: "bg-info/15 text-info",
      },
      solid: { true: "", false: "" },
    },
    compoundVariants: [
      { tone: "accent", solid: true, class: "bg-accent text-accent-foreground" },
      { tone: "success", solid: true, class: "bg-success text-success-foreground" },
      { tone: "warning", solid: true, class: "bg-warning text-warning-foreground" },
      { tone: "danger", solid: true, class: "bg-danger text-danger-foreground" },
      { tone: "info", solid: true, class: "bg-info text-info-foreground" },
    ],
    defaultVariants: { tone: "neutral", solid: false },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, tone, solid, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone, solid }), className)} {...props} />
}

export { Badge, badgeVariants }
