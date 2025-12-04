import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable Next.js hot reload, handled by nodemon (if used)
  reactStrictMode: false,
  // Disable Next.js Dev Tools badge/indicator
  devIndicators: false,
};

export default nextConfig;
