import { createSlice } from "@reduxjs/toolkit";
import { type OnboardingState } from "./types";

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
      state.currentStep += 1;
    },
    setPreviousStep: (state) => {
      state.currentStep -= 1;
    },
  },
});

export const { setCurrentStep, setNextStep, setPreviousStep } =
  onboardingSlice.actions;

export default onboardingSlice.reducer;
