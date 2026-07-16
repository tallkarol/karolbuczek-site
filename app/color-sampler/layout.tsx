import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Color Sampler | Dev",
  robots: { index: false, follow: false },
}

/** Full-bleed sampler — no site header/footer (LayoutShell skips this route). */
export default function ColorSamplerLayout({ children }: { children: React.ReactNode }) {
  return children
}
