export type DemoPageId = "saas" | "fintech" | "marketing" | "kit"

export const DEMO_PAGES: {
  id: DemoPageId
  number: string
  title: string
  tagline: string
}[] = [
  { id: "saas", number: "01", title: "SaaS dashboard", tagline: "Operator control plane" },
  { id: "fintech", number: "02", title: "Fintech marketing", tagline: "Trust & pricing surfaces" },
  { id: "marketing", number: "03", title: "Product marketing", tagline: "Hero, features & proof" },
  { id: "kit", number: "04", title: "UI kit", tagline: "Primitives & tokens" },
]
