"use client"

import { getContrastAudit, type AuditRow, type ColorSystem } from "@/lib/design-system"

const GRADE_STYLE: Record<AuditRow["grade"], string> = {
  AAA: "bg-emerald-100 text-emerald-800",
  AA: "bg-green-100 text-green-700",
  "AA-large": "bg-amber-100 text-amber-800",
  fail: "bg-red-100 text-red-700",
}

function isFail(r: AuditRow) {
  return r.grade === "fail" || (r.grade === "AA-large" && !r.large)
}

function AuditTable({ system, mode }: { system: ColorSystem; mode: "light" | "dark" }) {
  const rows = getContrastAudit(system, mode)
  const fails = rows.filter(isFail).length
  return (
    <div className="min-w-0">
      <div className="mb-2 flex items-center justify-between">
        <p className="font-ui text-[11px] font-semibold uppercase tracking-wider text-zinc-500 capitalize">{mode}</p>
        <span className={`rounded px-1.5 py-0.5 font-ui text-[10px] font-semibold ${fails ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
          {rows.length - fails}/{rows.length} AA
        </span>
      </div>
      <div className="space-y-1">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-2 rounded border border-zinc-100 bg-white px-2 py-1">
            <div className="flex shrink-0 overflow-hidden rounded border border-black/10">
              <span className="h-4 w-4" style={{ backgroundColor: r.bg }} />
              <span className="grid h-4 w-4 place-items-center text-[9px] font-bold" style={{ backgroundColor: r.bg, color: r.fg }}>A</span>
            </div>
            <span className="min-w-0 flex-1 truncate font-ui text-[11px] text-zinc-700">{r.label}</span>
            <span className="shrink-0 font-mono text-[10px] text-zinc-500">{r.ratio.toFixed(1)}</span>
            <span className={`shrink-0 rounded px-1 py-0.5 font-ui text-[9px] font-semibold uppercase ${GRADE_STYLE[r.grade]}`}>
              {r.grade === "AA-large" ? (r.large ? "AA" : "low") : r.grade}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** WCAG contrast audit of every foreground/background pair the system produces. */
export function ContrastAudit({ system }: { system: ColorSystem }) {
  return (
    <section className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
      <div className="mb-3">
        <p className="font-ui text-xs font-semibold uppercase tracking-wider text-zinc-600">Contrast audit · WCAG 2.1 AA</p>
        <p className="font-ui text-[11px] text-zinc-400">
          Every foreground/background pair the tokens produce. Foregrounds are auto-remediated to clear AA — adjust a slot and watch these stay legible.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <AuditTable system={system} mode="light" />
        <AuditTable system={system} mode="dark" />
      </div>
    </section>
  )
}
