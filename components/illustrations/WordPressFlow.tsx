"use client"

import { motion } from "framer-motion"

interface WordPressFlowProps {
  className?: string
}

export function WordPressFlow({ className }: WordPressFlowProps) {
  const isSmall = className?.includes('h-32') || className?.includes('h-24') || className?.includes('h-20')
  const scaleClass = isSmall ? '' : 'scale-150 sm:scale-[2.5]'
  
  return (
    <div className={`relative h-full w-full ${className || ""}`}>
      <div className={`absolute inset-0 flex items-center justify-center gap-3 ${scaleClass}`}>
        {/* WordPress block - left */}
        <motion.div
          className="relative h-20 w-14 rounded border-2 border-primary/40 bg-[hsl(var(--paper))] shadow-sm"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {/* WordPress interface */}
          <div className="flex h-full w-full flex-col">
            {/* Header */}
            <div className="flex h-2 w-full items-center justify-between border-b border-border/20 bg-muted/30 px-1">
              <div className="h-0.5 w-6 rounded bg-foreground/20" />
              <div className="h-1 w-1 rounded-full bg-primary/40" />
            </div>
            {/* Block editor */}
            <div className="flex flex-1 flex-col gap-0.5 p-1">
              {/* Block */}
              <div className="h-2.5 w-full rounded border border-primary/30 bg-primary/10">
                <div className="flex h-full items-center gap-1 p-0.5">
                  <div className="h-1 w-1 rounded bg-primary/50" />
                  <div className="flex-1">
                    <div className="h-0.5 w-3/4 rounded bg-foreground/20" />
                    <div className="mt-0.5 h-0.5 w-1/2 rounded bg-foreground/15" />
                  </div>
                </div>
              </div>
              {/* Another block */}
              <div className="h-2 w-full rounded border border-border/20 bg-muted/20">
                <div className="h-0.5 w-2/3 rounded bg-foreground/15" />
              </div>
              {/* Block controls */}
              <div className="flex items-center gap-0.5">
                <div className="h-0.5 w-0.5 rounded-full bg-primary/40" />
                <div className="h-0.5 flex-1 rounded bg-foreground/10" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Flow arrow */}
        <div className="relative flex flex-col items-center gap-1">
          <motion.div
            className="text-primary/60"
            animate={{ x: [0, 2, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.div>
        </div>

        {/* Output - right */}
        <motion.div
          className="relative h-20 w-14 rounded border-2 border-primary/40 bg-[hsl(var(--paper))] shadow-sm"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
        >
          {/* Frontend output */}
          <div className="flex h-full w-full flex-col">
            {/* Browser bar */}
            <div className="flex h-2 w-full items-center justify-between border-b border-border/20 bg-muted/30 px-1">
              <div className="flex gap-0.5">
                <div className="h-0.5 w-0.5 rounded-full bg-primary/50" />
                <div className="h-0.5 w-0.5 rounded-full bg-foreground/20" />
                <div className="h-0.5 w-0.5 rounded-full bg-foreground/20" />
              </div>
              <div className="h-0.5 w-4 rounded bg-foreground/15" />
            </div>
            {/* Content */}
            <div className="flex flex-1 flex-col gap-1 p-1">
              {/* Hero section */}
              <div className="h-3 w-full rounded bg-gradient-to-r from-primary/20 to-primary/10">
                <div className="flex h-full items-center gap-1 p-0.5">
                  <div className="h-1.5 w-1.5 rounded bg-primary/50" />
                  <div className="flex-1">
                    <div className="h-0.5 w-full rounded bg-foreground/20" />
                    <div className="mt-0.5 h-0.5 w-3/4 rounded bg-foreground/15" />
                  </div>
                </div>
              </div>
              {/* Content blocks */}
              <div className="flex gap-0.5">
                <div className="h-1.5 flex-1 rounded bg-muted/30" />
                <div className="h-1.5 flex-1 rounded bg-muted/30" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

