"use client"

import { motion } from "framer-motion"

interface SystemNodesProps {
  className?: string
}

export function SystemNodes({ className }: SystemNodesProps) {
  return (
    <div className={`relative h-full w-full ${className || ""}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Central node */}
        <motion.div
          className="relative h-12 w-12 rounded-full border-2 border-primary/40 bg-primary/10 flex items-center justify-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="h-2 w-2 rounded-full bg-primary/60" />
        </motion.div>

        {/* Orbiting nodes */}
        {[0, 1, 2, 3].map((i) => {
          const angle = (i * 90) * (Math.PI / 180)
          const radius = 20
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius

          return (
            <motion.div
              key={i}
              className="absolute h-4 w-4 rounded-full border border-primary/30 bg-primary/20"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            />
          )
        })}
        
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[0, 1, 2, 3].map((i) => {
            const angle = (i * 90) * (Math.PI / 180)
            const radius = 20
            const x = 50 + Math.cos(angle) * radius
            const y = 50 + Math.sin(angle) * radius
            return (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={x}
                y2={y}
                stroke="currentColor"
                strokeWidth="0.5"
                strokeOpacity="0.15"
                className="text-primary"
              />
            )
          })}
        </svg>
      </div>
    </div>
  )
}

