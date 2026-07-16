import Image from "next/image"

interface HomeHeroIllustrationProps {
  className?: string
  priority?: boolean
}

export function HomeHeroIllustration({ className, priority }: HomeHeroIllustrationProps) {
  return (
    <div className={`relative h-full w-full ${className ?? ""}`}>
      <Image
        src="/homepage-hero-presentation.webp"
        alt="Illustration of a systems architect presenting solutions to a group"
        fill
        className="object-contain object-center"
        priority={priority}
        sizes="(max-width: 767px) 112vw, (max-width: 1024px) 68vw, 760px"
      />
    </div>
  )
}
