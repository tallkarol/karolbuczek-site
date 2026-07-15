import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cover Letter — Integration Engineer / Solutions, Morpho | Karol Buczek",
  description: "Cover letter for Integration Engineer / Solutions role at Morpho.",
}

export default function MorphoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
