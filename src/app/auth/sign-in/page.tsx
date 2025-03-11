import { SignInForm } from "@/app/components/Auth/SignIn";
import { HydrateClient } from "@/trpc/server";

export default async function SignInPage() {
  return (
    <HydrateClient>
      <SignInForm />
    </HydrateClient>
  );
}
