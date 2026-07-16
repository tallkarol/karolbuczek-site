"use client"

import { Typography } from "@/components/typography"
import { HeroFlyIn } from "@/components/motion/HeroFlyIn"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface PageHeroProps {
  eyebrow?: string
  title: string | ReactNode
  description: string | ReactNode
  className?: string
  illustration?: ReactNode
  illustrationClassName?: string
  /** Desktop side for the illustration. Mobile always stacks illustration above text. */
  illustrationSide?: "left" | "right"
  columnGapClassName?: string
  buttons?: ReactNode
}

export function PageHero({
  eyebrow,
  title,
  description,
  className,
  illustration,
  illustrationClassName,
  illustrationSide = "left",
  columnGapClassName,
  buttons,
}: PageHeroProps) {
  const isCentered = className?.includes("text-center")
  const illustrationOnRight = illustrationSide === "right"

  return (
    <section className={`flex items-center min-h-[160px] md:min-h-[240px] py-4 md:py-6 relative z-0 ${className || ""}`}>
      {illustration ? (
        <div
          className={cn(
            "grid w-full gap-6 md:items-center",
            illustrationOnRight
              ? "md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
              : "md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]",
            columnGapClassName
          )}
        >
          <HeroFlyIn
            side={illustrationOnRight ? "right" : "left"}
            className={cn(
              "mb-4 flex w-full items-center justify-center md:mb-0",
              // Mobile: illustration first. Desktop: honor illustrationSide.
              "order-1",
              illustrationOnRight ? "md:order-2" : "md:order-1"
            )}
          >
            <div
              className={cn(
                "relative aspect-square w-full max-w-[180px] md:max-w-[200px]",
                illustrationClassName
              )}
            >
              {illustration}
            </div>
          </HeroFlyIn>

          <HeroFlyIn
            side={illustrationOnRight ? "left" : "right"}
            delay={0.08}
            className={cn(
              "space-y-2 md:space-y-3",
              "order-2",
              illustrationOnRight ? "md:order-1" : "md:order-2",
              isCentered && "text-center md:text-left"
            )}
          >
            {eyebrow && (
              <Typography variant="eyebrow" className={isCentered ? "mx-auto md:mx-0" : ""}>
                {eyebrow}
              </Typography>
            )}
            {typeof title === "string" ? (
              <Typography variant="h1" as="h1" className={isCentered ? "mx-auto md:mx-0" : ""}>
                {title}
              </Typography>
            ) : (
              <div className={isCentered ? "mx-auto md:mx-0" : ""}>{title}</div>
            )}
            <div className={`max-w-3xl text-muted-foreground ${isCentered ? "mx-auto md:mx-0" : ""}`}>
              {typeof description === "string" ? (
                <Typography variant="body">{description}</Typography>
              ) : (
                description
              )}
            </div>
            {buttons && (
              <div className={`flex flex-wrap items-center gap-3 pt-1 ${isCentered ? "justify-center md:justify-start" : ""}`}>
                {buttons}
              </div>
            )}
          </HeroFlyIn>
        </div>
      ) : (
        <HeroFlyIn side="left" className={`space-y-2 md:space-y-3 w-full ${isCentered ? "text-center" : ""}`}>
          {eyebrow && (
            <Typography variant="eyebrow" className={isCentered ? "mx-auto" : ""}>
              {eyebrow}
            </Typography>
          )}
          {typeof title === "string" ? (
            <Typography variant="h1" as="h1" className={isCentered ? "mx-auto" : ""}>
              {title}
            </Typography>
          ) : (
            <div className={isCentered ? "mx-auto" : ""}>{title}</div>
          )}
          <div className={`max-w-3xl text-muted-foreground ${isCentered ? "mx-auto" : ""}`}>
            {typeof description === "string" ? (
              <Typography variant="body">{description}</Typography>
            ) : (
              description
            )}
          </div>
          {buttons && (
            <div className={`flex flex-wrap items-center gap-3 pt-1 ${isCentered ? "justify-center" : ""}`}>
              {buttons}
            </div>
          )}
        </HeroFlyIn>
      )}
    </section>
  )
}
