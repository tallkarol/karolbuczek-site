"use client"

import { Typography } from "@/components/typography"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const timelineItems = [
  {
    period: "2025",
    description: "Headless WP (React), AWS File Portal, AI-enabled tools (in progress)",
  },
  {
    period: "2023–2024",
    description: "Custom WordPress blocks (performance, analytics), WooCommerce optimization",
  },
  {
    period: "2021–2023",
    description: "Backend automations, lead ingestion frameworks, Zapier → SubZap architecture",
  },
  {
    period: "2019–2021",
    description: "Marketing systems, CRO frameworks, dashboarding, attribution cleanup",
  },
  {
    period: "2009–2019",
    description: "Freelance engineering, branding systems, early product/tool work",
  },
]

export function ResumeTimeline() {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-lg font-display">📅 Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <Typography variant="body-sm" className="text-muted-foreground mb-4">
          A high-level view of the systems I've built over time:
        </Typography>
        <div className="space-y-4">
          {timelineItems.map((item, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0 w-24">
                <Typography variant="body-sm" className="font-semibold font-ui">
                  {item.period}
                </Typography>
              </div>
              <div className="flex-1">
                <Typography variant="body-sm" className="text-muted-foreground">
                  {item.description}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

