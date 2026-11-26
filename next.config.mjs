/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produção = site estático no servidor do cliente (AD-007)
  output: 'export',
  images: { unoptimized: true }
}

export default nextConfig
