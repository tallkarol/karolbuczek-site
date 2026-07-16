import type { Transition, Variants } from "framer-motion"

export const heroEase = [0.22, 1, 0.36, 1] as const

export const flyFromLeft: Variants = {
  hidden: { opacity: 0, x: -56 },
  visible: { opacity: 1, x: 0 },
}

export const flyFromRight: Variants = {
  hidden: { opacity: 0, x: 56 },
  visible: { opacity: 1, x: 0 },
}

export const heroFlyTransition = (delay = 0): Transition => ({
  duration: 0.8,
  ease: heroEase,
  delay,
})
