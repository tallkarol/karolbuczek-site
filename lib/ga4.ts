import { campaignParams, type Attribution } from "./attribution"

const EVENT_ALLOW = new Set([
  "page_view",
  "scroll",
  "cta_click",
  "outbound_click",
  "session_start",
  "user_engagement",
  "form_start",
  "form_step",
  "form_error",
  "generate_lead",
])

const PARAM_ALLOW = new Set([
  "page_location",
  "page_title",
  "page_referrer",
  "session_id",
  "engagement_time_msec",
  "debug_mode",
  "percent_scrolled",
  "cta_id",
  "cta_location",
  "link_url",
  "link_text",
  "outbound_type",
  "form_id",
  "form_step",
  "step_name",
  "fields",
  "project_types",
  "engagement_model",
  "event_id",
  "source",
  "medium",
  "campaign",
  "term",
  "content",
  "campaign_id",
])

const PII_KEYS = /email|e-mail|name|phone|tel|company|address|user_id/i

export type Ga4Event = {
  name: string
  params?: Record<string, unknown>
}

function clip(value: unknown, max = 500): string | number | boolean | undefined {
  if (typeof value === "boolean") return value
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value !== "string") return undefined
  const trimmed = value.trim()
  if (!trimmed) return undefined
  return trimmed.slice(0, max)
}

export function sanitizeEvent(raw: unknown): Ga4Event | null {
  if (!raw || typeof raw !== "object") return null
  const src = raw as Record<string, unknown>
  const name = typeof src.name === "string" ? src.name.trim() : ""
  if (!EVENT_ALLOW.has(name)) return null
  const params: Record<string, unknown> = {}
  if (src.params && typeof src.params === "object") {
    for (const [key, value] of Object.entries(src.params as Record<string, unknown>)) {
      if (!PARAM_ALLOW.has(key) || PII_KEYS.test(key)) continue
      const clean = clip(value, key === "page_location" || key === "link_url" ? 1000 : 400)
      if (clean !== undefined) params[key] = clean
    }
  }
  return { name, params }
}

let warnedMissing = false

export function ga4Configured() {
  return Boolean(process.env.GA4_MEASUREMENT_ID && process.env.GA4_API_SECRET)
}

export async function sendGa4Events(
  clientId: string,
  events: Ga4Event[],
  opts?: { sessionId?: string; debug?: boolean }
): Promise<boolean> {
  const measurementId = process.env.GA4_MEASUREMENT_ID
  const apiSecret = process.env.GA4_API_SECRET
  if (!measurementId || !apiSecret || !clientId || events.length === 0) {
    if (!warnedMissing) {
      warnedMissing = true
      console.warn("GA4 Measurement Protocol is not configured.")
    }
    return false
  }

  const debug = opts?.debug ?? process.env.NODE_ENV !== "production"
  const stamped = events.map((event) => {
    const params: Record<string, unknown> = { ...event.params }
    if (opts?.sessionId && params.session_id == null) {
      const sid = Number(opts.sessionId)
      params.session_id = Number.isFinite(sid) ? sid : opts.sessionId
    }
    if (params.engagement_time_msec == null) params.engagement_time_msec = 100
    if (debug) params.debug_mode = 1
    return { name: event.name, params }
  })

  const body = JSON.stringify({
    client_id: clientId,
    timestamp_micros: String(Date.now() * 1000),
    non_personalized_ads: true,
    events: stamped,
  })

  const endpoint = `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(
    measurementId
  )}&api_secret=${encodeURIComponent(apiSecret)}`

  try {
    if (debug) {
      const debugRes = await fetch(
        `https://www.google-analytics.com/debug/mp/collect?measurement_id=${encodeURIComponent(
          measurementId
        )}&api_secret=${encodeURIComponent(apiSecret)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
          cache: "no-store",
        }
      )
      const debugJson = (await debugRes.json().catch(() => null)) as {
        validationMessages?: { description?: string }[]
      } | null
      const messages = debugJson?.validationMessages || []
      if (messages.length > 0) {
        console.warn(
          "GA4 MP validation:",
          messages.map((row) => row.description).filter(Boolean).join("; ")
        )
      }
    }

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      cache: "no-store",
    })
    return res.ok
  } catch (err) {
    console.error("GA4 MP error:", err)
    return false
  }
}

export function leadEventFromInquiry(
  attr: Attribution | null,
  config: Record<string, unknown> | undefined,
  eventId: string
): Ga4Event {
  const engagement = config?.engagement as { model?: string } | undefined
  const projectTypes = Array.isArray(config?.projectTypes)
    ? (config.projectTypes as unknown[]).map(String).join(",")
    : ""
  const touch = attr?.last?.utm_source ? attr.last : attr?.first || {}
  return {
    name: "generate_lead",
    params: {
      form_id: engagement?.model ? "engagement" : "contact_configurator",
      ...(engagement?.model ? { engagement_model: String(engagement.model).slice(0, 80) } : {}),
      ...(projectTypes ? { project_types: projectTypes.slice(0, 200) } : {}),
      event_id: eventId,
      ...campaignParams(touch),
    },
  }
}
