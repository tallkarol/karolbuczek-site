"use client"

import Image from "next/image"

interface CaseStudiesIllustrationProps {
  className?: string
  priority?: boolean
}

export function CaseStudiesIllustration({ className, priority }: CaseStudiesIllustrationProps) {
  return (
    <div className={`relative h-full w-full ${className ?? ""}`}>
      <Image
        src="/portfolio-illustration.png"
        alt="Illustration of a systems architect presenting code, interfaces, and technical diagrams"
        fill
        className="object-contain object-center"
        priority={priority}
        sizes="(max-width: 768px) 275px, 350px"
      />
    </div>
  )
}
