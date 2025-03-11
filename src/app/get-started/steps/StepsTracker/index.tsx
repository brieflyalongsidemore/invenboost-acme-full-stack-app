"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleTrigger,
} from "@/app/components/ui/collapsible";
import { ONBOARDING_STEPS } from "@/app/constants/auth/steps";
import { useSelector } from "@/app/hooks/useSelector";
import { checkIfFormIsValid } from "@/lib/formValidation";
import { useMainForm } from "@/app/hooks/useMainForm";

export const StepsTracker = () => {
  const currentStep = useSelector((state) => state.onboarding.currentStep);

  const currentStepIndex = ONBOARDING_STEPS.findIndex(
    (_, index) => index === currentStep,
  );
  const form = useMainForm();

  return (
    <div className="w-full space-y-1 text-sm">
      {ONBOARDING_STEPS.map((step, index) => (
        <Collapsible
          key={step.id}
          className={cn(
            "overflow-hidden rounded-md transition-all",
            currentStepIndex === index && "bg-primary/10",
          )}
        >
          <CollapsibleTrigger className="flex w-full items-center px-3 py-2 transition-colors hover:bg-muted/50">
            <div className="flex w-full items-center gap-3">
              <div
                className={cn(
                  "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full",
                  step.formKey &&
                    checkIfFormIsValid(form, step.formKey) &&
                    "bg-primary text-primary-foreground",
                  currentStepIndex === index
                    ? "border-2 border-primary text-primary-foreground"
                    : "border-2 border-muted-foreground/30",
                )}
              >
                {step.formKey && checkIfFormIsValid(form, step.formKey) ? (
                  <Check className="h-3 w-3" />
                ) : null}
              </div>

              <span
                className={cn(
                  "flex-grow text-left text-sm",
                  currentStepIndex === index && "font-medium text-primary",
                  step.formKey &&
                    checkIfFormIsValid(form, step.formKey) &&
                    "text-muted-foreground",
                )}
              >
                {step.sideBarName}
              </span>
            </div>
          </CollapsibleTrigger>
        </Collapsible>
      ))}
    </div>
  );
};
