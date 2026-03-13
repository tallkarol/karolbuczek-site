import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cover Letter — Spotnana | Karol Buczek",
  description: "Cover letter for Solutions Architect role at Spotnana.",
}

export default function SpotnanaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
