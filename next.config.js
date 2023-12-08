/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images :{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        port: '',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3030',
      },
    ],
  }
}

module.exports = nextConfig
