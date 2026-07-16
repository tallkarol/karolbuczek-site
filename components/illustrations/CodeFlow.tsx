"use client"

import { motion } from "framer-motion"

interface CodeFlowProps {
  className?: string
}

export function CodeFlow({ className }: CodeFlowProps) {
  return (
    <div className={`relative h-full w-full ${className || ""}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Code lines flowing */}
        <div className="flex flex-col gap-2 w-3/4">
          {[
            { width: "w-full", delay: 0, tone: "via-primary/40" },
            { width: "w-5/6", delay: 0.1, tone: "via-olive-700/45" },
            { width: "w-full", delay: 0.2, tone: "via-primary/40" },
            { width: "w-4/6", delay: 0.3, tone: "via-olive-700/45" },
          ].map((line, i) => (
            <motion.div
              key={i}
              className={`h-1 rounded bg-gradient-to-r from-transparent to-transparent ${line.tone} ${line.width}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: [0, 1, 0],
                x: [0, 20, 40],
              }}
              transition={{
                duration: 2,
                delay: line.delay,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

