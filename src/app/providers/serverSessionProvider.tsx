import { type User } from "@prisma/client";
import { createContext, useContext } from "react";

export type ServerSessionProviderContext = {
  session: User | null | undefined;
};

const context = createContext<ServerSessionProviderContext>({
  session: null,
});

export const useServerSessionContext = () => {
  return useContext(context);
};

export const ServerSessionProvider = context.Provider;
