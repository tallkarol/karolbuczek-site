import Image from 'next/image'

const artwork: Record<string, {tone:string;label:string;image?:string;secondary?:string;nodes?:string[]}> = {
 'mineralife-b2b-website-rebuild':{tone:'sand',label:'Mineralife / Website & sales workflow',image:'/website-builds/mineralife-b2b.jpg'},
 'secure-document-management-portal':{tone:'sage',label:'Bliss / Document operations',image:'/bliss-user-portal-view.png',secondary:'/bliss-inbox.png'},
 'unified-customer-lifecycle-platform':{tone:'blue',label:'MHAT / Customer lifecycle',image:'/mhat-user-dashboard.png',secondary:'/mhat-report-view.png'},
 'local-ai-meeting-intelligence':{tone:'night',label:'Local AI / Meeting intelligence',image:'/podrick-user-dashboard.png',secondary:'/podrick-action-items-dashboard.png'},
 'uwd-enterprise-integration-api':{tone:'blue',label:'UWD / Integration architecture',nodes:['Five9','CRM','Mailchimp','Internal tools']},
 'martech-extension-architecture':{tone:'sand',label:'WordPress / Marketing infrastructure',image:'/wordpress-persistent-utm.png',secondary:'/wordpress-webvitals-block.png'},
 'artist-house-ar-discovery-platform':{tone:'night',label:'Artist House / Discovery workflow',nodes:['Chart data','Social crawls','Watchlists','Reports']},
}
export function ProjectArtwork({slug,large=false}:{slug:string;large?:boolean}) {
 const art=artwork[slug]
 if(!art)return null
 return <div className={`project-art art-${art.tone} ${large?'art-large':''}`}>
  <span className="art-label">{art.label}</span><span className="art-orbit" aria-hidden="true"/>
  {art.image ? <div className={`art-window ${art.secondary?'with-secondary':''}`}><div className="window-chrome" aria-hidden="true"><i/><i/><i/></div><Image src={art.image} alt={`${art.label} — actual project interface`} width={1200} height={800} sizes={large?'86vw':'(max-width:700px) 85vw, 42vw'}/></div> : <div className="system-art" role="img" aria-label={`${art.label}: ${art.nodes?.join(', ')}. Simplified workflow illustration.`}><div className="system-hub">{slug.startsWith('uwd')?'Integration API':'Discovery platform'}<span>{slug.startsWith('uwd')?'Routes · events · logging':'Research · analytics · delivery'}</span></div><div className="system-nodes">{art.nodes?.map((node,i)=><div key={node}><span>0{i+1}</span>{node}</div>)}</div><small>Simplified workflow illustration</small></div>}
  {art.secondary&&<div className="art-secondary"><Image src={art.secondary} alt="Additional project interface" width={700} height={500} sizes="(max-width:700px) 38vw, 22vw"/></div>}
  {slug==='mineralife-b2b-website-rebuild'&&<div className="art-phone"><Image src="/character/mineralife-mobile.jpg" alt="Mineralife mobile website" width={360} height={740} sizes="(max-width:700px) 22vw, 12vw"/></div>}
 </div>
}
