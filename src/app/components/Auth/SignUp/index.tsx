"use client";

import Link from "next/link";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Separator } from "../../ui/separator";
import { AppleAuthButton } from "../OAuthButtons/Apple";
import { GoogleAuthButton } from "../OAuthButtons/Google";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    const isEmailValid = z.string().email().safeParse(email);
    if (!isEmailValid.success) {
      setError("Please enter a valid email address");
      return;
    }
    router.push(`/get-started?email=${email}`);
  };
  return (
    <>
      <div className="space-y-1 text-center sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl/9 font-bold tracking-tight">
          Welcome to Acme Insurance
        </h2>
        <p className="text-muted-foreground">
          Please enter your Sign Up Details
        </p>
      </div>
      <Separator className="mx-auto mt-5 sm:max-w-[680px]" />

      <div className="sm:mx-auto sm:w-full sm:max-w-[680px]">
        <div className="px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="space-y-4"
          >
            <div>
              <div className="grid w-full items-center gap-y-3">
                <Label required htmlFor="email">
                  Email
                </Label>
                <Input
                  errorMessage={error}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  placeholder="Email Address"
                />
              </div>
            </div>

            <p className="text-sm/6 text-gray-500">
              Already have an account?{" "}
              <Link
                className="font-semibold text-primary hover:underline"
                href={"/auth/sign-in"}
              >
                Sign In
              </Link>
            </p>
            <div>
              <Button className="w-full">Sign Up</Button>
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
