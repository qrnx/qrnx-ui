"use client";

import { cn } from "@/lib/utils";
import styles from "@/components/layout.module.css";
import { ROUTES } from "@/config/routes";
import { useParams, usePathname } from "next/navigation";
import { UserNav } from "./user-nav";
import { LanguageSelect } from "./language-select";
import { ThemeToggle } from "./theme-toggle";
import Logo from "@/assets/logo.svg";
import Link from "next/link";
import { useSession } from "next-auth/react";

const routesWithoutHeader = [ROUTES.signIn, ROUTES.signUp];

const Header = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const params = useParams();
  if (routesWithoutHeader.includes(pathname) || params.answerOptionId) {
    return null;
  }

  return (
    <header
      className={cn(
        styles["border-grid"],
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      )}
    >
      <div className={styles["container-wrapper"]}>
        <div
          className={cn(
            styles["container"],
            "flex h-10 md:h-14 items-center justify-between"
          )}
        >
          <Link href={session ? ROUTES.dashboard : ROUTES.home}>
            <Logo />
          </Link>

          <div className="flex items-center justify-between gap-3 md:justify-end">
            <ThemeToggle />
            <LanguageSelect />
            <UserNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
