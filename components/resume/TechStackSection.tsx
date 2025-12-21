"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Typography } from "@/components/typography"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

interface TechStackSectionProps {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function TechStackSection({ isOpen: controlledIsOpen, onOpenChange }: TechStackSectionProps = {}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen
  const setIsOpen = onOpenChange || ((value: boolean) => setInternalIsOpen(value))

  return (
    <Card id="technical-skills" className="border-border/50 hover:border-primary/30 transition-colors scroll-mt-20">
      <CardHeader className="pb-0 border-b-0">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            setIsOpen(!isOpen)
          }}
          className="w-full flex items-center justify-between gap-3 pb-4 border-b border-border/30 hover:opacity-70 transition-opacity group cursor-pointer"
        >
          <CardTitle className="text-lg font-display flex items-center gap-2 group-hover:text-primary transition-colors pointer-events-none">
            <span className="h-1 w-1 rounded-full bg-primary" />
            Technical Skills
          </CardTitle>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground pointer-events-none" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground pointer-events-none" />
          )}
        </button>
      </CardHeader>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="space-y-3">
                  <Typography variant="body-sm" className="font-semibold text-foreground text-xs uppercase tracking-wide">
                    Languages
                  </Typography>
                  <Typography variant="body-sm" className="text-muted-foreground">
                    PHP, JavaScript, TypeScript, SQL, HTML5, CSS3
                  </Typography>
                </div>

                <div className="space-y-3">
                  <Typography variant="body-sm" className="font-semibold text-foreground text-xs uppercase tracking-wide">
                    Frameworks
                  </Typography>
                  <Typography variant="body-sm" className="text-muted-foreground">
                    React, Node.js, TailwindCSS
                  </Typography>
                </div>

                <div className="space-y-3">
                  <Typography variant="body-sm" className="font-semibold text-foreground text-xs uppercase tracking-wide">
                    Platforms
                  </Typography>
                  <Typography variant="body-sm" className="text-muted-foreground">
                    WordPress (VIP), AWS (Amplify, Lambda, Cognito, RDS, S3), Supabase, Vercel
                  </Typography>
                </div>

                <div className="space-y-3">
                  <Typography variant="body-sm" className="font-semibold text-foreground text-xs uppercase tracking-wide">
                    Core Strengths
                  </Typography>
                  <Typography variant="body-sm" className="text-muted-foreground">
                    Full-stack development, WordPress/Woocommerce plugin/block engineering, API integrations, AWS workflows & automation, SQL data logic, Core Web Vitals performance tuning, attribution & analytics architecture, MarTech automations and optimizations.
                  </Typography>
                </div>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

