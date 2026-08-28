import { NextRequest, NextResponse } from "next/server"
import { ga4Configured, sanitizeEvent, sendGa4Events } from "@/lib/ga4"

export async function GET() {
  return NextResponse.json({
    ok: true,
    configured: ga4Configured(),
  })
}

const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 60
const hits = new Map<string, { count: number; reset: number }>()

function clientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  )
}

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const row = hits.get(ip)
  if (!row || now > row.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS })
    return false
  }
  row.count += 1
  return row.count > MAX_PER_WINDOW
}

export async function POST(request: NextRequest) {
  if (rateLimited(clientIp(request))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 })
  }

  const src = body as Record<string, unknown>
  const clientId = typeof src.client_id === "string" ? src.client_id.trim().slice(0, 64) : ""
  if (!clientId) {
    return NextResponse.json({ error: "client_id required" }, { status: 400 })
  }

  const rawEvents = Array.isArray(src.events) ? src.events : src.name ? [src] : []
  const events = rawEvents
    .slice(0, 10)
    .map(sanitizeEvent)
    .filter((event): event is NonNullable<typeof event> => Boolean(event))
    .filter((event) => event.name !== "generate_lead")

  if (events.length === 0) {
    return NextResponse.json({ error: "No valid events" }, { status: 400 })
  }

  const sessionId = typeof src.session_id === "string" ? src.session_id.trim().slice(0, 32) : undefined
  const debug =
    process.env.NODE_ENV !== "production" ||
    request.nextUrl.searchParams.get("debug") === "1"

  const forwarded = await sendGa4Events(clientId, events, { sessionId, debug })
  return NextResponse.json({ ok: true, forwarded })
}
