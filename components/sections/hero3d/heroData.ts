/**
 * Static scene data for the homepage WebGL hero, ported from the approved
 * prototype (public/webgl-sample/karol-premium-webgl-dashboard-hero.html).
 * All coordinates for panel content are in "unit panel space": the panel body
 * is a 1x1x1 box that gets scaled by PanelSpec.size, and content inherits
 * that scale (matching the prototype's matrix composition).
 */

export type Vec3 = [number, number, number]

export type PanelKind = "spark" | "spark-small" | "bars" | "kpis" | "table" | "nodes"

/* KB 7-slot palette — sRGB 0-1, matches globals.css Karol brand */
export const SLOT_PRIMARY: Vec3 = [0.051, 0.231, 0.4]
export const SLOT_SECONDARY: Vec3 = [0.278, 0.294, 0.141]
export const SLOT_ACCENT: Vec3 = [0.353, 0.384, 0.188]
export const SLOT_BACKGROUND: Vec3 = [0.98, 0.941, 0.792]
export const SLOT_SURFACE: Vec3 = [1, 1, 1]
export const SLOT_INVERSE: Vec3 = [0.031, 0.114, 0.196]
export const SLOT_NEUTRAL: Vec3 = [0.51, 0.541, 0.584]

/** Content / wireframe accents (cream, olive, slate — chart ink on panels) */
export const CREAM: Vec3 = SLOT_BACKGROUND
export const OLIVE: Vec3 = SLOT_ACCENT
export const SLATE: Vec3 = SLOT_NEUTRAL

/** Per-system body tints — lifted slot hues so panels read as distinct dashboards, not black slabs */
export const BODY_HUB: Vec3 = [0.1, 0.22, 0.38]
export const GLASS_HUB: Vec3 = [0.22, 0.38, 0.58]

export const BODY_TELEMETRY: Vec3 = [0.11, 0.26, 0.44]
export const GLASS_TELEMETRY: Vec3 = [0.2, 0.36, 0.54]

export const BODY_PIPELINE: Vec3 = [0.3, 0.32, 0.18]
export const GLASS_PIPELINE: Vec3 = [0.42, 0.44, 0.28]

export const BODY_IDENTITY: Vec3 = [0.34, 0.38, 0.22]
export const GLASS_IDENTITY: Vec3 = [0.46, 0.5, 0.32]

export const BODY_CUSTOMER360: Vec3 = [0.14, 0.2, 0.34]
export const GLASS_CUSTOMER360: Vec3 = [0.26, 0.34, 0.48]

export const BODY_OBSERVABILITY: Vec3 = [0.36, 0.4, 0.46]
export const GLASS_OBSERVABILITY: Vec3 = [0.48, 0.52, 0.58]

export const BODY_WORKFLOW: Vec3 = [0.26, 0.3, 0.2]
export const GLASS_WORKFLOW: Vec3 = [0.38, 0.42, 0.3]

/** @deprecated Use per-panel body colors */
export const PANEL_BODY: Vec3 = BODY_TELEMETRY
/** @deprecated Use BODY_HUB */
export const HUB_BODY: Vec3 = BODY_HUB
/** @deprecated Use per-panel glass colors */
export const GLASS_PANEL: Vec3 = GLASS_TELEMETRY

/* ---------------------------------------------------------------- helpers */

export function rectLines(x1: number, y1: number, x2: number, y2: number, z: number): number[] {
  return [x1, y1, z, x2, y1, z, x2, y1, z, x2, y2, z, x2, y2, z, x1, y2, z, x1, y2, z, x1, y1, z]
}

export function polyline(points: [number, number][], z: number): number[] {
  const out: number[] = []
  for (let i = 0; i < points.length - 1; i++) {
    out.push(points[i][0], points[i][1], z, points[i + 1][0], points[i + 1][1], z)
  }
  return out
}

/* ----------------------------------------------------------------- panels */

export interface PanelSpec {
  key: string
  pos: Vec3
  size: Vec3
  rot: Vec3
  kind: PanelKind
  body: Vec3
  glass: Vec3
  edge: Vec3
}

export const PANELS: PanelSpec[] = [
  {
    key: "telemetry",
    pos: [-1.7, 0.98, -0.1],
    size: [1.06, 0.62, 0.07],
    rot: [0.08, 0.2, -0.1],
    kind: "spark",
    body: BODY_TELEMETRY,
    glass: GLASS_TELEMETRY,
    edge: SLOT_BACKGROUND,
  },
  {
    key: "pipeline",
    pos: [1.52, 0.84, 0.1],
    size: [1.02, 0.72, 0.07],
    rot: [-0.06, -0.18, 0.07],
    kind: "bars",
    body: BODY_PIPELINE,
    glass: GLASS_PIPELINE,
    edge: SLOT_ACCENT,
  },
  {
    key: "identity",
    pos: [-1.56, -0.92, 0.18],
    size: [0.98, 0.68, 0.07],
    rot: [0.05, 0.23, 0.05],
    kind: "kpis",
    body: BODY_IDENTITY,
    glass: GLASS_IDENTITY,
    edge: SLOT_BACKGROUND,
  },
  {
    key: "customer360",
    pos: [1.34, -1.0, -0.12],
    size: [1.14, 0.74, 0.07],
    rot: [-0.05, -0.16, -0.05],
    kind: "table",
    body: BODY_CUSTOMER360,
    glass: GLASS_CUSTOMER360,
    edge: SLOT_NEUTRAL,
  },
  {
    key: "observability",
    pos: [0.0, 1.56, -0.34],
    size: [0.88, 0.5, 0.06],
    rot: [0.03, 0.02, 0.03],
    kind: "spark-small",
    body: BODY_OBSERVABILITY,
    glass: GLASS_OBSERVABILITY,
    edge: SLOT_BACKGROUND,
  },
  {
    key: "workflow",
    pos: [0.02, -1.58, 0.24],
    size: [0.92, 0.52, 0.06],
    rot: [-0.03, -0.02, -0.03],
    kind: "nodes",
    body: BODY_WORKFLOW,
    glass: GLASS_WORKFLOW,
    edge: SLOT_ACCENT,
  },
]

/* ---------------------------------------------------------------- network */

export const HUB_ANCHORS: Vec3[] = [
  [-0.52, 0.28, 0.18],
  [0.54, 0.24, 0.16],
  [-0.48, -0.26, 0.16],
  [0.5, -0.28, 0.14],
  [0.0, 0.42, 0.05],
  [0.0, -0.44, 0.05],
]

export const PANEL_ANCHORS: Vec3[] = PANELS.map((p, i) => {
  if (i === 0) return [p.pos[0] + 0.54, p.pos[1] - 0.02, p.pos[2] + 0.01]
  if (i === 1) return [p.pos[0] - 0.54, p.pos[1] - 0.02, p.pos[2] + 0.01]
  if (i === 2) return [p.pos[0] + 0.5, p.pos[1] + 0.02, p.pos[2] + 0.01]
  if (i === 3) return [p.pos[0] - 0.58, p.pos[1] + 0.02, p.pos[2] + 0.01]
  if (i === 4) return [p.pos[0], p.pos[1] - 0.3, p.pos[2] + 0.01]
  return [p.pos[0], p.pos[1] + 0.3, p.pos[2] + 0.01]
})

export interface ArcSpec {
  from: Vec3
  to: Vec3
  lift: number
  steps: number
}

export const ARCS: ArcSpec[] = [
  ...PANEL_ANCHORS.map((a, i): ArcSpec => ({ from: a, to: HUB_ANCHORS[i], lift: 0.22, steps: 18 })),
  { from: HUB_ANCHORS[0], to: HUB_ANCHORS[1], lift: 0.08, steps: 12 },
  { from: HUB_ANCHORS[2], to: HUB_ANCHORS[3], lift: 0.08, steps: 12 },
  { from: HUB_ANCHORS[4], to: HUB_ANCHORS[5], lift: 0.08, steps: 12 },
]

/** Point on the quadratic arc between two anchors at parameter t in [0, 1]. */
export function arcPoint(arc: ArcSpec, t: number): Vec3 {
  const { from: p, to: q, lift } = arc
  const mx = (p[0] + q[0]) * 0.5
  const my = (p[1] + q[1]) * 0.5
  const mz = (p[2] + q[2]) * 0.5 + lift
  const it = 1 - t
  return [
    it * it * p[0] + 2 * it * t * mx + t * t * q[0],
    it * it * p[1] + 2 * it * t * my + t * t * q[1],
    it * it * p[2] + 2 * it * t * mz + t * t * q[2],
  ]
}

export function buildArcSegments(): Float32Array {
  const out: number[] = []
  for (const arc of ARCS) {
    let prev = arcPoint(arc, 0)
    for (let i = 1; i <= arc.steps; i++) {
      const cur = arcPoint(arc, i / arc.steps)
      out.push(...prev, ...cur)
      prev = cur
    }
  }
  return new Float32Array(out)
}

/* ------------------------------------------------- panel content: lines */

export const SPARK_A_LINES = new Float32Array([
  ...rectLines(-0.38, -0.18, 0.38, 0.18, 0.54),
  ...polyline([[-0.32, -0.08], [-0.24, -0.06], [-0.16, -0.1], [-0.05, 0.02], [0.02, 0.08], [0.12, 0.01], [0.22, 0.12], [0.32, 0.09]], 0.55),
  ...polyline([[-0.36, -0.08], [0.36, -0.08]], 0.545),
  ...polyline([[-0.36, 0.02], [0.36, 0.02]], 0.545),
])

export const SPARK_B_LINES = new Float32Array([
  ...rectLines(-0.35, -0.17, 0.35, 0.15, 0.54),
  ...polyline([[-0.3, -0.06], [-0.22, 0.02], [-0.14, -0.02], [-0.04, 0.09], [0.08, 0.06], [0.18, 0.13], [0.28, 0.03]], 0.55),
  ...polyline([[-0.33, -0.08], [0.33, -0.08]], 0.545),
])

export const TABLE_LINES = new Float32Array([
  ...rectLines(-0.38, -0.18, 0.38, 0.19, 0.54),
  ...polyline([[-0.34, 0.09], [0.34, 0.09]], 0.55),
  ...polyline([[-0.34, 0.02], [0.34, 0.02]], 0.55),
  ...polyline([[-0.34, -0.05], [0.34, -0.05]], 0.55),
  ...polyline([[-0.34, -0.12], [0.34, -0.12]], 0.55),
  ...polyline([[-0.08, 0.16], [-0.08, -0.16]], 0.55),
  ...polyline([[0.12, 0.16], [0.12, -0.16]], 0.55),
])

export const NODE_LINES = new Float32Array([
  ...rectLines(-0.35, -0.18, 0.35, 0.18, 0.54),
  ...polyline([[-0.23, 0.06], [-0.06, 0.12], [0.07, 0.02], [0.23, 0.12]], 0.55),
  ...polyline([[-0.23, 0.06], [-0.12, -0.06]], 0.55),
  ...polyline([[0.07, 0.02], [0.12, -0.09]], 0.55),
  ...polyline([[-0.12, -0.06], [0.12, -0.09]], 0.55),
])

export const FLOW_LINES = new Float32Array([
  ...rectLines(-0.4, -0.19, 0.4, 0.19, 0.54),
  ...polyline([[-0.32, 0.06], [-0.14, 0.06]], 0.55),
  ...polyline([[-0.08, 0.06], [0.08, 0.06]], 0.55),
  ...polyline([[0.14, 0.06], [0.31, 0.06]], 0.55),
  ...polyline([[-0.24, -0.07], [-0.06, -0.07]], 0.55),
  ...polyline([[0.0, -0.07], [0.19, -0.07]], 0.55),
  ...polyline([[0.18, 0.12], [0.18, -0.12]], 0.55),
  ...polyline([[-0.18, 0.12], [-0.18, -0.12]], 0.55),
])

export const KPI_LINES = new Float32Array([
  ...rectLines(-0.34, -0.2, -0.02, -0.01, 0.55),
  ...rectLines(0.02, -0.2, 0.34, -0.01, 0.55),
  ...polyline([[-0.3, -0.13], [-0.24, -0.08], [-0.18, -0.11], [-0.1, -0.04]], 0.56),
  ...polyline([[0.06, -0.12], [0.14, -0.04], [0.22, -0.08], [0.3, 0.02]], 0.56),
])

export const HUB_LINES = new Float32Array([
  ...rectLines(-0.4, -0.24, 0.4, 0.24, 0.56),
  ...polyline([[-0.34, 0.1], [-0.12, 0.1]], 0.56),
  ...polyline([[-0.08, 0.1], [0.08, 0.1]], 0.56),
  ...polyline([[0.14, 0.1], [0.33, 0.1]], 0.56),
  ...polyline([[-0.34, -0.02], [-0.04, -0.02]], 0.56),
  ...polyline([[0.06, -0.02], [0.33, -0.02]], 0.56),
  ...polyline([[-0.26, -0.15], [-0.12, -0.15]], 0.56),
  ...polyline([[0.02, -0.15], [0.18, -0.15]], 0.56),
  ...polyline([[-0.22, 0.18], [-0.22, -0.18]], 0.56),
  ...polyline([[0.22, 0.18], [0.22, -0.18]], 0.56),
  ...polyline([[-0.02, 0.18], [-0.02, -0.18]], 0.56),
])

/* ------------------------------------------------- panel content: boxes */

export interface BoxSpec {
  position: Vec3
  scale: Vec3
  color: Vec3
  opacity: number
}

/** Title bar + status chip shared by every panel. */
export const HEADER_BOXES: BoxSpec[] = [
  { position: [0, 0.36, 0.42], scale: [0.82, 0.08, 0.22], color: CREAM, opacity: 0.18 },
  { position: [0.28, 0.36, 0.46], scale: [0.12, 0.05, 0.16], color: OLIVE, opacity: 0.62 },
]

export const SPARK_CHIPS: BoxSpec[] = [
  { position: [-0.18, -0.3, 0.44], scale: [0.22, 0.05, 0.12], color: SLATE, opacity: 0.3 },
  { position: [0.12, -0.3, 0.44], scale: [0.18, 0.05, 0.12], color: OLIVE, opacity: 0.5 },
]

export const BAR_BOXES: BoxSpec[] = [
  ...[
    { x: -0.22, h: 0.18, active: false },
    { x: -0.08, h: 0.28, active: true },
    { x: 0.06, h: 0.22, active: false },
    { x: 0.2, h: 0.36, active: true },
  ].map(({ x, h, active }): BoxSpec => ({
    position: [x, -0.05 + h * 0.5, 0.43],
    scale: [0.08, h, 0.12],
    color: active ? OLIVE : SLATE,
    opacity: active ? 0.78 : 0.34,
  })),
  { position: [-0.18, 0.14, 0.44], scale: [0.22, 0.05, 0.12], color: CREAM, opacity: 0.16 },
]

export const KPI_TILES: BoxSpec[] = [
  { position: [-0.18, 0.06, 0.43], scale: [0.24, 0.18, 0.12], color: CREAM, opacity: 0.12 },
  { position: [0.18, 0.06, 0.43], scale: [0.24, 0.18, 0.12], color: OLIVE, opacity: 0.36 },
]

export const TABLE_PILLS: BoxSpec[] = [
  { position: [-0.23, 0.06, 0.44], scale: [0.12, 0.035, 0.12], color: SLATE, opacity: 0.28 },
  { position: [0.22, 0.06, 0.44], scale: [0.08, 0.035, 0.12], color: OLIVE, opacity: 0.56 },
  { position: [0.22, -0.01, 0.44], scale: [0.13, 0.035, 0.12], color: SLATE, opacity: 0.28 },
  { position: [0.18, -0.08, 0.44], scale: [0.1, 0.035, 0.12], color: SLATE, opacity: 0.28 },
]

export const HUB_BARS: BoxSpec[] = [
  { position: [-0.31, -0.11, 0.44], scale: [0.12, 0.08, 0.12], color: SLATE, opacity: 0.36 },
  { position: [-0.14, -0.07, 0.44], scale: [0.12, 0.16, 0.12], color: SLATE, opacity: 0.36 },
  { position: [0.09, -0.09, 0.44], scale: [0.12, 0.12, 0.12], color: SLATE, opacity: 0.36 },
  { position: [0.29, -0.04, 0.44], scale: [0.12, 0.22, 0.12], color: OLIVE, opacity: 0.7 },
]

/* ------------------------------------------------ panel content: points */

export const NODE_POINTS: Vec3[] = [
  [-0.23, 0.06, 0.56],
  [-0.06, 0.12, 0.56],
  [0.07, 0.02, 0.56],
  [0.23, 0.12, 0.56],
  [-0.12, -0.06, 0.56],
  [0.12, -0.09, 0.56],
]

export const HUB_POINTS: Vec3[] = [
  [0, 0, 0.58],
  [-0.24, 0.1, 0.58],
  [0.24, 0.1, 0.58],
  [-0.24, -0.12, 0.58],
  [0.24, -0.12, 0.58],
]

/* ------------------------------------------------------------------ dust */

export function buildDust(): Float32Array {
  const out: number[] = []
  for (let i = 0; i < 74; i++) {
    const a = i * 2.399963
    const r = 0.9 + (((i * 37) % 100) / 100) * 1.7
    const z = (((i * 73) % 100) / 100) * 1.8 - 0.9
    out.push(Math.cos(a) * r, Math.sin(a) * r, z)
  }
  return new Float32Array(out)
}
