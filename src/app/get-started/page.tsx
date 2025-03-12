"use client";

import { useCurrentStep } from "../hooks/useCurrentStep";

import { z } from "zod";
import {
  BenefitCardSchema,
  InsuranceDetailsSchema,
  SignUpSchema,
} from "./schemas";

export default function GetStartedPage() {
  const currentStepData = useCurrentStep();

  return (
    <main className="mx-5 my-10 max-w-[700px] md:mx-20">
      {currentStepData?.component}
    </main>
  );
}

export const MainFormSchema = z.object({
  signUpForm: SignUpSchema,
  insuranceForm: InsuranceDetailsSchema,
  benefitCardForm: BenefitCardSchema,
});

export type MainFormSchemaType = z.infer<typeof MainFormSchema>;
