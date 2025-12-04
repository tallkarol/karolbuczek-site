"use client"

import { Typography } from "@/components/typography"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const narrativePoints = [
  {
    period: "Early 2010s",
    description: "Mastered creative execution and process building.",
  },
  {
    period: "Mid 2010s",
    description: "Shifted focus to UX, branding systems, and scalable workflows.",
  },
  {
    period: "Late 2010s",
    description: "Began blending marketing data, engineering, and dashboards.",
  },
  {
    period: "2019–2021",
    description: "Evolved into a MarTech/Automation/Product hybrid role.",
  },
  {
    period: "2021–2024",
    description: "Became a full Web Systems Engineer — building WordPress systems, backend automations, cloud tools, and performance-first architecture.",
  },
  {
    period: "2025+",
    description: "Continuing to build cool things, integrating AI tools, and developing products of my own. Finding people I believe in to work with—whether that's clients or roles, I'm letting life decide.",
  },
]

export function NarrativeSummary() {
  return (
    <Card className="border-border/50 bg-muted/30">
      <CardHeader className="pb-4 border-b border-border/30">
        <CardTitle className="text-lg font-display">Career Narrative</CardTitle>
        <Typography variant="body-sm" className="text-muted-foreground mt-2">
          Career progression shaped by systems built, not titles held:
        </Typography>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {narrativePoints.map((point, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0 w-24">
                <Typography variant="body-sm" className="font-semibold font-ui">
                  {point.period}
                </Typography>
              </div>
              <div className="flex-1">
                <Typography variant="body-sm" className="text-muted-foreground">
                  {point.description}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

