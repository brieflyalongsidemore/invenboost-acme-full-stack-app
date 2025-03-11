import { useCurrentStep } from "@/app/hooks/useCurrentStep";
import { StepHeading } from "../StepHeading";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { InfoIcon } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { handleOnChange } from "@/lib/handleInputChange";
import { useMainForm } from "@/app/hooks/useMainForm";
import { useDispatch } from "react-redux";
import { setNextStep } from "@/app/store/onboardingSlice";
import { SignUpSchema, type SignUpSchemaType } from "../../schemas";

export const AccountDetails = () => {
  const step = useCurrentStep();

  const mainForm = useMainForm();
  const dispatch = useDispatch();

  const form = useFormik<SignUpSchemaType>({
    initialValues: mainForm.values.signUpForm,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { validateForm }) => {
      const errors = await validateForm();
      if (Object.keys(errors).length) return;

      await mainForm.setFieldValue("signUpForm", values);
      dispatch(setNextStep());
    },
    validate: withZodSchema(SignUpSchema),
  });

  return (
    <div>
      <StepHeading
        title={step?.title ?? ""}
        description={step?.description ?? ""}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="mt-10 grid grid-cols-2 gap-7"
      >
        <div className="grid w-full items-center gap-y-3">
          <Label required htmlFor="firstName">
            First Name
          </Label>
          <Input
            onChange={async (e) => {
              await handleOnChange(e, form);
            }}
            value={form.values.firstName}
            errorMessage={form.errors.firstName}
            type="text"
            id="firstName"
            placeholder="Jhon"
          />
        </div>
        <div className="grid w-full items-center gap-y-3">
          <Label required htmlFor="lastName">
            Last Name
          </Label>
          <Input
            onChange={async (e) => {
              await handleOnChange(e, form);
            }}
            value={form.values.lastName}
            errorMessage={form.errors.lastName}
            type="text"
            id="lastName"
            placeholder="Doe"
          />
        </div>
        <div className="col-span-2 grid w-full items-center gap-y-3">
          <Label required htmlFor="email">
            Email Address
          </Label>
          <Input
            onChange={async (e) => {
              await handleOnChange(e, form);
            }}
            value={form.values.email}
            errorMessage={form.errors.email}
            type="text"
            id="email"
            placeholder="jhon@gmail.com"
          />
        </div>
        <div className="col-span-2 grid w-full items-center gap-y-3">
          <Label required htmlFor="password">
            Password
          </Label>
          <Input
            onChange={async (e) => {
              await handleOnChange(e, form);
            }}
            value={form.values.password}
            errorMessage={form.errors.password}
            type="password"
            id="password"
            placeholder="********"
          />
        </div>
        <div className="col-span-2 grid w-full items-center gap-y-3">
          <Label required htmlFor="phone">
            Phone Number
          </Label>
          <Input
            onChange={async (e) => {
              await handleOnChange(e, form);
            }}
            value={form.values.phone}
            errorMessage={form.errors.phone}
            type="text"
            id="phone"
            placeholder="+1 323-434-434"
          />
        </div>
        <div className="col-span-2 grid w-full items-center gap-y-3">
          <Label required htmlFor="accessCode">
            Access Code
          </Label>
          <Input
            onChange={async (e) => {
              await handleOnChange(e, form);
            }}
            value={form.values.accessCode}
            errorMessage={form.errors.accessCode}
            type="text"
            id="accessCode"
            placeholder="AQ2343"
          />
          <span className="flex items-center space-x-2">
            <InfoIcon className="h-4 w-4 opacity-30" />
            <span className="text-sm text-muted-foreground">
              Access code provided by your company via email.
            </span>
          </span>
        </div>
        <div className="col-span-2 mt-5 grid grid-cols-2 gap-5">
          <Button variant={"outline"}>Cancel</Button>
          <Button type="submit">Sign Up</Button>
        </div>
      </form>
    </div>
  );
};
