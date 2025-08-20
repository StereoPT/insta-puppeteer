"use client";

import { SidebarProvider } from "@insta-puppeteer/ui/components/sidebar";
import type { ReactNode } from "react";

type AppProvidersProps = {
  children: ReactNode;
};

export const AppProviders = ({ children }: AppProvidersProps) => {
  return <SidebarProvider>{children}</SidebarProvider>;
};
