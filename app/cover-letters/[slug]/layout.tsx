export default function CoverLetterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="print-cover-letter-layout no-print-layout">
      {children}
    </div>
  )
}


