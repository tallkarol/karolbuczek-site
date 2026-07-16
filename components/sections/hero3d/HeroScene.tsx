"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  ARCS,
  arcPoint,
  BAR_BOXES,
  buildArcSegments,
  buildDust,
  BODY_HUB,
  CREAM,
  FLOW_LINES,
  GLASS_HUB,
  HEADER_BOXES,
  HUB_ANCHORS,
  HUB_BARS,
  HUB_LINES,
  HUB_POINTS,
  KPI_LINES,
  KPI_TILES,
  NODE_LINES,
  NODE_POINTS,
  OLIVE,
  PANEL_ANCHORS,
  PANELS,
  SLATE,
  SLOT_ACCENT,
  SLOT_BACKGROUND,
  SPARK_A_LINES,
  SPARK_B_LINES,
  SPARK_CHIPS,
  TABLE_LINES,
  TABLE_PILLS,
  type BoxSpec,
  type PanelKind,
  type PanelSpec,
  type Vec3,
} from "./heroData"

/* ------------------------------------------------------------- constants */

/** Time the scene is frozen at when prefers-reduced-motion is on
 *  (late enough that the assembly intro has fully settled). */
const REDUCED_T = 10

/** Converts the prototype's pixel-ish point sizes to world units. */
const px = (n: number) => n * 0.021

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
const mix = (a: number, b: number, t: number) => a + (b - a) * t
const ease = (t: number) => 1 - Math.pow(1 - clamp(t, 0, 1), 4)

/* Prototype colors were authored in sRGB (no color management), so decode
   them explicitly to keep the rendered hues identical. */
const colorOf = (v: Vec3) => new THREE.Color().setRGB(v[0], v[1], v[2], THREE.SRGBColorSpace)

/* Shared geometry singletons (this module is client-only via next/dynamic). */
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const boxEdges = new THREE.EdgesGeometry(boxGeometry)

let dotTexture: THREE.Texture | null = null
function getDotTexture() {
  if (dotTexture) return dotTexture
  const size = 64
  const cv = document.createElement("canvas")
  cv.width = cv.height = size
  const ctx = cv.getContext("2d")!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, "rgba(255,255,255,1)")
  g.addColorStop(0.18, "rgba(255,255,255,.85)")
  g.addColorStop(0.42, "rgba(255,255,255,.25)")
  g.addColorStop(1, "rgba(255,255,255,0)")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  dotTexture = new THREE.CanvasTexture(cv)
  return dotTexture
}

/* --------------------------------------------------------------- context */

interface HeroInput {
  x: number
  y: number
  tx: number
  ty: number
  manualX: number
  manualY: number
}

const HeroContext = createContext<{ reduced: boolean; input: HeroInput }>({
  reduced: false,
  input: { x: 0, y: 0, tx: 0, ty: 0, manualX: 0, manualY: 0 },
})
const useHero = () => useContext(HeroContext)

function useHeroTime() {
  const { reduced } = useHero()
  return (clock: THREE.Clock) => (reduced ? REDUCED_T : clock.getElapsedTime())
}

/* ------------------------------------------------------ building blocks */

function Lines({
  data,
  color,
  opacity,
  depthWrite = true,
  renderOrder = 0,
}: {
  data: Float32Array
  color: Vec3
  opacity: number
  depthWrite?: boolean
  renderOrder?: number
}) {
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.BufferAttribute(data, 3))
    return g
  }, [data])
  const c = useMemo(() => colorOf(color), [color])
  return (
    <lineSegments geometry={geometry} renderOrder={renderOrder} frustumCulled={false}>
      <lineBasicMaterial color={c} transparent opacity={opacity} depthWrite={depthWrite} />
    </lineSegments>
  )
}

function Box({ spec }: { spec: BoxSpec }) {
  const c = useMemo(() => colorOf(spec.color), [spec])
  return (
    <mesh geometry={boxGeometry} position={spec.position} scale={spec.scale}>
      <meshStandardMaterial color={c} transparent opacity={spec.opacity} />
    </mesh>
  )
}

function Boxes({ specs }: { specs: BoxSpec[] }) {
  return (
    <>
      {specs.map((spec, i) => (
        <Box key={i} spec={spec} />
      ))}
    </>
  )
}

function Dots({
  count,
  color,
  opacity,
  size,
  positions,
  update,
  renderOrder = 0,
}: {
  count: number
  color: Vec3
  opacity: number
  size: number
  positions?: Float32Array
  update?: (arr: Float32Array, t: number) => void
  renderOrder?: number
}) {
  const timeOf = useHeroTime()
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const arr = positions ? positions.slice() : new Float32Array(count * 3)
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3))
    return g
  }, [count, positions])
  useFrame(({ clock }) => {
    if (!update) return
    const attr = geometry.getAttribute("position") as THREE.BufferAttribute
    update(attr.array as Float32Array, timeOf(clock))
    attr.needsUpdate = true
  })
  const c = useMemo(() => colorOf(color), [color])
  return (
    <points geometry={geometry} frustumCulled={false} renderOrder={renderOrder}>
      <pointsMaterial
        map={getDotTexture()}
        color={c}
        transparent
        opacity={opacity}
        size={size}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function MovingDot({
  color,
  opacity,
  size,
  at,
}: {
  color: Vec3
  opacity: number
  size: number
  at: (t: number) => Vec3
}) {
  return (
    <Dots
      count={1}
      color={color}
      opacity={opacity}
      size={size}
      update={(arr, t) => {
        const p = at(t)
        arr[0] = p[0]
        arr[1] = p[1]
        arr[2] = p[2]
      }}
    />
  )
}

const flat = (v: Vec3[]) => new Float32Array(v.flat())

/* ----------------------------------------------------------- scene parts */

function PanelContent({ kind }: { kind: PanelKind }) {
  switch (kind) {
    case "spark":
      return (
        <>
          <Lines data={SPARK_A_LINES} color={CREAM} opacity={0.34} />
          <MovingDot
            color={CREAM}
            opacity={0.92}
            size={px(10)}
            at={(t) => [-0.26 + ((t * 0.22) % 0.58), 0.08, 0.56]}
          />
          <Boxes specs={SPARK_CHIPS} />
        </>
      )
    case "spark-small":
      return (
        <>
          <Lines data={SPARK_B_LINES} color={CREAM} opacity={0.34} />
          <MovingDot
            color={CREAM}
            opacity={0.92}
            size={px(10)}
            at={(t) => [-0.26 + ((t * 0.18) % 0.58), 0.04, 0.56]}
          />
          <Boxes specs={SPARK_CHIPS} />
        </>
      )
    case "bars":
      return (
        <>
          <Lines data={FLOW_LINES} color={CREAM} opacity={0.26} />
          <Boxes specs={BAR_BOXES} />
        </>
      )
    case "kpis":
      return (
        <>
          <Boxes specs={KPI_TILES} />
          <Lines data={KPI_LINES} color={CREAM} opacity={0.28} />
        </>
      )
    case "table":
      return (
        <>
          <Lines data={TABLE_LINES} color={CREAM} opacity={0.28} />
          <Boxes specs={TABLE_PILLS} />
        </>
      )
    case "nodes":
      return (
        <>
          <Lines data={NODE_LINES} color={CREAM} opacity={0.3} />
          <Dots
            count={NODE_POINTS.length}
            positions={flat(NODE_POINTS)}
            color={CREAM}
            opacity={0.84}
            size={px(8)}
          />
          <MovingDot
            color={OLIVE}
            opacity={0.95}
            size={px(10)}
            at={(t) => [-0.02 + Math.sin(t * 0.8) * 0.09, -0.015 + Math.cos(t * 0.8) * 0.05, 0.57]}
          />
        </>
      )
  }
}

function Panel({ spec, index }: { spec: PanelSpec; index: number }) {
  const ref = useRef<THREE.Group>(null!)
  const timeOf = useHeroTime()

  useFrame(({ clock }) => {
    const t = timeOf(clock)
    const k = ease((t - 0.18 - index * 0.07) / 1.15)
    const overshoot = (1 - k) * (1.42 + (index % 3) * 0.16)
    ref.current.position.set(
      spec.pos[0] + Math.sign(spec.pos[0] || (index % 2) * 2 - 1) * overshoot,
      spec.pos[1] + Math.sign(spec.pos[1] || 1) * overshoot * 0.32,
      spec.pos[2] + (1 - k) * (index % 2 ? 0.9 : -0.9)
    )
  })

  const bodyColor = useMemo(() => colorOf(spec.body), [spec.body])
  const glassColor = useMemo(() => colorOf(spec.glass), [spec.glass])

  return (
    <group ref={ref} position={spec.pos} rotation={spec.rot} scale={spec.size}>
      <mesh geometry={boxGeometry}>
        <meshStandardMaterial
          color={bodyColor}
          emissive={bodyColor}
          emissiveIntensity={0.14}
          transparent
          opacity={0.94}
        />
      </mesh>
      <Lines data={boxEdges.attributes.position.array as Float32Array} color={spec.edge} opacity={0.42} />
      <mesh geometry={boxGeometry} position={[0, 0, 0.37]} scale={[0.96, 0.92, 0.14]}>
        <meshStandardMaterial
          color={glassColor}
          emissive={glassColor}
          emissiveIntensity={0.06}
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </mesh>
      <Boxes specs={HEADER_BOXES} />
      <PanelContent kind={spec.kind} />
    </group>
  )
}

function Hub() {
  const bodyColor = useMemo(() => colorOf(BODY_HUB), [])
  const glassColor = useMemo(() => colorOf(GLASS_HUB), [])
  return (
    <group scale={[1.26, 0.9, 0.18]}>
      <mesh geometry={boxGeometry}>
        <meshStandardMaterial
          color={bodyColor}
          emissive={bodyColor}
          emissiveIntensity={0.18}
          transparent
          opacity={0.96}
        />
      </mesh>
      <Lines data={boxEdges.attributes.position.array as Float32Array} color={SLOT_BACKGROUND} opacity={0.48} />
      <mesh geometry={boxGeometry} position={[0, 0, 0.28]} scale={[0.92, 0.78, 0.1]}>
        <meshStandardMaterial
          color={glassColor}
          emissive={glassColor}
          emissiveIntensity={0.08}
          transparent
          opacity={0.14}
          depthWrite={false}
        />
      </mesh>
      <Lines data={HUB_LINES} color={CREAM} opacity={0.28} />
      <Boxes specs={HUB_BARS} />
      <Dots
        count={HUB_POINTS.length}
        positions={flat(HUB_POINTS)}
        color={CREAM}
        opacity={0.88}
        size={px(9)}
      />
      <Dots
        count={3}
        color={OLIVE}
        opacity={0.9}
        size={px(9)}
        update={(arr, t) => {
          arr.set([Math.sin(t * 0.7) * 0.24, 0.16, 0.5], 0)
          arr.set([-0.28 + (Math.sin(t * 0.9) + 1) * 0.12, -0.06, 0.52], 3)
          arr.set([0.18 + Math.cos(t * 0.8) * 0.1, -0.16, 0.52], 6)
        }}
      />
    </group>
  )
}

function Network() {
  const segments = useMemo(() => buildArcSegments(), [])
  const anchors = useMemo(() => flat([...PANEL_ANCHORS, ...HUB_ANCHORS]), [])
  return (
    <group>
      <Lines data={segments} color={SLOT_BACKGROUND} opacity={0.2} depthWrite={false} renderOrder={5} />
      <Dots
        count={PANEL_ANCHORS.length + HUB_ANCHORS.length}
        positions={anchors}
        color={SLOT_BACKGROUND}
        opacity={0.55}
        size={px(7)}
        renderOrder={6}
      />
      <Dots
        count={ARCS.length}
        color={SLOT_ACCENT}
        opacity={0.92}
        size={px(10)}
        renderOrder={7}
        update={(arr, t) => {
          for (let i = 0; i < ARCS.length; i++) {
            const phase = (t * (0.13 + (i % 3) * 0.018) + i * 0.12) % 1
            const p = arcPoint(ARCS[i], phase)
            arr[i * 3] = p[0]
            arr[i * 3 + 1] = p[1]
            arr[i * 3 + 2] = p[2]
          }
        }}
      />
    </group>
  )
}

function Dust() {
  const base = useMemo(() => buildDust(), [])
  return (
    <Dots
      count={74}
      color={SLATE}
      opacity={0.18}
      size={px(6)}
      update={(arr, t) => {
        for (let i = 0; i < 74; i++) {
          const a = t * (0.022 + (i % 5) * 0.004)
          const c = Math.cos(a)
          const s = Math.sin(a)
          const x = base[i * 3]
          const y = base[i * 3 + 1]
          const z = base[i * 3 + 2]
          arr[i * 3] = x * c - z * s
          arr[i * 3 + 1] = y + Math.sin(t * 0.24 + i) * 0.035
          arr[i * 3 + 2] = x * s + z * c
        }
      }}
    />
  )
}

function BackPlane({
  position,
  rotZ,
  scale,
  color,
  opacity,
  edgeOpacity,
}: {
  position: Vec3
  rotZ: number
  scale: Vec3
  color: Vec3
  opacity: number
  edgeOpacity: number
}) {
  const c = useMemo(() => colorOf(color), [color])
  return (
    <group position={position} rotation={[0, 0, rotZ]} scale={scale}>
      <mesh geometry={boxGeometry}>
        <meshBasicMaterial color={c} transparent opacity={opacity} depthWrite={false} />
      </mesh>
      <Lines
        data={boxEdges.attributes.position.array as Float32Array}
        color={CREAM}
        opacity={edgeOpacity}
        depthWrite={false}
      />
    </group>
  )
}

function Ring() {
  const ref = useRef<THREE.Mesh>(null!)
  const { reduced } = useHero()
  const timeOf = useHeroTime()
  const c = useMemo(() => colorOf(CREAM), [])
  useFrame(({ clock }) => {
    ref.current.rotation.z = reduced ? 0 : timeOf(clock) * 0.022
  })
  return (
    <group rotation={[0.9, 0, 0]} scale={2.18}>
      <mesh ref={ref} frustumCulled={false}>
        <torusGeometry args={[1, 0.022, 8, 112]} />
        <meshBasicMaterial color={c} transparent opacity={0.08} depthWrite={false} />
      </mesh>
    </group>
  )
}

/** Root group: pointer parallax, drag pivot, idle sway, intro scale-in. */
function Rig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null!)
  const { reduced, input } = useHero()
  const timeOf = useHeroTime()

  useFrame(({ clock }) => {
    const t = timeOf(clock)
    input.x = mix(input.x, input.tx, 0.045)
    input.y = mix(input.y, input.ty, 0.045)
    const idle = reduced ? 0 : Math.sin(t * 0.36) * 0.04
    ref.current.rotation.set(
      -0.18 + input.y * 0.12 + input.manualX,
      -0.32 + input.x * 0.22 + input.manualY + idle,
      -0.045 + Math.sin(t * 0.22) * 0.016
    )
    const s = 0.78 + 0.22 * ease(t / 1.9)
    ref.current.scale.setScalar(s)
  })

  return <group ref={ref}>{children}</group>
}

function Scene() {
  return (
    <Rig>
      <Dust />
      <BackPlane
        position={[-0.02, 0.02, -0.86]}
        rotZ={-0.1}
        scale={[4.0, 2.1, 0.022]}
        color={[0.14, 0.24, 0.38]}
        opacity={0.045}
        edgeOpacity={0.14}
      />
      <BackPlane
        position={[0.16, -0.04, -0.46]}
        rotZ={0.06}
        scale={[3.4, 1.9, 0.022]}
        color={[0.28, 0.32, 0.22]}
        opacity={0.05}
        edgeOpacity={0.1}
      />
      <Ring />
      <Hub />
      {PANELS.map((spec, i) => (
        <Panel key={spec.key} spec={spec} index={i} />
      ))}
      <Network />
    </Rig>
  )
}

/* -------------------------------------------------------------- wrapper */

export default function HeroScene() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [webglOk, setWebglOk] = useState<boolean | null>(null)
  const [reduced, setReduced] = useState(false)
  const [visible, setVisible] = useState(true)
  const inputRef = useRef<HeroInput>({ x: 0, y: 0, tx: 0, ty: 0, manualX: 0, manualY: 0 })
  const dragRef = useRef({ dragging: false, lastX: 0, lastY: 0 })

  useEffect(() => {
    const probe = document.createElement("canvas")
    setWebglOk(!!(probe.getContext("webgl2") || probe.getContext("webgl")))

    const mq = matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener("change", onChange)

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    if (wrapperRef.current) observer.observe(wrapperRef.current)

    return () => {
      mq.removeEventListener("change", onChange)
      observer.disconnect()
    }
  }, [])

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = wrapperRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const input = inputRef.current
    input.tx = ((e.clientX - r.left) / r.width) * 2 - 1
    input.ty = ((e.clientY - r.top) / r.height) * 2 - 1
    const drag = dragRef.current
    if (drag.dragging) {
      input.manualY += (e.clientX - drag.lastX) * 0.007
      input.manualX += (e.clientY - drag.lastY) * 0.006
      drag.lastX = e.clientX
      drag.lastY = e.clientY
    }
  }

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragRef.current = { dragging: true, lastX: e.clientX, lastY: e.clientY }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragRef.current.dragging = false
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
  }

  const onPointerLeave = () => {
    inputRef.current.tx = 0
    inputRef.current.ty = 0
  }

  if (webglOk === false) {
    return (
      <div className="absolute inset-[18%] grid place-items-center border border-cream/10 bg-white/[.03]" />
    )
  }

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
      onPointerMove={onPointerMove}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
    >
      {webglOk && (
        <Canvas
          flat
          dpr={[1, 1.75]}
          frameloop={reduced ? "demand" : visible ? "always" : "never"}
          camera={{ fov: 43.4, position: [0, 0.04, 6.7], near: 0.1, far: 30 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <HeroContext.Provider value={{ reduced, input: inputRef.current }}>
            <ambientLight intensity={0.75} />
            <directionalLight position={[-4.2, 7.4, 5.2]} intensity={1.6} />
            <Scene />
          </HeroContext.Provider>
        </Canvas>
      )}
    </div>
  )
}
