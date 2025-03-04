import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        minimumCacheTTL: 60,
        domains: [''],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
