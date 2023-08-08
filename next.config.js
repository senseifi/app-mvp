/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },

  transpilePackages: ["@0xsquid/widget"],
  reactStrictMode: true,
};

module.exports = nextConfig;
