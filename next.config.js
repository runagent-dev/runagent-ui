/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  output: 'standalone',
  experimental: {
    turbo: {
      resolveAlias: {
        '@': path.join(__dirname, './app'),
      },
    },
  },
  async redirects() {
    return [
      {
        source: '/docs',
        destination: 'https://docs.run-agent.ai',
        permanent: true, // 301 redirect
      },
    ];
  },
};

module.exports = nextConfig;
