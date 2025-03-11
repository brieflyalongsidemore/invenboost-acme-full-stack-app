"use client";

import { StepIndicator } from "@/app/components/Auth/StepIndicator";
import ReduxProvider from "@/app/providers/reduxProvider";
import { StepsTracker } from "./steps/StepsTracker";
import { FormikProvider, useFormik } from "formik";
import { MainFormSchema, type MainFormSchemaType } from "./page";
import { withZodSchema } from "formik-validator-zod";

export default function GetStartedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
    <ReduxProvider>
      <FormikProvider value={mainForm}>
        <div className="flex">
          <div className="min-h-screen lg:flex lg:w-96 lg:flex-col">
            <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-muted px-6">
              <StepIndicator />
              <nav className="flex flex-1 flex-col">
                <StepsTracker />
              </nav>
            </div>
          </div>

          <main className="w-full">{children}</main>
        </div>
      </FormikProvider>
    </ReduxProvider>
  );
}
