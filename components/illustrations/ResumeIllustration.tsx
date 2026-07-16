"use client"

import Image from "next/image"

interface ResumeIllustrationProps {
  className?: string
  priority?: boolean
}

export function ResumeIllustration({ className, priority }: ResumeIllustrationProps) {
  return (
    <div className={`relative h-full w-full ${className ?? ""}`}>
      <Image
        src="/resume-illustration.png"
        alt="Illustration representing an interactive resume with experience, skills, and career timeline"
        fill
        className="object-contain object-center"
        priority={priority}
        sizes="(max-width: 768px) 275px, 350px"
      />
    </div>
  )
}
