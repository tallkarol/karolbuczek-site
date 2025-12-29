export interface CoverLetter {
  id: string
  title: string
  company: string
  recipient?: string
  content: string
  date?: string
}

export const coverLetters: Record<string, CoverLetter> = {
  gametime: {
    id: "gametime",
    title: "Operations Automation Platform Engineer",
    company: "Gametime",
    recipient: "Gametime Engineering Team",
    content: `Hello Gametime Engineering Team,

Gametime's focus on uniting people through live experiences — while investing deeply in automation and AI to scale internal operations — strongly aligns with how I've built systems throughout my career.

I'm a senior systems-focused engineer and technical leader with over eight years of experience designing and delivering backend-heavy platforms, internal tooling, and automation workflows that sit at the intersection of engineering, operations, and business outcomes. Much of my work has involved identifying high-friction operational processes, partnering directly with non-technical stakeholders, and turning those workflows into reliable, scalable systems.

In recent roles, I've led the architecture and development of internal automation platforms supporting attribution, analytics, document security, CRM integrations, and operational pipelines. This includes designing REST-based ingestion systems, building automation frameworks that connect disparate third-party tools, and creating data pipelines and dashboards that enable teams to operate with clarity and speed. I've consistently balanced shipping pragmatic MVPs with designing systems that can mature into durable infrastructure.

I'm particularly excited by Gametime's investment in AI-powered internal tooling and agentic systems. I already use AI as a force multiplier in my development workflow and have built automation pipelines that leverage intelligent decision-making, event-driven logic, and observability-first design. I'm motivated by environments where experimentation is encouraged, and where engineers are empowered to shape not just the solution, but the problem definition itself.

Beyond hands-on engineering, I bring a strong product and leadership mindset. I've mentored engineers, led design discussions, guided architectural direction, and worked closely with marketing, operations, and leadership teams to translate real-world pain points into actionable technical roadmaps. I'm comfortable operating in ambiguity, aligning stakeholders, and driving momentum without sacrificing long-term system quality.

Gametime's Operations Automation Platform team represents exactly the kind of impact I want to have: building tools that quietly but fundamentally improve how a company operates at scale. I'd love the opportunity to contribute my experience in backend systems, automation, and cross-functional collaboration to help shape that future.

Thank you for your time and consideration. I look forward to the possibility of discussing how my background could support Gametime's mission and engineering culture.

Best regards,
Karol Buczek`,
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
  },
}

export function getCoverLetter(slug: string): CoverLetter | null {
  return coverLetters[slug] || null
}

export function getAllCoverLetters(): CoverLetter[] {
  return Object.values(coverLetters)
}


