"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Section } from "@/components/Section"
import { PageHero } from "@/components/sections/PageHero"
import { Typography } from "@/components/typography"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SystemNodes } from "@/components/illustrations"
import { Lock, Copy, Check, ChevronDown, ChevronRight, ArrowLeft, Search } from "lucide-react"
import solutionArchitectData from "@/job-search/solution-architect.json"

const PASSWORD = "zbigniew"
const STORAGE_KEY = "job_search_page_authenticated"

type MatchFilter = "all" | "match" | "partial" | "gap"

interface ItemWithMatch {
  label: string
  description?: string
  frequency?: number
  match?: "true" | "partial" | "false"
  category?: string
  note?: string
  [key: string]: unknown
}

interface ResponsibilityItem extends ItemWithMatch {
  description: string
  frequency: number
  match: "true" | "partial" | "false"
  category: string
}

interface ResumeBullet {
  label: string
  bulletTemplate: string
  category: string
  targetRole: string
  match: boolean
  note?: string
}

interface GapItem {
  label: string
  description: string
  gapLevel: string
  frequency: number
  match: boolean | "partial"
  recommendation: string
}

interface QualificationItem {
  label: string
  description: string
  frequency: number
  match: boolean | "partial"
  type: string
  note?: string
}

const DATA = solutionArchitectData as unknown as {
  metadata: {
    totalListingsAnalyzed: number
    salaryRangeObserved: { floor: string; ceiling: string; medianFloor: string; medianCeiling: string }
    sourcesUsed: string[]
    dateCollected: string
    industriesCovered: string[]
  }
  responsibilities: Record<string, ResponsibilityItem[]>
  skillsAndKeywords: Record<string, ItemWithMatch[]>
  qualificationsAndCerts: QualificationItem[]
  resumeBullets: ResumeBullet[]
  gapAnalysis: GapItem[]
}

function matchPasses(
  item: { match?: "true" | "partial" | "false" | boolean },
  filter: MatchFilter
): boolean {
  if (filter === "all") return true
  const m = item.match
  if (filter === "match") return m === "true" || m === true
  if (filter === "partial") return m === "partial"
  if (filter === "gap") return m === "false" || m === false
  return true
}

function MatchBadge({ match }: { match?: "true" | "partial" | "false" | boolean }) {
  const m =
    match === "true" || match === true ? "match" : match === "partial" ? "partial" : "gap"
  const label = m === "match" ? "Match" : m === "partial" ? "Partial" : "Gap"
  const className =
    m === "match"
      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-xs font-medium px-2 py-0.5 rounded"
      : m === "partial"
        ? "bg-amber-500/15 text-amber-700 dark:text-amber-400 text-xs font-medium px-2 py-0.5 rounded"
        : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs font-medium px-2 py-0.5 rounded"
  return <span className={className}>{label}</span>
}

export default function SolutionArchitectPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isChecking, setIsChecking] = useState(true)
  const [matchFilter, setMatchFilter] = useState<MatchFilter>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    metadata: true,
    responsibilities: true,
    skills: true,
    qualifications: false,
    resumeBullets: true,
    gapAnalysis: true,
  })
  const [copiedBulletId, setCopiedBulletId] = useState<string | null>(null)

  useEffect(() => {
    const authStatus = localStorage.getItem(STORAGE_KEY)
    if (authStatus === "true") setIsAuthenticated(true)
    setIsChecking(false)
  }, [])

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (password === PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem(STORAGE_KEY, "true")
    } else {
      setError("Incorrect password. Please try again.")
      setPassword("")
    }
  }

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const filterBySearch = (text: string) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return text.toLowerCase().includes(q)
  }

  const handleCopyBullet = async (template: string, id: string) => {
    try {
      await navigator.clipboard.writeText(template)
      setCopiedBulletId(id)
      setTimeout(() => setCopiedBulletId(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  if (isChecking) {
    return (
      <Section>
        <div className="flex items-center justify-center min-h-[400px]">
          <Typography variant="body" className="text-muted-foreground">
            Loading...
          </Typography>
        </div>
      </Section>
    )
  }

  if (!isAuthenticated) {
    return (
      <>
        <Section>
          <PageHero
            eyebrow="Job Search Tools"
            title="Solution Architect Research"
            description="Enter the password to access the solution architect market research and resume pack."
            illustration={<SystemNodes />}
          />
        </Section>
        <Section>
          <div className="max-w-md mx-auto">
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-lg font-display">Password Required</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <Input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                  {error && (
                    <Typography variant="body-sm" className="text-destructive mt-2">
                      {error}
                    </Typography>
                  )}
                  <Button type="submit" className="w-full">
                    Access
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </Section>
      </>
    )
  }

  const { metadata, responsibilities, skillsAndKeywords, qualificationsAndCerts, resumeBullets, gapAnalysis } =
    DATA

  return (
    <>
      <Section>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/job-search" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Job Search
              </Link>
            </Button>
          </div>
          <PageHero
            eyebrow="Job Search · Internal"
            title="Solution Architect Research Pack"
            description="Market research, responsibilities, skills, resume bullets, and gap analysis from 31 listings."
            illustration={<SystemNodes />}
          />
        </div>
      </Section>

      <Section className="pt-0">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Global filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search across all sections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {(["all", "match", "partial", "gap"] as const).map((f) => (
                <Button
                  key={f}
                  variant={matchFilter === f ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMatchFilter(f)}
                >
                  {f === "all" ? "All" : f === "match" ? "Match" : f === "partial" ? "Partial" : "Gap"}
                </Button>
              ))}
            </div>
          </div>

          {/* Metadata */}
          <Card className="border-border/50">
            <CardHeader
              className="cursor-pointer select-none"
              onClick={() => toggleSection("metadata")}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-display flex items-center gap-2">
                  {openSections.metadata ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  Metadata
                </CardTitle>
              </div>
            </CardHeader>
            {openSections.metadata && (
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <Typography variant="body-sm" className="text-muted-foreground">
                      Listings analyzed: <strong className="text-foreground">{metadata.totalListingsAnalyzed}</strong>
                    </Typography>
                    <Typography variant="body-sm" className="text-muted-foreground">
                      Salary: {metadata.salaryRangeObserved.floor} – {metadata.salaryRangeObserved.ceiling} (median{" "}
                      {metadata.salaryRangeObserved.medianFloor}–{metadata.salaryRangeObserved.medianCeiling})
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body-sm" className="text-muted-foreground">
                      Date: {metadata.dateCollected}
                    </Typography>
                    <Typography variant="body-sm" className="text-muted-foreground">
                      Industries: {metadata.industriesCovered.slice(0, 5).join(", ")}…
                    </Typography>
                  </div>
                </div>
                <Typography variant="body-sm" className="text-muted-foreground mt-2">
                  Sources: {metadata.sourcesUsed.join(", ")}
                </Typography>
              </CardContent>
            )}
          </Card>

          {/* Responsibilities */}
          <Card className="border-border/50">
            <CardHeader
              className="cursor-pointer select-none"
              onClick={() => toggleSection("responsibilities")}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-display flex items-center gap-2">
                  {openSections.responsibilities ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  Responsibilities
                </CardTitle>
              </div>
            </CardHeader>
            {openSections.responsibilities && (
              <CardContent className="pt-0 space-y-4">
                {Object.entries(responsibilities).map(([category, items]) => {
                  const filtered = items.filter(
                    (i) => matchPasses(i, matchFilter) && filterBySearch(i.label + " " + (i.description ?? ""))
                  )
                  if (filtered.length === 0) return null
                  return (
                    <div key={category}>
                      <Typography variant="body-sm" className="font-medium text-muted-foreground capitalize mb-2">
                        {category.replace(/([A-Z])/g, " $1").trim()}
                      </Typography>
                      <ul className="space-y-2">
                        {filtered.map((item, idx) => (
                          <li
                            key={`${category}-${idx}`}
                            className="flex flex-col gap-1 rounded-lg border border-border/50 p-3 bg-muted/20"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="font-medium text-sm">{item.label}</span>
                              <MatchBadge match={item.match} />
                            </div>
                            <Typography variant="body-sm" className="text-muted-foreground">
                              {item.description}
                            </Typography>
                            {item.frequency != null && (
                              <Typography variant="body-sm" className="text-muted-foreground/80">
                                Frequency: {item.frequency} listings
                              </Typography>
                            )}
                            {"note" in item && item.note && (
                              <Typography variant="body-sm" className="text-amber-600 dark:text-amber-500 italic">
                                {item.note}
                              </Typography>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </CardContent>
            )}
          </Card>

          {/* Skills & Keywords */}
          <Card className="border-border/50">
            <CardHeader
              className="cursor-pointer select-none"
              onClick={() => toggleSection("skills")}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-display flex items-center gap-2">
                  {openSections.skills ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  Skills & Keywords
                </CardTitle>
              </div>
            </CardHeader>
            {openSections.skills && (
              <CardContent className="pt-0 space-y-4">
                {Object.entries(skillsAndKeywords).map(([category, items]) => {
                  const filtered = items.filter(
                    (i) =>
                      matchPasses(i, matchFilter) &&
                      filterBySearch(i.label + " " + (i.description ?? ""))
                  )
                  if (filtered.length === 0) return null
                  return (
                    <div key={category}>
                      <Typography variant="body-sm" className="font-medium text-muted-foreground capitalize mb-2">
                        {category.replace(/([A-Z])/g, " $1").trim()}
                      </Typography>
                      <ul className="space-y-2">
                        {filtered.map((item, idx) => (
                          <li
                            key={`${category}-${idx}`}
                            className="flex flex-col gap-1 rounded-lg border border-border/50 p-3 bg-muted/20"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="font-medium text-sm">{item.label}</span>
                              <MatchBadge match={item.match} />
                            </div>
                            {item.description && (
                              <Typography variant="body-sm" className="text-muted-foreground">
                                {item.description}
                              </Typography>
                            )}
                            {item.frequency != null && (
                              <Typography variant="body-sm" className="text-muted-foreground/80">
                                Frequency: {item.frequency} listings
                              </Typography>
                            )}
                            {"note" in item && item.note && (
                              <Typography variant="body-sm" className="text-amber-600 dark:text-amber-500 italic">
                                {item.note}
                              </Typography>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </CardContent>
            )}
          </Card>

          {/* Qualifications & Certs */}
          <Card className="border-border/50">
            <CardHeader
              className="cursor-pointer select-none"
              onClick={() => toggleSection("qualifications")}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-display flex items-center gap-2">
                  {openSections.qualifications ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  Qualifications & Certifications
                </CardTitle>
              </div>
            </CardHeader>
            {openSections.qualifications && (
              <CardContent className="pt-0">
                <ul className="space-y-2">
                  {qualificationsAndCerts
                    .filter(
                      (i) =>
                        matchPasses(
                          { match: i.match === true ? "true" : i.match === "partial" ? "partial" : "false" },
                          matchFilter
                        ) && filterBySearch(i.label + " " + i.description)
                    )
                    .map((item, idx) => (
                      <li
                        key={idx}
                        className="flex flex-col gap-1 rounded-lg border border-border/50 p-3 bg-muted/20"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-medium text-sm">{item.label}</span>
                          <MatchBadge
                            match={
                              item.match === true ? "true" : item.match === "partial" ? "partial" : "false"
                            }
                          />
                        </div>
                        <Typography variant="body-sm" className="text-muted-foreground">
                          {item.description}
                        </Typography>
                        <Typography variant="body-sm" className="text-muted-foreground/80">
                          Frequency: {item.frequency} · Type: {item.type}
                        </Typography>
                        {item.note && (
                          <Typography variant="body-sm" className="text-amber-600 dark:text-amber-500 italic">
                            {item.note}
                          </Typography>
                        )}
                      </li>
                    ))}
                </ul>
              </CardContent>
            )}
          </Card>

          {/* Resume Bullets */}
          <Card className="border-border/50">
            <CardHeader
              className="cursor-pointer select-none"
              onClick={() => toggleSection("resumeBullets")}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-display flex items-center gap-2">
                  {openSections.resumeBullets ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  Resume Bullets
                </CardTitle>
              </div>
            </CardHeader>
            {openSections.resumeBullets && (
              <CardContent className="pt-0">
                <ul className="space-y-3">
                  {resumeBullets
                    .filter(
                      (i) =>
                        (matchFilter === "all" ||
                          (matchFilter === "match" && i.match) ||
                          (matchFilter === "gap" && !i.match) ||
                          (matchFilter === "partial" && !i.match)) &&
                        filterBySearch(i.label + " " + i.bulletTemplate)
                    )
                    .map((item, idx) => {
                      const id = `bullet-${idx}`
                      return (
                        <li
                          key={id}
                          className="flex flex-col gap-2 rounded-lg border border-border/50 p-3 bg-muted/20"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-medium text-sm">{item.label}</span>
                            <div className="flex items-center gap-2">
                              <MatchBadge match={item.match ? "true" : "false"} />
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8"
                                onClick={() => handleCopyBullet(item.bulletTemplate, id)}
                              >
                                {copiedBulletId === id ? (
                                  <Check className="h-4 w-4 text-emerald-600" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                          <Typography variant="body-sm" className="text-muted-foreground font-mono whitespace-pre-wrap">
                            {item.bulletTemplate}
                          </Typography>
                          <Typography variant="body-sm" className="text-muted-foreground/80">
                            {item.targetRole} · {item.category}
                          </Typography>
                          {item.note && (
                            <Typography variant="body-sm" className="text-amber-600 dark:text-amber-500 italic">
                              {item.note}
                            </Typography>
                          )}
                        </li>
                      )
                    })}
                </ul>
              </CardContent>
            )}
          </Card>

          {/* Gap Analysis */}
          <Card className="border-border/50">
            <CardHeader
              className="cursor-pointer select-none"
              onClick={() => toggleSection("gapAnalysis")}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-display flex items-center gap-2">
                  {openSections.gapAnalysis ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  Gap Analysis
                </CardTitle>
              </div>
            </CardHeader>
            {openSections.gapAnalysis && (
              <CardContent className="pt-0">
                <ul className="space-y-3">
                  {gapAnalysis
                    .filter(
                      (i) =>
                        filterBySearch(i.label + " " + i.description + " " + i.recommendation) &&
                        (matchFilter === "all" ||
                          (matchFilter === "gap" && !i.match) ||
                          (matchFilter === "partial" && i.match === "partial") ||
                          (matchFilter === "match" && i.match === true))
                    )
                    .map((item, idx) => (
                      <li
                        key={idx}
                        className="flex flex-col gap-2 rounded-lg border border-border/50 p-3 bg-muted/20"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-medium text-sm">{item.label}</span>
                          <span
                            className={`text-xs font-medium px-2 py-0.5 rounded ${
                              item.gapLevel === "high"
                                ? "bg-red-500/15 text-red-700 dark:text-red-400"
                                : item.gapLevel === "medium"
                                  ? "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                                  : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                            }`}
                          >
                            {item.gapLevel}
                          </span>
                        </div>
                        <Typography variant="body-sm" className="text-muted-foreground">
                          {item.description}
                        </Typography>
                        <Typography variant="body-sm" className="text-primary font-medium">
                          Recommendation: {item.recommendation}
                        </Typography>
                      </li>
                    ))}
                </ul>
              </CardContent>
            )}
          </Card>
        </div>
      </Section>
    </>
  )
}
