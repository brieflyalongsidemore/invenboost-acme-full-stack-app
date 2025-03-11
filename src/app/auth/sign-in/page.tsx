import { SignInForm } from "@/app/components/Auth/SignIn";
import { HydrateClient } from "@/trpc/server";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth - Sign In",
  description: "Sign in to your ACME Account",
};

export default async function SignInPage() {
  return (
    <HydrateClient>
      <SignInForm />
    </HydrateClient>
  );
}
