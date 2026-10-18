"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type GrainProps = {
  className?: string
  /** 0–1 opacity of the grain layer */
  opacity?: number
  /** Frames per second when animate is true (24 ≈ film grain) */
  fps?: number
  /** When false, paints one noise frame and stops (recommended for UI) */
  animate?: boolean
}

const TILE = 128

function fillNoiseTile(tile: HTMLCanvasElement) {
  const tctx = tile.getContext("2d", { alpha: false })
  if (!tctx) return
  const image = tctx.createImageData(TILE, TILE)
  const data = image.data
  for (let i = 0; i < data.length; i += 4) {
    const v = Math.random() * 255
    data[i] = v
    data[i + 1] = v
    data[i + 2] = v
    data[i + 3] = 255
  }
  tctx.putImageData(image, 0, 0)
}

/**
 * Film-grain overlay. Draws a small noise tile and repeats it across the parent
 * canvas — cheap enough for a live 24fps refresh without blocking first paint.
 */
export function Grain({
  className,
  opacity = 0.12,
  fps = 24,
  animate = false,
}: GrainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    const tile = document.createElement("canvas")
    tile.width = TILE
    tile.height = TILE

    let raf = 0
    let last = 0
    const frameMs = 1000 / fps
    let cancelled = false

    const paint = () => {
      const { width, height } = canvas
      if (width < 1 || height < 1) return
      fillNoiseTile(tile)
      const pattern = ctx.createPattern(tile, "repeat")
      if (!pattern) return
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.fillStyle = pattern
      ctx.fillRect(0, 0, width, height)
    }

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      // CSS pixel size is enough for grain; avoid retina pixel bombs
      const w = Math.max(1, Math.floor(rect.width))
      const h = Math.max(1, Math.floor(rect.height))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
      paint()
    }

    resize()

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (!animate || reduceMotion.matches) {
      const ro = new ResizeObserver(resize)
      if (canvas.parentElement) ro.observe(canvas.parentElement)
      return () => ro.disconnect()
    }

    const tick = (now: number) => {
      if (cancelled) return
      if (now - last >= frameMs) {
        last = now
        paint()
      }
      raf = window.requestAnimationFrame(tick)
    }
    raf = window.requestAnimationFrame(tick)

    const ro = new ResizeObserver(resize)
    if (canvas.parentElement) ro.observe(canvas.parentElement)

    return () => {
      cancelled = true
      window.cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [animate, fps])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-0 h-full w-full mix-blend-soft-light",
        className
      )}
      style={{ opacity }}
    />
  )
}
