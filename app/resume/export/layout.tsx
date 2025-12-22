import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resume Export | Karol Buczek",
  description: "One-page resume export.",
}

export default function ExportLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-background">{children}</div>
}

