"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

/** Pages that already render a full-bleed CTA above the footer */
const PAGES_WITH_FULL_CTA = new Set(["/", "/portfolio"])

export function Footer() {
  const pathname = usePathname()
  const showCtaBlock = !PAGES_WITH_FULL_CTA.has(pathname)

  return (
    <footer className="kb-section-accent relative py-12">
      <div className="kb-content-rail flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <div className="flex flex-col items-center gap-4 sm:items-start">
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <div className="relative h-8 w-8 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Karol Buczek"
                fill
                className="object-contain brightness-0 invert"
              />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-wide text-slot-surface">
                KAROL BUCZEK
              </div>
              <div className="text-xs text-slot-surface/70">
                Full-Stack Engineer · Solutions Architect
              </div>
            </div>
          </Link>
          {showCtaBlock && (
            <div className="space-y-2">
              <div className="text-lg font-semibold text-slot-surface">
                Want to talk about a role or a project?
              </div>
              <div className="text-sm text-slot-surface/70">
                Let&apos;s connect.
              </div>
            </div>
          )}
        </div>
        {showCtaBlock && (
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <Button asChild variant="inverse">
              <Link href="/contact">Get in touch</Link>
            </Button>
            <div className="flex flex-col items-center gap-2 text-xs text-slot-surface/70 sm:items-start">
              <span>
                Or connect on:{" "}
                <a
                  href="https://www.linkedin.com/in/karolbuczek/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slot-surface underline decoration-slot-surface decoration-2 underline-offset-4 transition-colors hover:text-slot-surface/90"
                >
                  LinkedIn
                </a>
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="kb-content-rail mt-8 border-t border-slot-surface/20 pt-6 text-center text-xs text-slot-surface/70 sm:text-left">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Karol Buczek. All rights reserved.</p>
          <p className="text-slot-surface/65">
            View my{" "}
            <a
              href="https://tallkarol.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-colors hover:text-slot-surface"
            >
              consulting brand
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
