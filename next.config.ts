import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Build process में ESLint errors को ignore करेगा
  },
  typescript: {
    ignoreBuildErrors: true, // TypeScript errors को ignore करेगा ताकि build fail न हो
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      child_process: false,
    };
    return config;
  },
};

export default nextConfig;

