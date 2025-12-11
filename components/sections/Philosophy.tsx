"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Typography } from "@/components/typography"

export function Philosophy() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Typography variant="h2" as="h2">How I Work</Typography>
      </div>

      <motion.div
        initial={mounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <Typography variant="body" className="text-lg max-w-3xl">
          I like real, messy problems — slow funnels, fragile systems, tech debt.
        </Typography>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <Typography variant="h3" as="h3" className="text-lg font-display">My approach:</Typography>
            <ol className="space-y-3 list-decimal list-inside">
              <motion.li
                initial={mounted ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Typography variant="body-sm" className="inline">Map the constraints</Typography>
              </motion.li>
              <motion.li
                initial={mounted ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Typography variant="body-sm" className="inline">Sketch the system</Typography>
              </motion.li>
              <motion.li
                initial={mounted ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Typography variant="body-sm" className="inline">Ship something small and measurable</Typography>
              </motion.li>
              <motion.li
                initial={mounted ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Typography variant="body-sm" className="inline">Navigate ambiguity by pulling in the right people</Typography>
              </motion.li>
              <motion.li
                initial={mounted ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <Typography variant="body-sm" className="inline">Iterate quickly with a bias toward action</Typography>
              </motion.li>
            </ol>
          </div>

          <div className="space-y-4">
            <Typography variant="h3" as="h3" className="text-lg font-display">Principles:</Typography>
            <div className="space-y-3">
              <motion.div
                initial={mounted ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Typography variant="body-sm" className="font-semibold">Architecture over buzzwords.</Typography>
              </motion.div>
              <motion.div
                initial={mounted ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Typography variant="body-sm" className="font-semibold">Clarity over complexity.</Typography>
              </motion.div>
              <motion.div
                initial={mounted ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Typography variant="body-sm" className="font-semibold">Outcomes over deliverables.</Typography>
              </motion.div>
              <motion.div
                initial={mounted ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Typography variant="body-sm" className="font-semibold">Growth mindset with continuous learning.</Typography>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

