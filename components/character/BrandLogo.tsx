export function BrandLogo({ fullName = false }: { fullName?: boolean }) {
  return <span className={`brand-lockup ${fullName ? "brand-full-name" : ""}`} aria-hidden="true"><span className="brand-monogram"><span className="brand-reverse-k">k</span><span className="brand-b">b</span></span><span className="brand-name">{fullName ? "karol buczek" : "karol"}</span></span>
}
