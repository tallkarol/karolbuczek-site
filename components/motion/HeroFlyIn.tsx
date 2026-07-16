"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { flyFromLeft, flyFromRight, heroFlyTransition } from "./heroMotion"

type HeroFlySide = "left" | "right"

interface HeroFlyInProps {
  side: HeroFlySide
  children: ReactNode
  className?: string
  delay?: number
}

export function HeroFlyIn({ side, children, className, delay = 0 }: HeroFlyInProps) {
  return (
    <motion.div
      variants={side === "left" ? flyFromLeft : flyFromRight}
      initial="hidden"
      animate="visible"
      transition={heroFlyTransition(delay)}
      className={className}
    >
      {children}
    </motion.div>
  )
}
