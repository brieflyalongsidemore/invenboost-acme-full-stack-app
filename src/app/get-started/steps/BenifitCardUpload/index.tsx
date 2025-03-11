import { useCurrentStep } from "@/app/hooks/useCurrentStep";
import { StepHeading } from "../StepHeading";
import { Label } from "@/app/components/ui/label";
import { FileUpload } from "../InsuranceDetails/uploadField";
import { Button } from "@/app/components/ui/button";
import { useDispatch } from "react-redux";
import { setNextStep } from "@/app/store/onboardingSlice";

export const BenifitCardUpload = () => {
  const step = useCurrentStep();
  const dispatch = useDispatch();

  const handleNextStep = () => {
    dispatch(setNextStep());
  };
  return (
    <div>
      <StepHeading
        title={step?.title ?? ""}
        description={step?.description ?? ""}
      />
      <div className="mt-10 space-y-3">
        <Label htmlFor="upload-document">Upload Document</Label>
        <FileUpload />
      </div>
      <div className="mt-5 w-full gap-5 space-y-3">
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
        <div className="col-span-2 mt-5 grid grid-cols-2 gap-5">
          <Button onClick={handleNextStep} variant={"outline"}>
            Skip for Now
          </Button>
          <Button onClick={handleNextStep}>Sync Now</Button>
        </div>
      </div>
    </div>
  );
};
