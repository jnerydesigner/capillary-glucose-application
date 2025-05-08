import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("http://localhost:1337/**"),
      new URL("http://191.101.78.119:8091/**"),
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
