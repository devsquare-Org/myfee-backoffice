import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shopby-images.cdn-nhncommerce.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "d18zclbuw27n4c.cloudfront.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dev-api.myfee.kr",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
