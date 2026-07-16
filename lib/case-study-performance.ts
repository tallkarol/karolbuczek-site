export type ScoreMetric = {
  label: string
  before: number
  after: number
}

export type TimedMetric = {
  label: string
  before: number
  after: number
  unit: string
}

export type ResourceSlice = {
  name: string
  value: number
}

export type HeadlineStat = {
  label: string
  before: number | string
  after: number | string
  unit?: string
}

export type CompositionCompare = {
  title: string
  description?: string
  beforeLabel: string
  afterLabel: string
  beforeTotal: string
  afterTotal: string
  before: ResourceSlice[]
  after: ResourceSlice[]
}

export type CaseStudyPerformance = {
  /** Modal section heading */
  sectionTitle?: string
  headline?: HeadlineStat[]
  lighthouse?: ScoreMetric[]
  lighthouseTitle?: string
  loadTimes?: TimedMetric[]
  loadTimesNote?: string
  transfer?: {
    beforeKb: number
    afterKb: number
  }
  requests?: {
    before: number
    after: number
    beforeBreakdown: ResourceSlice[]
    afterBreakdown: ResourceSlice[]
  }
  /** Side-by-side composition pies (e.g. tool consolidation) */
  composition?: CompositionCompare
  /** Single-score gauges (0–100) for residency / coverage style metrics */
  gauges?: {
    label: string
    value: number
    caption: string
  }[]
}

/** Mobile Lighthouse before/after for Mineralife B2B rebuild. */
export const mineralifePerformance: CaseStudyPerformance = {
  sectionTitle: "Performance Impact",
  headline: [
    { label: "Performance", before: 67, after: 94 },
    { label: "Time to Interactive", before: 14.6, after: 3.1, unit: "s" },
    { label: "Network Requests", before: 109, after: 51 },
  ],
  lighthouse: [
    { label: "Performance", before: 67, after: 94 },
    { label: "Accessibility", before: 87, after: 100 },
    { label: "Best Practices", before: 81, after: 100 },
    { label: "SEO", before: 92, after: 100 },
  ],
  loadTimes: [
    { label: "FCP", before: 1.7, after: 0.9, unit: "s" },
    { label: "LCP", before: 14.5, after: 3.1, unit: "s" },
    { label: "Speed Index", before: 7.5, after: 1.3, unit: "s" },
    { label: "TTI", before: 14.6, after: 3.1, unit: "s" },
  ],
  transfer: {
    beforeKb: 13594,
    afterKb: 535,
  },
  requests: {
    before: 109,
    after: 51,
    beforeBreakdown: [
      { name: "Scripts", value: 49 },
      { name: "Styles", value: 25 },
      { name: "Images", value: 11 },
      { name: "Fonts", value: 4 },
      { name: "Documents", value: 4 },
      { name: "Media", value: 2 },
      { name: "Other", value: 14 },
    ],
    afterBreakdown: [
      { name: "Scripts", value: 19 },
      { name: "Images", value: 12 },
      { name: "Styles", value: 2 },
      { name: "Fonts", value: 1 },
      { name: "Documents", value: 1 },
      { name: "Other", value: 16 },
    ],
  },
}

/** VIP performance block — averaged Lighthouse tests. */
export const martechPerformance: CaseStudyPerformance = {
  sectionTitle: "Performance Impact",
  headline: [
    { label: "Lighthouse", before: 70, after: 83 },
    { label: "LCP", before: 5.5, after: 3.2, unit: "s" },
    { label: "Speed Index", before: 5.9, after: 5.7, unit: "s" },
  ],
  lighthouse: [{ label: "Performance", before: 70, after: 83 }],
  lighthouseTitle: "Lighthouse performance",
  loadTimes: [
    { label: "LCP", before: 5.5, after: 3.2, unit: "s" },
    { label: "Speed Index", before: 5.9, after: 5.7, unit: "s" },
  ],
  loadTimesNote: "Lower is better — averaged Lighthouse tests on VIP-compliant environments.",
}

/** Structural consolidation: five-tool workflow → one portal. */
export const lifecyclePerformance: CaseStudyPerformance = {
  sectionTitle: "Impact Snapshot",
  headline: [
    { label: "Tools in Stack", before: 5, after: 1 },
    { label: "Source of Truth", before: "Siloed", after: "Unified" },
    { label: "Sync Model", before: "Manual", after: "Event-driven" },
  ],
  composition: {
    title: "Workflow consolidation",
    description: "Commerce, CRM, and lifecycle tools collapsed into a single portal with a shared data layer.",
    beforeLabel: "Before",
    afterLabel: "After",
    beforeTotal: "5 tools",
    afterTotal: "1 portal",
    before: [
      { name: "WooCommerce", value: 1 },
      { name: "CRM", value: 1 },
      { name: "Mailchimp", value: 1 },
      { name: "Spreadsheets", value: 1 },
      { name: "Manual handoffs", value: 1 },
    ],
    after: [{ name: "Unified portal", value: 1 }],
  },
}

/** Privacy / residency story for on-premise AI. */
export const localAiPerformance: CaseStudyPerformance = {
  sectionTitle: "Impact Snapshot",
  headline: [
    { label: "Data Leaving Building", before: "Cloud risk", after: "None" },
    { label: "Processing", before: "Third-party", after: "On-premise" },
    { label: "Follow-up", before: "Manual notes", after: "Automated" },
  ],
  gauges: [
    { label: "On-premise", value: 100, caption: "Audio processed locally" },
    { label: "External APIs", value: 0, caption: "Cloud data transmission" },
  ],
  composition: {
    title: "Data residency",
    description: "Air-gapped pipeline — transcription and extraction stay on hardware the organization controls.",
    beforeLabel: "Typical SaaS path",
    afterLabel: "This system",
    beforeTotal: "Leaves building",
    afterTotal: "Stays local",
    before: [
      { name: "Cloud ASR", value: 60 },
      { name: "Vendor storage", value: 25 },
      { name: "Local retention", value: 15 },
    ],
    after: [{ name: "Local inference", value: 100 }],
  },
}

export const caseStudyPerformanceBySlug: Record<string, CaseStudyPerformance> = {
  "mineralife-b2b-website-rebuild": mineralifePerformance,
  "martech-extension-architecture": martechPerformance,
  "unified-customer-lifecycle-platform": lifecyclePerformance,
  "local-ai-meeting-intelligence": localAiPerformance,
}
