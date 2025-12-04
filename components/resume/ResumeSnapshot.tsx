"use client"

import { Typography } from "@/components/typography"
import { Card, CardContent } from "@/components/ui/card"

export function ResumeSnapshot() {
  return (
    <Card className="border-border/50 bg-muted/30">
      <CardContent className="pt-6">
        <Typography variant="h3" as="h3" className="mb-4 font-display">
          Snapshot
        </Typography>
        <div className="space-y-2">
          <div>
            <Typography variant="body-sm" className="text-muted-foreground">Name:</Typography>
            <Typography variant="body" className="font-semibold">Karol Buczek</Typography>
          </div>
          <div>
            <Typography variant="body-sm" className="text-muted-foreground">Title:</Typography>
            <Typography variant="body" className="font-semibold">
              Full-Stack Web Engineer — WordPress • React • Integrations
            </Typography>
          </div>
          <div>
            <Typography variant="body-sm" className="text-muted-foreground">What I Do:</Typography>
            <Typography variant="body">
              I build high-impact web tools and workflows using WordPress and React, and I develop the integrations, automation, and backend logic that connect them to the platforms and software your business runs on.
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

