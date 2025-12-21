"use client"

import { useState, useEffect } from "react"
import { Section } from "@/components/Section"
import { PageHero } from "@/components/sections/PageHero"
import { Typography } from "@/components/typography"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SystemNodes } from "@/components/illustrations"
import { Lock, Copy, Check, ExternalLink } from "lucide-react"

const PASSWORD = "zbigniew"
const STORAGE_KEY = "job_search_page_authenticated"

const searchQueries = [
  {
    id: "master",
    title: "⭐ MASTER BOOLEAN SEARCH — CORE ROLES",
    subtitle: "Your main pipeline",
    description: "This will surface jobs nearly identical to your resume.",
    query: `("web systems engineer" OR "implementation engineer" OR "integration engineer" OR 
"solutions engineer" OR "platform engineer" OR "web application engineer" OR 
"data integration engineer" OR "automation engineer")
AND (api OR integration OR workflow OR "internal tools" OR "data pipeline" OR wordpress OR php OR react OR sql)
NOT ("devops" OR "kubernetes" OR "SRE" OR "machine learning" OR "robotics" OR "manufacturing" OR "frontend only" OR "sales engineer")`,
    linkedinUrl: "https://www.linkedin.com/jobs/search-results/?keywords=remote%20(%22web%20systems%20engineer%22%20OR%20%22implementation%20engineer%22%20OR%20%22integration%20engineer%22%20OR%20%20%22solutions%20engineer%22%20OR%20%22platform%20engineer%22%20OR%20%22web%20application%20engineer%22%20OR%20%20%22data%20integration%20engineer%22%20OR%20%22automation%20engineer%22)%20AND%20(api%20OR%20integration%20OR%20workflow%20OR%20%22internal%20tools%22%20OR%20%22data%20pipeline%22%20OR%20wordpress%20OR%20php%20OR%20react%20OR%20sql)%20NOT%20(%22devops%22%20OR%20%22kubernetes%22%20OR%20%22SRE%22%20OR%20%22machine%20learning%22%20OR%20%22robotics%22%20OR%20%22manufacturing%22%20OR%20%22frontend%20only%22%20OR%20%22sales%20engineer%22)",
  },
  {
    id: "variant1",
    title: "⭐ VARIANT 1 — API / ETL / PIPELINE FOCUSED",
    subtitle: "Backend workflow and internal platform engineering",
    description: "This specifically filters for backend workflow and internal platform engineering.",
    query: `("implementation engineer" OR "integration engineer" OR "data integration engineer" OR 
"platform engineer" OR "solutions engineer")
AND (API OR "REST" OR "data pipeline" OR ETL OR "workflow automation" OR SQL OR AWS)
NOT ("sales engineer" OR "ml" OR "robotics" OR "embedded" OR "manufacturing" OR "kubernetes")`,
    linkedinUrl: "https://www.linkedin.com/jobs/search-results/?keywords=(%22implementation%20engineer%22%20OR%20%22integration%20engineer%22%20OR%20%22data%20integration%20engineer%22%20OR%20%20%22platform%20engineer%22%20OR%20%22solutions%20engineer%22)%20AND%20(API%20OR%20%22REST%22%20OR%20%22data%20pipeline%22%20OR%20ETL%20OR%20%22workflow%20automation%22%20OR%20SQL%20OR%20AWS)%20NOT%20(%22sales%20engineer%22%20OR%20%22ml%22%20OR%20%22robotics%22%20OR%20%22embedded%22%20OR%20%22manufacturing%22%20OR%20%22kubernetes%22)%20remote",
  },
  {
    id: "variant2",
    title: "⭐ VARIANT 2 — INTERNAL TOOLS + PRODUCT ENGINEERING",
    subtitle: "Avoid LeetCode",
    description: "This finds roles that care about systems thinking, not pure CS fundamentals.",
    query: `("web systems engineer" OR "platform engineer" OR "solutions engineer" OR 
"web application engineer")
AND ("internal tools" OR "dashboard" OR "workflow" OR automation OR integrations)
NOT ("whiteboard" OR "leetcode" OR "algorithms" OR "low level" OR "c++" OR "kernel" OR "graphics")`,
    linkedinUrl: null, // No LinkedIn URL provided for this variant
  },
  {
    id: "variant3",
    title: "⭐ VARIANT 3 — WORDPRESS / WEBDEV SAFETY NET",
    subtitle: "Jobs you can get instantly when needed",
    description: "This will capture the jobs you can get instantly when needed.",
    query: `("wordpress engineer" OR "wordpress developer" OR "web developer")
AND (php OR wordpress OR woocommerce OR "full stack" OR react)
NOT ("intern" OR "junior" OR "entry level")`,
    linkedinUrl: "https://www.linkedin.com/jobs/search-results/?keywords=(%22wordpress%20engineer%22%20OR%20%22wordpress%20developer%22%20OR%20%22web%20developer%22)%20AND%20(php%20OR%20wordpress%20OR%20woocommerce%20OR%20%22full%20stack%22%20OR%20react)%20NOT%20(%22intern%22%20OR%20%22junior%22%20OR%20%22entry%20level%22)%20remote",
  },
  {
    id: "variant4",
    title: "⭐ VARIANT 4 — MARKETING SYSTEMS / MARTECH NICHES",
    subtitle: "Unique value prop",
    description: "This finds the unicorn positions where you immediately dominate.",
    query: `("martech engineer" OR "marketing systems engineer" OR "marketing automation" OR 
"growth engineer" OR "analytics engineer")
AND (UTM OR GTM OR attribution OR wordpress OR CRM OR automation OR "web analytics")
NOT ("SEO specialist" OR "copywriter" OR "PPC manager")`,
    linkedinUrl: "https://www.linkedin.com/jobs/search-results/?keywords=(%22martech%20engineer%22%20OR%20%22marketing%20systems%20engineer%22%20OR%20%22marketing%20automation%22%20OR%20%20%22growth%20engineer%22%20OR%20%22analytics%20engineer%22)%20AND%20(UTM%20OR%20GTM%20OR%20attribution%20OR%20wordpress%20OR%20CRM%20OR%20automation%20OR%20%22web%20analytics%22)%20NOT%20(%22SEO%20specialist%22%20OR%20%22copywriter%22%20OR%20%22PPC%20manager%22)%20remote",
  },
  {
    id: "variant5",
    title: "⭐ VARIANT 5 — FULL BROAD SEARCH FOR REMOTE ROLES",
    subtitle: "Remote positions",
    description: 'Paste into LinkedIn → enable "remote."',
    query: `("implementation engineer" OR "integration engineer" OR "solutions engineer" OR 
"platform engineer" OR "web systems engineer" OR "data integration engineer" OR 
"automation engineer" OR "web application engineer" OR "wordpress engineer")
AND (remote OR "work from home")
NOT ("government clearance" OR "onsite only")`,
    linkedinUrl: "https://www.linkedin.com/jobs/search-results/?keywords=(%22implementation%20engineer%22%20OR%20%22integration%20engineer%22%20OR%20%22solutions%20engineer%22%20OR%20%20%22platform%20engineer%22%20OR%20%22web%20systems%20engineer%22%20OR%20%22data%20integration%20engineer%22%20OR%20%20%22automation%20engineer%22%20OR%20%22web%20application%20engineer%22%20OR%20%22wordpress%20engineer%22)%20AND%20(remote%20OR%20%22work%20from%20home%22)%20NOT%20(%22government%20clearance%22%20OR%20%22onsite%20only%22)",
  },
]

export default function JobSearchPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isChecking, setIsChecking] = useState(true)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    // Check if already authenticated
    const authStatus = localStorage.getItem(STORAGE_KEY)
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
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

  const handleCopy = async (query: string, id: string) => {
    try {
      // Clean up the query (remove extra whitespace/newlines)
      const cleanedQuery = query.replace(/\n\s+/g, " ").trim()
      await navigator.clipboard.writeText(cleanedQuery)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
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
            title="LinkedIn Boolean Search Queries"
            description="Enter the password to access curated LinkedIn job search queries."
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
                  <div>
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
                  </div>
                  <Button type="submit" className="w-full">
                    Access Search Queries
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </Section>
      </>
    )
  }

  return (
    <>
      <Section>
        <PageHero
          eyebrow="Job Search Tools"
          title="LinkedIn Boolean Search Queries"
          description="Curated boolean search queries for finding relevant engineering roles. Copy and paste directly into LinkedIn Jobs."
          illustration={<SystemNodes />}
        />
      </Section>

      <Section>
        <div className="max-w-5xl mx-auto">
          <div className="space-y-6">
            {searchQueries.map((search) => (
              <Card
                key={search.id}
                className="border-border/50 hover:border-primary/30 transition-colors"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-display mb-1">
                        {search.title}
                      </CardTitle>
                      {search.subtitle && (
                        <Typography variant="body-sm" className="text-muted-foreground font-medium mb-2">
                          {search.subtitle}
                        </Typography>
                      )}
                      {search.description && (
                        <Typography variant="body-sm" className="text-muted-foreground">
                          {search.description}
                        </Typography>
                      )}
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      {search.linkedinUrl && (
                        <Button
                          asChild
                          variant="default"
                          size="sm"
                        >
                          <a
                            href={search.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            LinkedIn
                          </a>
                        </Button>
                      )}
                      <Button
                        onClick={() => handleCopy(search.query, search.id)}
                        variant="outline"
                        size="sm"
                      >
                        {copiedId === search.id ? (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                    <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed">
                      {search.query}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border/50">
            <Typography variant="body-sm" className="text-muted-foreground">
              <strong className="text-foreground">How to use:</strong> Copy any query above and paste it into the LinkedIn Jobs search bar. 
              For Variant 5, make sure to enable the "Remote" filter in LinkedIn's search options.
            </Typography>
          </div>
        </div>
      </Section>
    </>
  )
}

