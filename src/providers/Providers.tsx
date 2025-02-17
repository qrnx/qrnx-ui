"use client";

import { SessionProvider } from "next-auth/react";
import { type ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import I18nProvider from "./I18nProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/lib/queryClient";
import ToasterLayout from "./Toaster";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <I18nProvider>
          <QueryClientProvider client={queryClient}>
            <ToasterLayout>{children}</ToasterLayout>
          </QueryClientProvider>
        </I18nProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
