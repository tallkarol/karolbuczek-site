"use client"

import { useState, useEffect } from "react"
import { Section } from "@/components/Section"
import { PageHero } from "@/components/sections/PageHero"
import { Typography } from "@/components/typography"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SystemNodes } from "@/components/illustrations"
import Link from "next/link"
import { ArrowRight, Lock, FileText } from "lucide-react"
import { getAllCoverLetters } from "@/lib/cover-letters"

const PASSWORD = "zbigniew"
const STORAGE_KEY = "cover_letters_page_authenticated"

export default function CoverLettersPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isChecking, setIsChecking] = useState(true)
  const coverLetters = getAllCoverLetters()

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
            eyebrow="Cover Letters"
            title="Access Cover Letters"
            description="Enter the password to view all cover letter pages."
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
                    Access Cover Letters
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
          eyebrow="Cover Letters"
          title="All Cover Letter Pages"
          description="Quick access to all cover letter pages for sharing with potential employers. Each page is optimized for PDF export."
          illustration={<SystemNodes />}
        />
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2">
            {coverLetters.map((coverLetter) => (
              <Card
                key={coverLetter.id}
                className="border-border/50 hover:border-primary/30 transition-colors group flex flex-col h-full"
              >
                <CardHeader className="flex-shrink-0">
                  <CardTitle className="text-lg font-display group-hover:text-primary transition-colors min-h-[3rem] flex items-start">
                    <Link 
                      href={`/cover-letters/${coverLetter.id}`}
                      className="hover:text-primary transition-colors"
                    >
                      {coverLetter.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-1 space-y-4">
                  <div className="space-y-2">
                    <Typography variant="body-sm" className="text-muted-foreground">
                      <span className="font-semibold">Company:</span> {coverLetter.company}
                    </Typography>
                    {coverLetter.recipient && (
                      <Typography variant="body-sm" className="text-muted-foreground">
                        <span className="font-semibold">Recipient:</span> {coverLetter.recipient}
                      </Typography>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 mt-auto pt-2">
                    <Button asChild variant="outline" className="w-full group/button">
                      <Link href={`/cover-letters/${coverLetter.id}`}>
                        View Cover Letter
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full group/button">
                      <Link href={`/cover-letters/${coverLetter.id}?print=true`}>
                        <FileText className="mr-2 h-4 w-4" />
                        Export as PDF
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}


