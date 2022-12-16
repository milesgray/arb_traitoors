/** @type {import('next').NextConfig} */
const analyzer = require('@next/bundle-analyzer');

const withBundleAnalyzer = analyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  compiler: {
    removeConsole: {
      exclude: ['error'],
    },
  },
}

module.exports = withBundleAnalyzer(nextConfig)
