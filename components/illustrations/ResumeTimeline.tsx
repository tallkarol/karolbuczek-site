"use client"

import { motion } from "framer-motion"

interface ResumeTimelineProps {
  className?: string
}

export function ResumeTimeline({ className }: ResumeTimelineProps) {
  return (
    <div className={`relative h-full w-full ${className || ""}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Timeline with nodes */}
        <div className="flex flex-col gap-3 w-2/3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              {/* Timeline dot */}
              <motion.div
                className="h-3 w-3 rounded-full border-2 border-primary/40 bg-primary/20 flex-shrink-0"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                }}
              />
              {/* Timeline line */}
              {i < 3 && (
                <div className="h-8 w-0.5 bg-primary/20 ml-[5px]" />
              )}
              {/* Content block */}
              <motion.div
                className="h-2 flex-1 rounded bg-primary/10"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

