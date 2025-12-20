"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Typography } from "@/components/typography"
import { Card, CardContent } from "@/components/ui/card"

export function FeaturedQuote() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <motion.div
      initial={mounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="border-border/50 bg-muted/30 hover:border-primary/30 transition-colors">
        <CardContent className="pt-5 pb-5 px-5 md:px-8">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="text-4xl md:text-5xl text-primary/20 font-serif leading-none mt-1 flex-shrink-0">"</div>
            <div className="flex-1 space-y-3">
              <Typography variant="body" className="italic text-foreground leading-relaxed">
                He&apos;s one of the rare professionals who can bridge the gap between deep technical capability and real business understanding. He never just built a solution, he understood the business case behind it. Whether the work involved internal tools, customer-facing platforms, or data connections between legacy systems, he always approached challenges with clarity, logic, and a calm, solutions-focused mindset.
              </Typography>
              <div className="pt-2 border-t border-border/30">
                <Typography variant="body-sm" className="font-semibold text-foreground">
                  John Kosmides
                </Typography>
                <Typography variant="body-sm" className="text-muted-foreground">
                  Vice President of Marketing — Perfect Power Wash & Universal Windows Direct
                </Typography>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
