import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { LayoutShell } from "@/components/layout/LayoutShell"
import { ThemeProvider } from "@/components/ThemeProvider"
import { StructuredData } from "@/components/seo/StructuredData"

const comfortaa = localFont({
  src: [
    { path: '../public/fonts/comfortaa/regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/comfortaa/bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-comfortaa',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL("https://karolbuczek.com"),
  title: "Karol Buczek | Full-Stack Engineer · Solutions Architect",
  description: "Full-stack engineer and solutions architect — custom web applications, enterprise WordPress, and systems integration. Seven years of hands-on delivery for SMB, mid-market, and enterprise clients.",
  icons: { icon: '/character/monogram-comfortaa.svg' },
  openGraph: {
    title: "Karol Buczek | Full-Stack Engineer · Solutions Architect",
    description: "Full-stack engineer and solutions architect — custom web applications, enterprise WordPress, and systems integration. Seven years of hands-on delivery for SMB, mid-market, and enterprise clients.",
    url: "https://karolbuczek.com",
    siteName: "Karol Buczek",
    images: [
      {
        url: "/logo-square.png",
        width: 512,
        height: 512,
        alt: "Karol Buczek - Solutions Architect",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karol Buczek | Full-Stack Engineer · Solutions Architect",
    description: "Full-stack engineer and solutions architect — custom web applications, enterprise WordPress, and systems integration. Seven years of hands-on delivery for SMB, mid-market, and enterprise clients.",
    images: ["/logo-square.png"],
  },
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Karol Buczek",
  jobTitle: "Solutions Architect",
  description: "Solutions architect building internal tools, automation pipelines, and integrations. Specializing in WordPress, React, APIs, MarTech systems, and full-stack development.",
  url: "https://karolbuczek.com",
  sameAs: [
    "https://www.linkedin.com/in/karolbuczek",
  ],
  knowsAbout: [
    "Solutions Architecture",
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
  name: "Karol Buczek - Solutions Architecture",
  description: "Solutions architecture, full-stack development, MarTech automation, and API integration services.",
  provider: {
    "@type": "Person",
    name: "Karol Buczek",
  },
  areaServed: "Worldwide",
  serviceType: [
    "Solutions Architecture",
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
  description: "Solutions architect building internal tools, automation pipelines, and integrations.",
  url: "https://karolbuczek.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://karolbuczek.com/portfolio?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={comfortaa.variable}>
      <body>
        {/* Arm scroll reveals before first paint — only when JS is on AND motion
            is allowed. No-JS / reduced-motion users keep content visible (no flash). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('js-reveal')}}catch(e){}",
          }}
        />
        {/* Capture first-touch UTMs before in-app navigation; queue events until tk-collect.js loads. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{!function(){var P=new URLSearchParams(location.search),K=['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','gbraid','wbraid','msclkid','fbclid','li_fat_id'],t={landing_page:location.pathname+location.search,referrer:document.referrer||'',at:Date.now()},h=0;K.forEach(function(k){var v=P.get(k);if(v){t[k]=v.slice(0,200);h=1}});var c=localStorage.getItem('tk_cid');if(!c||c.indexOf('.')<0)localStorage.setItem('tk_cid',Math.floor(1e9+Math.random()*9e9)+'.'+Math.floor(Date.now()/1e3));var f=localStorage.getItem('tk_first'),o=f&&JSON.parse(f);if(!o||!o.at||Date.now()-o.at>7776e6)localStorage.setItem('tk_first',JSON.stringify(t));else if(h&&!o.utm_source&&!o.gclid)localStorage.setItem('tk_first',JSON.stringify(t));if(h||!sessionStorage.getItem('tk_last'))sessionStorage.setItem('tk_last',JSON.stringify(t));window.tk=window.tk||{q:[],track:function(n,p){this.q.push([n,p])}}}()}catch(e){}",
          }}
        />
        <script src="/tk-collect.js" defer />
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

