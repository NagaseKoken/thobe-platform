import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '4grh9vo2c5.ufs.sh',
        port: '',
        pathname: '/f/**',
        search: '',
      }
    ]
  }
};

export default nextConfig;
