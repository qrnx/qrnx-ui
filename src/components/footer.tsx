"use client";

import { cn } from "@/lib/utils";
import styles from "@/components/layout.module.css";
import { ROUTES } from "@/config/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Discord from "@/assets/Discord.svg";
import YouTube from "@/assets/YouTube.svg";
import Instagram from "@/assets/Instagram.svg";
import { useTranslations } from "next-intl";

const routesWIthoutHeader = [ROUTES.signIn, ROUTES.signUp];

export const Footer = () => {
  const t = useTranslations("footer");
  const pathname = usePathname();
  if (routesWIthoutHeader.includes(pathname)) {
    return null;
  }
  return (
    <footer
      className={cn(
        styles["border-grid"],
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      )}
    >
      <div className={styles["container-wrapper"]}>
        <div className="flex justify-between p-7">
          <div className="text-sm opacity-50">Copyright © 2025 QRpools.com</div>
          <div className="flex gap-16">
            <div className="flex gap-8 text-sm opacity-50">
              <Link href={""}>{t("privacy")}</Link>
              <Link href={""}>{t("terms")}</Link>
              <Link href={""}>{t("support")}</Link>
            </div>

            <div className="flex gap-3">
              <Link href={""}>
                <Discord />
              </Link>
              <Link href={""}>
                <YouTube />
              </Link>
              <Link href={""}>
                <Instagram />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
