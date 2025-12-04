import type { Metadata } from "next"
import { Inter_Tight, Plus_Jakarta_Sans, Inter } from "next/font/google"
import "./globals.css"
import { LayoutShell } from "@/components/layout/LayoutShell"
import { ThemeProvider } from "@/components/ThemeProvider"

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Karol Buczek | Web Systems Engineer",
  description: "Systems-oriented web engineer specializing in WordPress, MarTech, backend scripting, and internal tools. I build end-to-end solutions that solve real business problems.",
  openGraph: {
    title: "Karol Buczek | Web Systems Engineer",
    description: "Systems-oriented web engineer specializing in WordPress, MarTech, backend scripting, and internal tools. I build end-to-end solutions that solve real business problems.",
    url: "https://karolbuczek.com",
    siteName: "Karol Buczek",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karol Buczek | Web Systems Engineer",
    description: "Systems-oriented web engineer specializing in WordPress, MarTech, backend scripting, and internal tools. I build end-to-end solutions that solve real business problems.",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutShell>{children}</LayoutShell>
        </ThemeProvider>
      </body>
    </html>
  )
}

