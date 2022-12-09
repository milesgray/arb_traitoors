/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  compiler: {
    removeConsole: {
      exclude: ['error'],
    },
  },
}

module.exports = nextConfig
