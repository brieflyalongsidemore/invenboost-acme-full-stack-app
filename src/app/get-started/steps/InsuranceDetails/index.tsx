import { useCurrentStep } from "@/app/hooks/useCurrentStep";
import { StepHeading } from "../StepHeading";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { handleOnChange } from "@/lib/handleInputChange";
import { useMainForm } from "@/app/hooks/useMainForm";
import { useDispatch } from "react-redux";
import { setNextStep } from "@/app/store/onboardingSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { INSURANCE_PROVIDERS } from "@/app/constants/insuranceProviders";
import { cn } from "@/lib/utils";
import {
  InsuranceDetailsSchema,
  type InsuranceDetailsSchemaType,
} from "../../schemas";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { TRPCClientError } from "@trpc/client";

export const InsuranceDetails = () => {
  const step = useCurrentStep();

  const mainForm = useMainForm();
  const dispatch = useDispatch();

  const { mutate: updateUserInsuranceDetails, isPending } =
    api.user.updateUserInsuranceDetails.useMutation({
      onSuccess: async () => {
        dispatch(setNextStep());
      },
      onError: (cause) => {
        if (cause instanceof TRPCClientError) {
          toast(cause.message);
        } else toast("Something went wrong while creating your account.");
      },
    });

  const form = useFormik<InsuranceDetailsSchemaType>({
    initialValues: mainForm.values.insuranceForm,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { validateForm }) => {
      const errors = await validateForm();
      if (Object.keys(errors).length) return;
      console.log(values);
      await mainForm.setFieldValue("insuranceForm", values);
      updateUserInsuranceDetails(values);
    },
    validate: withZodSchema(InsuranceDetailsSchema),
  });
  return (
    <div>
      <StepHeading
        title={step?.title ?? ""}
        description={step?.description ?? ""}
      />
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="mt-10 grid grid-cols-1 gap-7"
        >
          <div className="grid w-full items-center gap-y-3">
            <Label required htmlFor="firstName">
              Find your insurance Provider
            </Label>
            <div>
              <Select
                value={form.values.provider}
                onValueChange={(val) => form.setFieldValue("provider", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {INSURANCE_PROVIDERS.map((provider) => (
                      <SelectItem key={provider} value={provider}>
                        {provider}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p
                className={cn(
                  "mt-2 text-xs text-red-500",
                  !form.errors.provider && "opacity-0",
                )}
              >
                {form.errors.provider}
              </p>
            </div>
          </div>

          <div className="col-span-2 grid w-full items-center gap-y-3">
            <Label required htmlFor="memberId">
              Member ID
            </Label>
            <Input
              onChange={async (e) => {
                await handleOnChange(e, form);
              }}
              value={form.values.memberId}
              errorMessage={form.errors.memberId}
              type="text"
              id="memberId"
              placeholder="Member ID"
            />
          </div>

          <div className="col-span-2 grid w-full items-center gap-y-3">
            <Label required htmlFor="groupNumber">
              Group Number
            </Label>
            <Input
              onChange={async (e) => {
                await handleOnChange(e, form);
              }}
              value={form.values.groupNumber}
              errorMessage={form.errors.groupNumber}
              type="text"
              id="groupNumber"
              placeholder="Group Number"
            />
          </div>

          <div className="mt-1 w-full gap-5 space-y-3">
            <p className="text-sm text-muted-foreground">
              By clicking “Sync Now,” I agree that I consent to securely share
              my medical records with Acme AI in accordance with our{" "}
              <span className="font-medium text-primary underline">
                Terms of Use
              </span>{" "}
              and{" "}
              <span className="font-medium text-primary underline">
                Privacy Policy
              </span>
              .
            </p>
            <Button
              loading={isPending}
              disabled={isPending}
              type="submit"
              className="w-full"
            >
              {isPending ? "Syncing..." : "Sync Now"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
