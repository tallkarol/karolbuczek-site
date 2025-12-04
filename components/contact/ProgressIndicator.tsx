"use client"

import { cn } from "@/lib/utils"

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="mb-8 flex items-center justify-center gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1
        const isActive = step === currentStep
        const isComplete = step < currentStep

        return (
          <div key={step} className="flex items-center">
            <div
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold transition-all font-ui",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : isComplete
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {isComplete ? (
                <svg
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                step
              )}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={cn(
                  "mx-2 h-0.5 w-8 transition-colors",
                  isComplete ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

