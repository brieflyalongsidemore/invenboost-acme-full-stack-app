import { StepIndicator } from "@/app/components/Auth/StepIndicator";
import ReduxProvider from "@/app/providers/reduxProvider";

export default function GetStartedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ReduxProvider>
      <div className="flex">
        <div className="min-h-screen lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-muted px-6">
            <StepIndicator />
            <nav className="flex flex-1 flex-col"></nav>
          </div>
        </div>

        <main className="w-full">{children}</main>
      </div>
    </ReduxProvider>
  );
}
