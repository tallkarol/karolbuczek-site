import type { Metadata } from "next"
import { PageHero } from "@/components/sections/PageHero"
import { ContactIllustration } from "@/components/illustrations"
import { ContactConfigurator } from "@/components/contact/ContactConfigurator"
import { Section } from "@/components/Section"

export const metadata: Metadata = {
  title: "Contact | Karol Buczek - Get In Touch",
  description: "Contact Karol Buczek for engineering roles or consulting projects. Discuss web systems, MarTech, automation, or full-stack development opportunities.",
  openGraph: {
    title: "Contact | Karol Buczek - Get In Touch",
    description: "Contact Karol Buczek for engineering roles or consulting projects. Discuss web systems, MarTech, automation, or full-stack development opportunities.",
    url: "https://karolbuczek.com/contact",
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

export default function ContactPage() {
  return (
    <>
      <Section>
        <PageHero
          eyebrow="Get In Touch"
          title="Let's talk about a role or project"
          description="This quick configurator helps me understand what you're looking for before we connect."
          illustration={<ContactIllustration />}
        />
      </Section>

      <Section>
        <ContactConfigurator />
      </Section>
    </>
  )
}

