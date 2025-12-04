import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const getResend = () => {
  if (!process.env.RESEND_API_KEY) {
    return null
  }
  return new Resend(process.env.RESEND_API_KEY)
}

export async function POST(request: NextRequest) {
  try {
    const resend = getResend()

    if (!resend) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      )
    }

    const body = await request.json()
    
    // Handle both old format (simple form) and new format (configurator)
    const isConfigurator = body.config && body.contact
    const name = isConfigurator ? body.contact.name : body.name
    const email = isConfigurator ? body.contact.email : body.email
    const subject = body.subject || ""
    const message = isConfigurator 
      ? (body.config.additional?.message || "No additional message provided")
      : body.message
    const config = body.config || {}

    if (!email || !name) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      )
    }

    // Format config details for email
    const formatConfigDetails = () => {
      if (!isConfigurator) return ""
      
      let details = "\n\nContact Type(s):\n"
      if (config.contactTypes && config.contactTypes.length > 0) {
        details += config.contactTypes.map((t: string) => `- ${t.charAt(0).toUpperCase() + t.slice(1)}`).join("\n")
      }
      
      if (config.role) {
        details += "\n\nRole Details:\n"
        if (config.role.type) details += `Type: ${config.role.type}\n`
        if (config.role.level) details += `Level: ${config.role.level}\n`
        if (config.role.location) details += `Location: ${config.role.location}\n`
        if (config.role.startDate) details += `Start Date: ${config.role.startDate}\n`
      }
      
      if (config.project) {
        details += "\n\nProject Details:\n"
        if (config.project.type) details += `Type: ${config.project.type}\n`
        if (config.project.scope) details += `Scope: ${config.project.scope}\n`
        if (config.project.timeline) details += `Timeline: ${config.project.timeline}\n`
      }
      
      if (config.contact?.company) {
        details += `\nCompany: ${config.contact.company}\n`
      }
      
      return details
    }

    // Send email to you
    const { data, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "karol@karolbuczek.com",
      replyTo: email,
      subject: subject
        ? `Contact Form: ${subject}`
        : `New Contact Form Submission from ${name}`,
      text: `
New contact form submission from karolbuczek.com:

Name: ${name}
Email: ${email}
${subject ? `Subject: ${subject}` : ""}
${isConfigurator ? formatConfigDetails() : ""}

Message:
${message}

---
This email was sent from your contact form at karolbuczek.com
      `.trim(),
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: hsl(222.2, 47.4%, 11.2%); margin-bottom: 24px;">New Contact Form Submission</h2>
          
          <div style="background: hsl(210, 40%, 96.1%); padding: 20px; border-radius: 8px; margin-bottom: 24px;">
            <h3 style="color: hsl(222.2, 47.4%, 11.2%); margin-top: 0;">Contact Information</h3>
            <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${config.contact?.company ? `<p style="margin: 8px 0;"><strong>Company:</strong> ${config.contact.company}</p>` : ""}
            ${subject ? `<p style="margin: 8px 0;"><strong>Subject:</strong> ${subject}</p>` : ""}
          </div>

          ${isConfigurator && config.contactTypes && config.contactTypes.length > 0 ? `
          <div style="background: #F9F9F9; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
            <h3 style="color: hsl(222.2, 47.4%, 11.2%); margin-top: 0;">Contact Type(s)</h3>
            <p>${config.contactTypes.map((t: string) => t.charAt(0).toUpperCase() + t.slice(1)).join(", ")}</p>
            ${config.role ? `<p style="margin-top: 12px;"><strong>Role:</strong> ${config.role.type || ""} ${config.role.level || ""} ${config.role.location || ""}</p>` : ""}
            ${config.project ? `<p style="margin-top: 12px;"><strong>Project:</strong> ${config.project.type || ""} - ${config.project.timeline || ""}</p>` : ""}
          </div>
          ` : ""}

          <div style="background: #F9F9F9; padding: 20px; border-radius: 8px; white-space: pre-wrap; font-family: system-ui; font-size: 14px; line-height: 1.6; color: hsl(222.2, 47.4%, 11.2%);">
            <strong>Message:</strong><br>
            ${message.replace(/\n/g, "<br>")}
          </div>

          <p style="margin-top: 24px; color: #666; font-size: 12px;">
            This email was sent from your contact form at karolbuczek.com
          </p>
        </div>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      )
    }

    // Optionally send a confirmation email to the user
    if (email) {
      await resend.emails.send({
        from: "Karol Buczek <onboarding@resend.dev>",
        to: email,
        subject: "Thanks for reaching out!",
        text: `
Hi ${name},

Thanks for getting in touch! I've received your message and will review it shortly.

I'll get back to you within 24-48 hours.

Best,
Karol Buczek
        `.trim(),
        html: `
          <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: hsl(222.2, 47.4%, 11.2%);">Thanks for reaching out!</h2>
            <p>Hi ${name},</p>
            <p>Thanks for getting in touch! I've received your message and will review it shortly.</p>
            <p>I'll get back to you within 24-48 hours.</p>
            <p>Best,<br>Karol Buczek</p>
          </div>
        `,
      })
    }

    return NextResponse.json({ success: true, messageId: data?.id })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

