import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cover Letter — Solutions Architect, Coinbase | Karol Buczek",
  description: "Cover letter for Solutions Architect role at Coinbase.",
}

export default function CoinbaseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
