import type { Metadata } from "next"
import { PageHero } from "@/components/sections/PageHero"
import { ContactIllustration } from "@/components/illustrations"
import { ContactConfigurator } from "@/components/contact/ContactConfigurator"
import { Section } from "@/components/Section"

export const metadata: Metadata = {
  title: "Contact | Karol Buczek",
  description: "Get in touch to discuss a role or project. Let's talk about how I can help.",
  openGraph: {
    title: "Contact | Karol Buczek",
    description: "Get in touch to discuss a role or project. Let's talk about how I can help.",
    url: "https://karolbuczek.com/contact",
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

