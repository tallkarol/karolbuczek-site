"use client"

import { useState } from "react"
import type { ComponentType } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Typography } from "@/components/typography"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"
import { SiAmazonwebservices, SiGooglecloud, SiMysql, SiPython, SiJavascript, SiReact, SiPhp } from "react-icons/si"

function AzureLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M5.483 21.3H24L14.025 4.013l-3.038 8.347 5.836 6.938L5.483 21.3zM13.23 2.7L6.105 8.677 0 19.253h5.505v.014L13.23 2.7z" />
    </svg>
  )
}

type CertCategory = "cloud"

interface Certification {
  name: string
  category: CertCategory
  inProgress?: boolean
  expected?: string
  logo?: "azure" | "gcp" | "aws"
}

const certifications: Certification[] = [
  {
    name: "Google Cloud Digital Leader",
    category: "cloud",
    logo: "gcp",
  },
  {
    name: "AWS Solutions Architect Associate",
    category: "cloud",
    logo: "aws",
    inProgress: true,
    expected: "Expected Spring 2026",
  },
]

const technicalValidation = {
  label: "Validated via HackerRank",
  pills: ["Advanced SQL", "Intermediate Python", "Intermediate JavaScript", "Intermediate React", "Intermediate PHP"],
}

const hackerRankPillIcons: Record<string, ComponentType<{ className?: string }>> = {
  "Advanced SQL": SiMysql,
  "Intermediate Python": SiPython,
  "Intermediate JavaScript": SiJavascript,
  "Intermediate React": SiReact,
  "Intermediate PHP": SiPhp,
}

const cloudCerts = certifications.filter((c) => c.category === "cloud")

const logoMap = {
  azure: AzureLogo,
  gcp: SiGooglecloud,
  aws: SiAmazonwebservices,
}

function CertItem({ cert }: { cert: Certification }) {
  const Logo = cert.logo ? logoMap[cert.logo] : null
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/30 px-2.5 py-1 text-xs text-muted-foreground">
      {Logo && <Logo className="h-3.5 w-3.5 flex-shrink-0" aria-hidden />}
      {cert.name}
      {cert.expected && <span className="opacity-90">— {cert.expected}</span>}
    </span>
  )
}

function CertSubsection({ title, certs }: { title: string; certs: Certification[] }) {
  if (certs.length === 0) return null
  return (
    <div className="space-y-3">
      <Typography variant="body-sm" className="font-semibold text-foreground uppercase tracking-wide text-xs">
        {title}
      </Typography>
      <div className="flex flex-col gap-2 pl-6">
        {certs.map((cert, index) => (
          <CertItem key={`${cert.category}-${index}`} cert={cert} />
        ))}
      </div>
    </div>
  )
}

export function CertificationsSection() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Card className="border-border/50 hover:border-primary/30 transition-colors">
      <CardHeader className="pb-0 border-b-0">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            setIsOpen(!isOpen)
          }}
          className="w-full flex items-center justify-between gap-3 pb-4 border-b border-border/30 hover:opacity-70 transition-opacity group cursor-pointer"
        >
          <CardTitle className="text-lg font-display flex items-center gap-2 group-hover:text-primary transition-colors pointer-events-none">
            <span className="h-1 w-1 rounded-full bg-primary" />
            Certifications
          </CardTitle>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground pointer-events-none" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground pointer-events-none" />
          )}
        </button>
      </CardHeader>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <CardContent className="pt-6">
              <div className="space-y-6">
                <CertSubsection title="Cloud Certifications" certs={cloudCerts} />
                <div className="space-y-3">
                  <Typography variant="body-sm" className="font-semibold text-foreground uppercase tracking-wide text-xs">
                    {technicalValidation.label}
                  </Typography>
                  <div className="flex flex-wrap gap-2 pl-6 items-center">
                    {technicalValidation.pills.map((pill) => {
                      const Icon = hackerRankPillIcons[pill]
                      return (
                        <span
                          key={pill}
                          className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/30 px-2.5 py-1 text-xs text-muted-foreground"
                        >
                          {Icon && <Icon className="h-3.5 w-3.5 flex-shrink-0" aria-hidden />}
                          {pill}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
