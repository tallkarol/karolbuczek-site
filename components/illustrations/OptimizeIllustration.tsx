"use client"

import { motion } from "framer-motion"
import { useMemo, useState } from "react"

interface OptimizeIllustrationProps {
  className?: string
}

// Interactive dashboard visual with mobile
export function OptimizeIllustration({ className }: OptimizeIllustrationProps) {
  const primaryColor = "hsl(var(--primary))"
  const bgColor = "hsl(var(--background))"

  const datasets = {
    performance: {
      label: "Performance",
      bars: [0.35, 0.6, 0.5, 0.82, 0.68],
      line: [
        { x: 90, y: 160 },
        { x: 140, y: 130 },
        { x: 190, y: 115 },
        { x: 240, y: 110 },
      ],
      mobile: [
        { x: 254, y: 140 },
        { x: 280, y: 145 },
        { x: 292, y: 132 },
      ],
    },
    reliability: {
      label: "Reliability",
      bars: [0.52, 0.58, 0.62, 0.7, 0.54],
      line: [
        { x: 90, y: 150 },
        { x: 140, y: 135 },
        { x: 190, y: 122 },
        { x: 240, y: 118 },
      ],
      mobile: [
        { x: 254, y: 136 },
        { x: 280, y: 148 },
        { x: 292, y: 138 },
      ],
    },
  }

  const [active, setActive] = useState<keyof typeof datasets>("performance")
  const data = datasets[active]

  const mainLinePath = useMemo(() => buildPath(data.line), [data.line])
  const mobileLinePath = useMemo(() => buildPath(data.mobile), [data.mobile])

  return (
    <div className={`relative h-full w-full ${className || ""}`}>
      <svg
        viewBox="0 0 360 220"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <rect x="0" y="0" width="360" height="220" rx="18" fill={bgColor} opacity="0.07" />

        {/* Glow behind main card */}
        <motion.circle
          cx="180"
          cy="120"
          r="110"
          fill={primaryColor}
          fillOpacity="0.05"
          animate={{ r: [100, 115, 100], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Toggle pills */}
        <g>
          {Object.keys(datasets).map((key, idx) => {
            const k = key as keyof typeof datasets
            const isActive = active === k
            return (
              <motion.rect
                key={k}
                x={70 + idx * 110}
                y={18}
                width="100"
                height="22"
                rx="10"
                fill={primaryColor}
                fillOpacity={isActive ? 0.35 : 0.12}
                stroke={primaryColor}
                strokeWidth="1"
                strokeOpacity={isActive ? 0.5 : 0.2}
                onClick={() => setActive(k)}
                whileHover={{ scale: 1.02, opacity: 0.95 }}
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
              />
            )
          })}
          {Object.keys(datasets).map((key, idx) => {
            const k = key as keyof typeof datasets
            const isActive = active === k
            return (
              <motion.text
                key={`lbl-${k}`}
                x={120 + idx * 110}
                y={33}
                textAnchor="middle"
                fill={primaryColor}
                fillOpacity={isActive ? 0.95 : 0.65}
                fontSize="11"
                fontWeight={600}
                style={{ pointerEvents: "none" }}
              >
                {datasets[k].label}
              </motion.text>
            )
          })}
        </g>

        {/* Main dashboard card */}
        <motion.rect
          x="60"
          y="40"
          width="210"
          height="140"
          rx="14"
          fill={bgColor}
          stroke={primaryColor}
          strokeWidth="1.5"
          strokeOpacity="0.35"
          animate={{ opacity: [0.92, 1, 0.92] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Header dots */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={`dot-${i}`}
            cx={75 + i * 10}
            cy={55}
            r="3"
            fill={primaryColor}
            fillOpacity={i === 0 ? 0.9 : 0.35}
            animate={i === 0 ? { scale: [1, 1.15, 1] } : undefined}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
          />
        ))}

        {/* Title lines */}
        <rect x="95" y="50" width="70" height="6" rx="3" fill={primaryColor} opacity="0.35" />
        <rect x="95" y="60" width="110" height="4" rx="2" fill={primaryColor} opacity="0.15" />

        {/* KPI pills */}
        {[0, 1, 2].map((pill) => (
          <motion.rect
            key={`pill-${pill}`}
            x={80 + pill * 68}
            y={72}
            width="60"
            height="20"
            rx="8"
            fill={primaryColor}
            fillOpacity="0.12"
            stroke={primaryColor}
            strokeWidth="1"
            strokeOpacity="0.3"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, delay: pill * 0.15, ease: "easeInOut" }}
          />
        ))}

        {/* Chart area */}
        <rect x="80" y="100" width="170" height="70" rx="10" fill={bgColor} stroke={primaryColor} strokeOpacity="0.15" />

        {/* Line chart */}
        <motion.path
          d={mainLinePath}
          fill="none"
          stroke={primaryColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeOpacity="0.8"
          animate={{ pathLength: [0.5, 1, 0.5] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Line chart points */}
        {data.line.map((p, i) => (
          <motion.circle
            key={`pt-${i}`}
            cx={p.x}
            cy={p.y}
            r="4"
            fill={primaryColor}
            fillOpacity="0.85"
            animate={{ r: [3.5, 4.5, 3.5], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
          />
        ))}

        {/* Bar chart overlay */}
        {data.bars.map((h, idx) => (
          <motion.rect
            key={`bar-${idx}`}
            x={95 + idx * 24}
            y={160 - h * 40}
            width="12"
            height={h * 40}
            rx="3"
            fill={primaryColor}
            fillOpacity="0.5"
            style={{ transformOrigin: `${101 + idx * 24}px 160px` }}
            animate={{ scaleY: [0.85, 1, 0.9] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: idx * 0.1, ease: "easeInOut" }}
          />
        ))}

        {/* Mobile card */}
        <motion.rect
          x="240"
          y="65"
          width="70"
          height="110"
          rx="14"
          fill={bgColor}
          stroke={primaryColor}
          strokeWidth="1.4"
          strokeOpacity="0.4"
          animate={{ y: [63, 65, 63] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <rect x="252" y="75" width="46" height="8" rx="4" fill={primaryColor} opacity="0.35" />
        <rect x="252" y="88" width="30" height="6" rx="3" fill={primaryColor} opacity="0.18" />

        {/* Mobile chart */}
        <motion.path
          d={mobileLinePath}
          fill="none"
          stroke={primaryColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.8"
          animate={{ pathLength: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        {data.mobile.map((p, i) => (
          <motion.circle
            key={`mpt-${i}`}
            cx={p.x}
            cy={p.y}
            r="3.2"
            fill={primaryColor}
            fillOpacity="0.85"
            animate={{ r: [3, 3.6, 3], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
          />
        ))}

        {/* Mobile buttons */}
        <rect x="252" y="156" width="46" height="10" rx="5" fill={primaryColor} opacity="0.15" />
        <motion.rect
          x="252"
          y="170"
          width="46"
          height="12"
          rx="6"
          fill={primaryColor}
          fillOpacity="0.25"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating tags */}
        <motion.rect
          x="40"
          y="60"
          width="40"
          height="16"
          rx="7"
          fill={primaryColor}
          fillOpacity="0.16"
          animate={{ x: [38, 42, 38], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.rect
          x="50"
          y="150"
          width="34"
          height="14"
          rx="6"
          fill={primaryColor}
          fillOpacity="0.16"
          animate={{ y: [148, 152, 148], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        />
      </svg>
    </div>
  )
}

function buildPath(points: Array<{ x: number; y: number }>) {
  if (!points.length) return ""
  const [first, ...rest] = points
  const parts = rest.map((p) => `L ${p.x} ${p.y}`).join(" ")
  return `M ${first.x} ${first.y} ${parts}`
}

