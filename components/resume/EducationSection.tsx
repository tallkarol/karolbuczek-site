"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Typography } from "@/components/typography"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

const education = [
  {
    institution: "Case Western Reserve University",
    program: "Full Stack Web Development (2018–2019)",
    period: "2018–2019",
    bullets: [
      "Completed a rigorous engineering program with emphasis on modern JavaScript development",
      "Built production-grade applications using React, Node, SQL, REST APIs, and test-driven approaches",
      "Strengthened architectural thinking, debugging skills, and real-world engineering workflows",
    ],
  },
  {
    institution: "Columbus State Community College",
    program: "Real Estate Licensure Program (2014)",
    period: "2014",
    bullets: [
      "Completed to support a startup requiring commercial property evaluation",
      "Gained practical experience with contracts, compliance, negotiation, due diligence, and structured procedural workflows",
    ],
  },
  {
    institution: "Miami University",
    program: "International Studies — East Asia (2008–2013)",
    period: "2008–2013",
    bullets: [
      "Interdisciplinary coursework blending marketing, cultural analysis, business, language, and global systems",
      "Member of the China Business Program",
      "Developed analytical skills and cross-cultural communication that inform cross-functional engineering work today",
    ],
  },
]

export function EducationSection() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="border-border/50 hover:border-primary/30 transition-colors">
      <CardHeader className="pb-0 border-b-0">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            setIsOpen(!isOpen)
          }}
          className="w-full flex items-center justify-between gap-3 pb-4 border-b border-border/30 hover:opacity-70 transition-opacity group cursor-pointer"
        >
          <CardTitle className="text-lg font-display flex items-center gap-2 group-hover:text-primary transition-colors pointer-events-none">
            <span className="h-1 w-1 rounded-full bg-primary" />
            Education
          </CardTitle>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground pointer-events-none" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground pointer-events-none" />
          )}
        </button>
      </CardHeader>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <CardContent className="pt-6">
        <div className="space-y-8">
          {education.map((edu, index) => (
            <div key={index} className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div className="space-y-1">
                  <Typography variant="body" className="font-semibold">
                    {edu.institution}
                  </Typography>
                  <Typography variant="body-sm" className="font-medium text-foreground">
                    {edu.program}
                  </Typography>
                </div>
                <Typography variant="body-sm" className="text-muted-foreground font-medium italic whitespace-nowrap">
                  {edu.period}
                </Typography>
              </div>
              <ul className="space-y-1.5">
                {edu.bullets.map((bullet, bulletIndex) => (
                  <li key={bulletIndex} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                    <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
                      {bullet}
                    </Typography>
                  </li>
                ))}
              </ul>
              {index < education.length - 1 && (
                <div className="pt-4 border-b border-border/30" />
              )}
            </div>
          ))}
        </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

