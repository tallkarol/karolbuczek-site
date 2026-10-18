"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { allCaseStudies } from "@/lib/resume-data"
import { ProjectArtwork } from "./ProjectArtwork"
import { useCharacterMotion } from "./CharacterShell"

export function Hero() {
  const track = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const motion = useCharacterMotion()
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  // The video stays invisible until the reader has actually scrolled. At progress 0 its frame is the poster image
  // underneath anyway, and a video that reveals during load becomes the LCP candidate (it is larger than the
  // upscaled phone image), which costs ~2 s of LCP in the lab and the field.
  const [scrubbed, setScrubbed] = useState(false)
  const enabled = motion && !failed
  useEffect(() => {
    if (!enabled) return
    const media = video.current
    const container = track.current
    if (!media || !container) return
    let frame = 0
    let target = 0
    const seek = () => {
      if (!media.seeking && Number.isFinite(media.duration) && Math.abs(media.currentTime - target) > 0.035) media.currentTime = target
    }
    const update = () => {
      frame = 0
      const heroEl = container.firstElementChild as HTMLElement
      const range = container.offsetHeight - heroEl.offsetHeight
      const y = -container.getBoundingClientRect().top
      const progress = Math.max(0, Math.min(1, y / Math.max(1, range)))
      if (progress > 0) setScrubbed(true)
      // Pinned: the runway maps onto 0 … --scrub-end seconds (set per breakpoint in character.css), so the page
      // starts scrolling while he is still leaving the frame. Unpinned: the rest of the clip keeps playing as the
      // hero scrolls away, reaching the end as the video leaves the viewport.
      if (Number.isFinite(media.duration)) {
        const last = Math.max(0, media.duration - 0.05)
        const endVar = parseFloat(getComputedStyle(container).getPropertyValue('--scrub-end'))
        const end = endVar > 0 ? Math.min(endVar, last) : last
        if (y <= range) target = progress * end
        else {
          const vb = media.getBoundingClientRect()
          const box = vb.height > 2 ? vb : heroEl.getBoundingClientRect()
          const exit = Math.max(0, Math.min(1, 1 - box.bottom / Math.max(1, box.height)))
          target = end + exit * (last - end)
        }
      }
      seek()
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    media.addEventListener('loadedmetadata', schedule)
    media.addEventListener('seeked', seek)
    window.addEventListener('scroll', schedule, {passive:true})
    window.addEventListener('resize', schedule)
    schedule()
    return () => {
      cancelAnimationFrame(frame)
      media.removeEventListener('loadedmetadata', schedule)
      media.removeEventListener('seeked', seek)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [enabled])
  return <div ref={track} className={`hero-scroll ${enabled ? 'is-scrubbing' : ''}`}><section className="hero" aria-labelledby="hero-title"><Image className="hero-image" src="/character/hero-exit-poster.jpg" alt="Karol in his sunlit studio, standing beside the desk" fill priority sizes="(max-width: 700px) 150vw, 100vw"/>{enabled && <video ref={video} className={`hero-video ${ready && scrubbed ? 'is-ready' : ''}`} src="/character/hero-exit-scroll.mp4" muted playsInline preload="auto" aria-hidden="true" onLoadedData={() => setReady(true)} onError={() => setFailed(true)}/>}<div className="hero-copy"><p className="eyebrow">Studio founder & full-stack engineer</p><h1 id="hero-title">Hello! I’m Karol.<br/>I build websites<br/>and apps.</h1><p>I’ve spent fifteen years across marketing and engineering, so I’m fluent in both KPI and CLI.</p><div className="actions"><Link className="button primary" href="#work">See selected work ↓</Link><Link className="button" href="/resume">View résumé ↗</Link></div></div></section></div>
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
  {period:'2023 – Present',title:'Independent consultant',org:'Tall Karol',body:'Serverless AWS applications, production analytics platforms, headless WordPress rebuilds, and integration architecture.'},
  {period:'2021 – 2023',title:'Integration Engineer',org:'Universal Windows Direct',body:'Expanded a centralized integration API connecting Five9, CRM, Mailchimp, and internal platforms, with shared logging across every automation.'},
  {period:'2019 – 2021',title:'Marketing Director',org:'Perfect Power Wash',body:'Owned strategy and the technology stack through an expansion from one market to four. Built the first data warehouse and internal tools, then hired and trained a developer.'},
  {period:'2009 – 2019',title:'The freelance decade',org:'Independent work',body:'Client sites, web applications, photography, and early startup ventures, built alongside school and every job.'},
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
