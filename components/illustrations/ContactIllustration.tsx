"use client"

import Image from "next/image"

interface ContactIllustrationProps {
  className?: string
  priority?: boolean
}

export function ContactIllustration({ className, priority }: ContactIllustrationProps) {
  return (
    <div className={`relative h-full w-full ${className ?? ""}`}>
      <Image
        src="/contact-illustration.png"
        alt="Illustration of communication through mail, phone, and digital channels"
        fill
        className="object-contain object-center"
        priority={priority}
        sizes="(max-width: 768px) 275px, 350px"
      />
    </div>
  )
}

