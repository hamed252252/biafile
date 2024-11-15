import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "media.licdn.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "tse1.mm.bing.net",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "tse2.mm.bing.net",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "tse3.mm.bing.net",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "tse4.mm.bing.net",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "encrypted-tbn0.gstatic.com",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
