import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // a stray lockfile higher up the tree would otherwise be picked as the workspace root
  turbopack: { root: process.cwd() },
  reactStrictMode: true,
  output: "export",
};

export default nextConfig;
