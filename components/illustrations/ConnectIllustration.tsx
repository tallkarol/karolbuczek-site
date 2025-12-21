"use client"

import { motion } from "framer-motion"

interface ConnectIllustrationProps {
  className?: string
}

export function ConnectIllustration({ className }: ConnectIllustrationProps) {
  const primaryColor = "hsl(var(--primary))"
  const mutedColor = "hsl(var(--muted))"
  const bgColor = "hsl(var(--background))"
  
  return (
    <div className={`relative h-full w-full ${className || ""}`}>
      <div className="absolute inset-0 flex items-center justify-center gap-3">
        {/* CRM window - left */}
        <motion.div
          className="relative h-20 w-16 rounded border-2 border-primary/40 bg-gradient-to-br from-background to-primary/5 shadow-sm"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {/* CRM interface */}
          <div className="flex h-full w-full flex-col">
            {/* CRM header */}
            <div className="flex h-2 w-full items-center justify-between border-b border-muted/20 bg-muted/5 px-1">
              <div className="h-0.5 w-6 rounded bg-muted/20" />
              <div className="flex items-center gap-0.5">
                <div className="h-0.5 w-2 rounded bg-muted/20" />
                <div className="h-1 w-1 rounded-full bg-primary/40" />
              </div>
            </div>
            {/* CRM content - contact list */}
            <div className="flex flex-1 flex-col gap-0.5 p-0.5">
              {/* Search/filter bar */}
              <div className="flex h-1 w-full items-center gap-0.5 rounded border border-muted/15 bg-background/80 px-0.5">
                <div className="h-0.5 w-0.5 rounded-full bg-muted/30" />
                <div className="h-0.5 flex-1 rounded bg-muted/15" />
              </div>
              {/* Contact rows */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="flex h-1.5 w-full items-center gap-0.5 rounded border border-muted/20 bg-background/50 px-0.5"
                  animate={{ opacity: [0.7, 0.9, 0.7] }}
                  transition={{ duration: 2, delay: i * 0.15, repeat: Infinity }}
                >
                  {/* Avatar circle */}
                  <div className="h-1 w-1 flex-shrink-0 rounded-full bg-primary/40" />
                  {/* Contact info */}
                  <div className="flex-1 min-w-0">
                    <div className="h-0.5 w-full rounded bg-muted/30" />
                    <div className="mt-0.5 flex items-center gap-0.5">
                      <div className="h-0.5 w-2/3 rounded bg-muted/20" />
                      <div className="h-0.5 w-0.5 rounded-full bg-destructive/50" />
                    </div>
                  </div>
                </motion.div>
              ))}
              {/* Activity indicator */}
              <div className="mt-0.5 flex items-center gap-0.5">
                <div className="h-0.5 w-0.5 rounded-full bg-primary/60" />
                <div className="h-0.5 w-1/2 rounded bg-muted/15" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bidirectional arrows */}
        <div className="relative flex flex-col items-center gap-1">
          <motion.div
            className="text-primary/60"
            animate={{ x: [0, 2, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.div>
          <motion.div
            className="text-primary/60"
            animate={{ x: [0, -2, 0] }}
            transition={{ duration: 1.5, delay: 0.75, repeat: Infinity }}
          >
            ←
          </motion.div>
        </div>

        {/* Dashboard window - right */}
        <motion.div
          className="relative h-20 w-16 rounded border-2 border-primary/40 bg-gradient-to-br from-background to-muted/5 shadow-sm"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
        >
          {/* Dashboard interface */}
          <div className="flex h-full w-full flex-col">
            {/* Dashboard header */}
            <div className="flex h-2 w-full items-center justify-between border-b border-muted/20 bg-muted/5 px-1">
              <div className="h-0.5 w-8 rounded bg-muted/20" />
              <div className="flex items-center gap-0.5">
                <div className="h-0.5 w-2 rounded bg-muted/20" />
                <div className="h-1 w-1 rounded-full bg-primary/40" />
              </div>
            </div>
            {/* Dashboard content */}
            <div className="flex flex-1 flex-col gap-0.5 p-0.5">
              {/* Metric cards row - 4 cards */}
              <div className="grid grid-cols-2 gap-0.5">
                <div className="rounded bg-primary/15 p-0.5">
                  <div className="h-0.5 w-1/2 rounded bg-muted/20" />
                  <div className="mt-0.5 h-0.5 w-3/4 rounded bg-primary/40" />
                </div>
                <div className="rounded bg-destructive/10 p-0.5">
                  <div className="h-0.5 w-1/2 rounded bg-muted/20" />
                  <div className="mt-0.5 h-0.5 w-3/4 rounded bg-destructive/30" />
                </div>
                <div className="rounded bg-muted/10 p-0.5">
                  <div className="h-0.5 w-1/2 rounded bg-muted/20" />
                  <div className="mt-0.5 h-0.5 w-2/3 rounded bg-muted/30" />
                </div>
                <div className="rounded bg-primary/10 p-0.5">
                  <div className="h-0.5 w-1/2 rounded bg-muted/20" />
                  <div className="mt-0.5 h-0.5 w-2/3 rounded bg-primary/30" />
                </div>
              </div>
              {/* Bar chart area */}
              <div className="h-1.5 w-full rounded bg-muted/10 p-0.5">
                <div className="mb-0.5 flex items-center justify-between">
                  <div className="h-0.5 w-1/3 rounded bg-muted/20" />
                  <div className="h-0.5 w-0.5 rounded-full bg-primary/40" />
                </div>
                <div className="flex h-full items-end gap-0.5">
                  {[0.3, 0.6, 0.4, 0.8, 0.5, 0.7].map((height, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-t bg-primary/30"
                      style={{ height: `${height * 100}%` }}
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2, delay: i * 0.15, repeat: Infinity }}
                    />
                  ))}
                </div>
              </div>
              {/* Line graph area */}
              <div className="h-1.5 w-full rounded bg-muted/10 p-0.5">
                <div className="mb-0.5 flex items-center justify-between">
                  <div className="h-0.5 w-1/2 rounded bg-muted/20" />
                  <div className="flex gap-0.5">
                    <div className="h-0.5 w-0.5 rounded-full bg-primary/50" />
                    <div className="h-0.5 w-0.5 rounded-full bg-destructive/40" />
                  </div>
                </div>
                {/* Line graph */}
                <svg className="h-full w-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <motion.polyline
                    points="5,25 15,18 25,22 35,12 45,15 55,8 65,10 75,5 85,8 95,3"
                    fill="none"
                    stroke={primaryColor}
                    strokeWidth="1.5"
                    strokeOpacity="0.6"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  />
                  <motion.polyline
                    points="5,20 15,15 25,18 35,8 45,10 55,5 65,7 75,3 85,5 95,2"
                    fill="none"
                    stroke="hsl(var(--destructive))"
                    strokeWidth="1.5"
                    strokeOpacity="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.3, repeat: Infinity, repeatType: "reverse" }}
                  />
                </svg>
              </div>
              {/* Progress/activity bar */}
              <div className="flex items-center gap-1">
                <div className="h-0.5 flex-1 rounded-full bg-muted/10">
                  <motion.div
                    className="h-full rounded-full bg-primary/40"
                    style={{ width: '65%' }}
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div className="h-0.5 w-0.5 rounded-full bg-primary/50" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

