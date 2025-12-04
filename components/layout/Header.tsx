"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <header className="border-b border-border/50 bg-background/90 backdrop-blur-sm sticky top-0 z-40">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 sm:px-6 lg:px-8">
          {/* Logo + name */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-wide text-foreground">
                KAROL BUCZEK
              </div>
              <div className="text-xs text-muted-foreground">
                Web Systems Engineer
              </div>
            </div>
          </Link>

          {/* Desktop Nav links */}
          <div className="hidden items-center gap-6 text-xs font-medium text-muted-foreground sm:flex">
            <Link href="/resume" className="hover:text-primary transition-colors uppercase tracking-[0.05em] relative group">
              Resume
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="/case-studies" className="hover:text-primary transition-colors uppercase tracking-[0.05em] relative group">
              Case Studies
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors uppercase tracking-[0.05em] relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 sm:hidden">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background sm:hidden">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <span className="text-sm font-semibold">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-4 p-6">
              <Link
                href="/resume"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium hover:text-primary transition-colors"
              >
                Resume
              </Link>
              <Link
                href="/case-studies"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium hover:text-primary transition-colors"
              >
                Case Studies
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

