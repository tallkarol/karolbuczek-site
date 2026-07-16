"use client"

import { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { Header } from "./Header"
import { Footer } from "./Footer"

interface LayoutShellProps {
  children: ReactNode
}

const STANDALONE_ROUTES = new Set(["/color-sampler"])

export function LayoutShell({ children }: LayoutShellProps) {
  const pathname = usePathname()

  if (STANDALONE_ROUTES.has(pathname)) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
