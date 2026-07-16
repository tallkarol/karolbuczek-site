import { ArrowRight, Check, CreditCard, Lock, PiggyBank, Shield, TrendingUp, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DemoFooter, DemoNav, StatusBadge } from "@/components/color-sampler/preview/shared"
import { cn } from "@/lib/utils"

export function DemoFintechPage() {
  const plans = [
    { name: "Personal", price: "$0", desc: "Everyday banking essentials", featured: false },
    { name: "Growth", price: "$19", desc: "Cashflow tools for freelancers", featured: true },
    { name: "Business", price: "$79", desc: "Multi-entity & approvals", featured: false },
  ]

  return (
    <div className="bg-background">
      <DemoNav
        brand="Northline"
        mark="NL"
        items={["Product", "Cards", "Pricing", "Company"]}
        cta="Open account"
      />

      <section className="kb-section-background px-6 py-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="tk-eyebrow">Modern banking for operators</p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight lg:text-5xl">
              Your money, <span className="text-muted-foreground">without the maze.</span>
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Northline combines business accounts, corporate cards, and treasury visibility in one premium
              surface — built for founders who still reconcile their own books.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg">
                Get started free
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Compare plans
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5" /> FDIC insured partners
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5" /> SOC2 Type II
              </span>
            </div>
          </div>

          <Card className="border-primary/12 bg-surface-card shadow-lg dark:border-slot-background/12 dark:bg-background-elevated">
            <CardHeader className="border-b border-border pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Business checking</CardTitle>
                  <CardDescription>•••• 4821 · Primary</CardDescription>
                </div>
                <StatusBadge tone="active">Active</StatusBadge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div>
                <p className="font-ui text-[10px] uppercase tracking-wide text-muted-foreground">Available balance</p>
                <p className="font-display text-4xl font-semibold tracking-tight">$128,420.18</p>
                <p className="mt-1 font-ui text-xs text-accent dark:text-text-inverse/70">+$12,400 this month</p>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Stripe payout", amount: "+$4,280.00", icon: TrendingUp },
                  { label: "AWS infrastructure", amount: "-$1,942.18", icon: CreditCard },
                  { label: "Payroll · Mar 15", amount: "-$18,400.00", icon: Wallet },
                ].map(({ label, amount, icon: Icon }) => (
                  <div key={label} className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="rounded bg-primary/8 p-1.5 text-primary dark:bg-slot-background/10 dark:text-text-inverse">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <span className="font-ui text-sm">{label}</span>
                    </div>
                    <span className="font-ui text-sm font-semibold">{amount}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-y border-border bg-background px-6 py-10 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: "$4.2B", label: "Processed annually" },
            { value: "99.99%", label: "Platform uptime" },
            { value: "180+", label: "Countries supported" },
            { value: "4.9/5", label: "Customer satisfaction" },
          ].map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="font-display text-2xl font-semibold">{stat.value}</p>
              <p className="mt-1 font-ui text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="kb-section-secondary px-6 py-14 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="font-display text-2xl font-semibold text-slot-background">Built for financial clarity</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slot-neutral">
              Every surface designed for trust — from onboarding to monthly statements.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { icon: PiggyBank, title: "Automated savings rules", body: "Round-ups, tax withholdings, and runway targets without spreadsheet formulas." },
              { icon: CreditCard, title: "Smart corporate cards", body: "Per-project limits, instant freezes, and receipt capture in the feed." },
              { icon: Shield, title: "Fraud monitoring", body: "Real-time risk scoring with human review for anomalous wire transfers." },
              { icon: Lock, title: "Granular permissions", body: "Approver chains, view-only accountants, and audit logs by default." },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-xl border border-slot-neutral bg-slot-surface p-6">
                <div className="mb-4 inline-flex rounded bg-slot-accent p-2 text-slot-surface">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="font-display text-lg font-semibold text-slot-primary">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slot-neutral">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background px-6 py-14 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="tk-eyebrow">Pricing</p>
          <h2 className="tk-h2 mt-2">Transparent plans that scale with you</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={cn(
                  "text-left",
                  plan.featured && "border-secondary/40 ring-2 ring-secondary/20 dark:border-secondary/50"
                )}
              >
                <CardHeader>
                  {plan.featured && <StatusBadge tone="active">Most popular</StatusBadge>}
                  <CardTitle className="mt-2">{plan.name}</CardTitle>
                  <p className="font-display text-3xl font-semibold">
                    {plan.price}
                    <span className="font-ui text-sm font-normal text-muted-foreground">/mo</span>
                  </p>
                  <CardDescription>{plan.desc}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {["No monthly minimums", "Virtual cards included", "Email support"].map((f) => (
                    <p key={f} className="flex items-center gap-2 font-ui text-sm text-muted-foreground">
                      <Check className="h-3.5 w-3.5 text-accent" /> {f}
                    </p>
                  ))}
                  <Button className="mt-4 w-full" variant={plan.featured ? "default" : "outline"}>
                    Choose {plan.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="kb-section-inverse px-6 py-14 text-center lg:px-8">
        <blockquote className="mx-auto max-w-2xl font-display text-2xl text-text-inverse md:text-3xl">
          &ldquo;We moved treasury ops off three banks and two spreadsheets. Northline is the first financial product
          our finance lead actually enjoys opening.&rdquo;
        </blockquote>
        <p className="mt-6 font-ui text-sm text-text-inverse/70">James Okonkwo · CFO, Meridian Studio</p>
      </section>

      <DemoFooter
        brand="Northline"
        tagline="Premium business banking for teams that treat cashflow as a product surface."
      />
    </div>
  )
}
