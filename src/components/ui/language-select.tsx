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
} from "@/components/ui/dropdown-menu";
import { Locale, locales } from "@/i18n/config";
import { useTransition } from "react";
import { setUserLocale } from "@/services/locale";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

export function LanguageSelect() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className={cn(isPending && "pointer-events-none opacity-60")}
      >
        <Button variant="ghost" size="default" className="gap-[2] px-1.5">
          {String(locale).toUpperCase()}
          <ChevronsUpDown className="w-[14]! h-[16]!" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem key={locale} onClick={() => onChange(locale)}>
            {locale.toLocaleUpperCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
