/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  eslint: { ignoreDuringBuilds: true },
  images: {
    unoptimized: true, // ✅ ADD THIS LINE

    remotePatterns: [
      {
        protocol: "https",
        hostname: "scalisi-produce.s3.us-east-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "sskw3ghk-3040.inc1.devtunnels.ms",
      },
      {
        protocol: "https",
        hostname: "scalisi-backend-dd-414f134a66de.herokuapp.com",
      },
      {
        protocol: "https",
        hostname: "jackscalisi.webfss.com",
      },
    ],
  },
};

export default nextConfig;