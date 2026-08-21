/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
      { protocol: "https", hostname: "www.campdavidventuresltd.co.ke" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/webmail",
        destination: "https://da33.host-ww.net/roundcube/",
        permanent: false,
      },
    ];
  },
};
export default nextConfig;
