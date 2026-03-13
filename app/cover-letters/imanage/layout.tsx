import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cover Letter — iManage | Karol Buczek",
  description: "Cover letter for Solutions Engineer role at iManage.",
}

export default function IManageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
