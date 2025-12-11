"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Typography } from "@/components/typography"

export function WhatImNot() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const items = [
    "Not a copywriter",
    "Not a pixel-perfect designer",
    "Not an \"AI vibe coder\"",
    "Not junior",
  ]

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Typography variant="h2" as="h2">What I&apos;m Not</Typography>
      </div>

      <motion.div
        initial={mounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <ul className="space-y-3">
          {items.map((item, index) => (
            <motion.li
              key={index}
              initial={mounted ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-destructive flex-shrink-0" />
              <Typography variant="body-sm">{item}</Typography>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

