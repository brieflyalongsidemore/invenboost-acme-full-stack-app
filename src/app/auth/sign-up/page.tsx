import { SignUpForm } from "@/app/components/Auth/SignUp";
import { HydrateClient } from "@/trpc/server";

export default async function SignUpPage() {
  return (
    <HydrateClient>
      <SignUpForm />
    </HydrateClient>
  );
}
