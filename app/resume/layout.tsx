import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resume | Karol Buczek",
  description: "Interactive resume - explore my experience, skills, and projects.",
}

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

