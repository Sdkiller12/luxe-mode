import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow Unsplash images (used for all product photography)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    // Image optimization settings for Lighthouse score
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400, // 24h
  },
  // Strict mode for catching React issues early
  reactStrictMode: true,
};

export default nextConfig;
