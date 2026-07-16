"use client"

import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { Typography } from "@/components/typography"
import type {
  CaseStudyPerformance,
  CompositionCompare,
  ScoreMetric,
} from "@/lib/case-study-performance"

/** Green = improvement. Avoid brand red for “good” metrics. */
const AFTER = "#059669"
const AFTER_TEXT = "text-emerald-700 dark:text-emerald-400"
const BEFORE = "hsl(var(--muted-foreground) / 0.35)"
const TRACK = "hsl(var(--border))"
const PIE_PALETTE = [
  "#059669",
  "#10b981",
  "#34d399",
  "#6ee7b7",
  "hsl(var(--foreground) / 0.35)",
  "hsl(var(--foreground) / 0.22)",
  "hsl(var(--muted-foreground) / 0.35)",
]

function formatTransfer(kb: number) {
  if (kb >= 1024) return `${(kb / 1024).toFixed(1)} MB`
  return `${Math.round(kb)} KB`
}

function ScoreDonut({ metric }: { metric: ScoreMetric }) {
  const data = [
    { name: "score", value: metric.after },
    { name: "rest", value: Math.max(0, 100 - metric.after) },
  ]

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-[120px] w-[120px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              innerRadius={40}
              outerRadius={54}
              stroke="none"
              isAnimationActive
            >
              <Cell fill={AFTER} />
              <Cell fill={TRACK} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-2xl font-semibold tracking-tight text-foreground">
            {metric.after}
          </span>
          <span className="text-[10px] font-ui uppercase tracking-wider text-muted-foreground">
            was {metric.before}
          </span>
        </div>
      </div>
      <Typography variant="body-sm" className="font-medium text-foreground">
        {metric.label}
      </Typography>
    </div>
  )
}

function ValueGauge({
  label,
  value,
  caption,
}: {
  label: string
  value: number
  caption: string
}) {
  const data = [
    { name: "score", value },
    { name: "rest", value: Math.max(0, 100 - value) },
  ]

  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-border/40 bg-muted/20 px-4 py-5">
      <div className="relative h-[120px] w-[120px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              innerRadius={40}
              outerRadius={54}
              stroke="none"
            >
              <Cell fill={value > 0 ? AFTER : TRACK} />
              <Cell fill={TRACK} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-display text-2xl font-semibold tracking-tight ${AFTER_TEXT}`}>
            {value}%
          </span>
        </div>
      </div>
      <Typography variant="body-sm" className="font-semibold text-foreground">
        {label}
      </Typography>
      <p className="text-center text-[11px] text-muted-foreground">{caption}</p>
    </div>
  )
}

function LoadTimeTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ name?: string; value?: number; color?: string }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-md border border-border/60 bg-background px-3 py-2 text-xs shadow-sm">
      {label && <div className="mb-1 font-semibold text-foreground">{label}</div>}
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-muted-foreground">
          <span className="h-2 w-2 rounded-full" style={{ background: entry.color }} />
          <span>
            {entry.name}: {entry.value}s
          </span>
        </div>
      ))}
    </div>
  )
}

function ResourceDonut({
  title,
  total,
  totalUnit = "requests",
  data,
}: {
  title: string
  total: string | number
  totalUnit?: string
  data: { name: string; value: number }[]
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-border/40 bg-muted/20 px-4 py-5">
      <div className="text-center">
        <Typography variant="body-sm" className="font-semibold text-foreground">
          {title}
        </Typography>
        <p className="mt-0.5 font-display text-2xl font-semibold tracking-tight text-foreground">
          {total}
          {typeof total === "number" && (
            <span className="ml-1 text-sm font-ui font-medium text-muted-foreground">{totalUnit}</span>
          )}
        </p>
      </div>
      <div className="h-[140px] w-full max-w-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={38}
              outerRadius={62}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((entry, i) => (
                <Cell key={entry.name} fill={PIE_PALETTE[i % PIE_PALETTE.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 8,
                fontSize: 12,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
        {data.slice(0, 5).map((entry, i) => (
          <span key={entry.name} className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: PIE_PALETTE[i % PIE_PALETTE.length] }}
            />
            {entry.name}
          </span>
        ))}
      </div>
    </div>
  )
}

function CompositionSection({ composition }: { composition: CompositionCompare }) {
  return (
    <div>
      <Typography variant="body-sm" className="mb-1 font-semibold text-foreground">
        {composition.title}
      </Typography>
      {composition.description && (
        <p className="mb-4 text-xs text-muted-foreground">{composition.description}</p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <ResourceDonut
          title={composition.beforeLabel}
          total={composition.beforeTotal}
          data={composition.before}
        />
        <ResourceDonut
          title={composition.afterLabel}
          total={composition.afterTotal}
          data={composition.after}
        />
      </div>
    </div>
  )
}

export function PerformanceImpactCharts({ data }: { data: CaseStudyPerformance }) {
  const loadChartData =
    data.loadTimes?.map((m) => ({
      name: m.label,
      Before: m.before,
      After: m.after,
    })) ?? []

  const transferReduction =
    data.transfer != null
      ? Math.round(
          ((data.transfer.beforeKb - data.transfer.afterKb) / data.transfer.beforeKb) * 100
        )
      : null

  const lighthouseCols =
    (data.lighthouse?.length ?? 0) >= 4
      ? "grid-cols-2 sm:grid-cols-4"
      : (data.lighthouse?.length ?? 0) === 1
        ? "grid-cols-1 place-items-center"
        : "grid-cols-2 sm:grid-cols-3"

  return (
    <div className="space-y-8">
      {data.headline && data.headline.length > 0 && (
        <div
          className={`grid gap-3 ${
            data.headline.length === 1
              ? "sm:grid-cols-1"
              : data.headline.length === 2
                ? "sm:grid-cols-2"
                : "sm:grid-cols-3"
          }`}
        >
          {data.headline.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-border/40 bg-muted/20 px-4 py-4 text-center"
            >
              <p className="text-[11px] font-ui font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {stat.label}
              </p>
              <p className="mt-2 font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                <span className="text-muted-foreground/70">
                  {stat.before}
                  {typeof stat.before === "number" ? stat.unit : ""}
                </span>
                <span className={`mx-2 ${AFTER_TEXT}`}>→</span>
                <span className={AFTER_TEXT}>
                  {stat.after}
                  {typeof stat.after === "number" ? stat.unit : ""}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}

      {data.gauges && data.gauges.length > 0 && (
        <div className={`grid gap-4 ${data.gauges.length === 1 ? "sm:grid-cols-1" : "sm:grid-cols-2"}`}>
          {data.gauges.map((gauge) => (
            <ValueGauge key={gauge.label} {...gauge} />
          ))}
        </div>
      )}

      {data.lighthouse && data.lighthouse.length > 0 && (
        <div>
          <Typography variant="body-sm" className="mb-4 font-semibold text-foreground">
            {data.lighthouseTitle ?? "Lighthouse scores"}
          </Typography>
          <div className={`grid gap-4 ${lighthouseCols}`}>
            {data.lighthouse.map((metric) => (
              <ScoreDonut key={metric.label} metric={metric} />
            ))}
          </div>
        </div>
      )}

      {data.loadTimes && data.loadTimes.length > 0 && (
        <div>
          <Typography variant="body-sm" className="mb-1 font-semibold text-foreground">
            Load times
          </Typography>
          <p className="mb-4 text-xs text-muted-foreground">
            {data.loadTimesNote ??
              "Lower is better — Core Web Vitals and interactive readiness on mobile."}
          </p>
          <div className="h-[220px] w-full rounded-lg border border-border/40 bg-muted/10 px-2 py-3 sm:px-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={loadChartData} barGap={4} barCategoryGap="28%">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  unit="s"
                  width={36}
                />
                <Tooltip content={<LoadTimeTooltip />} cursor={{ fill: "hsl(var(--muted) / 0.4)" }} />
                <Bar dataKey="Before" fill={BEFORE} radius={[4, 4, 0, 0]} maxBarSize={28} />
                <Bar dataKey="After" fill={AFTER} radius={[4, 4, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex items-center justify-center gap-4 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-sm" style={{ background: BEFORE }} />
              Before
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-sm" style={{ background: AFTER }} />
              After
            </span>
          </div>
        </div>
      )}

      {data.transfer && data.requests && transferReduction != null && (
        <div>
          <Typography variant="body-sm" className="mb-1 font-semibold text-foreground">
            Page weight &amp; requests
          </Typography>
          <p className="mb-4 text-xs text-muted-foreground">
            Initial load transferred {formatTransfer(data.transfer.beforeKb)} →{" "}
            {formatTransfer(data.transfer.afterKb)}
            <span className={AFTER_TEXT}> (−{transferReduction}%)</span>
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <ResourceDonut
              title="Before"
              total={data.requests.before}
              data={data.requests.beforeBreakdown}
            />
            <ResourceDonut
              title="After"
              total={data.requests.after}
              data={data.requests.afterBreakdown}
            />
          </div>
        </div>
      )}

      {data.composition && <CompositionSection composition={data.composition} />}
    </div>
  )
}
