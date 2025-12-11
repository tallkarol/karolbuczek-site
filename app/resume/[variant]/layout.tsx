export default function ResumeVariantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="print-resume-layout no-print-layout">
      {children}
    </div>
  )
}

