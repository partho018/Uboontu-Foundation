/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  webpack: (config, { dev }) => {
    if (dev) {
      // Set webpack cache type to memory instead of filesystem in development
      // to prevent file-locking and cache corruptions on Windows
      config.cache = {
        type: 'memory'
      };
    }
    return config;
  }
};

export default nextConfig;
