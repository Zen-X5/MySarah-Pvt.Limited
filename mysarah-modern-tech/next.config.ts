import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { solarCities } from "./src/lib/solar-seo";

const configDir = path.dirname(fileURLToPath(import.meta.url));
const allowedDevOriginsFromEnv = (process.env.NEXT_DEV_ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85, 90, 92, 95],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "192.168.29.114",
    ...allowedDevOriginsFromEnv,
  ],
  turbopack: {
    root: configDir,
  },
  async redirects() {
    return solarCities.map((city) => ({
      source: `/solar-installation-${city}`,
      destination: `/solar-installation/${city}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
