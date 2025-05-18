import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.unsplash.com", // For Unsplash images
      "paragraph.com", // For Paragraph CMS images
      "storage.googleapis.com", // For Google Storage images
      "paragraph.xyz",
      "images.pexels.com"
    ],
    // Optional: You can also use remotePatterns for more flexibility
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.paragraph.com",
      },
      {
        protocol: "https",
        hostname: "**.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "**.paragraph.xyz",
      },
          {
        protocol: "https",
        hostname: "**.images.pexels.com",
      },
    ],
  },
  // Other Next.js config options...
};

export default nextConfig;
