"use client"

import { motion } from "framer-motion"

interface BuildOperateConnectProps {
  className?: string
}

export function BuildOperateConnect({ className }: BuildOperateConnectProps) {
  const isSmall = className?.includes('h-32') || className?.includes('h-24') || className?.includes('h-20')
  const scaleClass = isSmall ? '' : 'scale-150 sm:scale-[2.5]'
  
  return (
    <div className={`relative h-full w-full ${className || ""}`}>
      <div className={`absolute inset-0 flex items-center justify-center gap-2 ${scaleClass}`}>
        {/* Build - left */}
        <motion.div
          className="relative h-16 w-12 rounded border-2 border-primary/40 bg-[hsl(var(--paper))]"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex h-full w-full flex-col gap-1 p-1">
            {/* Code block */}
            <div className="h-2 w-full rounded bg-primary/20">
              <div className="flex h-full items-center gap-0.5 p-0.5">
                <div className="h-0.5 w-0.5 rounded bg-primary/60" />
                <div className="h-0.5 flex-1 rounded bg-foreground/20" />
              </div>
            </div>
            {/* Blocks */}
            <div className="flex gap-0.5">
              <div className="h-1.5 flex-1 rounded bg-primary/15" />
              <div className="h-1.5 flex-1 rounded bg-primary/15" />
            </div>
            <div className="h-1 w-full rounded bg-primary/10" />
          </div>
        </motion.div>

        {/* Connect arrow */}
        <motion.div
          className="text-primary/50"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          →
        </motion.div>

        {/* Operate - middle */}
        <motion.div
          className="relative h-16 w-12 rounded border-2 border-primary/40 bg-[hsl(var(--paper))]"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, delay: 0.2, repeat: Infinity }}
        >
          <div className="flex h-full w-full flex-col gap-1 p-1">
            {/* Dashboard */}
            <div className="h-2 w-full rounded bg-primary/20">
              <div className="flex h-full items-end gap-0.5 p-0.5">
                {[0.3, 0.6, 0.4, 0.8].map((height, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-t bg-primary/40"
                    style={{ height: `${height * 100}%` }}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, delay: i * 0.15, repeat: Infinity }}
                  />
                ))}
              </div>
            </div>
            {/* Metrics */}
            <div className="flex gap-0.5">
              <div className="h-0.5 flex-1 rounded bg-foreground/20" />
              <div className="h-0.5 w-1 rounded-full bg-primary/50" />
            </div>
          </div>
        </motion.div>

        {/* Connect arrow */}
        <motion.div
          className="text-primary/50"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1.5, delay: 0.3, repeat: Infinity }}
        >
          →
        </motion.div>

        {/* Connect - right */}
        <motion.div
          className="relative h-16 w-12 rounded border-2 border-primary/40 bg-[hsl(var(--paper))]"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, delay: 0.4, repeat: Infinity }}
        >
          <div className="flex h-full w-full flex-col gap-1 p-1">
            {/* Network nodes */}
            <div className="flex items-center justify-around">
              <motion.div
                className="h-1 w-1 rounded-full bg-primary/40"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="h-px w-1 rounded bg-primary/30" />
              <motion.div
                className="h-1 w-1 rounded-full bg-primary/40"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
              />
            </div>
            {/* Connection line */}
            <div className="h-px w-full rounded bg-primary/20" />
            {/* Bottom node */}
            <div className="flex items-center justify-center">
              <motion.div
                className="h-1.5 w-1.5 rounded-full bg-primary/50"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, delay: 0.6, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

