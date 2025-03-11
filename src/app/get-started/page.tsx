"use client";

import { useCurrentStep } from "../hooks/useCurrentStep";

import { z } from "zod";
import { InsuranceDetailsSchema, SignUpSchema } from "./schemas";

export default function GetStartedPage() {
  const currentStepData = useCurrentStep();

  return (
    <main className="mx-20 mt-10 max-w-[700px]">
      {currentStepData?.component}
    </main>
  );
}

export const MainFormSchema = z.object({
  signUpForm: SignUpSchema,
  insuranceForm: InsuranceDetailsSchema,
});

export type MainFormSchemaType = z.infer<typeof MainFormSchema>;
