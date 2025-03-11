import { SignUpForm } from "@/app/components/Auth/SignUp";
import { HydrateClient } from "@/trpc/server";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth - Sign Up",
  description: "Create a new ACME Account",
};

export default async function SignUpPage() {
  return (
    <HydrateClient>
      <SignUpForm />
    </HydrateClient>
  );
}
