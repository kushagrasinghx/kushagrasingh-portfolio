import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Static export for Cloudflare Pages — GitHub stats are baked in at build time. */
  output: "export",
  images: {
    // Pages has no Next image optimizer; serve the remote avatars as-is.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "opengraph.githubassets.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
    ],
  },
};

export default nextConfig;
