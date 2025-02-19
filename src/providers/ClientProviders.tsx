"use client";

import { SessionProvider } from "next-auth/react";
import { type ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";

import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/lib/queryClient";
import ToasterLayout from "./Toaster";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <QueryClientProvider client={queryClient}>
          <ToasterLayout>{children}</ToasterLayout>
        </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
