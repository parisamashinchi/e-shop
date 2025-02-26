/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["res.cloudinary.com", "lh3.googleusercontent.com","m.media-amazon.com"],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: "res.cloudinary.com",
            port: '',
            pathname:  "**",
          },
        ],
      },
};

export default nextConfig;
