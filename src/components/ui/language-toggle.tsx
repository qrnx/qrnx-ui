"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export function LanguageToggle() {
  const { i18n } = useTranslation();

  const handleToggle = () => {
    if (i18n.language === "en") {
      i18n.changeLanguage("ru");
    } else {
      i18n.changeLanguage("en");
    }
  };

  return (
    <Button
      className="cursor-pointer"
      onClick={handleToggle}
      variant="outline"
      size="icon"
    >
      <span className="absolute h-[1.2rem] w-[1.2rem] transition-all">
        {String(i18n.language).toUpperCase()}
      </span>
    </Button>
  );
}
