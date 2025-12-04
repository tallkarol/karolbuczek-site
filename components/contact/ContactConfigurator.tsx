"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ProgressIndicator } from "./ProgressIndicator"
import { MultiSelectCard } from "./MultiSelectCard"
import { QuestionCard } from "./QuestionCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Typography } from "@/components/typography"
import { Card, CardContent } from "@/components/ui/card"

export type ContactType = "role" | "project" | "connect" | "other"

export interface ContactConfig {
  contactTypes: ContactType[]
  role?: {
    type?: string
    level?: string
    location?: string
    startDate?: string
  }
  project?: {
    type?: string
    scope?: string
    timeline?: string
  }
  additional?: {
    message?: string
  }
  contact?: {
    name?: string
    email?: string
    company?: string
  }
}

const TOTAL_STEPS = 4

export function ContactConfigurator() {
  const [step, setStep] = useState(1)
  const [config, setConfig] = useState<ContactConfig>({
    contactTypes: [],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [showLocationRestriction, setShowLocationRestriction] = useState(false)
  // Step 4 form state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const updateConfig = (updates: Partial<ContactConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }))
  }

  const handleNext = () => {
    if (step === 1 && config.contactTypes.length === 0) {
      return
    }
    setStep((prev) => Math.min(prev + 1, TOTAL_STEPS))
  }

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const handleContactTypesChange = (types: ContactType[]) => {
    updateConfig({ contactTypes: types })
  }

  const handleSubmit = async (contactInfo: { name: string; email: string; company?: string }) => {
    updateConfig({ contact: contactInfo })
    setIsSubmitting(true)
    setSubmitStatus("idle")
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          config,
          contact: contactInfo,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      setSubmitStatus("success")
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep1 = () => {
    const contactTypes = [
      {
        id: "role" as ContactType,
        title: "Job Opportunity",
        description: "Full-time, contract, or consulting role",
      },
      {
        id: "project" as ContactType,
        title: "Project Work",
        description: "WordPress, backend automation, or systems work",
      },
      {
        id: "connect" as ContactType,
        title: "Just Connecting",
        description: "Networking, questions, or collaboration",
      },
      {
        id: "other" as ContactType,
        title: "Something Else",
        description: "Tell me what you have in mind",
      },
    ]

    return (
      <div className="space-y-8">
        <div>
          <Typography variant="h2" as="h2" className="mb-2">
            What brings you here?
          </Typography>
          <Typography variant="body" className="text-muted-foreground">
            Select all that apply
          </Typography>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {contactTypes.map((type) => (
            <MultiSelectCard
              key={type.id}
              title={type.title}
              description={type.description}
              selected={config.contactTypes.includes(type.id)}
              onClick={() => {
                const newTypes = config.contactTypes.includes(type.id)
                  ? config.contactTypes.filter((t) => t !== type.id)
                  : [...config.contactTypes, type.id]
                handleContactTypesChange(newTypes)
              }}
            />
          ))}
        </div>
        <div className="flex justify-end pt-4">
          <Button
            onClick={handleNext}
            disabled={config.contactTypes.length === 0}
            className="rounded-full px-8 py-2 text-sm font-semibold font-ui disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue →
          </Button>
        </div>
      </div>
    )
  }

  const renderStep2 = () => {
    // If no specific types selected or only "connect"/"other", skip to message step
    const hasSpecificTypes = config.contactTypes.some(t => t === "role" || t === "project")
    
    if (!hasSpecificTypes) {
      // Skip to message step
      return (
        <div className="space-y-8">
          <div>
            <Typography variant="h2" as="h2" className="mb-2">
              Tell me more
            </Typography>
            <Typography variant="body" className="text-muted-foreground">
              What would you like to discuss?
            </Typography>
          </div>
          <div>
            <Textarea
              placeholder="Tell me what's on your mind..."
              value={config.additional?.message || ""}
              onChange={(e) =>
                updateConfig({ additional: { ...config.additional, message: e.target.value } })
              }
              className="min-h-[120px]"
            />
          </div>
          <div className="flex justify-between pt-6">
            <Button
              onClick={handleBack}
              variant="outline"
              className="rounded-full border-border/50 px-6 py-2 text-sm font-ui hover:border-foreground/20"
            >
              ← Back
            </Button>
            <Button
              onClick={handleNext}
              className="rounded-full px-8 py-2 text-sm font-semibold font-ui"
            >
              Continue →
            </Button>
          </div>
        </div>
      )
    }

    // Handle role or project questions
    const hasRole = config.contactTypes.includes("role")
    const hasProject = config.contactTypes.includes("project")

    if (hasRole) {
      const role = config.role || {}
      return (
        <div className="space-y-8">
          <div>
            <Typography variant="h2" as="h2" className="mb-2">
              Tell me about the role
            </Typography>
          </div>

          <div>
            <Typography variant="h3" as="h3" className="mb-4">
              Role type?
            </Typography>
            <div className="grid gap-3 sm:grid-cols-2">
              {["Full-time", "Contract", "Consulting", "Part-time"].map((option) => (
                <QuestionCard
                  key={option}
                  label={option}
                  selected={role.type === option}
                  onClick={() => updateConfig({ role: { ...role, type: option } })}
                />
              ))}
            </div>
          </div>

          <div>
            <Typography variant="h3" as="h3" className="mb-4">
              Level?
            </Typography>
            <div className="grid gap-3 sm:grid-cols-2">
              {["Senior", "Lead", "Staff", "Principal"].map((option) => (
                <QuestionCard
                  key={option}
                  label={option}
                  selected={role.level === option}
                  onClick={() => updateConfig({ role: { ...role, level: option } })}
                />
              ))}
            </div>
          </div>

          <div>
            <Typography variant="h3" as="h3" className="mb-4">
              Location?
            </Typography>
            <div className="grid gap-3 sm:grid-cols-2">
              {["Remote", "Hybrid", "On-site", "Flexible"].map((option) => (
                <QuestionCard
                  key={option}
                  label={option}
                  selected={role.location === option}
                  onClick={() => {
                    const newLocation = option
                    updateConfig({ role: { ...role, location: newLocation } })
                    // Show restriction message if On-site or Hybrid selected
                    if (newLocation === "On-site" || newLocation === "Hybrid") {
                      setShowLocationRestriction(true)
                    } else {
                      setShowLocationRestriction(false)
                    }
                  }}
                />
              ))}
            </div>
          </div>

          {showLocationRestriction && (
            <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <Typography variant="h3" as="h3" className="mb-2 text-primary">
                    Location Preference
                  </Typography>
                  <Typography variant="body" className="text-muted-foreground">
                    I&apos;m currently only open to <strong>Remote</strong> or <strong>Flexible</strong> work arrangements. If this role can accommodate remote work, please select one of those options.
                  </Typography>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            <Button
              onClick={handleBack}
              variant="outline"
              className="rounded-full border-border/50 px-6 py-2 text-sm font-ui hover:border-foreground/20"
            >
              ← Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={showLocationRestriction}
              className="rounded-full px-8 py-2 text-sm font-semibold font-ui disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue →
            </Button>
          </div>
        </div>
      )
    }

    if (hasProject) {
      const project = config.project || {}
      return (
        <div className="space-y-8">
          <div>
            <Typography variant="h2" as="h2" className="mb-2">
              Tell me about the project
            </Typography>
          </div>

          <div>
            <Typography variant="h3" as="h3" className="mb-4">
              Project type?
            </Typography>
            <div className="grid gap-3 sm:grid-cols-2">
              {["WordPress", "Backend Automation", "MarTech Systems", "Full-Stack", "Other"].map((option) => (
                <QuestionCard
                  key={option}
                  label={option}
                  selected={project.type === option}
                  onClick={() => updateConfig({ project: { ...project, type: option } })}
                />
              ))}
            </div>
          </div>

          <div>
            <Typography variant="h3" as="h3" className="mb-4">
              Timeline?
            </Typography>
            <div className="grid gap-3 sm:grid-cols-2">
              {["ASAP", "1-3 months", "3-6 months", "Flexible"].map((option) => (
                <QuestionCard
                  key={option}
                  label={option}
                  selected={project.timeline === option}
                  onClick={() => updateConfig({ project: { ...project, timeline: option } })}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-6">
            <Button
              onClick={handleBack}
              variant="outline"
              className="rounded-full border-border/50 px-6 py-2 text-sm font-ui hover:border-foreground/20"
            >
              ← Back
            </Button>
            <Button
              onClick={handleNext}
              className="rounded-full px-8 py-2 text-sm font-semibold font-ui"
            >
              Continue →
            </Button>
          </div>
        </div>
      )
    }

    return null
  }

  const renderStep3 = () => {
    return (
      <div className="space-y-8">
        <div>
          <Typography variant="h2" as="h2" className="mb-2">
            Add a message (optional)
          </Typography>
          <Typography variant="body" className="text-muted-foreground">
            Share any additional context or questions
          </Typography>
        </div>
        <div>
          <Textarea
            placeholder="Anything else I should know?"
            value={config.additional?.message || ""}
            onChange={(e) =>
              updateConfig({ additional: { ...config.additional, message: e.target.value } })
            }
            className="min-h-[120px]"
          />
        </div>
        <div className="flex justify-between pt-6">
          <Button
            onClick={handleBack}
            variant="outline"
            className="rounded-full border-border/50 px-6 py-2 text-sm font-ui hover:border-foreground/20"
          >
            ← Back
          </Button>
          <Button
            onClick={handleNext}
            className="rounded-full px-8 py-2 text-sm font-semibold font-ui"
          >
            Continue →
          </Button>
        </div>
      </div>
    )
  }

  const renderStep4 = () => {

    const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const newErrors: { [key: string]: string } = {}
      if (!name.trim()) newErrors.name = "Name is required"
      if (!email.trim()) {
        newErrors.email = "Email is required"
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = "Please enter a valid email"
      }
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
      }
      handleSubmit({ name: name.trim(), email: email.trim(), company: company.trim() || undefined })
    }

    if (submitStatus === "success") {
      return (
        <div className="space-y-6 text-center py-12">
          <div className="text-6xl mb-4">✓</div>
          <Typography variant="h2" as="h2">Thank you!</Typography>
          <Typography variant="body" className="text-muted-foreground max-w-md mx-auto">
            Your message has been sent. I&apos;ll get back to you within 24-48 hours.
          </Typography>
        </div>
      )
    }

    return (
      <form onSubmit={handleFormSubmit} className="space-y-8">
        <div>
          <Typography variant="h2" as="h2" className="mb-2">
            Your contact information
          </Typography>
          <Typography variant="body" className="text-muted-foreground">
            So I can get back to you
          </Typography>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (errors.name) setErrors({ ...errors, name: "" })
              }}
              className={errors.name ? "border-destructive" : ""}
              placeholder="Your name"
              required
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors({ ...errors, email: "" })
              }}
              className={errors.email ? "border-destructive" : ""}
              placeholder="your@email.com"
              required
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company (Optional)</Label>
            <Input
              id="company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Your company"
            />
          </div>
        </div>

        {submitStatus === "error" && (
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive font-semibold">
              Something went wrong. Please try again or{" "}
              <a href="mailto:karol@karolbuczek.com" className="underline">
                email me directly
              </a>
              .
            </p>
          </div>
        )}

        <div className="flex justify-between pt-6">
          <Button
            type="button"
            onClick={handleBack}
            variant="outline"
            className="rounded-full border-border/50 px-6 py-2 text-sm font-ui hover:border-foreground/20"
          >
            ← Back
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full px-8 py-2 text-sm font-semibold font-ui"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </div>
      </form>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <ProgressIndicator currentStep={step} totalSteps={TOTAL_STEPS} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

