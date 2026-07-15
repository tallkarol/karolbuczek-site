import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cover Letter — Solutions Engineer / Implementation, Atlan | Karol Buczek",
  description: "Cover letter for Solutions Engineer / Implementation role at Atlan.",
}

export default function AtlanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
