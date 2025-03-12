"use client";

import { useGetStepsArray } from "@/app/hooks/useGetStepsArray";
import { useSelector } from "@/app/hooks/useSelector";
import { setCurrentStep } from "@/app/store/onboardingSlice";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";

export const StepIndicator = () => {
  const currentStep = useSelector((state) => state.onboarding.currentStep);
  const dispatch = useDispatch();
  const steps = useGetStepsArray();

  const currentStepIndex = steps.findIndex((_, index) => index === currentStep);
  const handleGoToStep = (step: number) => {
    dispatch(setCurrentStep(step));
  };

  return (
    <div className="mt-8 space-y-1">
      <h1 className="text-2xl font-semibold">Onboarding</h1>
      <span className="block text-primary-foreground/70">
        Step {currentStep + 1} of {steps.length}
      </span>
      <div className="!mt-4 flex items-center gap-2">
        {steps.map((step, i) => (
          <button
            onClick={() => handleGoToStep(i)}
            key={`${step.title[0]}-${i}`}
            className={cn("h-1 w-full rounded-lg bg-accent", {
              "bg-secondary": i !== currentStepIndex,
            })}
          ></button>
        ))}
      </div>
    </div>
  );
};
