/** @type {import('next').NextConfig} */
const nextConfig = {
    typedRoutes: true,
    output: 'standalone',
    experimental: {
        optimizePackageImports: ['viem', 'wagmi']
    },
    transpilePackages: ['@sportsbook/types']
}

module.exports = nextConfig
