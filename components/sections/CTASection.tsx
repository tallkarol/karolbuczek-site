"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/typography"
import { Mail, Linkedin, Download } from "lucide-react"

interface CTASectionProps {
  heading?: string
  description?: string
}

export function CTASection({
  heading = "Open to new engineering roles and select consulting engagements.",
  description = "If you're hiring or exploring a systems/automation project, feel free to reach out.",
}: CTASectionProps) {
  return (
    <div className="relative rounded-lg border border-border/50 bg-muted/30 p-8 md:p-12 text-center space-y-6 overflow-hidden">
      {/* Subtle accent */}
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0" />
      
      {/* Logo */}
      <div className="flex justify-center">
        <div className="relative h-[175px] w-[210px] md:h-[250px] md:w-[300px] flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Karol Buczek"
            fill
            className="object-contain"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Typography variant="h2" as="h2" className="text-2xl md:text-3xl">{heading}</Typography>
        <Typography variant="body" className="text-muted-foreground">{description}</Typography>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button asChild className="rounded-full px-6 py-2 text-sm font-semibold font-ui">
          <Link href="/contact">
            <Mail className="mr-2 h-4 w-4" />
            Get in touch
          </Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full px-6 py-2 text-sm font-ui border-border/50 hover:border-primary transition-colors">
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
        <Button asChild variant="outline" className="rounded-full px-6 py-2 text-sm font-ui border-border/50 hover:border-primary transition-colors">
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

