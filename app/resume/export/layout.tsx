import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resume Export | Karol Buczek - PDF Resume Download",
  description: "One-page PDF resume export for Karol Buczek - Web Systems Engineer & Full-Stack Developer.",
  openGraph: {
    images: [
      {
        url: "/logo-square.png",
        width: 512,
        height: 512,
        alt: "Karol Buczek - Web Systems Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/logo-square.png"],
  },
}

export default function ExportLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-background">{children}</div>
}

