/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    // Exclude supabase functions from Next.js build
    config.module.rules.push({
      test: /supabase\/functions\/.*\/index\.ts$/,
      use: 'ignore-loader'
    });
    return config;
  },
}

module.exports = nextConfig