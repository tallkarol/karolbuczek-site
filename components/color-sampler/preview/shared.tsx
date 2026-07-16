import { ArrowUpRight } from "lucide-react"
import { Card, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function BrandSectionCard({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  return (
    <Card
      className={cn(
        "kb-surface-app overflow-hidden border-slot-neutral bg-slot-surface shadow-sm",
        className
      )}
      {...props}
    />
  )
}

/** Deployment preview card — inverse→primary gradient strip + surface footer */
export function DemoDeploymentCard({ title }: { title: string }) {
  return (
    <Card className="overflow-hidden border-slot-neutral bg-slot-surface shadow-sm">
      <div className="relative h-32 overflow-hidden bg-gradient-to-br from-slot-inverse via-slot-primary to-slot-accent/45 p-5">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,hsl(var(--slot-accent)/0.35),transparent_50%)]"
          aria-hidden
        />
        <StatusBadge tone="active">Production</StatusBadge>
        <p className="absolute bottom-4 left-5 font-display text-lg font-semibold text-slot-background">{title}</p>
      </div>
      <CardFooter className="kb-surface-app border-t border-slot-neutral px-5 py-4">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 font-ui text-sm font-semibold text-slot-primary hover:text-slot-primary/80"
        >
          Inspect release
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </CardFooter>
    </Card>
  )
}

/** Throughput / stats panel — surface card on inverse hero */
export function DemoHeroStatsCard() {
  const stats = [
    { k: "Ingest", v: "842K" },
    { k: "Delivered", v: "839K" },
    { k: "DLQ", v: "0.04%" },
  ]

  return (
    <BrandSectionCard className="border-slot-neutral shadow-sm">
      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-base font-semibold text-slot-primary">Throughput · 24h</h3>
            <p className="font-ui text-sm text-slot-neutral">us-east-1 · primary cluster</p>
          </div>
          <StatusBadge tone="success">Healthy</StatusBadge>
        </div>
        <MiniChart barSlot="primary" />
        <div className="grid grid-cols-3 gap-3 border-t border-slot-neutral pt-4">
          {stats.map((item) => (
            <div key={item.k}>
              <p className="font-ui text-[10px] uppercase tracking-wide text-slot-neutral">{item.k}</p>
              <p className="font-ui text-sm font-semibold text-slot-primary">{item.v}</p>
            </div>
          ))}
        </div>
      </div>
    </BrandSectionCard>
  )
}

export function SampleLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "mb-4 font-ui text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground",
        className
      )}
    >
      {children}
    </p>
  )
}

export function Avatar({ initials, className }: { initials: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-ui text-[11px] font-semibold text-primary dark:bg-slot-background/15 dark:text-text-inverse",
        className
      )}
    >
      {initials}
    </div>
  )
}

export function StatusBadge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode
  tone?: "success" | "warning" | "neutral" | "active"
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 font-ui text-[10px] font-semibold uppercase tracking-wide",
        tone === "success" && "bg-slot-accent/15 text-slot-accent",
        tone === "warning" && "bg-slot-background text-slot-primary",
        tone === "active" && "bg-slot-accent text-slot-surface",
        tone === "neutral" && "bg-slot-neutral/20 text-slot-neutral"
      )}
    >
      {children}
    </span>
  )
}

export function MiniChart({
  className,
  barSlot = "primary",
}: {
  className?: string
  barSlot?: "primary" | "secondary" | "accent" | "background" | "surface" | "inverse" | "neutral"
}) {
  const bars = [42, 68, 55, 82, 61, 94, 73, 88]
  const barClass = {
    primary: "bg-slot-primary/20",
    secondary: "bg-slot-secondary/20",
    accent: "bg-slot-accent/20",
    background: "bg-slot-background/20",
    surface: "bg-slot-surface/20",
    inverse: "bg-slot-inverse/20",
    neutral: "bg-slot-neutral/20",
  }[barSlot]

  return (
    <div className={cn("flex h-16 items-end gap-1", className)}>
      {bars.map((h, i) => (
        <div key={i} className={cn("flex-1 rounded-sm", barClass)} style={{ height: `${h}%` }} />
      ))}
    </div>
  )
}

export function TokenSwatch({ label, channels }: { label: string; channels: string }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="h-8 w-8 shrink-0 rounded border border-border-subtle"
        style={{ backgroundColor: `hsl(${channels})` }}
      />
      <div className="min-w-0">
        <p className="truncate font-mono text-[10px] text-muted-foreground">{label}</p>
        <p className="truncate font-mono text-[9px] text-text-tertiary">{channels}</p>
      </div>
    </div>
  )
}

export function DemoNav({
  brand,
  mark,
  items,
  cta,
  variant = "light",
}: {
  brand: string
  mark: string
  items: string[]
  cta: string
  variant?: "light" | "dark"
}) {
  const dark = variant === "dark"
  return (
    <header
      className={cn(
        "border-b px-5 py-4 lg:px-8",
        dark
          ? "border-slot-neutral/15 bg-slot-inverse/95 text-text-inverse"
          : "border-border bg-surface-card/95"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded font-ui text-xs font-bold",
              dark ? "bg-slot-background/10 text-text-inverse" : "bg-primary/10 text-primary"
            )}
          >
            {mark}
          </div>
          <span className={cn("font-ui text-sm font-semibold", dark && "text-text-inverse")}>{brand}</span>
        </div>
        <nav className="hidden items-center gap-1 md:flex">
          {items.map((item, i) => (
            <span
              key={item}
              className={cn(
                "rounded px-3 py-1.5 font-ui text-xs",
                i === 0
                  ? dark
                    ? "bg-slot-background/10 text-text-inverse"
                    : "bg-primary/8 font-medium text-primary"
                  : dark
                    ? "text-text-inverse/65"
                    : "text-muted-foreground"
              )}
            >
              {item}
            </span>
          ))}
        </nav>
        <span
          className={cn(
            "rounded-none px-4 py-2 font-ui text-xs font-semibold",
            dark ? "bg-slot-background text-primary" : "bg-primary text-primary-foreground"
          )}
        >
          {cta}
        </span>
      </div>
    </header>
  )
}

export function DemoFooter({ brand, tagline }: { brand: string; tagline: string }) {
  return (
    <footer className="kb-surface-inverse px-6 py-12 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-ui text-sm font-semibold text-text-inverse">{brand}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-text-inverse/65">{tagline}</p>
        </div>
        {[
          { heading: "Product", links: ["Features", "Pricing", "Security"] },
          { heading: "Company", links: ["About", "Careers", "Contact"] },
        ].map((col) => (
          <div key={col.heading}>
            <p className="font-ui text-xs font-semibold uppercase tracking-wide text-text-inverse/50">{col.heading}</p>
            <ul className="mt-3 space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <span className="font-ui text-sm text-text-inverse/75">{link}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl flex-wrap items-center justify-between gap-3 border-t border-slot-neutral/15 pt-6">
        <p className="font-ui text-xs text-text-inverse/55">© 2026 {brand} · Demo preview</p>
        <div className="flex gap-4 font-ui text-xs text-text-inverse/55">
          <span>Privacy</span>
          <span>Terms</span>
        </div>
      </div>
    </footer>
  )
}
