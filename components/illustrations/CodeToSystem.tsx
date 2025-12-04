"use client"

import { motion } from "framer-motion"

interface CodeToSystemProps {
  className?: string
}

export function CodeToSystem({ className }: CodeToSystemProps) {
  const isSmall = className?.includes('h-32') || className?.includes('h-24') || className?.includes('h-20')
  const scaleClass = isSmall ? '' : 'scale-150 sm:scale-[2.5]'
  
  return (
    <div className={`relative h-full w-full ${className || ""}`}>
      <div className={`absolute inset-0 flex items-center justify-center gap-4 ${scaleClass}`}>
        {/* Code - left side */}
        <motion.div
          className="relative h-20 w-16 rounded border-2 border-border/30 bg-[hsl(var(--paper))] shadow-sm"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {/* Code lines */}
          <div className="flex h-full w-full flex-col gap-0.5 p-1.5">
            {[
              { width: "w-full", delay: 0 },
              { width: "w-5/6", delay: 0.1 },
              { width: "w-full", delay: 0.2 },
              { width: "w-4/6", delay: 0.3 },
              { width: "w-full", delay: 0.4 },
            ].map((line, i) => (
              <motion.div
                key={i}
                className={`h-0.5 rounded bg-foreground/20 ${line.width}`}
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 2, delay: line.delay, repeat: Infinity }}
              />
            ))}
            {/* Function highlight */}
            <motion.div
              className="mt-1 h-1 w-full rounded bg-primary/20"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
            />
            {[
              { width: "w-3/4", delay: 0.6 },
              { width: "w-full", delay: 0.7 },
              { width: "w-5/6", delay: 0.8 },
            ].map((line, i) => (
              <motion.div
                key={i + 5}
                className={`h-0.5 rounded bg-foreground/20 ${line.width}`}
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 2, delay: line.delay, repeat: Infinity }}
              />
            ))}
          </div>
        </motion.div>

        {/* Arrow */}
        <div className="relative flex flex-col items-center gap-1">
          <motion.div
            className="text-primary/60"
            animate={{ x: [0, 2, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.div>
        </div>

        {/* System - right side */}
        <motion.div
          className="relative h-20 w-16 rounded border-2 border-primary/40 bg-[hsl(var(--paper))] shadow-sm"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
        >
          {/* System nodes */}
          <div className="flex h-full w-full flex-col gap-1 p-1.5">
            {/* Top node */}
            <div className="flex items-center justify-center gap-1">
              <motion.div
                className="h-2 w-2 rounded-full bg-primary/40"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="h-0.5 w-2 rounded bg-foreground/20" />
            </div>
            
            {/* Middle nodes */}
            <div className="flex items-center justify-around">
              <motion.div
                className="h-1.5 w-1.5 rounded-full bg-primary/30"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, delay: 0.2, repeat: Infinity }}
              />
              <div className="h-px w-2 rounded bg-foreground/15" />
              <motion.div
                className="h-1.5 w-1.5 rounded-full bg-primary/30"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, delay: 0.4, repeat: Infinity }}
              />
            </div>
            
            {/* Connection lines */}
            <div className="flex items-center justify-center">
              <div className="h-px w-full rounded bg-primary/20" />
            </div>
            
            {/* Bottom nodes */}
            <div className="flex items-center justify-around">
              <motion.div
                className="h-1 w-1 rounded-full bg-primary/25"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, delay: 0.1, repeat: Infinity }}
              />
              <motion.div
                className="h-1 w-1 rounded-full bg-primary/25"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
              />
              <motion.div
                className="h-1 w-1 rounded-full bg-primary/25"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

