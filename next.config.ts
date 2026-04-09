import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
    resolveAlias: {
      canvas: "./empty-module.js",
    },
  },
};

export default nextConfig;
