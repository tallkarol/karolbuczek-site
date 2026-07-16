"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Typography } from "@/components/typography"
import { websiteBuilds } from "@/lib/website-builds"

export function WebsiteBuilds() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Typography variant="eyebrow" className="text-accent-text">
          Websites
        </Typography>
        <Typography variant="h2" as="h2">
          Featured website designs and builds
        </Typography>
        <div aria-hidden className="tk-accent-rule" />
        <Typography variant="body" className="text-muted-foreground">
          Brand and marketing sites shipped end-to-end.
        </Typography>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        {websiteBuilds.map((site, index) => (
          <motion.a
            key={site.url}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group flex flex-col outline-none"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border/50 bg-muted/30 transition-colors group-hover:border-primary/40 group-focus-visible:border-primary">
              <Image
                src={site.image}
                alt={`${site.name} homepage`}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <ArrowUpRight className="h-4 w-4" />
                <span className="sr-only">Open {site.name}</span>
              </span>
            </div>

            <div className="mt-3 space-y-1.5">
              <div className="flex flex-wrap gap-1.5">
                {site.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded bg-primary/5 text-primary font-ui font-semibold border border-primary/15"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-display text-base font-semibold leading-tight transition-colors group-hover:text-primary">
                {site.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-snug">
                {site.description}
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  )
}
