import { Bell, Clock, Mail, Search, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, SampleLabel, StatusBadge, TokenSwatch } from "@/components/color-sampler/preview/shared"
import { cn } from "@/lib/utils"

type DemoKitPageProps = {
  tokenSwatches: [string, string][]
}

export function DemoKitPage({ tokenSwatches }: DemoKitPageProps) {
  return (
    <div className="bg-background">
      <section className="border-b border-border px-6 py-12 lg:px-8">
        <SampleLabel>Component library</SampleLabel>
        <h1 className="tk-h2">UI kit &amp; tokens</h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Primitives and derived tokens used across all demo pages — stress-test contrast before shipping to production.
        </p>

        <div className="mt-10">
          <p className="mb-3 font-ui text-xs font-semibold uppercase tracking-wider text-muted-foreground">Buttons</p>
          <div className="flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="inverse">Inverse</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="outline-inverse">Outline inverse</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div>
            <p className="mb-3 font-ui text-xs font-semibold uppercase tracking-wider text-muted-foreground">Typography</p>
            <p className="tk-eyebrow">Release notes</p>
            <h2 className="tk-h3 mt-2">Section heading</h2>
            <p className="tk-body mt-2">Body on background canvas.</p>
            <p className="tk-body-sm mt-2 text-muted-foreground">Muted metadata line.</p>
          </div>
          <div>
            <p className="mb-3 font-ui text-xs font-semibold uppercase tracking-wider text-muted-foreground">Forms</p>
            <Label htmlFor="kit-email">Email</Label>
            <Input id="kit-email" placeholder="you@company.com" className="mt-1.5" />
            <Label htmlFor="kit-search" className="mt-3 block">
              Search
            </Label>
            <div className="relative mt-1.5">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="kit-search" placeholder="Filter…" className="pl-9" />
            </div>
          </div>
          <div>
            <p className="mb-3 font-ui text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</p>
            <div className="flex flex-wrap gap-2">
              <StatusBadge tone="success">Healthy</StatusBadge>
              <StatusBadge tone="active">Active</StatusBadge>
              <StatusBadge tone="warning">Warning</StatusBadge>
              <StatusBadge tone="neutral">Draft</StatusBadge>
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-lg border border-border bg-surface-card p-3">
              <Avatar initials="MR" />
              <div>
                <p className="font-ui text-sm font-medium">Morgan Reyes</p>
                <p className="flex items-center gap-1 font-ui text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> Active 4m ago
                </p>
              </div>
              <Button size="icon" variant="ghost" className="ml-auto h-8 w-8">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="kb-section-secondary rounded-lg p-6">
            <p className="font-ui text-[10px] font-semibold uppercase tracking-widest text-text-inverse/55">Process canvas</p>
            <h3 className="mt-2 font-display text-lg font-semibold text-text-inverse">Secondary brand environment</h3>
            <p className="mt-2 text-sm text-text-inverse/75">Full-bleed secondary for operational sections.</p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Notification preferences</CardTitle>
              <CardDescription>Toggle channels for your workspace.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { icon: Mail, label: "Email digests", on: true },
                { icon: Bell, label: "Pager alerts", on: true },
                { icon: User, label: "Mentions", on: false },
              ].map(({ icon: Icon, label, on }) => (
                <div key={label} className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="font-ui text-sm">{label}</span>
                  </div>
                  <div className={cn("h-5 w-9 rounded-full p-0.5", on ? "bg-secondary" : "bg-muted")}>
                    <div className={cn("h-4 w-4 rounded-full bg-slot-surface shadow-sm transition-transform", on && "translate-x-4")} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-t border-border px-4 py-8 lg:px-8">
        <SampleLabel>7-slot tokens + derived</SampleLabel>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {tokenSwatches.map(([name, channels]) => (
            <TokenSwatch key={name} label={name} channels={channels} />
          ))}
        </div>
      </section>
    </div>
  )
}
