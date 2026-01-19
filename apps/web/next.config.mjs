/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    tailwindFunctions: ['clsx', 'twMerge'],
  },
};

export default nextConfig;