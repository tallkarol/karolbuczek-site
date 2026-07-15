/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/one-sheets",
        destination: "/resume/one-sheet",
        permanent: true,
      },
      {
        source: "/one-sheet",
        destination: "/resume/one-sheet",
        permanent: true,
      },
      {
        source: "/resume/one-sheets",
        destination: "/resume/one-sheet",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig

