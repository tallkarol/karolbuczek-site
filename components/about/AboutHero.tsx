"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Typography } from "@/components/typography"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

export function AboutHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Dot-grid texture, faded toward the bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,hsl(var(--foreground)/0.05)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:linear-gradient(to_bottom,black_10%,transparent_85%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-12 pb-14 sm:px-6 lg:px-8 lg:pt-24 lg:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          {/* Copy */}
          <div className="space-y-6">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
              <Typography variant="eyebrow" className="text-primary font-semibold uppercase tracking-wider">
                About
              </Typography>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}>
              <Typography variant="h1" as="h1" className="max-w-2xl">
                Most engineers write code –{" "}
                <span className="text-primary">I know why it ships.</span>
              </Typography>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}>
              <Typography variant="body" className="text-lg text-muted-foreground max-w-2xl">
                I wrote my first code at twelve and never really stopped — building sites and apps alongside every job since. But a passion for entrepreneurship and a couple of Mad Men seasons later, the career that found me was marketing — and it took me all the way to Marketing Director of a mid-market brand, running leads and conversion across four markets.
              </Typography>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}>
              <Typography variant="body" className="text-lg text-muted-foreground max-w-2xl">
                That job taught me the lesson behind everything I build: strategy is only as good as the pipelines under it. The bottleneck was never creativity — it was plumbing. So I brought it all full circle with solution engineering, and for seven years I&apos;ve shipped the integrations and applications that marketing, ops, and leadership teams actually run on.
              </Typography>
            </motion.div>
          </div>

          {/* Photo with layered frame */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            {/* Offset frame behind the photo */}
            <div
              aria-hidden
              className="absolute -right-3 -bottom-3 h-full w-full rounded-lg border border-primary/25 md:-right-4 md:-bottom-4"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border/60 bg-muted/30">
              <Image
                src="/karol-photo.png"
                alt="Karol Buczek"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 90vw, 40vw"
                quality={85}
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <p className="font-display text-lg font-semibold leading-tight text-white">
                  Karol Buczek
                </p>
                <p className="font-ui text-xs uppercase tracking-[0.18em] text-white/75">
                  Full-Stack Engineer · Solutions Architect
                </p>
              </div>
            </div>
            {/* Corner tick */}
            <div aria-hidden className="absolute -left-2 -top-2 h-10 w-10 border-l-2 border-t-2 border-primary" />
          </motion.div>
        </div>

      </div>
    </section>
  )
}
