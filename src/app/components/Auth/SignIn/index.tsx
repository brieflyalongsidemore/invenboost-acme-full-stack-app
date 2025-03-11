import Link from "next/link";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Separator } from "../../ui/separator";
import { AppleAuthButton } from "../OAuthButtons/Apple";
import { GoogleAuthButton } from "../OAuthButtons/Google";

export const SignInForm = () => {
  return (
    <>
      <div className="space-y-1 text-center sm:mx-auto sm:w-full sm:max-w-xl">
        <h2 className="text-center text-3xl/9 font-bold tracking-tight">
          Sign In to Your Acme Insurance Account
        </h2>
        <p className="text-muted-foreground">
          Please enter your Sign In Details
        </p>
      </div>
      <Separator className="mx-auto mt-5 sm:max-w-[680px]" />

      <div className="sm:mx-auto sm:w-full sm:max-w-[680px]">
        <div className="px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form action="#" method="POST" className="space-y-4">
            <div className="space-y-4">
              <div className="grid w-full items-center gap-y-3">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="Email Address" />
              </div>
              <div className="grid w-full items-center gap-y-3">
                <Label htmlFor="email">Password</Label>
                <Input type="password" id="password" placeholder="********" />
              </div>
            </div>

            <p className="text-sm/6 text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                className="font-semibold text-primary hover:underline"
                href={"/auth/sign-up"}
              >
                Sign Up
              </Link>
            </p>

            <div>
              <Button className="w-full">Sign In</Button>
            </div>
          </form>

          <div>
            <div className="relative mt-10">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center"
              >
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm/6 font-medium">
                <span className="bg-background px-6">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <GoogleAuthButton />

              <AppleAuthButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
