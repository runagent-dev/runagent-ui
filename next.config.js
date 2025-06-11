/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  output: 'standalone',
  experimental: {
    turbo: {
      resolveAlias: {
        '@': path.join(__dirname, './app')
      }
    }
  }
}

module.exports = nextConfig