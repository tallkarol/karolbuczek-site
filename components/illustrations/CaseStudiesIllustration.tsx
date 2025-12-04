"use client"

import { motion } from "framer-motion"

interface CaseStudiesIllustrationProps {
  className?: string
}

export function CaseStudiesIllustration({ className }: CaseStudiesIllustrationProps) {
  const isSmall = className?.includes('h-32') || className?.includes('h-24') || className?.includes('h-20')
  const scaleClass = isSmall ? '' : 'scale-150 sm:scale-[2.5]'
  
  return (
    <div className={`relative h-full w-full ${className || ""}`}>
      <div className={`absolute inset-0 flex items-center justify-center gap-2 ${scaleClass}`}>
        {/* Grid of case study cards */}
        <div className="grid grid-cols-2 gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="relative h-12 w-10 rounded border border-primary/30 bg-[hsl(var(--paper))]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
            >
              {/* Card content */}
              <div className="flex h-full w-full flex-col gap-0.5 p-1">
                {/* Title bar */}
                <motion.div
                  className="h-1 w-full rounded bg-primary/20"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                />
                
                {/* Content lines */}
                <div className="flex-1 flex flex-col gap-0.5">
                  <motion.div
                    className="h-0.5 w-full rounded bg-primary/10"
                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity }}
                  />
                  <motion.div
                    className="h-0.5 w-3/4 rounded bg-primary/10"
                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 1.5, delay: i * 0.15 + 0.1, repeat: Infinity }}
                  />
                </div>
                
                {/* Metric badge */}
                <motion.div
                  className="h-1 w-2/3 rounded-full bg-primary/25"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                />
              </div>
              
              {/* Hover effect indicator */}
              <motion.div
                className="absolute inset-0 rounded border-2 border-primary/0"
                animate={{ borderColor: ["rgba(192, 23, 28, 0)", "rgba(192, 23, 28, 0.3)", "rgba(192, 23, 28, 0)"] }}
                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

