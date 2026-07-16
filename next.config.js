/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/case-studies",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/case-studies/:path*",
        destination: "/portfolio/:path*",
        permanent: true,
      },
      {
        source: "/portfolio/overview",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/case-studies/overview",
        destination: "/portfolio",
        permanent: true,
      },
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

