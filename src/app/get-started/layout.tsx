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

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-indigo-600 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-indigo-200 lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <div className="flex-1 text-sm/6 font-semibold text-white">
            Dashboard
          </div>
          <a href="#">
            <span className="sr-only">Your profile</span>
            <img
              className="size-8 rounded-full bg-indigo-700"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </a>
        </div>

        <main className="w-full">{children}</main>
      </div>
    </ReduxProvider>
  );
}
