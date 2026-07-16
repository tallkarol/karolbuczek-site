"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/typography"
import { Mail, Linkedin, Download } from "lucide-react"

interface CTASectionProps {
  heading?: string
  description?: string
  fullWidth?: boolean
}

export function CTASection({
  heading = "Open to full-time integration, implementation, and solutions architect roles.",
  description = "Also open to select consulting engagements. If you're hiring, reach out.",
  fullWidth = false,
}: CTASectionProps) {
  if (fullWidth) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-7 text-center">
        <div className="relative h-12 w-14 sm:h-14 sm:w-16">
          <Image
            src="/logo.png"
            alt="Karol Buczek"
            fill
            className="object-contain brightness-0 invert"
          />
        </div>

        <div className="mx-auto max-w-xl space-y-3">
          <Typography variant="h2" as="h2" className="text-2xl text-text-inverse md:text-3xl">
            {heading}
          </Typography>
          <Typography variant="body" className="text-text-inverse/75">
            {description}
          </Typography>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
          <Button asChild variant="inverse">
            <Link href="/contact">
              <Mail className="mr-2 h-4 w-4" />
              Get in touch
            </Link>
          </Button>
          <Button asChild variant="outline-inverse">
            <a
              href="/resume-karol-buczek.pdf"
              download="resume-karol-buczek.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </a>
          </Button>
          <Button asChild variant="secondary">
            <a
              href="https://www.linkedin.com/in/karolbuczek/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative space-y-6 overflow-hidden rounded-lg border border-border/50 bg-muted/30 p-8 text-center md:p-12">
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0" />

      <div className="flex justify-center">
        <div className="relative h-[175px] w-[210px] flex-shrink-0 md:h-[250px] md:w-[300px]">
          <Image
            src="/logo.png"
            alt="Karol Buczek"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Typography variant="h2" as="h2" className="text-2xl md:text-3xl">
          {heading}
        </Typography>
        <Typography variant="body" className="text-muted-foreground">
          {description}
        </Typography>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button asChild>
          <Link href="/contact">
            <Mail className="mr-2 h-4 w-4" />
            Get in touch
          </Link>
        </Button>
        <Button asChild variant="outline">
          <a
            href="/resume-karol-buczek.pdf"
            download="resume-karol-buczek.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Resume
          </a>
        </Button>
        <Button asChild variant="outline">
          <a
            href="https://www.linkedin.com/in/karolbuczek/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="mr-2 h-4 w-4" />
            LinkedIn
          </a>
        </Button>
      </div>
    </div>
  )
}
