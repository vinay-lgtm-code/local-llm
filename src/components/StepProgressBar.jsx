import { cn } from '@/lib/utils';
import { BUILD_STEPS } from '@/data/canvasLayout';
import { CATEGORY_META } from '@/data/parts';
import { Check } from 'lucide-react';

export default function StepProgressBar({ currentStepIndex, slotStates, onStepClick }) {
  return (
    <div className="flex items-center justify-center gap-0 px-4 py-2 overflow-x-auto">
      {BUILD_STEPS.map((step, index) => {
        const state = slotStates[step.category];
        const isCurrent = index === currentStepIndex;
        const isFilled = state === 'filled';
        const meta = CATEGORY_META[step.category];

        return (
          <div key={step.category} className="flex items-center">
            {/* Connector line */}
            {index > 0 && (
              <div
                className={cn(
                  'h-[2px] w-6 sm:w-10 transition-all duration-500',
                  isFilled
                    ? 'bg-primary'
                    : 'bg-border'
                )}
              />
            )}

            {/* Step node — always clickable */}
            <button
              onClick={() => onStepClick(index)}
              className={cn(
                'relative flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all duration-300 shrink-0 cursor-pointer hover:scale-110',
                isFilled && 'bg-primary text-primary-foreground shadow-md shadow-primary/30',
                isCurrent && !isFilled && 'bg-primary/20 text-primary ring-2 ring-primary ring-offset-1 ring-offset-background step-pulse',
                !isCurrent && !isFilled && 'bg-secondary text-muted-foreground hover:bg-secondary/80',
              )}
              title={`${step.label}${isFilled ? ' (placed)' : ''}`}
            >
              {isFilled ? (
                <Check className="w-3.5 h-3.5" strokeWidth={3} />
              ) : (
                <span>{meta.icon}</span>
              )}
            </button>

            {/* Step label below - visible on wider screens */}
            {isCurrent && (
              <span className="absolute mt-10 text-[9px] font-semibold text-primary whitespace-nowrap hidden sm:block">
                {step.label}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
