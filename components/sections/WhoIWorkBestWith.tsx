"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Typography } from "@/components/typography"

export function WhoIWorkBestWith() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const items = [
    "Marketing teams that want dev velocity",
    "Product teams that need clean architecture",
    "WordPress orgs needing engineering maturity",
    "Companies with scattered data or broken workflows",
  ]

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Typography variant="h2" as="h2">Who I Work Best With</Typography>
      </div>

      <motion.div
        initial={mounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <Typography variant="body" className="max-w-3xl">
          Teams stuck between marketing and engineering who need someone who understands both.
        </Typography>

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
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
              <Typography variant="body-sm">{item}</Typography>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

