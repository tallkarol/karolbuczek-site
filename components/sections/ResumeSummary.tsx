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
                10+ years spanning solutions architecture, full-stack engineering, and marketing leadership
              </Typography>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
              <Typography variant="body-sm" className="text-muted-foreground">
              Operated across org sizes from early-stage startups to 3,000+ person enterprises — presenting to C-suite, collaborating with agencies, and coordinating across engineering, marketing, and operations teams
              </Typography>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
              <Typography variant="body-sm" className="text-muted-foreground">
                Cloud infrastructure on AWS — Lambda, RDS, S3, Cognito, Amplify — and GCP
              </Typography>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
              <Typography variant="body-sm" className="text-muted-foreground">
                End-to-end API integration experience across CRM, call center, marketing, and analytics platforms
              </Typography>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
              <Typography variant="body-sm" className="text-muted-foreground">
                Custom data warehousing, ETL pipelines, and React-based dashboard development
              </Typography>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
              <Typography variant="body-sm" className="text-muted-foreground">
                Pre-sales experience — scoping, POC delivery, stakeholder interviews, and SOW definition
              </Typography>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
              <Typography variant="body-sm" className="text-muted-foreground">
                Former Marketing Director — I understand what these systems need to do for the people using them, not just how to build them
              </Typography>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
              <Typography variant="body-sm" className="text-muted-foreground">
              AI-forward in practice — using LLM-based tooling to accelerate analysis, documentation, and system iteration
              </Typography>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
              <Typography variant="body-sm" className="text-muted-foreground">
              Built and deployed AI-powered tooling for local inference, document automation, and workflow integration — without external data transmission
              </Typography>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
              <Typography variant="body-sm" className="text-muted-foreground">
                AWS Solutions Architect Associate in progress (SAA-C03)
              </Typography>
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

