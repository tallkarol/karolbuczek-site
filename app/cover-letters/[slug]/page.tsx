"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Typography } from "@/components/typography"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getCoverLetter } from "@/lib/cover-letters"
import { Download } from "lucide-react"
import Link from "next/link"

export default function CoverLetterPage() {
  const params = useParams()
  const [mounted, setMounted] = useState(false)
  const slug = params?.slug as string

  useEffect(() => {
    setMounted(true)
    // Auto-trigger print dialog when page loads (for PDF generation)
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && window.location.search.includes("print=true")) {
        window.print()
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted || !slug) {
    return (
      <div className="print-cover-letter">
        <div className="max-w-4xl mx-auto p-6 print:p-4 print:max-w-full">
          <div className="flex items-center justify-center min-h-[400px]">
            <Typography variant="body" className="text-muted-foreground">
              Loading...
            </Typography>
          </div>
        </div>
      </div>
    )
  }

  const coverLetter = getCoverLetter(slug)

  if (!coverLetter) {
    return (
      <div className="print-cover-letter">
        <div className="max-w-4xl mx-auto p-6 print:p-4 print:max-w-full">
          <div className="flex items-center justify-center min-h-[400px]">
            <Typography variant="body" className="text-muted-foreground">
              Cover letter not found.
            </Typography>
          </div>
        </div>
      </div>
    )
  }

  // Format the content with proper line breaks
  const formattedContent = coverLetter.content.split('\n').map((paragraph, index) => {
    if (paragraph.trim() === '') {
      return <br key={index} />
    }
    return (
      <Typography key={index} variant="body" className="mb-4 last:mb-0 leading-relaxed">
        {paragraph}
      </Typography>
    )
  })

  return (
    <div className="print-cover-letter">
      <div className="max-w-4xl mx-auto p-6 print:p-4 print:max-w-full">
        {/* Header with company info */}
        <div className="mb-8 print:mb-6">
          <Card className="border-border/50 bg-muted/30 print:bg-transparent print:border-0">
            <CardContent className="pt-6 print:pt-0">
              <div className="space-y-3">
                {coverLetter.date && (
                  <Typography variant="body-sm" className="text-muted-foreground print:text-foreground">
                    {coverLetter.date}
                  </Typography>
                )}
                {coverLetter.recipient && (
                  <Typography variant="body" className="font-semibold">
                    {coverLetter.recipient}
                  </Typography>
                )}
                {coverLetter.company && !coverLetter.recipient && (
                  <Typography variant="body" className="font-semibold">
                    {coverLetter.company}
                  </Typography>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cover Letter Content */}
        <div className="mb-8 print:mb-6">
          <Card className="border-border/50 print:border-0 print:shadow-none">
            <CardContent className="pt-6 print:pt-0">
              <div className="space-y-4 print:space-y-3">
                {formattedContent}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Signature */}
        <div className="mb-8 print:mb-6">
          <Card className="border-border/50 print:border-0 print:shadow-none">
            <CardContent className="pt-6 print:pt-0">
              <Typography variant="body" className="font-semibold">
                Karol Buczek
              </Typography>
            </CardContent>
          </Card>
        </div>

        {/* Action buttons (hidden in print) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 print:hidden no-print">
          <Button
            onClick={() => window.print()}
            variant="default"
            className="rounded-full px-6 py-2 text-sm font-semibold font-ui"
          >
            <Download className="mr-2 h-4 w-4" />
            Save as PDF
          </Button>
          <Button asChild variant="outline" className="rounded-full px-6 py-2 text-sm font-ui border-border/50 hover:border-primary transition-colors">
            <Link href="/cover-letters">
              Back to Cover Letters
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

