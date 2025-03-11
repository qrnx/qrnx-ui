"use client";

import { SessionProvider } from "next-auth/react";
import { type ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";

import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/lib/queryClient";
import ToasterLayout from "./toaster";
import { UserProvider } from "./user-providers";

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
          <UserProvider>
            <ToasterLayout>{children}</ToasterLayout>
          </UserProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
