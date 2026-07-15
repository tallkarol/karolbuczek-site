import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cover Letter — Workato Integration Architect, Perficient | Karol Buczek",
  description: "Cover letter for Workato Integration Architect role at Perficient.",
}

export default function PerficientLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
