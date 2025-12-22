import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resume | Karol Buczek - Web Systems Engineer & Full-Stack Developer",
  description: "Interactive resume showcasing 10+ years of web systems engineering, full-stack development, MarTech automation, and API integration experience.",
  openGraph: {
    title: "Resume | Karol Buczek - Web Systems Engineer & Full-Stack Developer",
    description: "Interactive resume showcasing 10+ years of web systems engineering, full-stack development, MarTech automation, and API integration experience.",
    url: "https://karolbuczek.com/resume",
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

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

