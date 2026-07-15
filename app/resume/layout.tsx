import type { Metadata } from "next"

const resumeDescription =
  "Interactive resume — Full-Stack Engineer and Solutions Architect with 7 years of hands-on delivery for SMB, mid-market, and enterprise clients."

export const metadata: Metadata = {
  title: "Resume | Karol Buczek — Full-Stack Engineer & Solutions Architect",
  description: resumeDescription,
  openGraph: {
    title: "Resume | Karol Buczek — Full-Stack Engineer & Solutions Architect",
    description: resumeDescription,
    url: "https://karolbuczek.com/resume",
    images: [
      {
        url: "/logo-square.png",
        width: 512,
        height: 512,
        alt: "Karol Buczek — Full-Stack Engineer & Solutions Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume | Karol Buczek — Full-Stack Engineer & Solutions Architect",
    description: resumeDescription,
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
