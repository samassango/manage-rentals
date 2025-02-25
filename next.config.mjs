/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: '127.0.0.1',
            port: '3001',
            pathname: '/files/**'
          },
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '3001',
            pathname: '/upload/**'
          },
          {
            protocol: 'http',
            hostname: '127.0.0.1',
            port: '3001',
            pathname: '/upload/**'
          },
        ],
      }
};

export default nextConfig;
