import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { AppProviders } from "@/components/AppProviders";
import { Toaster } from "@insta-puppeteer/ui/components/sonner";
import { cn } from "@insta-puppeteer/ui/lib/utils";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Insta-Puppeteer | Dashboard",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className={cn("antialiased", "font-sans", inter.variable)}>
        <NextTopLoader color="#6366f1" showSpinner={false} />
        <AppProviders>{children}</AppProviders>
        <Toaster richColors />
      </body>
    </html>
  );
};

export default RootLayout;
