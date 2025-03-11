import { AccountDetails } from "@/app/get-started/steps/AccountDetails";
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
    id: "security",
    title: "Security Questions",
    description: "Please enter your security questions",
    component: <>SecurityQuestionsForm</>,
  },
];

export type Step = {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
};
