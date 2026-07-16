"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, FileText } from "lucide-react"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { CaseStudyModal } from "@/components/resume/CaseStudyModal"
import { allCaseStudies } from "@/lib/resume-data"
import type { CaseStudy } from "@/components/sections/CaseStudyCard"

type FeaturedWork = {
  slug: string
  eyebrow: string
  headline: string
  body: string
  image: string
  imageAlt: string
  stats: { value: string; label: string }[]
}

const featured: FeaturedWork[] = [
  {
    slug: "secure-document-management-portal",
    eyebrow: "Cloud architecture",
    headline: "A serverless document portal for a compliance-sensitive client",
    body: "Managed identity, signed-URL delivery, role-based access, and immutable audit logging on AWS — built for an audit provider that couldn't let data leave its environment and had no DevOps team to run servers.",
    image: "/bliss-user-portal-view.png",
    imageAlt: "Secure document portal user view",
    stats: [
      { value: "RBAC", label: "role-based access" },
      { value: "100%", label: "auditable file activity" },
      { value: "0", label: "servers to manage" },
    ],
  },
  {
    slug: "mineralife-b2b-website-rebuild",
    eyebrow: "Performance engineering",
    headline: "A headless rebuild that tripled mobile performance",
    body: "Full rebuild of Mineralife's B2B presence as headless WordPress + React — marketing kept their CMS, the frontend got a leaner delivery layer, and lead forms were rebuilt with qualifying and scheduling that route into a custom sales CRM.",
    image: "/website-builds/mineralife-b2b.jpg",
    imageAlt: "Mineralife B2B website homepage",
    stats: [
      { value: "67 → 94", label: "mobile Lighthouse" },
      { value: "14.6s → 3.1s", label: "time to interactive" },
      { value: "109 → 51", label: "network requests" },
    ],
  },
]

export function AboutWork() {
  const [selected, setSelected] = useState<CaseStudy | null>(null)

  return (
    <>
      <section className="kb-section-inverse w-full">
        <div className="kb-content-rail py-16 lg:py-24">
        <div className="mb-12 max-w-3xl space-y-4 lg:mb-16">
          <Typography variant="eyebrow" className="font-semibold uppercase tracking-wider text-chiffon/75">
            The Work
          </Typography>
          <Typography variant="h2" as="h2" className="text-chiffon">
            Systems teams actually run on
          </Typography>
          <Typography variant="body" className="text-lg text-chiffon/75">
            Integration layers, cloud applications, analytics platforms, and enterprise WordPress — scoped with stakeholders, shipped to production, and still in use.
          </Typography>
        </div>

        <div className="space-y-16 lg:space-y-24">
          {featured.map((work, i) => {
            const caseStudy = allCaseStudies.find((c) => c.slug === work.slug) as CaseStudy | undefined
            const reversed = i % 2 === 1

            return (
              <motion.article
                key={work.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
              >
                {/* Screenshot */}
                <div className={reversed ? "lg:order-2" : ""}>
                  <div className="group relative">
                    <div
                      aria-hidden
                      className={`absolute h-full w-full rounded-lg border border-slate-500/30 ${
                        reversed ? "-left-3 -bottom-3" : "-right-3 -bottom-3"
                      }`}
                    />
                    <div className="relative overflow-hidden rounded-lg border border-slate-500/25 bg-navy-950">
                      <div className="flex items-center gap-1.5 border-b border-slate-500/20 bg-navy-800 px-4 py-2.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-500/50" />
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-500/50" />
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-500/50" />
                      </div>
                      <div className="relative aspect-[16/10]">
                        <Image
                          src={work.image}
                          alt={work.imageAlt}
                          fill
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Copy */}
                <div className={`space-y-5 ${reversed ? "lg:order-1" : ""}`}>
                  <p className="font-ui text-xs font-semibold uppercase tracking-[0.18em] text-chiffon/80">
                    {work.eyebrow}
                  </p>
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-chiffon lg:text-3xl">
                    {work.headline}
                  </h3>
                  <p className="text-base leading-relaxed text-chiffon/75">{work.body}</p>

                  <dl className="grid grid-cols-3 gap-4 border-t border-slate-500/25 pt-5">
                    {work.stats.map((stat) => (
                      <div key={stat.label}>
                        <dd className="font-display text-xl font-semibold tracking-tight text-chiffon">
                          {stat.value}
                        </dd>
                        <dt className="mt-0.5 text-xs leading-snug text-chiffon/70">{stat.label}</dt>
                      </div>
                    ))}
                  </dl>

                  {caseStudy && (
                    <Button
                      variant="outline-inverse"
                      size="sm"
                      onClick={() => setSelected(caseStudy)}
                      className="gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      Read the case study
                    </Button>
                  )}
                </div>
              </motion.article>
            )
          })}
        </div>

        <div className="mt-14 flex justify-center lg:mt-20">
          <Button asChild variant="inverse" className="px-7">
            <Link href="/portfolio">
              See the full portfolio
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        </div>
      </section>

      {selected && (
        <CaseStudyModal caseStudy={selected} isOpen={!!selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
