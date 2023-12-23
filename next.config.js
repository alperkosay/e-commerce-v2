/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "res.cloudinary.com",
            },
            {
                hostname: 'localhost',
                protocol: "http",
                port: '3001'
            }
        ]
    }
}

module.exports = nextConfig
