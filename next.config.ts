import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/PokeAPI/sprites/master/sprites/pokemon/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/PokeAPI/sprites/master/sprites/items/**',
      },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  // Old URLs from before the redesign keep working.
  async redirects() {
    return [
      { source: '/projects', destination: '/work', permanent: true },
      { source: '/projects/:slug', destination: '/work/:slug', permanent: true },
      { source: '/product', destination: '/work', permanent: true },
      { source: '/marketing', destination: '/work', permanent: true },
    ];
  },
};

export default nextConfig;
