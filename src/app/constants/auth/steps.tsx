import { AccountDetails } from "@/app/get-started/steps/AccountDetails";
import { BenifitCardUpload } from "@/app/get-started/steps/BenifitCardUpload";
import { InsuranceDetails } from "@/app/get-started/steps/InsuranceDetails";
import { VerifyEHRDetails } from "@/app/get-started/steps/VerifyEHRDetails";

export const ONBOARDING_STEPS: Step[] = [
  {
    id: "account-details",
    title: "Get Started with Acme AI",
    sideBarName: "Account Settings",
    formKey: "signUpForm",
    description:
      "Your AI-powered healthcare assistant is just a step away! Enter your unique registration code to create your account and unlock personalized medical support from Acme AI.",
    component: <AccountDetails />,
  },
  {
    id: "insurance-details",
    title: "Verifying Your Benefits Details…",
    sideBarName: "Insurance Details",
    formKey: "insuranceForm",
    description:
      "By securely integrating your insurance information, Addy can provide personalized recommendations and enhance your healthcare experience.",
    component: <InsuranceDetails />,
  },
  {
    id: "benifit-card-upload",
    title: "Please Upload the Image of Your Benefit Card",
    formKey: "benefitCardForm",
    description:
      "By securely integrating your benefits information, Addy can provide personalized recommendations and enhance your healthcare experience.",
    component: <BenifitCardUpload />,
    sideBarName: "Upload Benefit Card",
  },
  {
    id: "benifit-card-upload",
    title: "Verifying Your EHR Details…",
    description:
      "Addy is securely reviewing your information. Please stay on this screen—we’ll notify you once the process is complete. For security reasons, do not refresh or close this window. Addy can provide personalized recommendations and enhance your healthcare experience.",
    component: <VerifyEHRDetails />,
    sideBarName: "Verify EHR Details",
  },
];

export type Step = {
  id: string;
  title: string;
  formKey?: string;
  sideBarName: string;
  description: string;
  component: React.ReactNode;
};
