import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Illustrations | Karol Buczek",
  description: "A collection of animated illustrations used throughout the site.",
}

export default function IllustrationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

