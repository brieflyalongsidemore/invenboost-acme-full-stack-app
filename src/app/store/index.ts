import { configureStore } from "@reduxjs/toolkit";
import onboardingSlice from "./onboardingSlice";

export const store = configureStore({
  reducer: {
    onboarding: onboardingSlice,
  },
});

// Infer the RootState type from the store
export type RootState = ReturnType<typeof store.getState>;
