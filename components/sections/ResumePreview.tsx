"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Typography } from "@/components/typography"
import { ArrowRight } from "lucide-react"
import { ResumeTimeline, CodeFlow, SystemNodes } from "@/components/illustrations"

const tabs = ["Timeline", "Skills Map", "Highlights"]

export function ResumePreview() {
  const [activeTab, setActiveTab] = useState("Timeline")

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Typography variant="h2" as="h2">Interactive Resume</Typography>
        <Typography variant="body" className="text-muted-foreground">
          Instead of a static PDF, this is a resume you can explore — filter by role type, skim a timeline, or dive into systems I&apos;ve built.
        </Typography>
      </div>

      <Card className="border-border/50 hover:border-primary/30 transition-colors">
        <CardHeader className="pb-4">
          <div className="flex gap-2 border-b border-border/50 pb-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium font-ui transition-colors relative ${
                  activeTab === tab
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {activeTab === "Timeline" && (
            <div className="space-y-4">
              <div className="h-32 w-full rounded border border-border/30 bg-muted/20 overflow-hidden mb-4">
                <ResumeTimeline className="h-full w-full" />
              </div>
              <div className="space-y-2">
                <div className="font-semibold">Full-Stack Developer & Systems Architect</div>
                <div className="text-sm text-muted-foreground">
                  20+ years coding • 15+ years in marketing & growth
                </div>
                <div className="text-sm">
                  Built web apps, internal tools, and growth systems that solve real business problems.
                </div>
              </div>
            </div>
          )}
          {activeTab === "Skills Map" && (
            <div className="space-y-4">
              <div className="h-32 w-full rounded border border-border/30 bg-muted/20 overflow-hidden mb-4">
                <SystemNodes className="h-full w-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-border rounded-lg">
                  <div className="font-semibold mb-2">Build</div>
                  <div className="text-sm text-muted-foreground">
                    WordPress, React, AWS, custom tools
                  </div>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <div className="font-semibold mb-2">Operate</div>
                  <div className="text-sm text-muted-foreground">
                    Lead funnels, automations, dashboards
                  </div>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <div className="font-semibold mb-2">Connect</div>
                  <div className="text-sm text-muted-foreground">
                    API integrations, data pipelines, orchestration
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "Highlights" && (
            <div className="space-y-4">
              <div className="h-32 w-full rounded border border-border/30 bg-muted/20 overflow-hidden mb-4">
                <CodeFlow className="h-full w-full" />
              </div>
              <div className="space-y-2">
                <div className="font-semibold">Key Achievements</div>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Architected secure file sharing portal on AWS</li>
                  <li>Optimized Core Web Vitals (LCP 5.5s → 3.2s)</li>
                  <li>Built UTM persistence and attribution systems</li>
                  <li>Refactored complex Zapier workflows (70+ → 22 steps)</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

        <div className="flex justify-center pt-4">
          <Button asChild variant="outline" className="rounded-full px-6 py-2 text-sm font-ui border-border/50 hover:border-primary transition-colors">
            <Link href="/resume">
              Open full resume
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
    </div>
  )
}

