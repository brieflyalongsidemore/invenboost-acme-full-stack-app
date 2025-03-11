import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: "Auth - Sign Up",
  description: "Create a new ACME Account",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <div className="mt-10 flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        {children}
      </div>
    </main>
  );
}
