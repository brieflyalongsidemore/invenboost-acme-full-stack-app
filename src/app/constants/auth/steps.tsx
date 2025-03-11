import { AccountDetails } from "@/app/get-started/steps/AccountDetails";

export const ONBOARDING_STEPS: Step[] = [
  {
    id: "welcome",
    title: "Get Started with Acme AI",
    description:
      "Your AI-powered healthcare assistant is just a step away! Enter your unique registration code to create your account and unlock personalized medical support from Acme AI.",
    component: <AccountDetails />,
  },
  {
    id: "personal",
    title: "Personal Information",
    description: "Please enter your personal information",
    component: <>PersonalInformationForm</>,
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
