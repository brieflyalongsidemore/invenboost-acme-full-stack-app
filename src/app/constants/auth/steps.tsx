import { AccountDetails } from "@/app/get-started/steps/AccountDetails";
import { BenifitCardUpload } from "@/app/get-started/steps/BenifitCardUpload";
import { InsuranceDetails } from "@/app/get-started/steps/InsuranceDetails";

export const ONBOARDING_STEPS: Step[] = [
  {
    id: "account-details",
    title: "Get Started with Acme AI",
    description:
      "Your AI-powered healthcare assistant is just a step away! Enter your unique registration code to create your account and unlock personalized medical support from Acme AI.",
    component: <AccountDetails />,
  },
  {
    id: "insurance-details",
    title: "Verifying Your Benefits Details…",
    description:
      "By securely integrating your insurance information, Addy can provide personalized recommendations and enhance your healthcare experience.",
    component: <InsuranceDetails />,
  },
  {
    id: "benifit-card-upload",
    title: "Please Upload the Image of Your Benefit Card",
    description:
      "By securely integrating your benefits information, Addy can provide personalized recommendations and enhance your healthcare experience.",
    component: <BenifitCardUpload />,
  },
];

export type Step = {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
};
