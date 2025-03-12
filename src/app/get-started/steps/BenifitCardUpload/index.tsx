import { useCurrentStep } from "@/app/hooks/useCurrentStep";
import { StepHeading } from "../StepHeading";
import { Label } from "@/app/components/ui/label";
import { FileUpload } from "../InsuranceDetails/uploadField";
import { Button } from "@/app/components/ui/button";
import { useDispatch } from "react-redux";
import { setNextStep } from "@/app/store/onboardingSlice";
import { useMainForm } from "@/app/hooks/useMainForm";
import { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { TRPCClientError } from "@trpc/client";
import { toast } from "sonner";

export const BenifitCardUpload = () => {
  const step = useCurrentStep();
  const dispatch = useDispatch();

  const handleNextStep = async () => {
    await form.setFieldValue("benefitCardForm", {
      document: selectedFile?.name,
    });
    uploadBenefitCard({
      url: selectedFile!.name,
    });
  };
  const form = useMainForm();

  const generateStaticFile = (name: string) => {
    return new File([""], name, { type: "image/png" });
  };

  const [selectedFile, setSelectedFile] = useState<File | null>();

  useEffect(() => {
    if (form.values.benefitCardForm.document) {
      setSelectedFile(generateStaticFile(form.values.benefitCardForm.document));
    }
  }, [form.values.benefitCardForm.document]);

  const { mutate: uploadBenefitCard, isPending } =
    api.user.uploadBenefitCard.useMutation({
      onSuccess: async () => {
        dispatch(setNextStep());
      },
      onError: (cause) => {
        if (cause instanceof TRPCClientError) {
          toast(cause.message);
        } else toast("Something went wrong while creating your account.");
      },
    });
  console.log(selectedFile);
  return (
    <div>
      <StepHeading
        title={step?.title ?? ""}
        description={step?.description ?? ""}
      />
      <div className="mt-10 space-y-3">
        <Label htmlFor="upload-document">Upload Document</Label>
        <FileUpload
          files={selectedFile ? [selectedFile] : []}
          onFilesSelected={async (files) => {
            if (files.length)
              // this is temporary until the file upload is implemented
              setSelectedFile(files[0]);
            else setSelectedFile(null);
          }}
        />
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
          <Button
            onClick={() => {
              dispatch(setNextStep());
            }}
            variant={"outline"}
          >
            Skip for Now
          </Button>
          <Button
            disabled={isPending || !selectedFile}
            loading={isPending}
            onClick={handleNextStep}
          >
            {isPending ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </div>
    </div>
  );
};
