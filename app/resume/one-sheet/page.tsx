"use client"

import Image from "next/image"
import Link from "next/link"
import { FileText } from "lucide-react"

const oneSheetVariants = [
  { slug: "solution-architect", role: "Solutions Architect", description: "Cloud infrastructure, data pipelines, AI-enabled automation" },
  { slug: "solution-integration-engineer", role: "Solution / Integration Engineer", description: "API integrations, CRM & martech systems, internal tooling" },
]

export default function OneSheetIndexPage() {
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

        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-6">Resume One-Sheets</h2>
        <p className="text-sm text-muted-foreground mb-6">Print-ready one-page resumes. Add <code className="text-xs bg-muted px-1.5 py-0.5 rounded">?print=true</code> to the URL to auto-print.</p>
        <ul className="space-y-4">
          {oneSheetVariants.map(({ slug, role, description }) => (
            <li key={slug}>
              <Link
                href={`/resume/one-sheet/${slug}`}
                className="flex items-center gap-3 p-4 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/40 hover:border-primary/30 transition-colors group"
              >
                <FileText className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                <div>
                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{role}</span>
                  <p className="text-muted-foreground text-sm mt-1">{description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
