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
        <div className="kb-content-rail">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}

