"use client";

import { cn } from "@/lib/utils";
import styles from "@/components/layout.module.css";
import { ROUTES } from "@/config/routes";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const routesWithoutHeader = [ROUTES.signIn, ROUTES.signUp];

export const Footer = () => {
  const t = useTranslations("footer");
  const pathname = usePathname();
  const params = useParams();

  if (routesWithoutHeader.includes(pathname) || params.answerOptionId) {
    return null;
  }

  const currentYear = new Date().getFullYear();
  return (
    <footer
      className={cn(
        styles["border-grid"],
        "w-full border-t text-xs sm:text-sm"
      )}
    >
      <div className={styles["container-wrapper"]}>
        <div
          className={cn(
            styles["container"],
            "flex gap-2 h-full pt-3 sm:pt-0 sm:h-10 md:h-17 items-start sm:items-center justify-between"
          )}
        >
          <div className=" opacity-50">Copyright © {currentYear} qrnx.ru</div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-8  opacity-50">
            <Link href={""}>{t("privacy")}</Link>
            <Link href={""}>{t("terms")}</Link>
            <Link href={"mailto:mihalay26@gmail.com?subject=Support%20letter"}>
              {t("support")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
