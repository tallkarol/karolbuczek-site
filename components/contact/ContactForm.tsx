"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ContactFormProps {
  onSubmit?: (data: { name: string; email: string; subject?: string; message: string }) => void
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: { [key: string]: string } = {}
    if (!name.trim()) newErrors.name = "Name is required"
    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!message.trim()) newErrors.message = "Message is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim() || undefined,
          message: message.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      setSubmitStatus("success")
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
      setErrors({})

      if (onSubmit) {
        onSubmit({ name, email, subject, message })
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto border-border/50">
      <CardHeader className="pb-6">
        <CardTitle className="text-xl">Send a Message</CardTitle>
        <CardDescription className="mt-2">
          Fill out the form below and I&apos;ll get back to you within 24-48 hours.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
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
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">
              Subject <span className="text-muted-foreground text-xs">(Optional)</span>
            </Label>
            <Input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="What's this about?"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              Message <span className="text-destructive">*</span>
            </Label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value)
                if (errors.message) setErrors({ ...errors, message: "" })
              }}
              className={`flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                errors.message ? "border-destructive" : ""
              }`}
              placeholder="Tell me about your project or role..."
            />
            {errors.message && (
              <p className="text-xs text-destructive">{errors.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full font-ui"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>

        {submitStatus === "success" && (
          <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-sm text-primary font-semibold">
              ✓ Thank you! Your message has been sent. I&apos;ll be in touch soon.
            </p>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mt-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive font-semibold">
              Something went wrong. Please try again or{" "}
              <a href="mailto:karol@karolbuczek.com" className="underline">
                email me directly
              </a>
              .
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

