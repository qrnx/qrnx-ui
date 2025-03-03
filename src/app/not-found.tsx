import { ROUTES } from "@/config/routes";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { SquareArrowOutUpRight } from "lucide-react";

const NotFound: React.FC = () => {
  const t = useTranslations("404page");

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8">
      <div className="flex items-center text-9xl">404</div>
      <div className="flex flex-col gap-2">
        <div> {t("massage")}</div>
        <div>
          <Link
            className="flex items-center gap-2 underline"
            href={ROUTES.home}
          >
            {t("homeLink")}
            <SquareArrowOutUpRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
