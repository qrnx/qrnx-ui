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
import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { ROUTES } from "@/config/routes";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [error, setError] = useState("");
  const t = useTranslations();

  const searchParams = useSearchParams();

  useEffect(() => {
    const queryError = searchParams.get("error");

    let timerId: NodeJS.Timeout;
    if (queryError === "unauthorized") {
      timerId = setTimeout(() => {
        toast.error(t("error.sessionExpired"));
      });
      router.push(ROUTES.signIn);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [router, searchParams, t]);

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
        router.push(ROUTES.dashboard);
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
          <CardTitle className="text-2xl">{t("signIn.title")}</CardTitle>
          <CardDescription>{t("signIn.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">{t("signIn.email")}</Label>
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
                  <Label htmlFor="password">{t("signIn.password")}</Label>
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
                {t("signIn.login")}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              {t("signIn.signUpQuestion")}{" "}
              <Link
                href={ROUTES.signUp}
                className="underline underline-offset-4"
              >
                {t("signIn.signUpLink")}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
