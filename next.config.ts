import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/domains",
        destination: "/projects",
        permanent: false,
      },
      {
        source: "/products",
        destination: "/projects",
        permanent: false,
      },
      {
        source: "/support",
        destination: "/contact",
        permanent: false,
      },
      {
        source: "/careers",
        destination: "/contact",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
