"use client";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { t } = useTranslation();
  const { data: session, status } = useSession();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
        <div className="flex flex-col gap-2 row-start-2 items-center sm:items-start">
          <div>{session && session.user?.email}</div>
          <div>{status}</div>
        </div>
        <Button
          onClick={() => signOut({ callbackUrl: "/" })}
          variant="outline"
          className="w-full cursor-pointer"
        >
          Logout
        </Button>
      </main>
    </div>
  );
}
