/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

// module.exports = {
//   async rewrites() {
//     return [
//       {
//         source: '/melon/:path*',
//         destination: 'https://www.melon.com/:path*',
//       },
//     ]
//   },
// }

module.exports = {
  trailingSlash: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  generateBuildId: async () => {
    // Return custom build ID, like the latest git commit hash
    return 'my-build-id'
  },
}