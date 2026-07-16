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
        alt: "Karol Buczek - Solutions Architect",
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
      <div className="kb-hero-inverse w-full">
        <Section className="py-6 lg:py-8">
          <PageHero
            className="min-h-0 py-2 md:min-h-0 md:py-4"
            eyebrow="Get In Touch"
            title="Let's work together"
            description="This quick configurator helps me understand what you're looking for before we connect."
            illustration={<ContactIllustration priority />}
            illustrationClassName="max-w-[275px] aspect-[421/710] md:max-w-[350px]"
            columnGapClassName="gap-3 md:gap-4"
          />
        </Section>
      </div>

      <section className="kb-section-background w-full">
        <div className="kb-content-rail pb-10 pt-8 lg:pb-14 lg:pt-10">
          <div className="kb-surface-app rounded-2xl border border-navy-700/10 bg-slot-surface p-5 shadow-sm sm:p-6 md:p-8 dark:border-chiffon/10 dark:bg-navy-800">
            <ContactConfigurator />
          </div>
        </div>
      </section>
    </>
  )
}
