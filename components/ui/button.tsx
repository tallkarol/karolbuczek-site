import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Standardized button — squared "architectural" style from the homepage hero:
 * sharp corners, font-ui semibold, subtle lift on hover.
 */
const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-none font-ui text-[13px] font-semibold ring-offset-background transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:hover:translate-y-0",
  {
    variants: {
      variant: {
        /* Cyan accent CTA — the brand's primary call to action. */
        default:
          "bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-[0_12px_36px_hsl(var(--accent)/0.35)]",
        /* Neutral dark CTA (iron-grey) for secondary emphasis. */
        neutral:
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_12px_36px_hsl(var(--slot-inverse)/0.22)]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-foreground/25 bg-transparent text-foreground hover:border-foreground/45 hover:bg-foreground/5",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        ghost: "hover:translate-y-0 hover:bg-muted hover:text-foreground",
        link: "hover:translate-y-0 text-primary underline-offset-4 hover:underline",
        /* Explicit dark-environment CTA: chiffon fill, navy text (hero primary) */
        inverse:
          "bg-slot-background text-slot-primary hover:bg-slot-surface hover:shadow-[0_15px_45px_rgba(0,0,0,.24)]",
        "outline-inverse":
          "border border-slot-background/20 bg-slot-surface/5 text-slot-background backdrop-blur hover:border-slot-background/40 hover:bg-slot-surface/10",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4",
        lg: "h-[50px] px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
