import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https", // بهتر است از https استفاده کنید
                hostname: "images.unsplash.com",
                pathname: "/**", // این علامت * تمامی مسیرها را شامل می‌شود
            },
        ],
    },
    /* config options here */
};

export default nextConfig;
