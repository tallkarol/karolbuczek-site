import type { Metadata } from 'next'
import { PageIntro, Projects, StudioBar } from '@/components/character/CharacterSections'
export const metadata: Metadata={title:'Work | Karol Buczek',description:'Custom applications, enterprise WordPress, systems integration and private AI. Real projects and the decisions behind them.'}
export default function PortfolioPage(){return <><PageIntro eyebrow="Portfolio" title={<>The interface is<br/>only part of the work.</>}><p>Behind each project is a workflow to understand, a set of constraints to respect, and a team that needs the result to work. Here’s what I built and why I built it that way.</p></PageIntro><Projects all/><StudioBar/></>}
