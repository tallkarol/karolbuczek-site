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
    <div className="stepper" aria-label="Form progress">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1
        const isActive = step === currentStep
        const isComplete = step < currentStep
        const isClickable = Boolean(onStepClick && isStepAccessible(step))

        return (
          <div key={step} className="step-item">
            <button
              type="button"
              onClick={() => handleStepClick(step)}
              disabled={!isClickable}
              className={cn(
                "step",
                isActive && "is-current",
                isComplete && "is-done"
              )}
              aria-label={`Go to step ${step}`}
              aria-current={isActive ? "step" : undefined}
            >
              {isComplete ? (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M5 13l4 4L19 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                step
              )}
            </button>
            {index < totalSteps - 1 && (
              <span className={cn("step-line", isComplete && "is-done")} />
            )}
          </div>
        )
      })}
    </div>
  )
}
