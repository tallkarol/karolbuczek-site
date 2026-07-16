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
} from "recharts"
import type { CaseStudyPerformance } from "@/lib/case-study-performance"

const AFTER = "#059669"
const BEFORE = "hsl(var(--muted-foreground) / 0.35)"
const TRACK = "hsl(var(--border))"
const PIE_PALETTE = ["#059669", "#10b981", "#34d399", "#6ee7b7", "hsl(var(--foreground) / 0.3)"]

/** Dense half-column charts for client engagement dashboards. */
export function CompactDashboardCharts({ data }: { data: CaseStudyPerformance }) {
  const lighthouse = data.lighthouse?.slice(0, 4) ?? []
  const loadChartData =
    data.loadTimes?.slice(0, 4).map((m) => ({
      name: m.label,
      Before: m.before,
      After: m.after,
    })) ?? []

  const hasRequests = Boolean(data.requests)
  const hasComposition = Boolean(data.composition)

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {lighthouse.length > 0 && (
        <div className="rounded-lg border border-border/50 bg-muted/15 p-3">
          <p className="mb-2 text-[10px] font-ui font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {data.lighthouseTitle ?? "Lighthouse"}
          </p>
          <div className="grid grid-cols-2 gap-1">
            {lighthouse.map((metric) => {
              const pie = [
                { name: "score", value: metric.after },
                { name: "rest", value: Math.max(0, 100 - metric.after) },
              ]
              return (
                <div key={metric.label} className="flex flex-col items-center">
                  <div className="relative h-[72px] w-[72px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pie}
                          dataKey="value"
                          startAngle={90}
                          endAngle={-270}
                          innerRadius={22}
                          outerRadius={32}
                          stroke="none"
                          isAnimationActive={false}
                        >
                          <Cell fill={AFTER} />
                          <Cell fill={TRACK} />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-display text-sm font-semibold text-foreground">
                        {metric.after}
                      </span>
                      <span className="text-[9px] text-muted-foreground">was {metric.before}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{metric.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {loadChartData.length > 0 && (
        <div className="rounded-lg border border-border/50 bg-muted/15 p-3">
          <p className="mb-2 text-[10px] font-ui font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Load times
          </p>
          <div className="h-[140px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={loadChartData} barGap={2} barCategoryGap="24%">
                <XAxis
                  dataKey="name"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 11,
                  }}
                />
                <Bar dataKey="Before" fill={BEFORE} radius={[3, 3, 0, 0]} maxBarSize={16} />
                <Bar dataKey="After" fill={AFTER} radius={[3, 3, 0, 0]} maxBarSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {hasRequests && data.requests && (
        <>
          <RequestPie title="Requests before" total={data.requests.before} data={data.requests.beforeBreakdown} />
          <RequestPie title="Requests after" total={data.requests.after} data={data.requests.afterBreakdown} />
        </>
      )}

      {hasComposition && data.composition && (
        <>
          <RequestPie
            title={data.composition.beforeLabel}
            total={data.composition.beforeTotal}
            data={data.composition.before}
            totalIsLabel
          />
          <RequestPie
            title={data.composition.afterLabel}
            total={data.composition.afterTotal}
            data={data.composition.after}
            totalIsLabel
          />
        </>
      )}
    </div>
  )
}

function RequestPie({
  title,
  total,
  data,
  totalIsLabel,
}: {
  title: string
  total: string | number
  data: { name: string; value: number }[]
  totalIsLabel?: boolean
}) {
  return (
    <div className="rounded-lg border border-border/50 bg-muted/15 p-3">
      <div className="mb-1 flex items-baseline justify-between gap-2">
        <p className="text-[10px] font-ui font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {title}
        </p>
        <p className="font-display text-sm font-semibold text-foreground">
          {total}
          {!totalIsLabel && typeof total === "number" && (
            <span className="ml-1 text-[10px] font-ui font-normal text-muted-foreground">req</span>
          )}
        </p>
      </div>
      <div className="mx-auto h-[100px] w-[100px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={28}
              outerRadius={42}
              paddingAngle={2}
              stroke="none"
              isAnimationActive={false}
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
                fontSize: 11,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
