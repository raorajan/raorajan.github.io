/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  // Environment variables will be embedded at build time
  env: {
    NEXT_PUBLIC_EMAIL_API_URL: process.env.NEXT_PUBLIC_EMAIL_API_URL,
  },
};

export default nextConfig;
