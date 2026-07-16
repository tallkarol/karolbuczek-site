"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { DEMO_PAGES, type DemoPageId } from "@/components/color-sampler/preview/demo-pages"
import { cn } from "@/lib/utils"

type DemoPageSwitcherProps = {
  active: DemoPageId
  onChange: (id: DemoPageId) => void
}

export function DemoPageSwitcher({ active, onChange }: DemoPageSwitcherProps) {
  const index = DEMO_PAGES.findIndex((p) => p.id === active)
  const current = DEMO_PAGES[index] ?? DEMO_PAGES[0]

  const go = (delta: number) => {
    const next = DEMO_PAGES[(index + delta + DEMO_PAGES.length) % DEMO_PAGES.length]
    onChange(next.id)
  }

  return (
    <div className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
      <div className="flex items-center gap-3 px-4 py-3 lg:px-6">
        <div className="min-w-0 flex-1">
          <p className="font-ui text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Demo pages
          </p>
          <p className="truncate font-ui text-sm font-semibold text-foreground">
            Page {current.number} · {current.title}
          </p>
          <p className="truncate font-ui text-xs text-muted-foreground">{current.tagline}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => go(-1)}
            className="flex h-8 w-8 items-center justify-center rounded border border-border text-muted-foreground hover:bg-muted"
            aria-label="Previous demo page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="flex h-8 w-8 items-center justify-center rounded border border-border text-muted-foreground hover:bg-muted"
            aria-label="Next demo page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto px-4 pb-3 lg:px-6">
        {DEMO_PAGES.map((page) => (
          <button
            key={page.id}
            type="button"
            onClick={() => onChange(page.id)}
            className={cn(
              "shrink-0 rounded-lg border px-3 py-2 text-left transition-colors",
              active === page.id
                ? "border-primary/25 bg-primary/8 dark:border-slot-background/25 dark:bg-slot-background/10"
                : "border-border bg-surface-card hover:border-primary/15 dark:hover:border-slot-background/15"
            )}
          >
            <p className="font-ui text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              Page {page.number}
            </p>
            <p className="font-ui text-xs font-semibold text-foreground">{page.title}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
