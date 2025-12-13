/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    // Exclude supabase functions from Next.js build
    config.module.rules.push({
      test: /(supabase|github-repo)\/(functions|main)\/.*\/index\.ts$/,
      use: 'ignore-loader'
    });
    return config;
  },
  // Exclude supabase directories from compilation
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'].filter(ext => !ext.includes('supabase')),
}

module.exports = nextConfig