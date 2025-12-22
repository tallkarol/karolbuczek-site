"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface AnimatedWordProps {
  words: string[]
}

export function AnimatedWord({ words }: AnimatedWordProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  useEffect(() => {
    // Delay animation start to reduce initial blocking
    let interval: NodeJS.Timeout | null = null
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
      }, 3000)
    }, 500)

    return () => {
      clearTimeout(timeout)
      if (interval) clearInterval(interval)
    }
  }, [words.length])

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={words[currentWordIndex]}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="inline-block text-primary"
      >
        {words[currentWordIndex]}
      </motion.span>
    </AnimatePresence>
  )
}

