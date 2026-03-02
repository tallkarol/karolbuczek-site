import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resume One-Sheet | Karol Buczek - Print / PDF",
  description: "One-page resume summary for printing or PDF export. Karol Buczek - Principal Solutions Architect.",
}

export default function OneSheetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
