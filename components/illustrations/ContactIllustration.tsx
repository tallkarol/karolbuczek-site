"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface ContactIllustrationProps {
  className?: string
}

export function ContactIllustration({ className }: ContactIllustrationProps) {
  const [showCheckmark, setShowCheckmark] = useState(false)
  const isSmall = className?.includes('h-32') || className?.includes('h-24') || className?.includes('h-20')
  const scaleClass = isSmall ? '' : 'scale-150 sm:scale-[2.5]'
  
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCheckmark(true)
      setTimeout(() => {
        setShowCheckmark(false)
      }, 2000)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className={`relative h-full w-full ${className || ""}`}>
      <div className={`absolute inset-0 flex items-center justify-center ${scaleClass}`}>
        {/* Form box - stays constant */}
        <div className="relative h-24 w-20 rounded border-2 border-primary/40 bg-[hsl(var(--paper))] shadow-sm">
          {!showCheckmark ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-full w-full flex-col gap-1 p-2"
            >
              {/* Header/Title */}
              <div className="h-2 w-full rounded border border-primary/30 bg-primary/5" />
              
              {/* Input fields */}
              <div className="flex-1 flex flex-col gap-0.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="h-1.5 w-full rounded border border-primary/30"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                  />
                ))}
              </div>
              
              {/* Submit button */}
              <motion.div
                className="h-2 w-2/3 rounded bg-primary/30 border border-primary/50 ml-auto"
                animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="checkmark"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Checkmark */}
              <svg className="h-10 w-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                <motion.path
                  d="M 5 12 L 10 17 L 20 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                />
              </svg>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

