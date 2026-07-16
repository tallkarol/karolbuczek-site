"use client"

import Image from "next/image"
import { Typography } from "@/components/typography"
import { HeroFlyIn } from "@/components/motion/HeroFlyIn"

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-chiffon-100 dark:bg-navy-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 kb-section-background opacity-80 [mask-image:linear-gradient(to_bottom,black_40%,transparent_95%)]"
      />

      <div className="kb-content-rail relative pb-10 pt-8 lg:pb-20 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <HeroFlyIn
            side="right"
            delay={0.08}
            className="relative order-1 mx-auto w-full max-w-[349px] lg:order-2 lg:max-w-none"
          >
            <div
              aria-hidden
              className="absolute -bottom-3 -right-3 h-full w-full rounded-lg border border-navy-700/20 md:-bottom-4 md:-right-4 dark:border-chiffon/20"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-navy-700/15 bg-surface-card dark:border-chiffon/15 dark:bg-navy-800">
              <Image
                src="/karol-photo.png"
                alt="Karol Buczek"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 90vw, 40vw"
                quality={85}
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-950/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <p className="font-display text-lg font-semibold leading-tight text-chiffon">
                  Karol Buczek
                </p>
                <p className="font-ui text-xs uppercase tracking-[0.18em] text-chiffon/75">
                  Full-Stack Engineer · Solutions Architect
                </p>
              </div>
            </div>
            <div aria-hidden className="absolute -left-2 -top-2 h-10 w-10 border-l-2 border-t-2 border-navy-700 dark:border-chiffon" />
          </HeroFlyIn>

          <HeroFlyIn side="left" className="order-2 space-y-6 lg:order-1">
            <Typography variant="eyebrow" className="font-semibold uppercase tracking-wider">
              About
            </Typography>

            <Typography variant="h1" as="h1" className="max-w-2xl text-navy-700 dark:text-chiffon">
              Most engineers write code.
              <br />
              <span className="tk-gradient-text">I know why it ships.</span>
            </Typography>

            <Typography variant="body" className="max-w-2xl text-lg text-muted-foreground">
              I wrote my first code at twelve and never really stopped — building sites and apps alongside every job since. But a passion for entrepreneurship and a couple of Mad Men seasons later, the career that found me was marketing — and it took me all the way to Marketing Director of a mid-market brand, running leads and conversion across four markets.
            </Typography>

            <Typography variant="body" className="max-w-2xl text-lg text-muted-foreground">
              That job taught me the lesson behind everything I build: strategy is only as good as the pipelines under it. The bottleneck was never creativity — it was plumbing. So I brought it all full circle with solution engineering, and for seven years I&apos;ve shipped the integrations and applications that marketing, ops, and leadership teams actually run on.
            </Typography>
          </HeroFlyIn>
        </div>
      </div>
    </section>
  )
}
