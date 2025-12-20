"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/typography"
import { Mail, Linkedin } from "lucide-react"

interface CTASectionProps {
  heading?: string
  description?: string
}

export function CTASection({
  heading = "Want to talk about a role or a project?",
  description = "Let's connect.",
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
            Email me
          </Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full px-6 py-2 text-sm font-ui border-border/50 hover:border-primary transition-colors">
          <a
            href="https://www.linkedin.com/in/karolbuczek/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="mr-2 h-4 w-4" />
            Connect on LinkedIn
          </a>
        </Button>
      </div>
    </div>
  )
}

