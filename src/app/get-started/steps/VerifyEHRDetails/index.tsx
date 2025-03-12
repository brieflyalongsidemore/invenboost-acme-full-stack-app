import { useCurrentStep } from "@/app/hooks/useCurrentStep";
import { StepHeading } from "../StepHeading";
import VoiceVerification from "./verification";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";

export const VerifyEHRDetails = () => {
  const step = useCurrentStep();

  return (
    <div>
      <StepHeading
        title={step?.title ?? ""}
        description={step?.description ?? ""}
      />
      <VoiceVerification />
      <div className="mt-10 w-full gap-5 space-y-3">
        <p className="text-sm text-muted-foreground">
          By clicking “Sync Now,” I agree that I consent to securely share my
          medical records with Acme AI in accordance with our{" "}
          <span className="font-medium text-primary underline">
            Terms of Use
          </span>{" "}
          and{" "}
          <span className="font-medium text-primary underline">
            Privacy Policy
          </span>
          .
        </p>
        <Link className="block w-full" href={"/dashboard"}>
          <Button className="w-[inherit]">Proceed to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};
