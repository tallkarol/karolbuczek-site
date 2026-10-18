"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { allCaseStudies } from "@/lib/resume-data"
import { ProjectArtwork } from "./ProjectArtwork"
import { useCharacterMotion } from "./CharacterShell"

/** Phones scrub a pre-rendered frame set on a canvas instead of seeking the video: a video seek decodes up to a
 *  keyframe interval of frames before it can show one, which is what made touch scrolling feel choppy, while a
 *  canvas draw is instant at any scroll speed. The frames are the phone's crop of the same clip (public/character/
 *  scrub): 20 fps through the pinned walk (p00–p52, 0 … 2.6 s), 12 fps through the exit (x01–x12, … 3.6 s).
 *  Each frame is the 940 px wide slice of the 1920×1080 clip starting at x = 650, scaled to 760 px wide, which
 *  covers the cover-fit window of every phone size at the poster's focal point (62% 38%). */
const CLIP_W = 1920, CLIP_H = 1080, CROP_X = 650, CROP_W = 940
const PHONE_FRAMES: { src: string; t: number }[] = []
for (let i = 0; i <= 52; i++) PHONE_FRAMES.push({ src: `/character/scrub/p${String(i).padStart(2, '0')}.webp`, t: i / 20 })
for (let j = 1; j <= 12; j++) PHONE_FRAMES.push({ src: `/character/scrub/x${String(j).padStart(2, '0')}.webp`, t: 2.6 + j / 12 })
const PHONE_LAST = PHONE_FRAMES[PHONE_FRAMES.length - 1].t
/** Frames that must be decoded before the scrub counts as ready (the curtain waits for this). */
const PHONE_READY_AFTER = 10

export function Hero() {
  const track = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const motion = useCharacterMotion()
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [phone, setPhone] = useState(false)
  useEffect(() => {
    const q = matchMedia('(max-width: 700px)')
    const update = () => setPhone(q.matches)
    update(); q.addEventListener('change', update)
    return () => q.removeEventListener('change', update)
  }, [])
  // The video stays invisible until the reader has actually scrolled. At progress 0 its frame is the poster image
  // underneath anyway, and a video that reveals during load becomes the LCP candidate (it is larger than the
  // upscaled phone image), which costs ~2 s of LCP in the lab and the field.
  const [scrubbed, setScrubbed] = useState(false)
  const enabled = motion && !failed
  // Phone frame scrubber: loads the frames in the order they are needed, draws the nearest loaded frame at or
  // before the asked time with the same cover-fit and focal point as the poster image (62% 38%), and marks the
  // hero ready once the first frames are decoded. The browser keeps decoded images in its own cache, so the
  // nearby frames are decoded ahead in the scroll direction and nothing is held beyond what it decides to keep.
  const frames = useRef<(HTMLImageElement | null)[]>([])
  const drawn = useRef(-1)
  useEffect(() => {
    if (!enabled || !phone) return
    const container = track.current
    const cv = canvas.current
    if (!container || !cv) return
    let cancelled = false
    const imgs: (HTMLImageElement | null)[] = PHONE_FRAMES.map(() => null)
    frames.current = imgs
    drawn.current = -1
    let loaded = 0
    let next = 0
    const loadOne = (): Promise<void> => {
      if (cancelled || next >= PHONE_FRAMES.length) return Promise.resolve()
      const i = next++
      const img = document.createElement('img') // not `new Image()`: that name is next/image in this file
      img.decoding = 'async'
      img.src = PHONE_FRAMES[i].src
      return img.decode().then(() => {
        if (cancelled) return
        imgs[i] = img
        loaded++
        if (loaded === PHONE_READY_AFTER) { setReady(true); container.dataset.scrubReady = '1' }
      }).catch(() => undefined).then(loadOne)
    }
    // three lanes keep the first frames arriving in order while the connection stays busy
    loadOne(); loadOne(); loadOne()
    return () => { cancelled = true; frames.current = []; delete container.dataset.scrubReady }
  }, [enabled, phone])

  useEffect(() => {
    if (!enabled) return
    const media = video.current
    const cv = canvas.current
    const container = track.current
    if ((!media && !cv) || !container) return
    let frame = 0
    let target = 0
    // The shown time eases towards the scroll-mapped target (≈90% in 100 ms) so seeks land at an even cadence
    // instead of following every raw touch delta, and the picture settles with a little weight after a flick.
    let shown = 0
    let follower = 0
    let scrubEnd = 0, scrubHold = 0
    const readScrubEnd = () => {
      const cs = getComputedStyle(container)
      scrubEnd = parseFloat(cs.getPropertyValue('--scrub-end'))
      scrubHold = Math.max(0, Math.min(0.9, parseFloat(cs.getPropertyValue('--scrub-hold')) || 0))
    }
    readScrubEnd()
    // Canvas path: draw the latest loaded frame at or before `shown`, cover-fit at the poster's focal point.
    const draw = () => {
      if (!cv) return
      const imgs = frames.current
      let i = -1
      for (let k = 0; k < PHONE_FRAMES.length && PHONE_FRAMES[k].t <= shown + 0.001; k++) if (imgs[k]) i = k
      if (i < 0 || i === drawn.current) return
      const img = imgs[i] as HTMLImageElement
      const hero = container.firstElementChild as HTMLElement
      const cw = hero.clientWidth, ch = Math.round(hero.clientHeight * 0.7)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      if (cv.width !== Math.round(cw * dpr) || cv.height !== Math.round(ch * dpr)) { cv.width = Math.round(cw * dpr); cv.height = Math.round(ch * dpr) }
      const ctx = cv.getContext('2d')
      if (!ctx) return
      // Reproduce the poster's object-fit: cover at object-position 62% 38% on the FULL clip frame, then map that
      // window into the cropped frame's pixels — so the first canvas frame sits exactly where the poster was.
      const s = Math.max(cw / CLIP_W, ch / CLIP_H)
      const vw = cw / s, vh = ch / s
      const x0 = 0.62 * (CLIP_W - vw), y0 = 0.38 * (CLIP_H - vh)
      const k = img.naturalWidth / CROP_W
      const sx = Math.max(0, Math.min(img.naturalWidth - vw * k, (x0 - CROP_X) * k))
      ctx.drawImage(img, sx, y0 * k, vw * k, vh * k, 0, 0, cv.width, cv.height)
      drawn.current = i
      // decode a few frames ahead so the next draws never wait on the decoder
      for (let k = i + 1; k < Math.min(PHONE_FRAMES.length, i + 6); k++) imgs[k]?.decode().catch(() => undefined)
    }
    const seek = () => {
      if (cv) { draw(); return }
      if (media && !media.seeking && Number.isFinite(media.duration) && Math.abs(media.currentTime - shown) > 0.02) media.currentTime = shown
    }
    const follow = () => {
      follower = 0
      const diff = target - shown
      shown = Math.abs(diff) < 0.004 ? target : shown + diff * 0.35
      seek()
      if (shown !== target) follower = requestAnimationFrame(follow)
    }
    const update = () => {
      frame = 0
      const heroEl = container.firstElementChild as HTMLElement
      const range = container.offsetHeight - heroEl.offsetHeight
      const y = -container.getBoundingClientRect().top
      // The walk completes at (1 - hold) of the runway; the rest of the runway holds the final frame.
      const progress = Math.max(0, Math.min(1, y / Math.max(1, range * (1 - scrubHold))))
      if (progress > 0) setScrubbed(true)
      // Pinned: the runway maps onto 0 … --scrub-end seconds (set per breakpoint in character.css), so the page
      // starts scrolling while he is still leaving the frame. Unpinned: the rest of the clip keeps playing as the
      // hero scrolls away, reaching the end as the video leaves the viewport.
      const last = cv ? PHONE_LAST : media && Number.isFinite(media.duration) ? Math.max(0, media.duration - 0.05) : -1
      if (last >= 0) {
        const end = scrubEnd > 0 ? Math.min(scrubEnd, last) : last
        if (y <= range) target = progress * end
        else {
          const vb = (cv ?? media)!.getBoundingClientRect()
          const box = vb.height > 2 ? vb : heroEl.getBoundingClientRect()
          const exit = Math.max(0, Math.min(1, 1 - box.bottom / Math.max(1, box.height)))
          target = end + exit * (last - end)
        }
      }
      if (!follower) follower = requestAnimationFrame(follow)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    const onResize = () => { readScrubEnd(); drawn.current = -1; schedule() }
    media?.addEventListener('loadedmetadata', schedule)
    media?.addEventListener('seeked', seek)
    window.addEventListener('scroll', schedule, {passive:true})
    window.addEventListener('resize', onResize)
    schedule()
    return () => {
      cancelAnimationFrame(frame)
      cancelAnimationFrame(follower)
      media?.removeEventListener('loadedmetadata', schedule)
      media?.removeEventListener('seeked', seek)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', onResize)
    }
  }, [enabled, phone])
  return <div ref={track} className={`hero-scroll ${enabled ? 'is-scrubbing' : ''}`}><section className="hero" aria-labelledby="hero-title"><Image className="hero-image" src="/character/hero-exit-poster.jpg" alt="Karol in his sunlit studio, standing beside the desk" fill priority sizes="(max-width: 700px) 150vw, 100vw"/>{enabled && phone && <canvas ref={canvas} className={`hero-video hero-canvas ${ready && scrubbed ? 'is-ready' : ''}`} aria-hidden="true"/>}{enabled && !phone && <video ref={video} className={`hero-video ${ready && scrubbed ? 'is-ready' : ''}`} src="/character/hero-exit-scroll.mp4" muted playsInline preload="auto" aria-hidden="true" onLoadedData={() => { setReady(true); if (track.current) track.current.dataset.scrubReady = '1' }} onError={() => setFailed(true)}/>}<div className="hero-copy"><p className="eyebrow">Studio founder & full-stack engineer</p><h1 id="hero-title">Hello! I’m Karol.<br/>I build websites<br/>and apps.</h1><p>I’ve spent fifteen years across marketing and engineering, so I’m fluent in both KPI and CLI.</p><div className="actions"><Link className="button primary" href="#work">See selected work ↓</Link><Link className="button" href="/resume">View résumé ↗</Link></div></div></section></div>
}
export function Wisps({children}: {children: React.ReactNode}) {
  const ref = useRef<SVGSVGElement>(null)
  const motion = useCharacterMotion()
  useEffect(() => {
    if (!motion) return
    let frame = 0
    const update = () => {if (!frame) frame = requestAnimationFrame(() => {ref.current?.style.setProperty('--drift', `${Math.min(window.scrollY * .035,100)}px`); frame=0})}
    window.addEventListener('scroll',update,{passive:true})
    return () => {window.removeEventListener('scroll',update);cancelAnimationFrame(frame)}
  },[motion])
  return <div className="flow"><svg ref={ref} className="wisp wisp-one" viewBox="0 0 240 1000" fill="none" aria-hidden="true"><path d="M180 -20C-100 180 330 270 110 480S-20 780 190 1020"/><path d="M194 -20C-70 180 345 270 126 480S-2 780 204 1020"/></svg>{children}</div>
}
export const career = [
  {period:'2021 – Present',title:'Engineer',org:'Tall Karol · previously Integration Engineer, Universal Windows Direct',body:'AWS applications, analytics platforms, and integration architecture.'},
  {period:'2019 – 2021',title:'Marketing Director',org:'Perfect Power Wash',body:'Owned strategy and the tech stack through an expansion from one market to four.'},
  {period:'2012 – 2019',title:'Founder',org:'in2itiv media · CUBE Karaoke · Garcia L8r · Modular Studios',body:'My own ventures, with client work alongside.'},
]
export function Experience({full=false}: {full?:boolean}) {
  return <section className="experience section" id="experience"><div className="section-intro"><p className="eyebrow">The experience behind the work</p><h2>{full ? <>I’ve worked on<br/>both sides of the brief.</> : <>An engineer with<br/>business context.</>}</h2><p className="lead">I’ve owned the budget, the brief,<br/>and the code that had to deliver.</p><p>Before moving into engineering full-time, I led marketing and its technology stack. That experience still shapes my work: understand how the team operates, make the trade-offs explicit, and build something they can rely on.</p><Link className="text-link" href="/resume">Explore my full résumé ↗</Link></div><div className="experience-rows">{career.slice(0,full?4:3).map(job=><article key={job.period}><span className="career-date">{job.period}</span><div><h3>{job.title}</h3><p className="career-org">{job.org}</p><p>{job.body}</p></div></article>)}</div></section>
}
export function StudioBar(){return <a className="studio-bar" href="https://www.tallkarol.com"><strong><img className="studio-mark" src="/tallkarol-monogram-logo.png" alt="" width={30} height={40}/>TALL KAROL</strong><span>For a project: websites, applications, and the systems behind them.</span><b>Visit the studio ↗</b></a>}
export function DeskScene(){const [on,setOn]=useState(true);return <div className={`desk-scene ${on?'':'lamp-off'}`}><div className="desk-picture"><Image src="/character/desk-likeness-v3.webp" alt="Karol working at his laptop beside a desk lamp" fill sizes="(max-width: 700px) 100vw, 56vw" quality={85}/></div><div className="lamp-glow" aria-hidden="true"/><button className="lamp-hotspot" onClick={()=>setOn(!on)} aria-label={on?'Turn desk lamp off':'Turn desk lamp on'} aria-pressed={on}><span aria-hidden="true">☼</span></button><span className="interaction-hint">{on?'A little curiosity goes a long way. Try the lamp.':'Lights out. Tap again to bring back the glow.'}</span></div>}
export function AboutMoment(){return <section className="about"><DeskScene/><div className="about-copy"><p className="eyebrow">How I work</p><h2>Start with the people<br/>using it.</h2><p>A sales team needs qualified enquiries. An auditor needs the right file and a record of who accessed it. A marketing team needs to publish without waiting on a developer.</p><p>Those details shape the architecture. I work directly with the people doing the job, then carry that understanding through to the interface, the integrations, and the handover.</p><Link className="text-link" href="/about">My background & approach ↗</Link></div></section>}
export function Quote(){return <section className="quote"><div><p className="eyebrow">Working together</p><blockquote>“Highly technical, incredibly quick to learn new workflows, and remarkably dynamic when it comes to evolving project requirements.”</blockquote><p className="attribution"><span>—</span><span><strong>Christopher Jarvis</strong><br/>VP of Enterprise Digital Marketing, Great Day Improvements</span></p></div></section>}
const projectStories: Record<string, {name:string;type:string;story:string;result:string}> = {
  'mineralife-b2b-website-rebuild': {name:'Mineralife',type:'Website / Lead qualification / CRM integration',story:'A B2B website rebuilt around how the sales team works. A faster frontend, an editing workflow marketing already knew, and enquiries that arrive qualified.',result:'94 mobile Lighthouse performance · WordPress editing retained'},
  'secure-document-management-portal': {name:'Bliss',type:'Web application / AWS architecture',story:'Sensitive documents were moving through email. I built a dedicated portal with controlled access, secure file delivery, and an audit trail.',result:'Role-based access and auditable document sharing'},
  'unified-customer-lifecycle-platform': {name:'Customer lifecycle platform',type:'Web application / Commerce integrations',story:'Commerce, customer records, and follow-up lived across five tools. I brought them into one portal, with automation driven by actual purchase events.',result:'Five-tool workflow brought into one connected portal'},
  'local-ai-meeting-intelligence': {name:'Private meeting intelligence',type:'Local AI / Workflow automation',story:'Turn sensitive recordings into transcripts, action items, and calendar-ready follow-ups, with processing kept on local hardware.',result:'Local transcription and structured follow-up'},
  'uwd-enterprise-integration-api': {name:'Universal Windows Direct',type:'API engineering / Systems integration',story:'Expanded the integration layer connecting call-center, CRM, and marketing platforms, with modular routes and shared error logging.',result:'Traceable failures across connected workflows'},
  'martech-extension-architecture': {name:'WordPress, beyond the page',type:'Enterprise WordPress / Attribution / Performance',story:'Custom extensions for the work a theme cannot do: carrying attribution into the CRM, improving page delivery, and giving marketers control over tracking.',result:'Reusable tools for marketing and engineering teams'},
  'artist-house-ar-discovery-platform': {name:'Artist House',type:'Product engineering / Data pipelines',story:'An A&R research platform that brings chart monitoring, social data, analytics, and artist watchlists into the team’s daily workflow.',result:'Used daily by junior and senior A&R staff'},
}
const featuredSlugs=['mineralife-b2b-website-rebuild','secure-document-management-portal','unified-customer-lifecycle-platform','local-ai-meeting-intelligence']
export const featuredProjects=featuredSlugs.map(slug=>allCaseStudies.find(p=>p.slug===slug)!).filter(Boolean)
export function Projects({all=false}:{all?:boolean}){
  const ref=useRef<HTMLDivElement>(null)
  const [index,setIndex]=useState(0)
  const motion=useCharacterMotion()
  const projects=all?allCaseStudies:featuredProjects
  function step(direction:number){const el=ref.current;if(!el)return;const card=el.querySelector<HTMLElement>('.project');if(!card)return;const width=card.getBoundingClientRect().width+28;const max=el.scrollWidth-el.clientWidth;const target=direction>0&&el.scrollLeft>=max-5?0:direction<0&&el.scrollLeft<5?max:el.scrollLeft+direction*width;el.scrollTo({left:target,behavior:motion?'smooth':'auto'})}
  return <section className="work section" id="work"><div className="section-heading"><div><p className="eyebrow">Selected work</p><h2>{all?'A closer look at the work.':'Built. Shipped. Used.'}</h2><p>Websites that support sales. Applications that replace workarounds. Systems that keep the data moving.</p></div>{!all&&<div className="carousel-controls"><button onClick={()=>step(-1)} aria-label="Previous project">←</button><button onClick={()=>step(1)} aria-label="Next project">→</button></div>}</div><div className={`projects ${all?'project-grid':''}`} ref={ref} onScroll={()=>{const el=ref.current;const card=el?.querySelector<HTMLElement>('.project');if(el&&card)setIndex(Math.round(el.scrollLeft/(card.offsetWidth+28)))}} aria-label="Selected projects" tabIndex={all?undefined:0} onKeyDown={e=>{if(!all&&['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();step(e.key==='ArrowRight'?1:-1)}}}>{projects.map(project=><article className="project" key={project.slug}><Link className="project-art-link" href={`/portfolio/${project.slug}`} aria-label={`Read ${project.title}`}><ProjectArtwork slug={project.slug}/></Link><div className="project-meta"><div><h3><Link href={`/portfolio/${project.slug}`}>{projectStories[project.slug]?.name || project.title}</Link></h3><p className="project-type">{projectStories[project.slug]?.type || project.subtitle}</p></div><Link href={`/portfolio/${project.slug}`} aria-label={`Read ${project.title}`}>↗</Link></div><p className="project-story">{projectStories[project.slug]?.story || project.summary}</p><p className="project-result">{projectStories[project.slug]?.result}</p><Link className="text-link" href={`/portfolio/${project.slug}`}>Read the case study ↗</Link></article>)}</div>{!all&&<div className="work-footer"><p className="carousel-status" aria-live="polite">{String(index+1).padStart(2,'0')} / {String(projects.length).padStart(2,'0')}</p><Link className="text-link" href="/portfolio">Explore all work ↗</Link></div>}</section>
}
export function PageIntro({eyebrow,title,children}:{eyebrow:string,title:React.ReactNode,children?:React.ReactNode}){return <section className="page-intro section"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><div className="page-description">{children}</div></section>}
