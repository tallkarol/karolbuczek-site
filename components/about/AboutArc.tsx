"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Typography } from "@/components/typography"

type Milestone = {
  period: string
  title: string
  org?: string
  logo?: { src: string; alt: string; className?: string }
  body: string
  highlight?: boolean
}

const milestones: Milestone[] = [
  {
    period: "2009 – 2019",
    title: "The freelance decade",
    body: "A decade of freelancing across disciplines, following the opportunities: client sites and web apps, photography and videography, illustration — including album artwork for a multi-Grammy-winning artist — and early startup ventures. All of it built alongside school, internships, and every job I held.",
  },
  {
    period: "2019 – 2021",
    title: "Marketing Director",
    org: "Perfect Power Wash",
    logo: { src: "/ppw.png", alt: "Perfect Power Wash" },
    body: "Recruited to modernize web and data infrastructure, then promoted to own strategy and the technology stack through an expansion from one market to four. Built their first data warehouse, wrote the internal tooling, and hired and trained a developer to take the systems further.",
  },
  {
    period: "2021 – 2023",
    title: "Integration Engineer",
    org: "Universal Windows Direct",
    logo: { src: "/uwd-logo.png", alt: "Universal Windows Direct" },
    body: "Went fully technical. Expanded and organized a centralized integration API connecting Five9, CRM, Mailchimp, and internal platforms — with shared logging that made failures traceable across every automation.",
  },
  {
    period: "2023 – Present",
    title: "Independent consultant",
    body: "Went out on my own: serverless AWS applications, production analytics platforms, headless WordPress rebuilds, and integration architecture.",
    highlight: true,
  },
]

export function AboutArc() {
  return (
    <section className="bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mb-12 max-w-3xl space-y-4 lg:mb-16">
          <Typography variant="eyebrow" className="text-primary font-semibold uppercase tracking-wider">
            The Arc
          </Typography>
          <Typography variant="h2" as="h2">
            Marketing seat, engineering hands
          </Typography>
          <Typography variant="body" className="text-lg text-muted-foreground">
            The part of consulting I&apos;m proudest of: the people who&apos;ve seen my work up close keep hiring me.
          </Typography>
        </div>

        <div className="relative">
          {/* Vertical rail */}
          <div
            aria-hidden
            className="absolute left-[7px] top-1 bottom-1 w-px bg-gradient-to-b from-primary/60 via-border to-primary/60 md:left-[168px]"
          />

          <ol className="space-y-10 md:space-y-12">
            {milestones.map((m, i) => (
              <motion.li
                key={m.period}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative grid gap-3 pl-8 md:grid-cols-[140px_1fr] md:gap-14 md:pl-0"
              >
                {/* Node */}
                <span
                  aria-hidden
                  className={`absolute left-0 top-1.5 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 md:left-[161px] ${
                    m.highlight
                      ? "border-primary bg-primary"
                      : "border-primary/50 bg-background"
                  }`}
                />

                <div className="md:text-right">
                  <p className="font-ui text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {m.period}
                  </p>
                </div>

                <div className="max-w-2xl space-y-2">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                      {m.title}
                    </h3>
                    {m.org && (
                      <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-3 py-1">
                        {m.logo && (
                          <span className="relative h-4 w-4 overflow-hidden">
                            {m.logo.src.endsWith(".svg") ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={m.logo.src}
                                alt=""
                                className="h-full w-full object-contain"
                              />
                            ) : (
                              <Image src={m.logo.src} alt="" fill className="object-contain" sizes="16px" />
                            )}
                          </span>
                        )}
                        <span className="font-ui text-xs font-semibold text-muted-foreground">
                          {m.org}
                        </span>
                      </span>
                    )}
                  </div>
                  <p className="text-base leading-relaxed text-muted-foreground">{m.body}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto mt-16 max-w-3xl lg:mt-20"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-8 -left-2 select-none font-serif text-[7rem] leading-none text-primary/10 md:-left-10 md:text-[9rem]"
          >
            &ldquo;
          </div>
          <div className="relative overflow-hidden rounded-lg border border-border/50 bg-background px-6 py-10 md:px-14 md:py-12">
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0" />
            <blockquote>
              <p className="text-center font-display text-xl leading-snug tracking-tight text-foreground sm:text-2xl md:text-[1.75rem] md:leading-[2.35rem]">
                &ldquo;I highly recommend Karol for any role that requires technical expertise paired with a strong business mindset.&rdquo;
              </p>
            </blockquote>
            <div className="mt-6 flex flex-col items-center gap-1 text-center">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-primary/40" />
                <Typography variant="body-sm" className="font-semibold text-foreground">
                  Christopher Jarvis
                </Typography>
                <span className="h-px w-8 bg-primary/40" />
              </div>
              <Typography variant="body-sm" className="text-muted-foreground">
                VP of Enterprise Digital Marketing, Great Day Improvements — Direct Manager
              </Typography>
            </div>
            <div className="mt-3 flex items-center justify-center">
              <div className="relative h-8 w-20 opacity-70">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/gdi-logo.svg" alt="Great Day Improvements" className="h-full w-full object-contain" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
