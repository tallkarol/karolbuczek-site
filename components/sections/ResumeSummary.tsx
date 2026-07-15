"use client"

import Link from "next/link"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

const glanceBullets = [
  "7 years of hands-on delivery for SMB, mid-market, and enterprise clients; 15+ years of coding experience",
  "Centralized integration API connecting 7+ systems — Five9, CRM, Mailchimp, and internal platforms — with shared logging and error handling at an enterprise home-services organization",
  "Modular integration architecture across 8 brands at Great Day Improvements, connecting multiple CRMs and third-party vendors into shared cross-brand workflows",
  "Serverless AWS document portal with managed identity, signed-URL delivery, role-based access, and immutable audit logging",
  "Headless WordPress + React rebuild — mobile Lighthouse 51 → 94, time to interactive 12.5s → 3.1s",
  "Production A&R analytics platform — Next.js/TypeScript with PostgreSQL, deployed on Vercel and Railway",
  "Pre-sales experience — discovery, scoping, POC delivery, and SOW definition run directly with founders and executives",
  "Enterprise WordPress VIP engineering — custom Gutenberg blocks, patterns, and templates for marketing self-serve",
]

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
              Former Marketing Director — I now build the systems I wish I&apos;d had.
            </Typography>
          </div>

          <ul className="space-y-2">
            {glanceBullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                <Typography variant="body-sm" className="text-muted-foreground">
                  {bullet}
                </Typography>
              </li>
            ))}
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
