"use client"

import { cn } from "@/lib/utils"

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
  onStepClick?: (step: number) => void
  accessibleSteps?: number[]
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
  onStepClick,
  accessibleSteps,
}: ProgressIndicatorProps) {
  const isStepAccessible = (step: number) => {
    if (!onStepClick) return false
    if (step < currentStep) return true
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
                "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold font-ui transition-all",
                "focus:outline-none focus:ring-2 focus:ring-olive-700 focus:ring-offset-2 focus:ring-offset-chiffon-100 dark:focus:ring-offset-navy-800",
                isActive
                  ? "bg-olive-700 text-chiffon"
                  : isComplete
                  ? "border-2 border-olive-700 bg-white text-olive-700 dark:bg-navy-900"
                  : "border-2 border-navy-700/40 bg-white text-navy-700 dark:border-chiffon/40 dark:bg-navy-900 dark:text-chiffon",
                isClickable && !isActive && "cursor-pointer hover:scale-110 hover:border-olive-700",
                !isClickable && "cursor-default"
              )}
              aria-label={`Go to step ${step}`}
              aria-current={isActive ? "step" : undefined}
            >
              {isComplete ? (
                <svg
                  className="h-3.5 w-3.5"
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
                  isComplete ? "bg-olive-700" : "bg-navy-700/50 dark:bg-chiffon/45"
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
