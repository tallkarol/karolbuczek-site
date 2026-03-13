import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cover Letter — ServiceTitan (Solutions Engineer) | Karol Buczek",
  description: "Cover letter for Solutions Engineer role at ServiceTitan.",
}

export default function ServiceTitanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
