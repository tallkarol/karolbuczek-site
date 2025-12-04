"use client"

import { motion } from "framer-motion"
import { Typography } from "@/components/typography"
import { ReactNode } from "react"

interface PageHeroProps {
  eyebrow?: string
  title: string | ReactNode
  description: string
  className?: string
  illustration?: ReactNode
  buttons?: ReactNode
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export function PageHero({ eyebrow, title, description, className, illustration, buttons }: PageHeroProps) {
  const isCentered = className?.includes("text-center")
  
  return (
    <section className={`flex items-center min-h-[200px] md:min-h-[240px] py-4 md:py-6 ${className || ""}`}>
      {illustration ? (
        <div className="grid gap-6 md:gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-center w-full">
          {/* Illustration */}
          <div className="flex items-center justify-center order-1 md:order-1 w-full mb-4 md:mb-0">
            <div className="w-full max-w-[180px] md:max-w-[200px] aspect-square">
              {illustration}
            </div>
          </div>
          
          {/* Text content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className={`space-y-2 md:space-y-3 order-2 md:order-2 ${isCentered ? "text-center md:text-left" : ""}`}
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
            <Typography variant="body" className={`max-w-3xl text-muted-foreground ${isCentered ? "mx-auto md:mx-0" : ""}`}>
              {description}
            </Typography>
            {buttons && (
              <div className={`flex flex-wrap items-center gap-3 pt-1 ${isCentered ? "justify-center md:justify-start" : ""}`}>
                {buttons}
              </div>
            )}
          </motion.div>
        </div>
      ) : (
        <div className={`space-y-2 md:space-y-3 w-full ${isCentered ? "text-center" : ""}`}>
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
          <Typography variant="body" className={`max-w-3xl text-muted-foreground ${isCentered ? "mx-auto" : ""}`}>
            {description}
          </Typography>
          {buttons && (
            <div className={`flex flex-wrap items-center gap-3 pt-1 ${isCentered ? "justify-center" : ""}`}>
              {buttons}
            </div>
          )}
        </div>
      )}
    </section>
  )
}

