"use client"

import { cn } from "@/lib/utils"

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
  onStepClick?: (step: number) => void
  accessibleSteps?: number[] // Steps that can be navigated to
}

export function ProgressIndicator({ 
  currentStep, 
  totalSteps, 
  onStepClick,
  accessibleSteps 
}: ProgressIndicatorProps) {
  const isStepAccessible = (step: number) => {
    if (!onStepClick) return false
    // Always allow backward navigation to completed steps
    if (step < currentStep) return true
    // Forward navigation only if step is in accessibleSteps
    if (accessibleSteps && accessibleSteps.includes(step)) return true
    return false
  }

  const handleStepClick = (step: number) => {
    if (onStepClick && isStepAccessible(step)) {
      onStepClick(step)
    }
  }

  return (
    <div className="mb-8 flex items-center justify-center gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1
        const isActive = step === currentStep
        const isComplete = step < currentStep
        const isAccessible = isStepAccessible(step)
        const isClickable = onStepClick && isAccessible

        return (
          <div key={step} className="flex items-center">
            <button
              type="button"
              onClick={() => handleStepClick(step)}
              disabled={!isClickable}
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold transition-all font-ui",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : isComplete
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground",
                isClickable && !isActive && "hover:bg-primary/30 hover:scale-110 cursor-pointer",
                !isClickable && "cursor-default"
              )}
              aria-label={`Go to step ${step}`}
              aria-current={isActive ? "step" : undefined}
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
            </button>
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

