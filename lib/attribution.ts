export const ATTR_KEYS = {
  cid: "tk_cid",
  first: "tk_first",
  last: "tk_last",
  path: "tk_path",
  sid: "tk_sid",
  slat: "tk_slat",
} as const

const TOUCH_KEYS = [
  "landing_page",
  "referrer",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
  "msclkid",
  "fbclid",
  "li_fat_id",
] as const

export type TouchKey = (typeof TOUCH_KEYS)[number]

export type AttributionTouch = {
  [K in TouchKey]?: string
} & { at?: number }

export type Attribution = {
  client_id: string
  session_id: string
  first: AttributionTouch
  last: AttributionTouch
  path: string[]
}

export type TrackFn = (name: string, params?: Record<string, unknown>) => void

declare global {
  interface Window {
    tk?: {
      track: TrackFn
      attribution: () => Attribution
      q?: [string, Record<string, unknown> | undefined][]
    }
  }
}

function clip(value: unknown, max = 300): string | undefined {
  if (typeof value !== "string") return undefined
  const trimmed = value.trim()
  if (!trimmed) return undefined
  return trimmed.slice(0, max)
}

function parseTouch(raw: unknown): AttributionTouch {
  if (!raw || typeof raw !== "object") return {}
  const src = raw as Record<string, unknown>
  const out: AttributionTouch = {}
  for (const key of TOUCH_KEYS) {
    const value = clip(src[key], key === "landing_page" || key === "referrer" ? 500 : 200)
    if (value) out[key] = value
  }
  if (typeof src.at === "number" && Number.isFinite(src.at)) out.at = src.at
  return out
}

function parsePath(raw: unknown): string[] {
  if (!Array.isArray(raw)) return []
  return raw
    .map((item) => clip(item, 200))
    .filter((item): item is string => Boolean(item))
    .slice(0, 25)
}

function readJson(storage: Storage, key: string): unknown {
  try {
    const raw = storage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function emptyAttribution(): Attribution {
  return { client_id: "", session_id: "", first: {}, last: {}, path: [] }
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return emptyAttribution()
  const fromTk = window.tk?.attribution?.()
  if (fromTk?.client_id) return fromTk
  const first = parseTouch(readJson(localStorage, ATTR_KEYS.first))
  const last = parseTouch(readJson(sessionStorage, ATTR_KEYS.last))
  const path = parsePath(readJson(sessionStorage, ATTR_KEYS.path))
  return {
    client_id: clip(localStorage.getItem(ATTR_KEYS.cid), 64) || "",
    session_id: clip(sessionStorage.getItem(ATTR_KEYS.sid), 32) || "",
    first,
    last,
    path,
  }
}

export function sanitizeAttribution(raw: unknown): Attribution | null {
  if (!raw || typeof raw !== "object") return null
  const src = raw as Record<string, unknown>
  const client_id = clip(src.client_id, 64) || ""
  const session_id = clip(src.session_id, 32) || ""
  const first = parseTouch(src.first)
  const last = parseTouch(src.last)
  const path = parsePath(src.path)
  if (!client_id && !first.landing_page && !last.utm_source && path.length === 0) {
    return null
  }
  return { client_id, session_id, first, last, path }
}

export function campaignParams(touch: AttributionTouch): Record<string, string> {
  const params: Record<string, string> = {}
  if (touch.utm_source) params.source = touch.utm_source
  if (touch.utm_medium) params.medium = touch.utm_medium
  if (touch.utm_campaign) params.campaign = touch.utm_campaign
  if (touch.utm_term) params.term = touch.utm_term
  if (touch.utm_content) params.content = touch.utm_content
  if (touch.gclid) params.campaign_id = touch.gclid
  return params
}

export function formatAttributionEmail(attr: Attribution): string {
  const first = attr.first
  const last = attr.last
  const source = first.utm_source || last.utm_source || "(direct)"
  const medium = first.utm_medium || last.utm_medium || "(none)"
  const campaign = first.utm_campaign || last.utm_campaign || "(none)"
  const landing = first.landing_page || "(unknown)"
  const referrer = first.referrer || "(none)"
  const path = attr.path.length > 0 ? attr.path.join(" → ") : "(none)"
  return [
    "How they got here:",
    `- First source / medium: ${source} / ${medium}`,
    `- Campaign: ${campaign}`,
    `- Landing page: ${landing}`,
    `- Referrer: ${referrer}`,
    `- Session path: ${path}`,
    `- Client ID: ${attr.client_id || "(none)"}`,
  ].join("\n")
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return
  window.tk?.track(name, params)
}
