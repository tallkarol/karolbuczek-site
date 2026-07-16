"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Code2, X } from "lucide-react"
import {
  SiAmazon,
  SiJavascript,
  SiMysql,
  SiNextdotjs,
  SiPhp,
  SiPostgresql,
  SiReact,
  SiTypescript,
  SiVercel,
  SiWordpress,
} from "react-icons/si"
import { Typography } from "@/components/typography"
import { ClientEngagementModal } from "@/components/resume/ClientEngagementModal"
import { allCaseStudies } from "@/lib/resume-data"
import { getClientDashboard, type ClientDashboard } from "@/lib/client-engagements"

export interface RoleEngagement {
  client: string
  role: string
  period: string
  logo?: string
  bullets: string[]
}

export interface RoleDetails {
  period: string
  officialTitle: string
  officialDates?: string
  reality?: string
  logo?: string
  keyProjects?: string[]
  systems?: string[]
  engagements?: RoleEngagement[]
  exampleWork?: string[]
  highlights?: string[]
  techStack?: string[]
  relatedCaseStudies?: Array<{
    slug: string
    title: string
  }>
  quote?: {
    text: string
    author: string
    role?: string
  }
  stats?: Array<{
    label: string
    value: string
  }>
  /** When true, engagements render as clickable client dashboard cards */
  clientHub?: boolean
}

interface RoleModalProps {
  role: RoleDetails | null
  isOpen: boolean
  onClose: () => void
}

const TECH_ICON_MAP: Array<{ match: RegExp; Icon: React.ComponentType<{ className?: string }> }> = [
  { match: /^react$/i, Icon: SiReact },
  { match: /next\.?js/i, Icon: SiNextdotjs },
  { match: /typescript/i, Icon: SiTypescript },
  { match: /postgresql|postgres/i, Icon: SiPostgresql },
  { match: /vercel/i, Icon: SiVercel },
  { match: /wordpress/i, Icon: SiWordpress },
  { match: /^php$/i, Icon: SiPhp },
  { match: /javascript/i, Icon: SiJavascript },
  { match: /mysql/i, Icon: SiMysql },
  { match: /aws|lambda|cognito|s3|rds|amazon/i, Icon: SiAmazon },
]

function getTechIcon(name: string) {
  for (const { match, Icon } of TECH_ICON_MAP) {
    if (match.test(name.trim())) return Icon
  }
  return Code2
}

function LogoMark({ src, alt, size = "md" }: { src?: string; alt: string; size?: "sm" | "md" | "lg" }) {
  if (!src) return null
  const box = size === "lg" ? "h-16 w-16" : size === "sm" ? "h-10 w-10" : "h-12 w-12"
  const isSvg = src.endsWith(".svg")

  return (
    <div className={`${box} flex-shrink-0 rounded-lg border border-border/50 bg-muted/30 p-2`}>
      {isSvg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-contain" />
      ) : (
        <Image src={src} alt={alt} width={64} height={64} className="h-full w-full object-contain" />
      )}
    </div>
  )
}

export function RoleModal({ role, isOpen, onClose }: RoleModalProps) {
  const [selectedClient, setSelectedClient] = useState<ClientDashboard | null>(null)
  const [clientModalOpen, setClientModalOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setClientModalOpen(false)
      setSelectedClient(null)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen || clientModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen, clientModalOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !clientModalOpen) onClose()
    }
    if (isOpen) window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose, clientModalOpen])

  const portfolioCards =
    role?.relatedCaseStudies?.map((link) => {
      const full = allCaseStudies.find((cs) => cs.slug === link.slug)
      return {
        slug: link.slug,
        title: full?.title || link.title,
        subtitle: full?.subtitle,
        summary: full?.summary,
        previewBusOutcome: full?.previewBusOutcome,
        logo: full?.clientLogo || full?.image,
        imageFit: full?.imageFit,
        tags: full?.tags?.slice(0, 3) || [],
      }
    }) || []

  const isClientHub = Boolean(role?.clientHub && role.engagements?.length)

  const openClient = (clientName: string) => {
    const dashboard = getClientDashboard(clientName)
    if (!dashboard) return
    setSelectedClient(dashboard)
    setClientModalOpen(true)
  }

  return (
    <>
    <AnimatePresence mode="wait">
      {isOpen && role && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-[2.5vmin]"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-background/85 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full h-full md:w-[95vw] md:h-[95vh] md:max-w-[1200px] md:max-h-[90vh] bg-card border-2 border-border/50 rounded-none md:rounded-xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 z-10" />

            <button
              onClick={onClose}
              className="absolute top-3 right-3 md:top-4 md:right-4 p-2 rounded-lg hover:bg-muted transition-colors z-20"
              aria-label="Close modal"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>

            <div className="flex-1 overflow-y-auto p-4 md:p-8">
              {/* Header */}
              <div className="pr-10 md:pr-12 mb-8 pb-6 border-b border-border/40">
                <div className="flex items-start gap-4">
                  <LogoMark src={role.logo} alt={role.officialTitle} size="lg" />
                  <div className="min-w-0 space-y-2">
                    <Typography variant="eyebrow">Role detail</Typography>
                    <Typography variant="h2" as="h2" className="text-xl md:text-2xl">
                      {role.officialTitle}
                    </Typography>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <Typography variant="body-sm" className="font-semibold text-foreground">
                        {role.period}
                      </Typography>
                      {role.officialDates && (
                        <Typography variant="body-sm" className="text-muted-foreground italic">
                          {role.officialDates}
                        </Typography>
                      )}
                    </div>
                    {role.reality && (
                      <Typography variant="body" className="text-muted-foreground max-w-3xl pt-1">
                        {role.reality}
                      </Typography>
                    )}
                  </div>
                </div>
              </div>

              {/* Stats */}
              {role.stats && role.stats.length > 0 && (
                <section className="mb-8">
                  <Typography variant="body-sm" as="h3" className="font-semibold mb-4 uppercase tracking-wider text-muted-foreground">
                    Key metrics
                  </Typography>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {role.stats.map((stat) => (
                      <div
                        key={`${stat.label}-${stat.value}`}
                        className="relative overflow-hidden rounded-xl border border-border/50 bg-muted/20 px-4 py-5 text-center"
                      >
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                        <div className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-1">
                          {stat.value}
                        </div>
                        <Typography variant="body-sm" className="text-muted-foreground text-xs uppercase tracking-wider">
                          {stat.label}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Quote */}
              {role.quote && (
                <section className="mb-8 relative rounded-xl border border-border/50 bg-muted/20 px-5 py-6 md:px-8 md:py-7 overflow-hidden">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-4 left-3 select-none font-serif text-7xl leading-none text-primary/10"
                  >
                    &ldquo;
                  </div>
                  <Typography variant="body" className="relative font-display text-lg md:text-xl leading-snug tracking-tight text-foreground mb-5">
                    &ldquo;{role.quote.text}&rdquo;
                  </Typography>
                  <div className="flex flex-col items-start gap-0.5 border-t border-border/30 pt-4">
                    <Typography variant="body-sm" className="font-semibold text-foreground">
                      {role.quote.author}
                    </Typography>
                    {role.quote.role && (
                      <Typography variant="body-sm" className="text-muted-foreground">
                        {role.quote.role}
                      </Typography>
                    )}
                  </div>
                </section>
              )}

              {/* Client hub — Tall Karol: cards open client dashboards */}
              {isClientHub && role.engagements && (
                <section className="mb-2">
                  <Typography variant="body-sm" as="h3" className="font-semibold mb-1 uppercase tracking-wider text-muted-foreground">
                    Client engagements
                  </Typography>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Open a client for screenshots, metrics, and delivery detail.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {role.engagements.map((engagement) => {
                      const dashboard = getClientDashboard(engagement.client)
                      const cover = dashboard?.coverImage || engagement.logo
                      const contain = dashboard?.imageFit === "contain" || cover?.endsWith(".svg")
                      return (
                        <button
                          key={`${engagement.client}-${engagement.period}`}
                          type="button"
                          onClick={() => openClient(engagement.client)}
                          className="group overflow-hidden rounded-xl border border-border/50 bg-card text-left transition-all hover:border-primary/40 hover:shadow-lg"
                        >
                          <div className="relative aspect-[16/9] w-full bg-muted/30">
                            {cover && (
                              <Image
                                src={cover}
                                alt=""
                                fill
                                className={`transition-transform duration-500 group-hover:scale-[1.03] ${
                                  contain ? "object-contain p-6" : "object-cover object-top"
                                }`}
                                sizes="(max-width: 640px) 100vw, 40vw"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 flex items-end gap-2.5 p-3">
                              {engagement.logo && (
                                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md border border-border/50 bg-card/90 p-1 backdrop-blur-sm">
                                  {engagement.logo.endsWith(".svg") ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={engagement.logo} alt="" className="h-full w-full object-contain" />
                                  ) : (
                                    <Image src={engagement.logo} alt="" width={36} height={36} className="h-full w-full object-contain" />
                                  )}
                                </div>
                              )}
                              <div className="min-w-0">
                                <p className="truncate font-semibold text-foreground group-hover:text-primary">
                                  {engagement.client}
                                </p>
                                <p className="truncate text-xs text-muted-foreground">{engagement.period}</p>
                              </div>
                              <ArrowUpRight className="ml-auto h-4 w-4 flex-shrink-0 text-muted-foreground group-hover:text-primary" />
                            </div>
                          </div>
                          <div className="border-t border-border/40 px-3 py-2.5">
                            <p className="line-clamp-2 text-xs text-muted-foreground">{engagement.role}</p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </section>
              )}

              {/* Non-hub engagements (fallback) */}
              {!isClientHub && role.engagements && role.engagements.length > 0 && (
                <section className="mb-8">
                  <Typography variant="body-sm" as="h3" className="font-semibold mb-4 uppercase tracking-wider text-muted-foreground">
                    Client engagements
                  </Typography>
                  <div className="space-y-4">
                    {role.engagements.map((engagement) => (
                      <div
                        key={`${engagement.client}-${engagement.period}`}
                        className="rounded-xl border border-border/50 bg-card p-4 md:p-5"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <LogoMark src={engagement.logo} alt={engagement.client} size="sm" />
                          <div className="min-w-0">
                            <Typography variant="body-sm" className="font-semibold text-foreground">
                              {engagement.client}
                            </Typography>
                            <Typography variant="body-sm" className="text-muted-foreground">
                              {engagement.role}
                            </Typography>
                          </div>
                        </div>
                        <ul className="space-y-2 pl-1">
                          {engagement.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-2">
                              <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                              <Typography variant="body-sm" className="text-muted-foreground">
                                {bullet}
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Highlights — skip on client hub (detail lives in client modals) */}
              {!isClientHub && role.highlights && role.highlights.length > 0 && (
                <section className="mb-8">
                  <Typography variant="body-sm" as="h3" className="font-semibold mb-4 uppercase tracking-wider text-muted-foreground">
                    Highlights
                  </Typography>
                  <div className="grid gap-3 md:grid-cols-2">
                    {role.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="flex items-start gap-2.5 rounded-lg border border-border/40 bg-muted/15 p-3.5"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        <Typography variant="body-sm" className="text-muted-foreground">
                          {highlight}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Delivery / systems */}
              {!isClientHub && role.systems && role.systems.length > 0 && (
                <section className="mb-8">
                  <Typography variant="body-sm" as="h3" className="font-semibold mb-4 uppercase tracking-wider text-muted-foreground">
                    Delivery
                  </Typography>
                  <ul className="space-y-3">
                    {role.systems.map((system) => (
                      <li key={system} className="flex items-start gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        <Typography variant="body-sm" className="text-muted-foreground">
                          {system}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Key projects */}
              {role.keyProjects && role.keyProjects.length > 0 && (
                <section className="mb-8">
                  <Typography variant="body-sm" as="h3" className="font-semibold mb-4 uppercase tracking-wider text-muted-foreground">
                    Key projects
                  </Typography>
                  <ul className="space-y-3">
                    {role.keyProjects.map((project) => (
                      <li key={project} className="flex items-start gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        <Typography variant="body-sm" className="text-muted-foreground">
                          {project}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Tech stack — light on hub */}
              {role.techStack && role.techStack.length > 0 && (
                <section className={isClientHub ? "mt-8 mb-2" : "mb-8"}>
                  <Typography variant="body-sm" as="h3" className="font-semibold mb-3 uppercase tracking-wider text-muted-foreground">
                    {isClientHub ? "Practice stack" : "Tech stack"}
                  </Typography>
                  <div className="flex flex-wrap gap-2">
                    {role.techStack.map((item) => {
                      const Icon = getTechIcon(item)
                      return (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-muted/60 text-muted-foreground text-xs font-medium border border-border/40"
                        >
                          <Icon className="h-3.5 w-3.5 flex-shrink-0 text-foreground/70" />
                          {item}
                        </span>
                      )
                    })}
                  </div>
                </section>
              )}

              {/* Related portfolio — not on client hub */}
              {!isClientHub && portfolioCards.length > 0 && (
                <section className="mb-2">
                  <Typography variant="body-sm" as="h3" className="font-semibold mb-4 uppercase tracking-wider text-muted-foreground">
                    Related portfolio
                  </Typography>
                  <div className="grid gap-3 md:grid-cols-2">
                    {portfolioCards.map((cs) => (
                      <Link
                        key={cs.slug}
                        href={`/portfolio?cs=${cs.slug}`}
                        className="group rounded-xl border border-border/50 bg-muted/10 p-4 hover:border-primary/40 hover:bg-muted/25 transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <LogoMark src={cs.logo} alt={cs.title} size="sm" />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <Typography variant="body-sm" className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                {cs.title}
                              </Typography>
                              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary flex-shrink-0 mt-0.5" />
                            </div>
                            {cs.subtitle && (
                              <Typography variant="body-sm" className="text-muted-foreground text-xs mt-0.5">
                                {cs.subtitle}
                              </Typography>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Example work fallback */}
              {role.exampleWork && role.exampleWork.length > 0 && (
                <section className="mt-8">
                  <Typography variant="body-sm" as="h3" className="font-semibold mb-4 uppercase tracking-wider text-muted-foreground">
                    Example work
                  </Typography>
                  <ul className="space-y-3">
                    {role.exampleWork.map((work) => (
                      <li key={work} className="flex items-start gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        <Typography variant="body-sm" className="text-muted-foreground">
                          {work}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>

    <ClientEngagementModal
      client={selectedClient}
      isOpen={clientModalOpen}
      onClose={() => {
        setClientModalOpen(false)
        setTimeout(() => setSelectedClient(null), 200)
      }}
    />
    </>
  )
}
