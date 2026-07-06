import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "emwyetywsaaqzsqzuqch.supabase.co",
      },
    ],
  },
};

export default nextConfig;