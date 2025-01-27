import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false, // Suppresses TypeScript errors during build
  },
};

export default nextConfig;
