"use client"

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import "./character.css"
import { BrandLogo } from "./BrandLogo"

const MotionContext = createContext(true)
export const useCharacterMotion = () => useContext(MotionContext)

const PAGES = [['/portfolio', 'Work'], ['/resume', 'Résumé'], ['/about', 'About']] as const
const LINKEDIN = 'https://www.linkedin.com/in/karolbuczek/'
/** The bar hides only after this much downward travel; any upward travel brings it back. */
const HIDE_AFTER = 140
/** Scroll jitter smaller than this never flips the bar. */
const DEADZONE = 6

/** Curtain: paper over the home page while fonts, hero image and video settle. Holds at least CURTAIN_MIN ms, lifts as
 *  soon as the hero video can play through, never later than CURTAIN_MAX ms (character.css also lifts it at that
 *  point with a pure CSS animation, so no one is stuck behind it without JavaScript). Once per session, home page
 *  only, skipped for reduced motion — decided by an inline script before first paint so returning visitors never
 *  see it flash. The ʞb mark is written by a pen along the glyph centerlines (see the pen rules in character.css). */
const CURTAIN_MIN = 850
const CURTAIN_MAX = 1400
const CURTAIN_LIFT = 550
const CURTAIN_SCRIPT = "try{var d=document.documentElement;if(sessionStorage.getItem('kb-curtain')||matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('no-curtain')}else{sessionStorage.setItem('kb-curtain','1')}}catch(e){}"

function Curtain({ onDone }: { onDone: () => void }) {
  const [lifting, setLifting] = useState(false)
  useEffect(() => {
    if (document.documentElement.classList.contains('no-curtain')) { onDone(); return }
    let timer = 0
    const tick = () => {
      const t = performance.now()
      const video = document.querySelector<HTMLVideoElement>('.hero-video')
      const ready = !!video && video.readyState >= 3
      if (t >= CURTAIN_MAX || (t >= CURTAIN_MIN && ready)) { setLifting(true); timer = window.setTimeout(onDone, CURTAIN_LIFT + 100) }
      else timer = window.setTimeout(tick, 50)
    }
    tick()
    return () => window.clearTimeout(timer)
  }, [onDone])
  return <div className={`kb-curtain${lifting ? ' is-lifting' : ''}`} aria-hidden="true">
    <script dangerouslySetInnerHTML={{ __html: CURTAIN_SCRIPT }}/>
    <svg className="kb-curtain-mark" viewBox="-60 -60 1122 1120"><g transform="translate(0 1000) scale(1 -1)"><path className="pen k1" pathLength={1} d="M430 732 V49"/><path className="pen k2" pathLength={1} d="M430 220 L106 508"/><path className="pen k3" pathLength={1} d="M325 314 L102 32"/><path className="pen b1" pathLength={1} d="M440 730 V274"/><path className="pen b2" pathLength={1} d="M440 274 A229 229 0 1 1 898 274 A229 229 0 1 1 440 274"/></g></svg>
  </div>
}

function current(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`) ? 'page' : undefined
}

export function CharacterShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [motion, setMotion] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  // True while a .hero is still under the bar. Over a hero there is no sticky bar at all: while the hero is pinned
  // the pill holds still, and once the hero unpins the nav rides out (and back in) with it, pixel for pixel, like any
  // other page content. The paper bar only exists once the hero has passed. Only the home page has a .hero today.
  const [overHero, setOverHero] = useState(false)
  const [riding, setRiding] = useState(false)
  // The curtain exists only for a server-rendered landing on the home page, and only until it has lifted once.
  const [curtain, setCurtain] = useState(() => pathname === '/')
  const endCurtain = useCallback(() => setCurtain(false), [])
  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLElement>(null)
  const animate = motion && !reduced

  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => { setReduced(query.matches); setMotion(!query.matches) }
    update(); query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  useEffect(() => setMenu(false), [pathname])

  // Scroll-aware bar. One rAF per scroll burst; state setters are no-ops when nothing changed.
  useEffect(() => {
    let last = window.scrollY
    let frame = 0
    const hero = document.querySelector<HTMLElement>('.hero')
    const read = () => {
      frame = 0
      const y = window.scrollY
      setScrolled(y > 12)
      const el = headerRef.current
      const bar = el?.offsetHeight ?? 80
      const rect = hero?.getBoundingClientRect()
      const over = !!rect && rect.bottom > bar
      if (over && hero && rect) {
        // Pinned (hero top at its sticky offset): hold still. Unpinned: follow the hero's top edge, clamped once
        // the bar is fully out. Written straight to style so the per-frame value never goes through React.
        // Only while the bar is actually tracking (partly on screen) is the transform transition off; when the
        // target is fully out — e.g. the paper bar meeting the hero's bottom edge on the way up — the transition
        // stays on so it slides away, and it keeps its paper look until it is off screen.
        const pinnedTop = parseFloat(getComputedStyle(hero).top) || 0
        const drift = rect.top - pinnedTop
        const ride = drift > -1 ? 0 : Math.max(drift, -(bar + 2)) // sub-pixel layout drift is not a ride
        const out = ride <= -(bar + 2)
        setOverHero(!out)
        setRiding(ride < 0 && !out)
        if (el) el.style.transform = ride < 0 ? `translateY(${ride}px)` : ''
        setHidden(false); last = y; return
      }
      setOverHero(false)
      setRiding(false)
      if (y <= 0) { setHidden(false); if (el) el.style.transform = ''; last = 0; return }
      if (!animate) { setHidden(false); if (el) el.style.transform = ''; last = y; return }
      const delta = y - last
      if (Math.abs(delta) < DEADZONE) return
      const nextHidden = delta > 0 && y > HIDE_AFTER
      setHidden(nextHidden)
      // A ride offset left behind equals the hidden position, so only clear it when the bar is to come back.
      if (el && !nextHidden) el.style.transform = ''
      last = y
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(read) }
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); if (frame) cancelAnimationFrame(frame) }
  }, [animate, pathname])

  // Drawer: lock the page, close on Escape or when the viewport grows past the phone breakpoint,
  // move focus in on open and hand it back to the toggle on close.
  useEffect(() => {
    if (!menu) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false) }
    const wide = matchMedia('(min-width: 701px)')
    const onWide = () => { if (wide.matches) setMenu(false) }
    window.addEventListener('keydown', onKey)
    wide.addEventListener('change', onWide)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
      wide.removeEventListener('change', onWide)
      if (panelRef.current?.contains(document.activeElement)) toggleRef.current?.focus()
    }
  }, [menu])

  const close = () => setMenu(false)
  const drawerInert = menu ? {} : ({ inert: '' } as Record<string, string>)

  return <MotionContext.Provider value={animate}>{curtain && pathname === '/' && <Curtain onDone={endCurtain}/>}<div className={`character-site ${animate ? '' : 'no-motion'} ${pathname === '/' ? 'home' : 'inner-page'}`}>
    <a className="skip" href="#main">Skip to content</a>
    <header ref={headerRef} className={`nav${scrolled ? ' is-scrolled' : ''}${overHero ? ' is-over-hero' : ''}${riding ? ' is-riding' : ''}${hidden && !menu ? ' is-hidden' : ''}`} onFocusCapture={() => setHidden(false)}>
      <Link className="wordmark" href="/" aria-label="Karol Buczek — home"><BrandLogo fullName/></Link>
      <nav id="character-navigation" aria-label="Main navigation">
        {PAGES.map(([href, label]) => <Link key={href} href={href} aria-current={current(pathname, href)}>{label}</Link>)}
        <a className="linkedin" href={LINKEDIN}>LinkedIn <span aria-hidden="true">↗</span></a>
        <Link className="nav-cta" href="/contact" aria-current={current(pathname, '/contact')}>Contact</Link>
      </nav>
      <button ref={toggleRef} type="button" className={`menu-toggle${menu ? ' is-open' : ''}`} onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="mobile-navigation" aria-label={menu ? 'Close menu' : 'Open menu'}><span className="burger" aria-hidden="true"><i/><i/></span></button>
    </header>
    <div className={`drawer${menu ? ' is-open' : ''}`} {...drawerInert}>
      <button type="button" className="drawer-backdrop" tabIndex={-1} aria-label="Close menu" onClick={close}/>
      <aside id="mobile-navigation" ref={panelRef} className="drawer-panel" role="dialog" aria-modal="true" aria-label="Menu">
        <div className="drawer-head">
          <Link href="/" aria-label="Karol Buczek — home" onClick={close}><BrandLogo fullName/></Link>
          <button ref={closeRef} type="button" className="drawer-close is-open" aria-label="Close menu" onClick={close}><span className="burger" aria-hidden="true"><i/><i/></span></button>
        </div>
        <nav className="drawer-body" aria-label="Mobile navigation">
          <p className="drawer-label" id="drawer-pages">Pages</p>
          <ul aria-labelledby="drawer-pages">
            {PAGES.map(([href, label]) => <li key={href}><Link href={href} aria-current={current(pathname, href)} onClick={close}>{label}</Link></li>)}
          </ul>
          <p className="drawer-label" id="drawer-elsewhere">Elsewhere</p>
          <ul aria-labelledby="drawer-elsewhere">
            <li><a href={LINKEDIN} onClick={close}>LinkedIn <small>profile ↗</small></a></li>
            <li><a href="https://www.tallkarol.com" onClick={close}>Tall Karol <small>project enquiries ↗</small></a></li>
          </ul>
        </nav>
        <div className="drawer-foot"><Link className="button primary" href="/contact" onClick={close}>Get in touch ↗</Link></div>
      </aside>
    </div>
    <main id="main">{children}</main>
    <footer className="section"><div className="footer-top"><h2>Want to work together?<br/>Say hello.</h2><div className="actions"><Link className="button primary" href="/contact">Get in touch ↗</Link><a className="button" href={LINKEDIN}>LinkedIn ↗</a></div></div><div className="footer-bottom"><Link href="/" aria-label="Karol Buczek — home"><BrandLogo/></Link><a href="https://www.tallkarol.com">For project enquiries: Tall Karol ↗</a><button aria-pressed={animate} disabled={reduced} onClick={() => setMotion(!motion)}>{reduced ? 'Reduced motion' : motion ? 'Motion on' : 'Motion off'}</button></div></footer>
  </div></MotionContext.Provider>
}
