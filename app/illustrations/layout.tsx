import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Illustrations | Karol Buczek",
  description: "A collection of animated illustrations used throughout the site.",
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

export default function IllustrationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

