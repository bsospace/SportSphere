import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Suppresses TypeScript errors during build
  },
};

export default nextConfig;
