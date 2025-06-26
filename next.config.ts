import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'deploy-pos-nestjs-ge61.onrender.com'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ]
  }
};

export default nextConfig;
