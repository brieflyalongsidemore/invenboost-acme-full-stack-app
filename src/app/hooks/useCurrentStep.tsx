import { useSelector } from "@/app/hooks/useSelector";
import { useGetStepsArray } from "./useGetStepsArray";

/**
 * @description: This hooks is used to get the current step info
 */
export const useCurrentStep = () => {
  const currentStep = useSelector((state) => state.onboarding.currentStep);

  const steps = useGetStepsArray();

  const currentStepData = steps[currentStep];
  return currentStepData;
};
