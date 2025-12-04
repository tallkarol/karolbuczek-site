"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { BrokenCode } from "@/components/illustrations/BrokenCode"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function NotFound() {
  return (
    <div className="bg-background text-foreground flex items-center justify-center px-6 py-12" style={{ minHeight: '100vh', maxHeight: '100dvh' }}>
      <div className="max-w-2xl w-full flex flex-col items-center text-center space-y-6 md:space-y-8 px-4">
        {/* Illustration */}
        <div className="w-full max-w-[160px] md:max-w-[240px] aspect-square flex items-center justify-center flex-shrink-0 p-4">
          <BrokenCode className="w-full h-full" />
        </div>

        {/* Text content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <Typography variant="eyebrow" className="text-muted-foreground">
            Oops!
          </Typography>
          <Typography variant="h1" as="h1">
            This page doesn&apos;t exist
          </Typography>
          <Typography variant="body" className="text-muted-foreground max-w-xl mx-auto">
            Looks like you wandered off the main path. Let&apos;s get you back to where the real work happens.
          </Typography>
        </motion.div>

        {/* Links */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          <Button
            asChild
            className="rounded-full px-6 py-2 text-sm font-semibold font-ui"
          >
            <Link href="/">Go Home</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-border/50 px-6 py-2 text-sm font-ui hover:border-foreground/20"
          >
            <Link href="/case-studies">Case Studies</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-border/50 px-6 py-2 text-sm font-ui hover:border-foreground/20"
          >
            <Link href="/resume">Resume</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-border/50 px-6 py-2 text-sm font-ui hover:border-foreground/20"
          >
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

