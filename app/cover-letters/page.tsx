"use client"

import Image from "next/image"
import Link from "next/link"
import { FileText } from "lucide-react"

const coverLetters = [
  { slug: "coinbase", company: "Coinbase", role: "Solutions Architect" },
  { slug: "spotnana", company: "Spotnana", role: "Solutions Architect" },
  { slug: "five9", company: "Five9", role: "Automation Engineer – Professional Services" },
  { slug: "servicetitan", company: "ServiceTitan", role: "Solutions Engineer" },
  { slug: "shipium", company: "Shipium", role: "Senior Solutions Engineer" },
  { slug: "array", company: "Array", role: "Strategic Sales Engineering / Solutions Architecture" },
  { slug: "imanage", company: "iManage", role: "Solutions Engineer" },
]

export default function CoverLettersIndexPage() {
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "11pt", lineHeight: 1.5 }}>
      <div className="max-w-3xl mx-auto p-8">
        {/* Header */}
        <div className="mb-10 flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="Karol Buczek"
            width={48}
            height={48}
            className="flex-shrink-0 h-12 w-12 object-contain"
          />
          <div>
            <h1 className="text-xl font-bold text-foreground">Karol Buczek</h1>
            <p className="text-sm text-muted-foreground">Solutions Architect <span className="text-primary mx-1">|</span> Cloud Systems <span className="text-primary mx-1">|</span> Integrations <span className="text-primary mx-1">|</span> AI</p>
          </div>
        </div>

        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-6">Cover Letters</h2>
        <ul className="space-y-4">
          {coverLetters.map(({ slug, company, role }) => (
            <li key={slug}>
              <Link
                href={`/cover-letters/${slug}`}
                className="flex items-center gap-3 p-4 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/40 hover:border-primary/30 transition-colors group"
              >
                <FileText className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                <div>
                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{company}</span>
                  <span className="text-muted-foreground mx-2">—</span>
                  <span className="text-muted-foreground text-sm">{role}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
