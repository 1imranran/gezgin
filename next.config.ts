import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  outputFileTracingIncludes: {
    "/*": ["./dev.db"],
    "/api/**/*": ["./dev.db"]
  }
};

export default nextConfig;
