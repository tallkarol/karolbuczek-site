import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cover Letter — Shipium | Karol Buczek",
  description: "Cover letter for Senior Solutions Engineer role at Shipium.",
}

export default function ShipiumLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
