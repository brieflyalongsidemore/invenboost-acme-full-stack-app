"use client";

import { useCurrentStep } from "../hooks/useCurrentStep";
import { FormikProvider, useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { z } from "zod";
import { InsuranceDetailsSchema, SignUpSchema } from "./schemas";
import ReduxProvider from "../providers/reduxProvider";

export default function GetStartedPage() {
  const currentStepData = useCurrentStep();

  const mainForm = useFormik<MainFormSchemaType>({
    initialValues: {
      signUpForm: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        accessCode: "",
      },
      insuranceForm: {
        provider: "",
        memberId: "",
        groupNumber: "",
      },
    },

    onSubmit: async (values) => {
      console.log(values);
    },
    validate: withZodSchema(MainFormSchema),
  });

  return (
    <main className="mx-20 mt-10 max-w-[700px]">
      <ReduxProvider>
        <FormikProvider value={mainForm}>
          {currentStepData?.component}
        </FormikProvider>
      </ReduxProvider>
    </main>
  );
}

export const MainFormSchema = z.object({
  signUpForm: SignUpSchema,
  insuranceForm: InsuranceDetailsSchema,
});

export type MainFormSchemaType = z.infer<typeof MainFormSchema>;
