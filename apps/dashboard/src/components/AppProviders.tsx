"use client";

import { getQueryClient } from "@/lib/getQueryClient";
import { SidebarProvider } from "@insta-puppeteer/ui/components/sidebar";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

type AppProvidersProps = {
  children: ReactNode;
};

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={getQueryClient()}>
        <SidebarProvider>
          {children}
          <ReactQueryDevtools />
        </SidebarProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};
