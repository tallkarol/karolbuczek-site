import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cover Letter — Automation Engineer, Five9 | Karol Buczek",
  description: "Cover letter for Automation Engineer - Professional Services role at Five9.",
}

export default function Five9Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
