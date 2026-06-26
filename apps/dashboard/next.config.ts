import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@insta-puppeteer/ui", "@insta-puppeteer/database"],
};

export default nextConfig;
