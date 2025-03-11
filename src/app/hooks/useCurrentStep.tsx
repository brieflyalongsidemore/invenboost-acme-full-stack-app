import { useSelector } from "@/app/hooks/useSelector";
import { ONBOARDING_STEPS } from "../constants/auth/steps";

/**
 * @description: This hooks is used to get the current step info
 */
export const useCurrentStep = () => {
  const {
    onboarding: { currentStep },
  } = useSelector();

  const currentStepData = ONBOARDING_STEPS[currentStep];
  return currentStepData;
};
