"use client"

import { useState, useEffect } from "react"
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
const STORAGE_KEY = "karolbuczek_contact_form_state"

export function ContactConfigurator() {
  const [mounted, setMounted] = useState(false)
  
  // Load state from localStorage on mount
  const loadSavedState = () => {
    if (typeof window === "undefined") {
      return { step: 1, config: { contactTypes: [] }, name: "", email: "", company: "" }
    }
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        // Only restore if it's recent (within 24 hours)
        if (parsed.timestamp && Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
          return {
            step: parsed.step || 1,
            config: parsed.config || { contactTypes: [] },
            name: parsed.name || "",
            email: parsed.email || "",
            company: parsed.company || "",
          }
        }
      }
    } catch (e) {
      console.error("Failed to load saved state:", e)
    }
    return { step: 1, config: { contactTypes: [] }, name: "", email: "", company: "" }
  }

  const savedState = loadSavedState()
  const [step, setStep] = useState(savedState.step)
  const [config, setConfig] = useState<ContactConfig>(savedState.config)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [showLocationRestriction, setShowLocationRestriction] = useState(false)
  // Step 2: Track which type is currently being shown
  const [currentTypeIndex, setCurrentTypeIndex] = useState(0)
  // Step 4 form state
  const [name, setName] = useState(savedState.name)
  const [email, setEmail] = useState(savedState.email)
  const [company, setCompany] = useState(savedState.company)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    setMounted(true)
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined" && submitStatus !== "success") {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            step,
            config,
            name,
            email,
            company,
            timestamp: Date.now(),
          })
        )
      } catch (e) {
        console.error("Failed to save state:", e)
      }
    }
  }, [step, config, name, email, company, submitStatus])

  // Clear saved state on successful submission
  useEffect(() => {
    if (submitStatus === "success" && typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [submitStatus])

  const updateConfig = (updates: Partial<ContactConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }))
  }

  // Determine which steps are accessible for navigation
  const getAccessibleSteps = (): number[] => {
    const accessible: number[] = []
    
    // Step 1 is always accessible
    accessible.push(1)
    
    // Step 2 requires at least one contact type
    if (config.contactTypes.length > 0) {
      accessible.push(2)
      
      // Step 3 is accessible once step 2 is completed
      if (step >= 3) {
        accessible.push(3)
        
        // Step 4 (contact form) is accessible once step 3 is reached
        if (step >= 4) {
          accessible.push(4)
        }
      }
    }
    
    return accessible
  }

  const handleStepClick = (targetStep: number) => {
    // Always allow backward navigation
    if (targetStep < step) {
      setStep(targetStep)
      return
    }
    
    // Forward navigation requires validation
    const accessibleSteps = getAccessibleSteps()
    if (accessibleSteps.includes(targetStep)) {
      setStep(targetStep)
    }
  }

  const handleNext = () => {
    if (step === 1 && config.contactTypes.length === 0) {
      return
    }
    setStep((prev: number) => Math.min(prev + 1, TOTAL_STEPS))
  }

  const handleBack = () => {
    setStep((prev: number) => Math.max(prev - 1, 1))
  }

  const handleContactTypesChange = (types: ContactType[]) => {
    updateConfig({ contactTypes: types })
  }

  // Reset step 2 type index when contactTypes changes
  useEffect(() => {
    if (step === 2) {
      const specificTypes = config.contactTypes.filter(t => t === "role" || t === "project")
      setCurrentTypeIndex((prevIndex) => {
        if (specificTypes.length === 0) {
          return 0
        }
        // If current index is out of bounds, reset to 0
        if (prevIndex >= specificTypes.length) {
          return 0
        }
        // Otherwise keep the current index
        return prevIndex
      })
    }
  }, [config.contactTypes, step])

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
    // Filter to only specific types that need questions
    const specificTypes = config.contactTypes.filter(t => t === "role" || t === "project")
    
    // If no specific types selected or only "connect"/"other", skip to message step
    if (specificTypes.length === 0) {
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

    // Get current type being shown
    const currentType = specificTypes.length > 0 
      ? specificTypes[Math.min(currentTypeIndex, specificTypes.length - 1)] 
      : undefined

    // Handle navigation between types
    const handleNextType = () => {
      if (specificTypes.length === 0) {
        handleNext()
        return
      }
      
      const safeIndex = Math.min(currentTypeIndex, specificTypes.length - 1)
      if (safeIndex < specificTypes.length - 1) {
        setCurrentTypeIndex(safeIndex + 1)
        setShowLocationRestriction(false) // Reset location restriction when moving to next type
      } else {
        handleNext()
      }
    }

    const handleBackType = () => {
      if (specificTypes.length === 0) {
        handleBack()
        return
      }
      
      const safeIndex = Math.min(currentTypeIndex, specificTypes.length - 1)
      if (safeIndex > 0) {
        setCurrentTypeIndex(safeIndex - 1)
        setShowLocationRestriction(false) // Reset location restriction when going back
      } else {
        handleBack()
      }
    }

    // Render role questions
    const renderRoleQuestions = () => {
      const role = config.role || {}
      return (
        <div className="space-y-8">
          <div>
            <Typography variant="h2" as="h2" className="mb-2">
              Tell me about the role
            </Typography>
            {specificTypes.length > 1 && (
              <Typography variant="body-sm" className="text-muted-foreground">
                {Math.min(currentTypeIndex + 1, specificTypes.length)} of {specificTypes.length} contact types
              </Typography>
            )}
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
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    const currentRole = config.role || {}
                    updateConfig({ role: { ...currentRole, type: option } })
                  }}
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
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    const currentRole = config.role || {}
                    updateConfig({ role: { ...currentRole, level: option } })
                  }}
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
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    const newLocation = option
                    const currentRole = config.role || {}
                    updateConfig({ role: { ...currentRole, location: newLocation } })
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
              onClick={handleBackType}
              variant="outline"
              className="rounded-full border-border/50 px-6 py-2 text-sm font-ui hover:border-foreground/20"
            >
              ← Back
            </Button>
            <Button
              onClick={handleNextType}
              disabled={showLocationRestriction}
              className="rounded-full px-8 py-2 text-sm font-semibold font-ui disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentTypeIndex < specificTypes.length - 1 ? "Next →" : "Continue →"}
            </Button>
          </div>
        </div>
      )
    }

    // Render project questions
    const renderProjectQuestions = () => {
      const project = config.project || {}
      return (
        <div className="space-y-8">
          <div>
            <Typography variant="h2" as="h2" className="mb-2">
              Tell me about the project
            </Typography>
            {specificTypes.length > 1 && (
              <Typography variant="body-sm" className="text-muted-foreground">
                {Math.min(currentTypeIndex + 1, specificTypes.length)} of {specificTypes.length} contact types
              </Typography>
            )}
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
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    const currentProject = config.project || {}
                    updateConfig({ project: { ...currentProject, type: option } })
                  }}
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
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    const currentProject = config.project || {}
                    updateConfig({ project: { ...currentProject, timeline: option } })
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-6">
            <Button
              onClick={handleBackType}
              variant="outline"
              className="rounded-full border-border/50 px-6 py-2 text-sm font-ui hover:border-foreground/20"
            >
              ← Back
            </Button>
            <Button
              onClick={handleNextType}
              className="rounded-full px-8 py-2 text-sm font-semibold font-ui"
            >
              {currentTypeIndex < specificTypes.length - 1 ? "Next →" : "Continue →"}
            </Button>
          </div>
        </div>
      )
    }

    // Render the appropriate questions based on current type
    if (!currentType) {
      return (
        <div className="space-y-8">
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
            <Typography variant="body" className="text-destructive font-semibold">
              No contact types selected. Please go back and select at least one contact type.
            </Typography>
          </div>
          <div className="flex justify-end pt-6">
            <Button
              onClick={handleBack}
              variant="outline"
              className="rounded-full border-border/50 px-6 py-2 text-sm font-ui hover:border-foreground/20"
            >
              ← Back
            </Button>
          </div>
        </div>
      )
    }

    switch (currentType) {
      case "role":
        return renderRoleQuestions()
      case "project":
        return renderProjectQuestions()
      default:
        return (
          <div className="space-y-8">
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
              <Typography variant="body" className="text-destructive font-semibold">
                Unknown contact type. Please go back and select a valid contact type.
              </Typography>
            </div>
            <div className="flex justify-end pt-6">
              <Button
                onClick={handleBack}
                variant="outline"
                className="rounded-full border-border/50 px-6 py-2 text-sm font-ui hover:border-foreground/20"
              >
                ← Back
              </Button>
            </div>
          </div>
        )
    }
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
            onChange={(e) => {
              const currentAdditional = config.additional || {}
              updateConfig({ additional: { ...currentAdditional, message: e.target.value } })
            }}
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
    <div className="max-w-3xl mx-auto relative z-10">
      <ProgressIndicator 
        currentStep={step} 
        totalSteps={TOTAL_STEPS}
        onStepClick={handleStepClick}
        accessibleSteps={getAccessibleSteps()}
      />
      
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

