import type { Metadata } from "next"
import { Inter_Tight, Plus_Jakarta_Sans, Inter } from "next/font/google"
import "./globals.css"
import { LayoutShell } from "@/components/layout/LayoutShell"
import { ThemeProvider } from "@/components/ThemeProvider"
import { StructuredData } from "@/components/seo/StructuredData"

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
  preload: true,
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  preload: false,
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
})

export const metadata: Metadata = {
  title: "Karol Buczek | Web Systems Engineer • Full-Stack Developer • MarTech & Automation",
  description: "Web systems engineer building internal tools, automation pipelines, and integrations. Specializing in WordPress, React, APIs, MarTech systems, and full-stack development.",
  icons: {
    icon: [
      { url: "/logo-square.png", sizes: "64x64", type: "image/png" },
      { url: "/logo-square.png", sizes: "32x32", type: "image/png" },
      { url: "/logo-square.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/logo-square.png",
  },
  openGraph: {
    title: "Karol Buczek | Web Systems Engineer • Full-Stack Developer • MarTech & Automation",
    description: "Web systems engineer building internal tools, automation pipelines, and integrations. Specializing in WordPress, React, APIs, MarTech systems, and full-stack development.",
    url: "https://karolbuczek.com",
    siteName: "Karol Buczek",
    images: [
      {
        url: "/logo-square.png",
        width: 512,
        height: 512,
        alt: "Karol Buczek - Web Systems Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karol Buczek | Web Systems Engineer • Full-Stack Developer • MarTech & Automation",
    description: "Web systems engineer building internal tools, automation pipelines, and integrations. Specializing in WordPress, React, APIs, MarTech systems, and full-stack development.",
    images: ["/logo-square.png"],
  },
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Karol Buczek",
  jobTitle: "Web Systems Engineer",
  description: "Web systems engineer building internal tools, automation pipelines, and integrations. Specializing in WordPress, React, APIs, MarTech systems, and full-stack development.",
  url: "https://karolbuczek.com",
  sameAs: [
    "https://www.linkedin.com/in/karolbuczek",
  ],
  knowsAbout: [
    "Web Systems Engineering",
    "Full-Stack Development",
    "WordPress Development",
    "React",
    "MarTech",
    "Marketing Technology",
    "API Integration",
    "Automation",
    "PHP",
    "JavaScript",
    "TypeScript",
    "SQL",
    "AWS",
  ],
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "Case Western Reserve University",
    },
    {
      "@type": "EducationalOrganization",
      name: "Miami University",
    },
  ],
}

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Karol Buczek - Web Systems Engineering",
  description: "Web systems engineering, full-stack development, MarTech automation, and API integration services.",
  provider: {
    "@type": "Person",
    name: "Karol Buczek",
  },
  areaServed: "Worldwide",
  serviceType: [
    "Web Systems Engineering",
    "Full-Stack Development",
    "MarTech Automation",
    "API Integration",
    "WordPress Development",
    "Internal Tools Development",
  ],
  url: "https://karolbuczek.com",
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Karol Buczek",
  description: "Web systems engineer building internal tools, automation pipelines, and integrations.",
  url: "https://karolbuczek.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://karolbuczek.com/case-studies?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${interTight.variable} ${plusJakarta.variable} ${inter.variable}`}>
      <body>
        <StructuredData data={personSchema} />
        <StructuredData data={professionalServiceSchema} />
        <StructuredData data={websiteSchema} />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          storageKey="theme"
        >
          <LayoutShell>{children}</LayoutShell>
        </ThemeProvider>
      </body>
    </html>
  )
}

