import { ReactNode } from "react"
import { Header } from "./Header"
import { Footer } from "./Footer"

interface PageLayoutProps {
  children: ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}

