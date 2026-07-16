"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { clientBrands } from "@/lib/client-brands"

const VISIBLE_COUNT = 4
/** Duplicate once so a 50% track translate loops seamlessly. */
const loopBrands = [...clientBrands, ...clientBrands]
const trackWidthPercent = (loopBrands.length / VISIBLE_COUNT) * 100
const itemWidthPercent = 100 / loopBrands.length

export function BrandTrustBar() {
  return (
    <div className="border-b border-border/40 bg-muted/20 py-10 overflow-hidden">
      <div className="kb-content-rail">
        <p className="mb-6 text-center font-ui text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Brands I&apos;ve Worked With
        </p>
        <div className="relative overflow-hidden">
          {/* Soft edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-muted/20 to-transparent sm:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-muted/20 to-transparent sm:w-20" />

          {/* Percentage-based track: no JS measure → no layout shift on mount */}
          <motion.div
            className="flex items-center"
            style={{ width: `${trackWidthPercent}%` }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 28,
                ease: "linear",
              },
            }}
          >
            {loopBrands.map((brand, i) => (
              <div
                key={`${brand.alt}-${i}`}
                className="flex flex-shrink-0 items-center justify-center px-2"
                style={{ width: `${itemWidthPercent}%` }}
              >
                <div className="relative flex h-10 w-full max-w-[112px] items-center justify-center opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-12">
                  {brand.src.endsWith(".svg") ? (
                    // eslint-disable-next-line @next/next/no-img-element -- SVG logos; sized to reserve layout
                    <img
                      src={brand.src}
                      alt={brand.alt}
                      width={112}
                      height={40}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <Image
                      src={brand.src}
                      alt={brand.alt}
                      fill
                      className="object-contain"
                      sizes="112px"
                    />
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
