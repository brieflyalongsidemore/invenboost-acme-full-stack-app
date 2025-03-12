"use client";

import { StepIndicator } from "@/app/components/Auth/StepIndicator";
import ReduxProvider from "@/app/providers/reduxProvider";
import { StepsTracker } from "./steps/StepsTracker";
import { FormikProvider, useFormik } from "formik";
import { MainFormSchema, type MainFormSchemaType } from "./page";
import { withZodSchema } from "formik-validator-zod";
import { Button } from "../components/ui/button";
import { LogOutIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { type User } from "@prisma/client";
import { type Session } from "next-auth";
import { ServerSessionProvider } from "../providers/serverSessionProvider";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

export const GetStartedWrapper: React.FC<
  Readonly<{
    children: React.ReactNode;
    serverSession: Session | null;
    userData: User | undefined | null;
  }>
> = ({ children, serverSession, userData }) => {
  const params = useSearchParams();

  const mainForm = useFormik<MainFormSchemaType>({
    initialValues: {
      signUpForm: {
        firstName: "",
        lastName: "",
        email: params.get("email") ?? "",
        password: "",
        phone: "",
        accessCode: "",
      },
      insuranceForm: {
        provider: userData?.provider ?? "",
        memberId: userData?.memberID ?? "",
        groupNumber: userData?.groupNumber ?? "",
      },
      benefitCardForm: {
        //! testing purposes
        document: userData?.benefitCardURL ?? "",
      },
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
    },
    validate: withZodSchema(MainFormSchema),
  });

  const clientSession = useSession();
  const session = useMemo(
    () => (clientSession.data?.user ?? serverSession?.user) as User,
    [serverSession, clientSession],
  );

  return (
    <ReduxProvider>
      <FormikProvider value={mainForm}>
        <ServerSessionProvider
          value={{
            session: session,
          }}
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:min-h-screen lg:flex lg:w-96 lg:flex-col">
              <div className="flex h-full grow flex-col gap-y-5 overflow-y-auto border-r bg-muted px-6">
                <StepIndicator />
                <nav className="flex flex-1 flex-col">
                  <StepsTracker />
                  {session && (
                    <Button
                      onClick={() =>
                        signOut({ redirect: true, redirectTo: "/auth/sign-in" })
                      }
                      className="mb-10 mt-auto"
                      variant={"secondary"}
                    >
                      <LogOutIcon />
                      <span>Logout</span>
                    </Button>
                  )}
                </nav>
              </div>
            </div>
            <main className="w-full">{children}</main>
          </div>
        </ServerSessionProvider>
      </FormikProvider>
    </ReduxProvider>
  );
};
