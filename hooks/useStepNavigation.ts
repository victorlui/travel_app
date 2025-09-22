import { BudgetRange } from "@/types/budget";
import { useCallback, useState } from "react";

export interface StepData {
  travelers?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  destination?: string;
  budget?: BudgetRange | null;
}

export function useStepNavigation(totalSteps: number = 5) {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepData, setStepData] = useState<StepData>({});

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, totalSteps]);

  const previousStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 1 && step <= totalSteps) {
        setCurrentStep(step);
      }
    },
    [totalSteps]
  );

  const updateStepData = useCallback((data: Partial<StepData>) => {
    setStepData((prev) => ({ ...prev, ...data }));
  }, []);

  const canGoNext = useCallback(() => {
    switch (currentStep) {
      case 1: // Who is going?
        return !!stepData.travelers;
      case 2: // When?
        return !!stepData.startDate && !!stepData.endDate;
      case 3: // Where?
        return !!stepData.destination;
      case 4: // Budget?
        return !!stepData.budget;
      default:
        return true;
    }
  }, [currentStep, stepData]);

  const canGoPrevious = currentStep > 1;
  const isLastStep = currentStep === totalSteps;

  return {
    currentStep,
    stepData,
    nextStep,
    previousStep,
    goToStep,
    updateStepData,
    canGoNext: canGoNext(),
    canGoPrevious,
    isLastStep,
    totalSteps,
  };
}
