import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cover Letters | Karol Buczek - Print / PDF",
  description: "Cover letters for Solutions Architect roles. Karol Buczek - Principal Solutions Architect.",
  robots: { index: false, follow: false },
}

export default function CoverLettersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
