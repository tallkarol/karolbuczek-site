"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export function ResumeSummary() {
  return (
    <Card className="border-border/50 bg-muted/20 hover:border-primary/30 transition-colors">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Typography variant="h3" as="h3" className="font-display">
              Experience at a Glance
            </Typography>
            <Typography variant="body-sm" className="text-muted-foreground">
              20+ years coding • 15+ years in marketing & growth
            </Typography>
          </div>

          <Typography variant="body" className="text-muted-foreground">
            Full-stack developer building systems, websites, internal tools, and automations that help marketing, product, and engineering work together. I fix cross-functional problems — slow stacks, attribution gaps, scattered data, manual workflows — using modern web tooling, cloud platforms, and practical AI.
          </Typography>

          <div className="flex flex-wrap gap-2 pt-2">
            <Button asChild variant="outline" size="sm" className="rounded-full text-xs font-ui border-border/50 hover:border-primary transition-colors">
              <Link href="/resume">
                View full resume
                <ArrowRight className="ml-2 h-3 w-3" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

