"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Download, Copy, Check, ChevronDown, ChevronUp } from "lucide-react"
import { Typography } from "@/components/typography"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getRoleConfig, getCaseStudiesForRole, getCopyableBulletsForRole } from "@/lib/role-configs"
import type { CaseStudy } from "@/components/sections/CaseStudyCard"
import Link from "next/link"

interface ApplyPackModalProps {
  roleId: string | null
  isOpen: boolean
  onClose: () => void
}

export function ApplyPackModal({ roleId, isOpen, onClose }: ApplyPackModalProps) {
  const [copiedItem, setCopiedItem] = useState<string | null>(null)
  const [expandedBullets, setExpandedBullets] = useState(false)
  const [expandedLinkedIn, setExpandedLinkedIn] = useState(false)
  const [expandedEmail, setExpandedEmail] = useState(false)

  const config = roleId ? getRoleConfig(roleId) : null
  const caseStudies = roleId ? getCaseStudiesForRole(roleId) : []
  const copyableBullets = roleId ? getCopyableBulletsForRole(roleId) : []

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleEscape)
    }
    return () => {
      window.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItem(itemId)
      setTimeout(() => setCopiedItem(null), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = text
      textArea.style.position = "fixed"
      textArea.style.opacity = "0"
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand("copy")
        setCopiedItem(itemId)
        setTimeout(() => setCopiedItem(null), 2000)
      } catch (fallbackErr) {
        console.error("Failed to copy:", fallbackErr)
      }
      document.body.removeChild(textArea)
    }
  }

  const handleDownloadPDF = () => {
    if (!config) return
    const url = `/resume/${config.resumeVariantId}?print=true`
    window.open(url, "_blank")
  }

  if (!isOpen || !config) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-3xl max-h-[90vh] bg-card border border-border/50 rounded-lg shadow-lg overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              {/* Header */}
              <div className="mb-6 pr-8">
                <Typography variant="h2" as="h2" className="text-2xl font-display mb-2">
                  {config.label}
                </Typography>
                <Typography variant="body-sm" className="text-muted-foreground">
                  {config.shortDescription}
                </Typography>
              </div>

              {/* Quick Actions */}
              <div className="mb-8">
                <Typography variant="body-sm" className="font-semibold mb-4 text-foreground">
                  Quick Actions
                </Typography>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <Link href={config.landingPath} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      View Landing Page
                    </Link>
                  </Button>
                  <Button
                    onClick={handleDownloadPDF}
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF Resume
                  </Button>
                </div>
              </div>

              {/* LinkedIn Template */}
              <div className="mb-8">
                <button
                  onClick={() => setExpandedLinkedIn(!expandedLinkedIn)}
                  className="flex items-center justify-between w-full mb-4 group"
                >
                  <Typography variant="body-sm" className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    LinkedIn Message Template
                  </Typography>
                  {expandedLinkedIn ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
                <AnimatePresence>
                  {expandedLinkedIn && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <Card className="border-border/50">
                        <CardContent className="p-4">
                          <div className="mb-4">
                            <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-sans">
                              {config.outreachTemplates.linkedin}
                            </pre>
                          </div>
                          <Button
                            onClick={() => copyToClipboard(config.outreachTemplates.linkedin, "linkedin")}
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            {copiedItem === "linkedin" ? (
                              <>
                                <Check className="h-4 w-4 mr-2 text-primary" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="h-4 w-4 mr-2" />
                                Copy LinkedIn Message
                              </>
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Email Template */}
              <div className="mb-8">
                <button
                  onClick={() => setExpandedEmail(!expandedEmail)}
                  className="flex items-center justify-between w-full mb-4 group"
                >
                  <Typography variant="body-sm" className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    Email Template
                  </Typography>
                  {expandedEmail ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
                <AnimatePresence>
                  {expandedEmail && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <Card className="border-border/50">
                        <CardContent className="p-4">
                          <div className="mb-4">
                            <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-sans">
                              {config.outreachTemplates.email}
                            </pre>
                          </div>
                          <Button
                            onClick={() => copyToClipboard(config.outreachTemplates.email, "email")}
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            {copiedItem === "email" ? (
                              <>
                                <Check className="h-4 w-4 mr-2 text-primary" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="h-4 w-4 mr-2" />
                                Copy Email Template
                              </>
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Case Studies */}
              {caseStudies.length > 0 && (
                <div className="mb-8">
                  <Typography variant="body-sm" className="font-semibold mb-4 text-foreground">
                    Featured Case Studies
                  </Typography>
                  <div className="space-y-2">
                    {caseStudies.map((caseStudy: CaseStudy) => (
                      <Card
                        key={caseStudy.slug}
                        className="border-border/50 hover:border-primary/30 transition-colors"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <Typography variant="body-sm" className="font-semibold mb-1">
                                {caseStudy.title}
                              </Typography>
                              <Typography variant="body-sm" className="text-muted-foreground text-xs mb-2">
                                {caseStudy.summary}
                              </Typography>
                              {caseStudy.metric && (
                                <Typography variant="body-sm" className="text-xs text-primary">
                                  {caseStudy.metric}
                                </Typography>
                              )}
                            </div>
                            <Button
                              asChild
                              variant="ghost"
                              size="sm"
                              className="flex-shrink-0"
                            >
                              <Link
                                href={`/case-studies#${caseStudy.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Copyable Bullets */}
              {copyableBullets.length > 0 && (
                <div>
                  <button
                    onClick={() => setExpandedBullets(!expandedBullets)}
                    className="flex items-center justify-between w-full mb-4 group"
                  >
                    <Typography variant="body-sm" className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      Copyable Bullets
                    </Typography>
                    {expandedBullets ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedBullets && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <Card className="border-border/50">
                          <CardContent className="p-4">
                            <ul className="space-y-2 mb-4">
                              {copyableBullets.map((bullet, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                                  <Typography variant="body-sm" className="text-muted-foreground text-xs">
                                    {bullet}
                                  </Typography>
                                </li>
                              ))}
                            </ul>
                            <Button
                              onClick={() => copyToClipboard(copyableBullets.join("\n• "), "bullets")}
                              variant="outline"
                              size="sm"
                              className="w-full"
                            >
                              {copiedItem === "bullets" ? (
                                <>
                                  <Check className="h-4 w-4 mr-2 text-primary" />
                                  Copied All Bullets!
                                </>
                              ) : (
                                <>
                                  <Copy className="h-4 w-4 mr-2" />
                                  Copy All Bullets
                                </>
                              )}
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

