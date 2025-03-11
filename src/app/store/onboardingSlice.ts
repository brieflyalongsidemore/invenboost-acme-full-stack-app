import { createSlice } from "@reduxjs/toolkit";
import { type OnboardingState } from "./types";
import { ONBOARDING_STEPS } from "../constants/auth/steps";

const initialState: OnboardingState = {
  currentStep: 0,
};

export const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setCurrentStep: (
      state,
      action: {
        payload: number;
      },
    ) => {
      state.currentStep = action.payload;
    },
    setNextStep: (state) => {
      if (state.currentStep < ONBOARDING_STEPS.length - 1)
        state.currentStep += 1;
    },
    setPreviousStep: (state) => {
      if (state.currentStep > 0) state.currentStep -= 1;
    },
  },
});

export const { setCurrentStep, setNextStep, setPreviousStep } =
  onboardingSlice.actions;

export default onboardingSlice.reducer;
