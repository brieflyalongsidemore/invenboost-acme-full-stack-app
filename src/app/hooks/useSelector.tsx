import { useSelector as useMainSelector } from "react-redux";

import { type RootState } from "@/app/store";

export const useSelector = () => useMainSelector((state: RootState) => state);
