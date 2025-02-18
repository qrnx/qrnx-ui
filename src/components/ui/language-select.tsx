"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { ChevronsUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageSelect() {
  const { i18n } = useTranslation();

  const handleToggle = (language: string) => {
    if (i18n.language === "en" && language === "ru") {
      i18n.changeLanguage("ru");
    } else if (i18n.language === "ru" && language === "en") {
      i18n.changeLanguage("en");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="default" className="gap-[2] px-1.5">
          {String(i18n.language).toUpperCase()}
          <ChevronsUpDown className="w-[14]! h-[16]!"/>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleToggle("en")}>
          En
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleToggle("ru")}>
          Ru
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
