/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produção = site estático no servidor do cliente (AD-007)
  output: 'export',
  // <rota>/index.html: funciona em Apache/nginx sem rewrite (LR-01)
  trailingSlash: true,
  images: { unoptimized: true }
}

export default nextConfig
