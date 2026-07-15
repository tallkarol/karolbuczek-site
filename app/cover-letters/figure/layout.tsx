import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cover Letter — Solutions Engineer, Figure | Karol Buczek",
  description: "Cover letter for Solutions Engineer role at Figure.",
}

export default function FigureLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
