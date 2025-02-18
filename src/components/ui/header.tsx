"use client";

import { cn } from "@/lib/utils";
import styles from "@/components/layout.module.css";
import { routes } from "@/config/routes";
import { usePathname } from "next/navigation";
import { UserNav } from "./user-nav";
import { LanguageSelect } from "./language-select";
import { ThemeToggle } from "./theme-toggle";

const routesWIthoutHeader = [routes.signIn, routes.signUp];

const Header = () => {
  const pathname = usePathname();
  if (routesWIthoutHeader.includes(pathname)) {
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
        <div className={cn(styles["container"], "flex h-14 items-center")}>
          <h1>qrnx</h1>
          <div className="flex flex-1 items-center justify-between gap-3 md:justify-end">
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
