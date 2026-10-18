import Image from "next/image"
import { brands, renderedWidth, TICKER_ROW_HEIGHT } from "@/lib/brands"

/* Client-logo band under the hero, ported from tallkarol's TrustBar. Server
   component, pure-CSS marquee (TRUST BAR TICKER in character.css): zero JS,
   fixed row height. Duration = one group's width / speed, so a longer list
   loops longer at the same pace; enough copies to cover an ultrawide screen. */
const SCROLL_SPEED = 48 // px per second
const GAP_ESTIMATE = 64 // px — middle of the --ticker-gap clamp
const WIDEST_VIEWPORT = 3000 // px
const groupWidth = brands.reduce((total, brand) => total + renderedWidth(brand), 0) + brands.length * GAP_ESTIMATE
const duration = `${Math.round(groupWidth / SCROLL_SPEED)}s`
const copies = Math.max(2, Math.ceil(WIDEST_VIEWPORT / groupWidth) + 1)

/* Only the first group is announced; the copies are aria-hidden with empty alts. */
function LogoGroup({ decorative = false }: { decorative?: boolean }) {
  return <ul className="ticker-group" aria-hidden={decorative || undefined}>{brands.map(brand => <li key={brand.name} className="ticker-item" style={{height: TICKER_ROW_HEIGHT}}><Image src={brand.logo} alt={decorative ? "" : brand.name} width={brand.width} height={brand.height} className="ticker-logo" style={{height: brand.displayHeight, width: "auto"}} sizes={`${renderedWidth(brand)}px`} loading="lazy" quality={75}/></li>)}</ul>
}

export function TrustBar() {
  return <section id="clients" className="trust-bar"><p className="eyebrow">Trusted by teams at</p><div className="ticker" style={{"--ticker-duration": duration, "--ticker-copies": copies} as React.CSSProperties}><div className="ticker-track">{Array.from({length: copies}, (_, i) => <LogoGroup key={i} decorative={i > 0}/>)}</div></div></section>
}
