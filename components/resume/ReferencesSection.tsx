"use client"

import { Typography } from "@/components/typography"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2 } from "lucide-react"

const references = [
  {
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Client Name",
    role: "Company Name",
    relationship: "President — Direct Report",
  },
  {
    quote: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "Client Name",
    role: "Company Name",
    relationship: "Developer — Team Member",
  },
]

export function ReferencesSection() {
  return (
    <Card id="references" className="border-border/50 hover:border-primary/30 transition-colors scroll-mt-20">
      <CardHeader className="pb-4 border-b border-border/30">
        <CardTitle className="text-lg font-display flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-primary" />
          References
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-10 md:grid-cols-2">
          {references.map((ref, index) => (
            <div key={index} className="space-y-5">
              <blockquote className="relative pl-6">
                <div className="absolute left-0 top-0 h-full w-0.5 bg-primary/40" />
                <Typography variant="body-sm" className="text-muted-foreground italic leading-relaxed">
                  &ldquo;{ref.quote}&rdquo;
                </Typography>
              </blockquote>
              <div className="pl-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-10 w-10 rounded border border-border/50 bg-muted/30 flex items-center justify-center mt-0.5">
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <Typography variant="body-sm" className="font-semibold text-foreground">
                      {ref.author}
                    </Typography>
                    <Typography variant="body-sm" className="text-muted-foreground text-xs">
                      {ref.role}
                    </Typography>
                    <Typography variant="body-sm" className="text-muted-foreground/70 text-xs italic">
                      {ref.relationship}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

