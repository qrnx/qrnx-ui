"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import { useTranslation } from "react-i18next";
import { routes } from "@/config/routes";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [error, setError] = useState("");
  const { t } = useTranslation();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        throw new Error(t("error.login"));
      }

      if (res?.ok) {
        router.push(routes.dashboard);
      } else {
        setError(t("error.redirect"));
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t("error.login"));
      }
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>Enter your email and password below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                  className={cn({ "border-red-500": error })}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link> */}
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  className={cn({ "border-red-500": error })}
                />
                {error && (
                  <div className="text-red-500 text-sm text-left">{error}</div>
                )}
              </div>
              <Button type="submit" className="w-full cursor-pointer">
                Login
              </Button>
              <Button
                onClick={() => signOut({ callbackUrl: routes.home })}
                variant="outline"
                className="w-full cursor-pointer"
              >
                Logout
              </Button>
              {/* <Button variant="outline" className="w-full cursor-pointer">
                Login with Google
              </Button> */}
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href={routes.signUp}
                className="underline underline-offset-4"
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
