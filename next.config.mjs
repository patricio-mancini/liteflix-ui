/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "api.patriciomancini.net"
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org"
      }
    ],
  },
};

export default nextConfig;
