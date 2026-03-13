import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cover Letters | Karol Buczek - Print / PDF",
  description: "Cover letters for Solutions Architect roles. Karol Buczek - Principal Solutions Architect.",
}

export default function CoverLettersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
