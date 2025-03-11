import { useSelector as useMainSelector } from "react-redux";

import { type RootState } from "@/app/store";
import { useMemo } from "react";

export function useSelector<T>(selector: (state: RootState) => T): T {
  const selectedState = useMainSelector(selector);
  return useMemo(() => selectedState, [selectedState]);
}
