"use client"

import { Typography } from "@/components/typography"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const lookingFor = [
  "Build WordPress + React tools end-to-end",
  "Develop integrations and automation that connect platforms",
  "Improve performance, funnels, and data flows",
  "Work across marketing, product, and engineering",
  "Contribute thinking, not just execution",
]

const targetRoles = [
  "Senior WordPress Engineer",
  "Full-Stack Web Engineer (WordPress + React)",
  "Integrations / MarTech Engineer",
  "Implementation Engineer",
  "Product / Platform Engineer",
  "Engineering Manager",
  "Product Manager",
]

export function LookingFor() {
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-4 border-b border-border/30">
        <CardTitle className="text-lg font-display">What I'm Looking For</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div>
          <Typography variant="body-sm" className="text-muted-foreground mb-3">
            A role where I can:
          </Typography>
          <ul className="space-y-2">
            {lookingFor.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                <Typography variant="body-sm">{item}</Typography>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Typography variant="body-sm" className="text-muted-foreground mb-3">
            Target roles:
          </Typography>
          <div className="flex flex-wrap gap-2">
            {targetRoles.map((role, index) => (
              <span
                key={index}
                className="text-xs px-2.5 py-1 rounded-full bg-muted/50 text-muted-foreground font-ui font-medium"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

