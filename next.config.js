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
      {
        protocol: 'https',
        hostname: 'dev-profile-front-end.vercel.app',
        port: '',
      },
    ],
  }
}

module.exports = nextConfig
