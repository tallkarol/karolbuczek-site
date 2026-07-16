"use client"

import { useState } from "react"
import { DemoFintechPage } from "@/components/color-sampler/preview/DemoFintechPage"
import { DemoKitPage } from "@/components/color-sampler/preview/DemoKitPage"
import { DemoMarketingPage } from "@/components/color-sampler/preview/DemoMarketingPage"
import { DemoPageSwitcher } from "@/components/color-sampler/preview/DemoPageSwitcher"
import { DemoSaasPage } from "@/components/color-sampler/preview/DemoSaasPage"
import { type DemoPageId } from "@/components/color-sampler/preview/demo-pages"

type ColorSamplerPreviewProps = {
  tokenSwatches: [string, string][]
}

export function ColorSamplerPreview({ tokenSwatches }: ColorSamplerPreviewProps) {
  const [activePage, setActivePage] = useState<DemoPageId>("saas")

  return (
    <div className="bg-background text-foreground">
      <DemoPageSwitcher active={activePage} onChange={setActivePage} />
      {activePage === "saas" && <DemoSaasPage />}
      {activePage === "fintech" && <DemoFintechPage />}
      {activePage === "marketing" && <DemoMarketingPage />}
      {activePage === "kit" && <DemoKitPage tokenSwatches={tokenSwatches} />}
    </div>
  )
}
