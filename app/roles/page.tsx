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
import { ArrowRight, Lock } from "lucide-react"

const PASSWORD = "zbigniew"
const STORAGE_KEY = "roles_page_authenticated"

const roles = [
  {
    title: "Implementation Engineer",
    route: "/implementation-engineer",
    description: "Integrating Web APIs, Systems, and Customer Needs",
  },
  {
    title: "MarTech Engineer / Marketing Systems Engineer",
    route: "/martech-engineer",
    description: "Building Marketing Technology Systems That Drive Growth",
  },
  {
    title: "Web Systems Engineer",
    route: "/web-systems-engineer",
    description: "Building Web Systems That Scale",
  },
  {
    title: "Web Developer / WordPress Engineer",
    route: "/web-dev-wordpress",
    description: "WordPress Development That Performs",
  },
]

export default function RolesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isChecking, setIsChecking] = useState(true)

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
            eyebrow="Role Landing Pages"
            title="Access Role Pages"
            description="Enter the password to view all role-specific landing pages."
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
                    Access Pages
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
          eyebrow="Role Landing Pages"
          title="All Role-Specific Pages"
          description="Quick access to all role-focused landing pages for sharing with recruiters and potential employers."
          illustration={<SystemNodes />}
        />
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2">
            {roles.map((role, index) => (
              <Card
                key={role.route}
                className="border-border/50 hover:border-primary/30 transition-colors group"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-display group-hover:text-primary transition-colors">
                    {role.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Typography variant="body-sm" className="text-muted-foreground">
                    {role.description}
                  </Typography>
                  <Button asChild variant="outline" className="w-full group/button">
                    <Link href={role.route}>
                      View Page
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}

