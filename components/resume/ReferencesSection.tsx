"use client"

import { Typography } from "@/components/typography"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2 } from "lucide-react"

const references = [
  {
    quote: "He's one of the rare professionals who can bridge the gap between deep technical capability and real business understanding. He never just built a solution, he understood the business case behind it. His integration work created a lasting impact across multiple systems and departments, with an incredible ability to simplify complexity and design solutions that actually solved the root problem instead of just addressing the symptoms.",
    author: "John Kosmides",
    role: "Vice President of Marketing",
    relationship: "Perfect Power Wash & Universal Windows Direct — Direct Manager",
  },
  {
    quote: "Karol is a wildly multi-talented man with an absurd amount of expertise in numerous fields. He's an incredible mentor and played a critical role on my path to software development, but his skillset allows him to operate as an expert in nearly every aspect of a business. Whether you need someone to lead or support you in any role, Karol is your man.",
    author: "Julian Quesada",
    role: "Software Engineer",
    relationship: "Direct Report",
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

