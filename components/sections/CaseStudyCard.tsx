"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export interface CaseStudy {
  slug: string
  title: string
  summary: string
  tags: string[]
  metric?: string
}

interface CaseStudyCardProps {
  caseStudy: CaseStudy
  index: number
  onClick?: () => void
}

export function CaseStudyCard({ caseStudy, index, onClick }: CaseStudyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card className={`group h-full flex flex-col hover:shadow-lg transition-all border-border/50 hover:border-primary/30 relative overflow-hidden ${onClick ? 'cursor-pointer' : ''}`}>
        {/* Subtle accent line */}
        <div className="absolute top-0 left-0 h-1 w-0 bg-primary group-hover:w-full transition-all duration-300" />
        
        <CardHeader className="pb-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {caseStudy.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full bg-muted/50 text-muted-foreground font-ui font-medium border border-border/30 group-hover:border-primary/20 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
          <CardTitle className="text-xl font-display font-semibold leading-tight mb-2 group-hover:text-primary transition-colors">{caseStudy.title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground leading-relaxed">{caseStudy.summary}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pt-0">
          {caseStudy.metric && (
            <div className="text-sm font-semibold text-primary font-ui">
              {caseStudy.metric}
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-4">
          {onClick ? (
            <Button 
              onClick={onClick}
              variant="outline" 
              className="w-full rounded-full border-border/50 font-ui hover:border-primary transition-colors"
            >
              View case study
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button asChild variant="outline" className="w-full rounded-full border-border/50 font-ui hover:border-primary transition-colors">
              <Link href={`/case-studies/${caseStudy.slug}`}>
                View case study
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}

