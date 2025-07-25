/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Configure for GitHub Pages deployment
  basePath: process.env.NODE_ENV === 'production' ? '/sunnywebsite' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/sunnywebsite/' : '',
}

module.exports = nextConfig