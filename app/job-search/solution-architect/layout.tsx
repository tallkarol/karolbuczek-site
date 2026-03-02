import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Solution Architect Research | Job Search (Internal)",
  description: "Internal solution architect market research and resume pack.",
  robots: { index: false, follow: false },
}

export default function SolutionArchitectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
