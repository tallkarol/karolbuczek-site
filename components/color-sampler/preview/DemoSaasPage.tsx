import {
  Activity,
  ArrowRight,
  AlertCircle,
  Database,
  GitBranch,
  LayoutDashboard,
  Search,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  BrandSectionCard,
  DemoDeploymentCard,
  DemoFooter,
  DemoHeroStatsCard,
  DemoNav,
  StatusBadge,
} from "@/components/color-sampler/preview/shared"

export function DemoSaasPage() {
  const metrics = [
    { label: "Active pipelines", value: "24", delta: "+12%", icon: GitBranch },
    { label: "Sync latency", value: "1.2s", delta: "-18%", icon: Zap },
    { label: "Uptime (30d)", value: "99.97%", delta: "Stable", icon: Activity },
    { label: "Open incidents", value: "3", delta: "2 critical", icon: AlertCircle },
  ]

  return (
    <div>
      <DemoNav
        brand="Orbit Relay"
        mark="OR"
        items={["Overview", "Pipelines", "Observability", "Settings"]}
        cta="Create workspace"
        variant="dark"
      />

      <section className="kb-hero-inverse relative overflow-hidden px-6 py-14 lg:px-10 lg:py-18">
        <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-slot-background/15 bg-slot-surface/5 px-3 py-1 font-ui text-[11px] text-slot-background/80">
              <Sparkles className="h-3 w-3" />
              Release 2.14 · routing engine
            </p>
            <h1 className="max-w-xl font-display text-4xl font-semibold tracking-tight text-slot-background lg:text-[2.75rem] lg:leading-[1.05]">
              Ship integrations without <span className="text-slot-background/45">surprise 3 a.m. pages.</span>
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-slot-background/70">
              Declarative pipelines, observable retries, and environment-aware deploys for platform teams.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="inverse" size="lg">
                Start free workspace
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline-inverse" size="lg">
                View live sandbox
              </Button>
            </div>
          </div>
          <DemoHeroStatsCard />
        </div>
      </section>

      <section className="border-b border-border bg-background-primary px-6 py-8 dark:bg-background-alt lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map(({ label, value, delta, icon: Icon }) => (
            <Card key={label} className="border-primary/10 bg-surface-card dark:border-slot-background/10 dark:bg-background-elevated">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-ui text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
                    <p className="mt-1 font-display text-2xl font-semibold">{value}</p>
                    <p className="mt-1 font-ui text-xs text-accent dark:text-text-inverse/70">{delta}</p>
                  </div>
                  <div className="rounded bg-primary/8 p-2 text-primary dark:bg-slot-background/10 dark:text-text-inverse">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="kb-section-secondary px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="font-display text-2xl font-semibold text-text-inverse">Operator queue</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-text-inverse/75">
              Live workloads across environments — status, owner, and heartbeat in one view.
            </p>
          </div>
          <BrandSectionCard>
            <CardHeader className="flex-row items-center justify-between space-y-0 border-b border-border pb-4">
              <CardTitle className="text-base">Pipeline registry</CardTitle>
              <div className="relative hidden sm:block">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Filter…" className="h-8 w-44 pl-8 text-xs" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {[
                { name: "crm-webhook-ingest", env: "Production", status: "Healthy" as const, updated: "2m ago" },
                { name: "billing-reconcile", env: "Staging", status: "Deploying" as const, updated: "14m ago" },
                { name: "legacy-etl-bridge", env: "Production", status: "Degraded" as const, updated: "1h ago" },
              ].map((row) => (
                <div
                  key={row.name}
                  className="flex items-center justify-between gap-4 border-b border-border/60 px-4 py-3 text-sm last:border-0"
                >
                  <div>
                    <p className="font-medium">{row.name}</p>
                    <p className="font-ui text-[11px] text-muted-foreground">{row.env}</p>
                  </div>
                  <StatusBadge tone={row.status === "Healthy" ? "success" : row.status === "Deploying" ? "active" : "warning"}>
                    {row.status}
                  </StatusBadge>
                  <span className="font-ui text-xs text-muted-foreground">{row.updated}</span>
                </div>
              ))}
            </CardContent>
          </BrandSectionCard>
        </div>
      </section>

      <section className="kb-section-background px-6 py-14 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {[
            { icon: Database, title: "Unified data layer", body: "Normalize CRM, billing, and product events into one stream." },
            { icon: Shield, title: "Policy-aware routing", body: "RBAC gates, environment isolation, signed webhooks." },
            { icon: LayoutDashboard, title: "Operator dashboards", body: "Surface drift and failure clusters before tickets arrive." },
          ].map(({ icon: Icon, title, body }) => (
            <Card key={title} className="border-primary/12 bg-surface-card dark:border-slot-background/10 dark:bg-background-elevated">
              <CardHeader className="pb-2">
                <div className="mb-3 inline-flex rounded bg-accent/10 p-2 text-accent dark:bg-accent/25 dark:text-text-inverse">
                  <Icon className="h-4 w-4" />
                </div>
                <CardTitle className="text-lg">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">{body}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="kb-section-background px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="tk-h2 mb-6">Recent deployments</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {["Partner webhook mesh", "Warehouse sync controller"].map((title) => (
              <DemoDeploymentCard key={title} title={title} />
            ))}
          </div>
        </div>
      </section>

      <section className="kb-section-inverse px-6 py-16 text-center lg:px-8">
        <h2 className="font-display text-3xl font-semibold text-slot-background">Put your integrations on a control plane.</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-slot-background/75">Start free, invite your team, ship your first pipeline this week.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button variant="inverse" size="lg">Create workspace</Button>
          <Button variant="outline-inverse" size="lg">Book a walkthrough</Button>
        </div>
      </section>

      <DemoFooter
        brand="Orbit Relay"
        tagline="Integration infrastructure for teams that measure uptime in customer outcomes."
      />
    </div>
  )
}
