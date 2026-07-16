"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowUpRight, X } from "lucide-react"
import { Typography } from "@/components/typography"
import { CompactDashboardCharts } from "@/components/resume/CompactDashboardCharts"
import { caseStudyPerformanceBySlug } from "@/lib/case-study-performance"
import type { ClientDashboard } from "@/lib/client-engagements"

interface ClientEngagementModalProps {
  client: ClientDashboard | null
  isOpen: boolean
  onClose: () => void
}

export function ClientEngagementModal({ client, isOpen, onClose }: ClientEngagementModalProps) {
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    if (isOpen) setActiveImage(0)
  }, [isOpen, client?.id])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        e.stopPropagation()
        onClose()
      }
    }
    if (isOpen) window.addEventListener("keydown", handleEscape, true)
    return () => window.removeEventListener("keydown", handleEscape, true)
  }, [isOpen, onClose])

  const performance = client?.performanceSlug
    ? caseStudyPerformanceBySlug[client.performanceSlug]
    : undefined

  const images = client?.images?.length ? client.images : client ? [client.coverImage] : []
  const currentSrc = images[activeImage] || client?.coverImage
  const fitContain = client?.imageFit === "contain"

  return (
    <AnimatePresence mode="wait">
      {isOpen && client && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-0 md:p-[2.5vmin]"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-background/90 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.2 }}
            className="relative flex h-full w-full flex-col overflow-hidden border-2 border-border/50 bg-card shadow-2xl md:h-[92vh] md:max-h-[880px] md:w-[95vw] md:max-w-[1100px] md:rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute left-0 top-0 z-10 h-1 w-full bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0" />

            <div className="flex items-center justify-between gap-3 border-b border-border/40 px-4 py-3 md:px-6">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                All clients
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 transition-colors hover:bg-muted"
                aria-label="Close"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              {/* Header strip */}
              <div className="mb-5 flex items-start gap-3">
                {client.logo && (
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-border/50 bg-muted/30 p-1.5">
                    {client.logo.endsWith(".svg") ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={client.logo} alt="" className="h-full w-full object-contain" />
                    ) : (
                      <Image src={client.logo} alt="" width={48} height={48} className="h-full w-full object-contain" />
                    )}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <Typography variant="eyebrow">Client engagement</Typography>
                  <Typography variant="h2" as="h2" className="text-xl md:text-2xl">
                    {client.client}
                  </Typography>
                  <p className="text-sm text-muted-foreground">{client.role}</p>
                  <p className="text-xs text-muted-foreground/70">{client.period}</p>
                </div>
                {client.portfolioSlug && (
                  <Link
                    href={`/portfolio?cs=${client.portfolioSlug}`}
                    className="hidden items-center gap-1 rounded-full border border-border/50 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary sm:inline-flex"
                  >
                    Full case study
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>

              {/* Dashboard board */}
              <div className="overflow-hidden rounded-xl border border-border/50 bg-muted/10">
                <div className="grid lg:grid-cols-[1.15fr_1fr]">
                  {/* Imagery column */}
                  <div className="border-b border-border/40 lg:border-b-0 lg:border-r">
                    <div className="relative aspect-[16/10] w-full bg-muted/30">
                      {currentSrc && (
                        <Image
                          src={currentSrc}
                          alt={`${client.client} screenshot`}
                          fill
                          className={fitContain ? "object-contain p-8" : "object-cover object-top"}
                          sizes="(max-width: 1024px) 100vw, 55vw"
                        />
                      )}
                    </div>
                    {images.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto border-t border-border/40 p-2">
                        {images.map((src, i) => (
                          <button
                            key={src}
                            type="button"
                            onClick={() => setActiveImage(i)}
                            className={`relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-md border transition-colors ${
                              i === activeImage
                                ? "border-primary ring-1 ring-primary/40"
                                : "border-border/40 opacity-70 hover:opacity-100"
                            }`}
                          >
                            <Image
                              src={src}
                              alt=""
                              fill
                              className={fitContain ? "object-contain p-1" : "object-cover"}
                              sizes="80px"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                    <p className="border-t border-border/40 px-4 py-3 text-sm text-muted-foreground leading-relaxed">
                      {client.summary}
                    </p>
                  </div>

                  {/* Metrics + charts column */}
                  <div className="flex flex-col">
                    <div className="border-b border-border/40 px-3 py-2">
                      <p className="text-[10px] font-ui font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Snapshot
                      </p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="border-b border-border/40 bg-muted/20 text-[10px] font-ui uppercase tracking-[0.12em] text-muted-foreground">
                            <th className="px-3 py-2 font-semibold">Metric</th>
                            <th className="px-3 py-2 font-semibold">Before</th>
                            <th className="px-3 py-2 font-semibold">After / value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {client.metrics.map((row) => (
                            <tr key={row.label} className="border-b border-border/30 last:border-0">
                              <td className="px-3 py-2.5 text-muted-foreground">{row.label}</td>
                              <td className="px-3 py-2.5 text-muted-foreground/80">
                                {row.before ?? "—"}
                              </td>
                              <td className="px-3 py-2.5 font-semibold text-foreground">
                                {row.after ?? row.value ?? "—"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {performance && (
                      <div className="border-t border-border/40 p-3">
                        <p className="mb-2 text-[10px] font-ui font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          Visuals
                        </p>
                        <CompactDashboardCharts data={performance} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Delivery + tech footer of board */}
                <div className="grid gap-0 border-t border-border/40 md:grid-cols-2">
                  <div className="border-b border-border/40 p-4 md:border-b-0 md:border-r">
                    <p className="mb-2 text-[10px] font-ui font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      Delivery
                    </p>
                    <ul className="space-y-2">
                      {client.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                          <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4">
                    <p className="mb-2 text-[10px] font-ui font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      Stack
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {client.techStack.map((item) => (
                        <span
                          key={item}
                          className="rounded-md border border-border/40 bg-background/60 px-2 py-1 text-[11px] text-muted-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    {client.portfolioSlug && (
                      <Link
                        href={`/portfolio?cs=${client.portfolioSlug}`}
                        className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline sm:hidden"
                      >
                        Full case study
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
