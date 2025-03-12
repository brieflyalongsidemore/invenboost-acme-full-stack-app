"use client";

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
import { SignUpSchema, type SignUpSchemaType } from "../../schemas";
import { api } from "@/trpc/react";
import { signIn } from "next-auth/react";
import { TRPCClientError } from "@trpc/client";
import { toast } from "sonner";
import Link from "next/link";

export const AccountDetails = () => {
  const step = useCurrentStep();

  const mainForm = useMainForm();

  const form = useFormik<SignUpSchemaType>({
    initialValues: mainForm.values.signUpForm,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { validateForm }) => {
      const errors = await validateForm();
      if (Object.keys(errors).length) return;

      await mainForm.setFieldValue("signUpForm", values);
      createUser({
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        accessCode: values.accessCode,
      });
    },
    validate: withZodSchema(SignUpSchema),
  });

  const { mutate: createUser, isPending } = api.user.create.useMutation({
    onSuccess: async () => {
      await signIn<"credentials">("credentials", {
        email: form.values.email,
        password: form.values.password,
        callbackUrl: "/",
        redirect: false,
      });
    },
    onError: (cause) => {
      if (cause instanceof TRPCClientError) {
        toast(cause.message);
      } else toast("Something went wrong while creating your account.");
    },
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
          <Link className="w-full" href="/auth/sign-in">
            <Button className="w-[inherit]" variant={"outline"}>
              Cancel
            </Button>
          </Link>
          <Button loading={isPending} disabled={isPending} type="submit">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};
