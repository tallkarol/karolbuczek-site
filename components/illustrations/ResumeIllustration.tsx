"use client"

import { motion } from "framer-motion"

interface ResumeIllustrationProps {
  className?: string
}

export function ResumeIllustration({ className }: ResumeIllustrationProps) {
  const isSmall = className?.includes('h-32') || className?.includes('h-24') || className?.includes('h-20')
  const scaleClass = isSmall ? '' : 'scale-150 sm:scale-[2.5]'
  
  return (
    <div className={`relative h-full w-full ${className || ""}`}>
      <div className={`absolute inset-0 flex items-center justify-center ${scaleClass}`}>
        {/* Resume document */}
        <motion.div
          className="relative h-28 w-20 rounded border-2 border-primary/40 bg-[hsl(var(--paper))] shadow-sm"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {/* Document structure */}
          <div className="flex h-full w-full flex-col gap-1.5 p-2">
            {/* Header */}
            <motion.div
              className="h-2 w-full rounded bg-primary/20"
              animate={{ opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Sections */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="flex items-center gap-1.5"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
              >
                {/* Bullet point */}
                <motion.div
                  className="h-1 w-1 rounded-full bg-primary/40 flex-shrink-0"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                />
                {/* Content line */}
                <motion.div
                  className="h-1 flex-1 rounded bg-primary/10"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                />
              </motion.div>
            ))}
            
            {/* Bottom section highlight */}
            <motion.div
              className="mt-auto h-1.5 w-full rounded bg-primary/15"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
            />
          </div>
          
          {/* Decorative corner accent */}
          <motion.div
            className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary/30"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </div>
  )
}

