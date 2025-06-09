import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
        pathname: '/dms/image/**',
      },
      {
        protocol: 'https',
        hostname: 'tse*.mm.bing.net',
        pathname: '/th/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'adminsite.biafile.ir',
        pathname: '**/**',
      },
      {
        protocol: 'http',
        hostname: 'adminsite.biafile.ir',
        pathname: '**/**',
      },
      {
        protocol: 'https',
        hostname: 'api.biafile.ir',
        pathname: '**/**',
      },
      {
        protocol: 'http',
        hostname: 'api.biafile.ir',
        pathname: '**/**',
      },
    ],
  },
};

export default nextConfig;
