"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:items-start">
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-wide">
              KAROL BUCZEK
            </div>
            <div className="text-xs text-muted-foreground">
              Web Systems Engineer • WordPress & MarTech • Internal Tools & Automation
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-lg font-semibold">
              Want to talk about a role or a project?
            </div>
            <div className="text-sm text-muted-foreground">
              Let&apos;s connect and discuss how I can help.
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
          <Button asChild className="rounded-full">
            <Link href="/contact">Get in touch</Link>
          </Button>
          <div className="flex flex-col items-center gap-2 sm:items-start text-xs text-muted-foreground">
            <span>
              Or connect on:{" "}
              <a
                href="https://www.linkedin.com/in/karolbuczek/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors underline"
              >
                LinkedIn
              </a>
            </span>
          </div>
        </div>
      </div>
              <div className="mx-auto mt-8 max-w-7xl border-t border-border px-6 pt-6 text-center text-xs text-muted-foreground sm:px-6 sm:text-left lg:px-8">
                <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p>&copy; {new Date().getFullYear()} Karol Buczek. All rights reserved.</p>
                  <p className="text-muted-foreground/70">
                    View my{" "}
                    <a
                      href="https://tallkarol.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors underline underline-offset-2"
                    >
                      consulting brand
                    </a>
                  </p>
                </div>
              </div>
    </footer>
  )
}

