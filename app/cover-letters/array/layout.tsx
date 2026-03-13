import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cover Letter — Array | Karol Buczek",
  description: "Cover letter for Strategic Sales Engineering / Solutions Architecture role at Array.",
}

export default function ArrayLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
