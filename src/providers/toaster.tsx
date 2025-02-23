"use client";

import { useTheme } from "next-themes";
import { type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

export default function ToasterLayout({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  return (
    <>
      {children}
      <Toaster theme={theme as "light" | "dark"} />
    </>
  );
}
