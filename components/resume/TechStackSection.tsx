"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Typography } from "@/components/typography"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"
import { 
  SiPhp, 
  SiJavascript, 
  SiTypescript, 
  SiReact, 
  SiNodedotjs,
  SiMysql,
  SiWordpress,
  SiAmazon,
  SiGit,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiVercel,
  SiSupabase
} from "react-icons/si"
import { Database } from "lucide-react"

const techCategories = [
  {
    name: "Languages",
    items: [
      { name: "PHP", icon: SiPhp, color: "text-[#777BB4]" },
      { name: "JavaScript", icon: SiJavascript, color: "text-[#F7DF1E]" },
      { name: "TypeScript", icon: SiTypescript, color: "text-[#3178C6]" },
      { name: "SQL", icon: SiMysql, color: "text-[#4479A1]" },
      { name: "HTML5", icon: SiHtml5, color: "text-[#E34F26]" },
      { name: "CSS3", icon: SiCss3, color: "text-[#1572B6]" },
    ],
  },
  {
    name: "Libraries & Frameworks",
    items: [
      { name: "React", icon: SiReact, color: "text-[#61DAFB]" },
      { name: "Node.js", icon: SiNodedotjs, color: "text-[#339933]" },
      { name: "TailwindCSS", icon: SiTailwindcss, color: "text-[#06B6D4]" },
    ],
  },
  {
    name: "Platforms & Tools",
    items: [
      { name: "WordPress", icon: SiWordpress, color: "text-[#21759B]" },
      { name: "AWS", icon: SiAmazon, color: "text-[#FF9900]" },
      { name: "Vercel", icon: SiVercel, color: "text-[#000000]" },
      { name: "Supabase", icon: SiSupabase, color: "text-[#3ECF8E]" },
      { name: "SQL Server", icon: Database, color: "text-[#CC2927]" },
      { name: "Git", icon: SiGit, color: "text-[#F05032]" },
    ],
  },
]

interface TechStackSectionProps {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function TechStackSection({ isOpen: controlledIsOpen, onOpenChange }: TechStackSectionProps = {}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen
  const setIsOpen = onOpenChange || ((value: boolean) => setInternalIsOpen(value))

  return (
    <Card id="tech-stack" className="border-border/50 hover:border-primary/30 transition-colors scroll-mt-20">
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
            Tech Stack
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
              <div className="space-y-6">
                {techCategories.map((category, catIndex) => (
                  <div key={category.name} className="space-y-3">
                    <Typography variant="body-sm" className="font-semibold text-foreground text-xs uppercase tracking-wide">
                      {category.name}
                    </Typography>
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-3">
                      {category.items.map((item, index) => {
                        const Icon = item.icon
                        const globalIndex = catIndex * 10 + index
                        return (
                          <motion.div
                            key={item.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2, delay: globalIndex * 0.03 }}
                            className="group flex flex-col items-center gap-2 p-3 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-muted/20 transition-all cursor-default"
                          >
                            <Icon className={`h-6 w-6 ${item.color} group-hover:scale-110 transition-transform`} />
                            <Typography variant="body-sm" className="text-xs text-muted-foreground text-center group-hover:text-foreground transition-colors">
                              {item.name}
                            </Typography>
                          </motion.div>
                        )
                      })}
                    </div>
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

