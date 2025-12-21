"use client"

import { motion } from "framer-motion"
import { useMemo, useState } from "react"

interface BuildIllustrationProps {
  className?: string
}

// Mobile apps showcase: stacked screens with interactive dataset toggle
export function BuildIllustration({ className }: BuildIllustrationProps) {
  const primaryColor = "hsl(var(--primary))"
  const bgColor = "hsl(var(--background))"

  const datasets = {
    growth: {
      label: "Growth",
      bars: [0.55, 0.72, 0.61],
      line: [
        { x: 186, y: 142 },
        { x: 208, y: 138 },
        { x: 226, y: 126 },
      ],
      backBars: [0.45, 0.7, 0.55],
      backLine: [
        { x: 130, y: 150 },
        { x: 160, y: 142 },
        { x: 182, y: 134 },
      ],
    },
    revenue: {
      label: "Revenue",
      bars: [0.7, 0.58, 0.82],
      line: [
        { x: 186, y: 132 },
        { x: 208, y: 144 },
        { x: 226, y: 120 },
      ],
      backBars: [0.52, 0.62, 0.78],
      backLine: [
        { x: 130, y: 138 },
        { x: 158, y: 148 },
        { x: 182, y: 128 },
      ],
    },
  }

  const [active, setActive] = useState<keyof typeof datasets>("growth")
  const data = datasets[active]

  const backLinePath = useMemo(() => buildPath(data.backLine), [data.backLine])
  const frontLinePath = useMemo(() => buildPath(data.line), [data.line])

  return (
    <div className={`relative h-full w-full ${className || ""}`}>
      <svg
        viewBox="0 0 360 220"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <rect x="0" y="0" width="360" height="220" rx="18" fill={bgColor} opacity="0.06" />

        {/* Glow */}
        <motion.circle
          cx="180"
          cy="110"
          r="110"
          fill={primaryColor}
          fillOpacity="0.05"
          animate={{ r: [95, 115, 95], opacity: [0.05, 0.1, 0.05] }}
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
                x={40 + idx * 90}
                y={34}
                width="80"
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
                key={`label-${k}`}
                x={80 + idx * 90}
                y={49}
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

        {/* Back screen */}
        <motion.rect
          x="110"
          y="32"
          width="120"
          height="170"
          rx="18"
          fill={bgColor}
          stroke={primaryColor}
          strokeWidth="1.2"
          strokeOpacity="0.25"
          animate={{ y: [30, 32, 30], opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <rect x="128" y="50" width="84" height="10" rx="5" fill={primaryColor} opacity="0.25" />
        <rect x="128" y="66" width="54" height="6" rx="3" fill={primaryColor} opacity="0.18" />
        {data.backBars.map((h, idx) => (
          <motion.rect
            key={`back-bar-${idx}`}
            x={128 + idx * 20}
            y={110 - h * 30}
            width="12"
            height={h * 30}
            rx="3"
            fill={primaryColor}
            fillOpacity="0.45"
            style={{ transformOrigin: `${134 + idx * 20}px 110px` }}
            animate={{ scaleY: [0.82, 1, 0.9] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: idx * 0.12, ease: "easeInOut" }}
          />
        ))}
        <motion.path
          d={backLinePath}
          fill="none"
          stroke={primaryColor}
          strokeWidth="2"
          strokeOpacity="0.75"
          strokeLinecap="round"
          animate={{ pathLength: [0.6, 1, 0.6] }}
          transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Front screen */}
        <motion.rect
          x="160"
          y="38"
          width="120"
          height="170"
          rx="20"
          fill={bgColor}
          stroke={primaryColor}
          strokeWidth="1.5"
          strokeOpacity="0.35"
          animate={{ y: [40, 38, 40] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <rect x="178" y="54" width="82" height="10" rx="5" fill={primaryColor} opacity="0.35" />
        <rect x="178" y="70" width="60" height="6" rx="3" fill={primaryColor} opacity="0.2" />

        {/* Front screen cards */}
        {[0, 1].map((row) => (
          <motion.rect
            key={`card-${row}`}
            x="178"
            y={86 + row * 34}
            width="88"
            height="24"
            rx="8"
            fill={primaryColor}
            fillOpacity="0.12"
            stroke={primaryColor}
            strokeWidth="1"
            strokeOpacity="0.25"
            animate={{ opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: row * 0.2, ease: "easeInOut" }}
          />
        ))}

        {/* Small chart inside front screen */}
        <motion.path
          d={frontLinePath}
          fill="none"
          stroke={primaryColor}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeOpacity="0.85"
          animate={{ pathLength: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        {data.line.map((p, i) => (
          <motion.circle
            key={`fpt-${i}`}
            cx={p.x}
            cy={p.y}
            r="3.4"
            fill={primaryColor}
            fillOpacity="0.9"
            animate={{ r: [3, 3.8, 3], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.7, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
          />
        ))}

        {/* Bars inside front screen */}
        {data.bars.map((h, idx) => (
          <motion.rect
            key={`front-bar-${idx}`}
            x={188 + idx * 18}
            y={150 - h * 30}
            width="10"
            height={h * 30}
            rx="3"
            fill={primaryColor}
            fillOpacity="0.4"
            style={{ transformOrigin: `${193 + idx * 18}px 150px` }}
            animate={{ scaleY: [0.85, 1, 0.92] }}
            transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1, ease: "easeInOut" }}
          />
        ))}

        {/* Bottom CTA */}
        <rect x="178" y="162" width="88" height="12" rx="6" fill={primaryColor} opacity="0.18" />
        <motion.rect
          x="178"
          y="178"
          width="88"
          height="16"
          rx="8"
          fill={primaryColor}
          fillOpacity="0.25"
          animate={{ opacity: [0.45, 0.9, 0.45] }}
          transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating badges */}
        <motion.rect
          x="72"
          y="78"
          width="46"
          height="16"
          rx="7"
          fill={primaryColor}
          fillOpacity="0.16"
          animate={{ x: [70, 74, 70], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.rect
          x="80"
          y="152"
          width="40"
          height="14"
          rx="6"
          fill={primaryColor}
          fillOpacity="0.16"
          animate={{ y: [150, 154, 150], opacity: [0.6, 0.9, 0.6] }}
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

