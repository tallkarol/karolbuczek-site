import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resume One-Sheet (Plain Text) | Karol Buczek - Print / PDF",
  description: "Plain-text one-page resume for non-design roles. Karol Buczek - Principal Solutions Architect.",
}

export default function PlainTextLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
