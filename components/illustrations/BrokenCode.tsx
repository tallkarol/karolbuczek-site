"use client"

import { motion } from "framer-motion"

interface BrokenCodeProps {
  className?: string
}

// Typing animation variants for individual words
const typingVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.1
    }
  }
}

export function BrokenCode({ className }: BrokenCodeProps) {
  return (
    <div className={`relative h-full w-full ${className || ""}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="space-y-3">
          {/* Code lines */}
          <motion.div
            className="flex items-center gap-2 font-mono text-sm text-muted-foreground"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.2
                }
              }
            }}
          >
            <motion.span className="text-muted-foreground/70" variants={typingVariants}>import</motion.span>
            <motion.span className="text-primary" variants={typingVariants}>{`{`}</motion.span>
            <motion.span className="text-primary" variants={typingVariants}>notFound</motion.span>
            <motion.span className="text-primary" variants={typingVariants}>{`}`}</motion.span>
            <motion.span className="text-muted-foreground/70" variants={typingVariants}>from</motion.span>
            <motion.span className="text-muted-foreground" variants={typingVariants}>&apos;next/navigation&apos;</motion.span>
          </motion.div>
          
          <motion.div
            className="flex items-center gap-2 font-mono text-sm text-muted-foreground"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.6
                }
              }
            }}
          >
            <motion.span className="text-muted-foreground/70" variants={typingVariants}>const</motion.span>
            <motion.span className="text-foreground" variants={typingVariants}>page</motion.span>
            <motion.span className="text-foreground" variants={typingVariants}>=</motion.span>
            <motion.span className="text-muted-foreground/70" variants={typingVariants}>await</motion.span>
            <motion.span className="text-primary" variants={typingVariants}>getPage</motion.span>
            <motion.span className="text-foreground" variants={typingVariants}>(slug)</motion.span>
          </motion.div>
          
          <motion.div
            className="flex items-center gap-2 font-mono text-sm text-muted-foreground"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 1.0
                }
              }
            }}
          >
            <motion.span className="text-primary" variants={typingVariants}>if</motion.span>
            <motion.span className="text-foreground" variants={typingVariants}>(!page)</motion.span>
            <motion.span className="text-foreground" variants={typingVariants}>{`{`}</motion.span>
          </motion.div>
          
          {/* Actual Next.js notFound() function */}
          <motion.div
            className="flex items-center gap-2 font-mono text-sm pl-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 1.4
                }
              }
            }}
          >
            <motion.span
              className="text-primary font-semibold"
              variants={typingVariants}
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              notFound
            </motion.span>
            <motion.span className="text-foreground" variants={typingVariants}>()</motion.span>
          </motion.div>
          
          <motion.div
            className="flex items-center gap-2 font-mono text-sm text-muted-foreground"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 1.8
                }
              }
            }}
          >
            <motion.span className="text-foreground" variants={typingVariants}>{`}`}</motion.span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

