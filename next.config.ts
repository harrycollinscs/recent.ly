import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        // TODO sort when S3 configured?
        // protocol: '*',
        hostname: '**',
        port: '',
        pathname: '**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
