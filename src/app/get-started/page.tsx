"use client";

import { useCurrentStep } from "../hooks/useCurrentStep";
import { FormikProvider, useFormik } from "formik";
import { SignUpSchema } from "./steps/AccountDetails";
import { withZodSchema } from "formik-validator-zod";
import { z } from "zod";

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
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      console.log(values);
    },
    validate: withZodSchema(MainFormSchema),
  });
  return (
    <main className="mx-20 mt-10 max-w-[700px]">
      <FormikProvider value={mainForm}>
        {currentStepData?.component}
      </FormikProvider>
    </main>
  );
}

export const MainFormSchema = z.object({
  signUpForm: SignUpSchema,
});

export type MainFormSchemaType = z.infer<typeof MainFormSchema>;
