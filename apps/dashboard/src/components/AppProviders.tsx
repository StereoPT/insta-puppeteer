"use client";

import { SidebarProvider } from "@insta-puppeteer/ui/components/sidebar";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

type AppProvidersProps = {
  children: ReactNode;
};

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <SessionProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </SessionProvider>
  );
};
