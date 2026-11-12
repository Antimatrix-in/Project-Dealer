import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
        source: "/careers",
        destination: "/contact",
        permanent: false,
      },
      {
        source: "/support",
        destination: "/contact",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
