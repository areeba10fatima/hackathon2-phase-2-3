/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: 'http://127.0.0.1:5000/api',
  },
};

module.exports = nextConfig;