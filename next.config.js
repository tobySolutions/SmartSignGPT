/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
    responseLimit: '50mb',
  },
  images: {
    remotePatterns: [
      { hostname: 'metaschool.so' },
    ],
  },
}

module.exports = nextConfig 