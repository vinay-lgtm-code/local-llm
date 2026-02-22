import { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { BUILD_STEPS } from '@/data/canvasLayout';

export function useBuildFlow(selectedParts) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const autoAdvanceTimer = useRef(null);
  const selectedPartsRef = useRef(selectedParts);

  // Keep ref in sync so timeout always reads latest
  useEffect(() => {
    selectedPartsRef.current = selectedParts;
  }, [selectedParts]);

  const currentStep = BUILD_STEPS[currentStepIndex];
  const currentCategory = currentStep?.category;

  // Compute state for each slot based on current step and selected parts
  // No slot is ever "locked" — all categories are optional
  const slotStates = useMemo(() => {
    const states = {};
    BUILD_STEPS.forEach((step, index) => {
      const category = step.category;
      const hasPart = !!selectedParts[category];

      if (hasPart) {
        states[category] = 'filled';
      } else if (index === currentStepIndex) {
        states[category] = 'active';
      } else {
        states[category] = 'available';
      }
    });
    return states;
  }, [selectedParts, currentStepIndex]);

  const goToStep = useCallback((index) => {
    if (index >= 0 && index < BUILD_STEPS.length) {
      setCurrentStepIndex(index);
    }
  }, []);

  const goToCategory = useCallback((category) => {
    const index = BUILD_STEPS.findIndex((s) => s.category === category);
    if (index >= 0) {
      setCurrentStepIndex(index);
    }
  }, []);

  // Auto-advance to next unfilled step after placing a part
  const scheduleAutoAdvance = useCallback(() => {
    if (autoAdvanceTimer.current) {
      clearTimeout(autoAdvanceTimer.current);
    }
    autoAdvanceTimer.current = setTimeout(() => {
      const parts = selectedPartsRef.current;
      setCurrentStepIndex((prev) => {
        // Find the next step that doesn't have a part
        for (let i = prev + 1; i < BUILD_STEPS.length; i++) {
          if (!parts[BUILD_STEPS[i].category]) {
            return i;
          }
        }
        // If all remaining steps are filled, try wrapping around
        for (let i = 0; i < prev; i++) {
          if (!parts[BUILD_STEPS[i].category]) {
            return i;
          }
        }
        // All slots filled, stay on current
        return prev;
      });
    }, 800);
  }, []);

  // Check if a drop should be accepted: just needs matching category
  const canDrop = useCallback((dragCategory, dropCategory) => {
    return dragCategory === dropCategory;
  }, []);

  const completedCount = Object.values(selectedParts).filter(Boolean).length;
  const isComplete = completedCount === BUILD_STEPS.length;

  return {
    currentStepIndex,
    currentStep,
    currentCategory,
    slotStates,
    goToStep,
    goToCategory,
    scheduleAutoAdvance,
    canDrop,
    completedCount,
    isComplete,
    totalSteps: BUILD_STEPS.length,
  };
}
