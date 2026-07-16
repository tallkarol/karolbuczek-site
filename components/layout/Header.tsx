"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  Moon,
  Sun,
  Menu,
  X,
  Download,
  Linkedin,
  User,
  FileText,
  Briefcase,
} from "lucide-react"
import { cn } from "@/lib/utils"

/** Routes whose opening surface is a brand hero (newsprint in light, inverse in dark) */
const HERO_ROUTES = new Set([
  "/",
  "/portfolio",
  "/contact",
  "/resume",
  "/illustrations",
  "/roles",
  "/job-search",
  "/martech-engineer",
  "/implementation-engineer",
  "/web-dev-wordpress",
  "/web-systems-engineer",
  "/business-solutions-manager",
  "/director-marketing-technology",
])

function isHeroRoute(pathname: string) {
  if (HERO_ROUTES.has(pathname)) return true
  if (pathname.startsWith("/resume/")) return true
  if (pathname.startsWith("/job-search/")) return true
  return false
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  // Light-mode heroes are newsprint — only use the dark nav in dark theme.
  const darkNav = isHeroRoute(pathname) && resolvedTheme === "dark"

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b backdrop-blur-sm transition-colors",
          darkNav
            ? "border-slot-background/10 bg-slot-inverse/90"
            : "border-border bg-background/90"
        )}
      >
        <nav className="kb-content-rail flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="relative h-8 w-8 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Karol Buczek"
                fill
                className={cn(
                  "object-contain",
                  darkNav
                    ? "brightness-0 invert"
                    : "brightness-0 opacity-90 dark:brightness-0 dark:invert dark:opacity-100"
                )}
                priority
              />
            </div>
            <div className="leading-tight hidden sm:block">
              <div
                className={cn(
                  "text-sm font-semibold tracking-wide",
                  darkNav ? "text-slot-background" : "text-foreground"
                )}
              >
                KAROL BUCZEK
              </div>
              <div
                className={cn(
                  "text-xs",
                  darkNav
                    ? "text-slot-background/70"
                    : "text-text-tertiary"
                )}
              >
                Full-Stack Engineer · Solutions Architect
              </div>
            </div>
          </Link>

          <div
            className={cn(
              "hidden items-center gap-6 text-xs font-medium sm:flex",
              darkNav
                ? "text-slot-background/80"
                : "text-foreground/80"
            )}
          >
            {[
              { href: "/about", label: "About" },
              { href: "/resume", label: "Resume" },
              { href: "/portfolio", label: "Portfolio" },
            ].map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative group uppercase tracking-[0.05em] transition-colors",
                    darkNav
                      ? "hover:text-slot-background"
                      : "hover:text-foreground",
                    active && (darkNav ? "text-slot-background" : "text-foreground")
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 transition-all duration-300",
                      active ? "w-full bg-accent" : "w-0 group-hover:w-full",
                      !active && (darkNav ? "bg-slot-background/60" : "bg-accent/70")
                    )}
                  />
                </Link>
              )
            })}
            <Button
              asChild
              size="sm"
              variant={darkNav ? "inverse" : "default"}
              className="px-4 text-xs uppercase tracking-[0.05em]"
            >
              <Link href="/contact">Hire Me</Link>
            </Button>
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className={cn(
                  "rounded-lg p-2 transition-colors",
                  darkNav
                    ? "text-slot-background/80 hover:bg-slot-background/10 hover:text-slot-background"
                    : "text-foreground/80 hover:bg-foreground/10 hover:text-foreground"
                )}
                aria-label="Toggle theme"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 sm:hidden">
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className={cn(
                  "rounded-lg p-2 transition-colors",
                  darkNav
                    ? "text-slot-background/80 hover:bg-slot-background/10"
                    : "text-foreground/80 hover:bg-foreground/10"
                )}
                aria-label="Toggle theme"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={cn(
                "rounded-lg p-2 transition-colors",
                darkNav
                  ? "text-slot-background/80 hover:bg-slot-background/10"
                  : "text-foreground/80 hover:bg-foreground/10"
              )}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background sm:hidden">
          <div className="flex h-full flex-col">
            <div className="relative flex items-center justify-center border-b border-border px-5 py-5">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center"
                aria-label="Karol Buczek — Home"
              >
                <div className="relative h-14 w-14 flex-shrink-0">
                  <Image
                    src="/logo.png"
                    alt=""
                    fill
                    className="object-contain brightness-0 opacity-90 dark:brightness-0 dark:invert"
                  />
                </div>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute right-5 top-1/2 -translate-y-1/2 rounded-lg p-2 text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 py-6">
              {[
                { href: "/about", label: "About", icon: User },
                { href: "/resume", label: "Resume", icon: FileText },
                { href: "/portfolio", label: "Portfolio", icon: Briefcase },
              ].map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "font-ui flex items-center gap-[17px] border-b border-border/60 py-7 pl-5 text-base font-semibold uppercase tracking-[0.08em] transition-colors",
                      active
                        ? "text-foreground"
                        : "text-foreground/75 hover:text-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0 opacity-80" aria-hidden />
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            <div className="mt-auto space-y-3 border-t border-border px-5 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <Button asChild variant="outline" size="lg" className="w-full font-ui">
                <a
                  href="/resume-karol-buczek.pdf"
                  download="resume-karol-buczek.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full font-ui">
                <a
                  href="https://www.linkedin.com/in/karolbuczek/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Linkedin className="h-4 w-4" />
                  View LinkedIn
                </a>
              </Button>
              <Button asChild size="lg" className="w-full font-ui uppercase tracking-[0.05em]">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  Hire Me
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
