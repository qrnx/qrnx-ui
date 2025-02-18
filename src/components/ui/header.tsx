"use client";

import { cn } from "@/lib/utils";
import styles from "./header.module.css";
import { routes } from "@/config/routes";
import { usePathname } from "next/navigation";

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
          <h1>qrnx/logo</h1>
          <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
            buttons
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
