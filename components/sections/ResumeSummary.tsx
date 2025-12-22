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
          </div>

          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
              <Typography variant="body-sm" className="text-muted-foreground">
                10+ years building web platforms, internal tools & data workflows
              </Typography>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
              <Typography variant="body-sm" className="text-muted-foreground">
              Full-stack web apps & websites using React, TailWind, Next.js, and more.
              </Typography>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
              <Typography variant="body-sm" className="text-muted-foreground">
                Deep experience with APIs, automation pipelines & PHP/SQL engineering
              </Typography>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
              <Typography variant="body-sm" className="text-muted-foreground">
                WordPress/VIP/WooCommerce engineering + plugin/block/system architecture
              </Typography>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
              <Typography variant="body-sm" className="text-muted-foreground">
                AWS cloud experience — Amplify, Lambda, RDS, S3, Cognito
              </Typography>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
              <Typography variant="body-sm" className="text-muted-foreground">
                Strong cross-functional background → product, marketing, engineering
              </Typography>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
              <Typography variant="body-sm" className="text-muted-foreground">
                Cross-team communication & stakeholder leadership              </Typography>
            </li>
          </ul>

          <div className="flex flex-wrap gap-2 pt-2">
            <Button asChild size="sm" className="rounded-full text-xs font-ui">
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

