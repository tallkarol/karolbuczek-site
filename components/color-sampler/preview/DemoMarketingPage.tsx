import { ArrowRight, BarChart3, Check, Layers, LineChart, Plug, Sparkles, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DemoFooter, DemoNav, BrandSectionCard, StatusBadge } from "@/components/color-sampler/preview/shared"

export function DemoMarketingPage() {
  const logos = ["Vercel", "Linear", "Notion", "Stripe", "Figma", "Raycast"]

  return (
    <div>
      <DemoNav
        brand="Pulseboard"
        mark="PB"
        items={["Features", "Customers", "Pricing", "Docs"]}
        cta="Start trial"
        variant="dark"
      />

      <section className="kb-hero-inverse relative px-6 py-20 text-center lg:px-8 lg:py-24">
        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-slot-background/15 bg-slot-surface/5 px-3 py-1 font-ui text-[11px] text-text-inverse/80">
            <Sparkles className="h-3 w-3" />
            Analytics for product-led teams
          </p>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-text-inverse md:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
            Turn product usage into <span className="text-text-inverse/45">board-ready narratives.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-text-inverse/70">
            Pulseboard connects product analytics, revenue data, and experiment results — so growth, finance, and
            leadership read the same story.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="inverse" size="lg">
              Start 14-day trial
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline-inverse" size="lg">
              Watch demo
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background-primary py-8 dark:bg-background-alt">
        <p className="mb-6 text-center font-ui text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Trusted by product teams at
        </p>
        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-x-10 gap-y-4 px-6 opacity-60">
          {logos.map((logo) => (
            <span key={logo} className="font-ui text-sm font-semibold text-primary dark:text-text-inverse">
              {logo}
            </span>
          ))}
        </div>
      </section>

      <section className="bg-background px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="tk-eyebrow">Platform</p>
            <h2 className="tk-h2 mt-2">One workspace for the whole revenue story</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              { icon: LineChart, title: "Cohort intelligence", body: "Compare activation, retention, and expansion without exporting to slides." },
              { icon: Layers, title: "Metric layers", body: "Stack product, marketing, and finance KPIs with shared definitions." },
              { icon: Plug, title: "Native integrations", body: "Warehouse, billing, and experimentation tools connected in minutes." },
            ].map(({ icon: Icon, title, body }) => (
              <Card key={title} className="border-primary/12 bg-surface-card dark:border-slot-background/10 dark:bg-background-elevated">
                <CardHeader>
                  <div className="mb-3 inline-flex rounded bg-accent/10 p-2 text-accent dark:text-text-inverse">
                    <Icon className="h-4 w-4" />
                  </div>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">{body}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="kb-section-secondary px-6 py-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-semibold text-text-inverse">See what changed — and why it mattered.</h2>
            <p className="mt-4 text-sm leading-relaxed text-text-inverse/75">
              Annotate releases, campaigns, and pricing updates directly on trend lines. Export board packs in one click.
            </p>
            <ul className="mt-6 space-y-3">
              {["Executive summary templates", "Slack & email digests", "Role-based dashboards"].map((item) => (
                <li key={item} className="flex items-center gap-2 font-ui text-sm text-text-inverse">
                  <Check className="h-4 w-4 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <BrandSectionCard>
            <CardHeader>
              <CardTitle className="text-base">Expansion MRR · 90 days</CardTitle>
              <CardDescription>Enterprise segment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-40 items-end gap-2">
                {[35, 48, 44, 62, 58, 74, 81, 88].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-primary/25 dark:bg-slot-background/30"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <div>
                  <p className="font-ui text-[10px] uppercase tracking-wide text-muted-foreground">Net change</p>
                  <p className="font-display text-xl font-semibold">+24.8%</p>
                </div>
                <StatusBadge tone="success">On track</StatusBadge>
              </div>
            </CardContent>
          </BrandSectionCard>
        </div>
      </section>

      <section className="kb-section-background px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: BarChart3, value: "12M+", label: "Events tracked daily" },
              { icon: Users, value: "2,400", label: "Active workspaces" },
              { icon: LineChart, value: "38%", label: "Faster reporting cycles" },
              { icon: Sparkles, value: "4.8", label: "Average G2 rating" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="rounded-xl border border-primary/10 bg-surface-card p-5 dark:border-slot-background/10 dark:bg-background-elevated">
                <Icon className="mb-3 h-4 w-4 text-accent dark:text-text-inverse" />
                <p className="font-display text-2xl font-semibold">{value}</p>
                <p className="mt-1 font-ui text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kb-section-inverse px-6 py-16 text-center lg:px-8">
        <h2 className="font-display text-3xl font-semibold text-text-inverse">Make every stakeholder fluent in the numbers.</h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-text-inverse/75">
          Join teams who replaced monthly deck scrambles with a live narrative.
        </p>
        <div className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row">
          <Input placeholder="Work email" className="bg-slot-surface/95 dark:bg-background-alt" />
          <Button variant="inverse">Request access</Button>
        </div>
      </section>

      <DemoFooter
        brand="Pulseboard"
        tagline="Product analytics storytelling for teams who present to the board every quarter."
      />
    </div>
  )
}
