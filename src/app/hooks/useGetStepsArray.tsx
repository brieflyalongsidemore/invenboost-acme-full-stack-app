import { useSession } from "next-auth/react";
import { ONBOARDING_STEPS } from "../constants/auth/steps";
import { useMemo } from "react";
import { useServerSessionContext } from "../providers/serverSessionProvider";
import { type User } from "@prisma/client";

export const useGetStepsArray = () => {
  const serverSession = useServerSessionContext();
  const clientSession = useSession();

  const session = (clientSession.data?.user ?? serverSession?.session) as User;
  const steps = useMemo(
    () =>
      session
        ? ONBOARDING_STEPS.filter((step) => step.id != "account-details")
        : ONBOARDING_STEPS,
    [session],
  );
  return steps;
};
