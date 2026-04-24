import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
  analyzerMode: 'static',
  reportFilename: 'bundle-analysis.html',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ============================================================================
  // IMAGE OPTIMIZATION (crítico para og:images en GEO)
  // ============================================================================
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      },
    ],
    // Formatos moderno + fallback para máxima compatibilidad
    formats: ['image/avif', 'image/webp'],
    // Responsive sizes para diferentes dispositivos
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 768, 1024, 1280, 1536],
    // Calidades optimizadas (menos = mejor para LCP)
    qualities: [75, 85, 95],
    // Minimizar LCP: usar blurHash y placeholder
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ============================================================================
  // COMPRESSION (gzip + brotli automático en Vercel)
  // ============================================================================
  compress: true,

  // ============================================================================
  // EXPERIMENTAL OPTIMIZATIONS
  // ============================================================================
  experimental: {
    optimizePackageImports: ['lucide-react'],
    // Optimización de bundle size
    esmExternals: true,
  },

  // ============================================================================
  // COMPILER OPTIMIZATIONS
  // ============================================================================
  compiler: {
    // Remove console.log en producción (menos bundle)
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
    // Remueve styled-jsx si no lo usas
    styledComponents: false,
  },

  // ============================================================================
  // WEBPACK OPTIMIZATION
  // ============================================================================
  webpack: (config, { isServer }) => {
    // Soporte para videos
    config.module.rules.push({
      test: /\.(webm|mp4)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/videos/',
          outputPath: 'static/videos/',
        },
      },
    })

    // Optimizaciones para cliente moderno
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
      config.target = ['web', 'es2022']
    }

    return config
  },

  // ============================================================================
  // REDIRECTS (manejo de idiomas + legacy URLs)
  // ============================================================================
  async redirects() {
    return [
      // Redirigir raíz a /es (por defecto) o idioma detectado (lo maneja proxy.ts)
      // No agregar aquí porque lo maneja el middleware en proxy.ts
    ]
  },

  // ============================================================================
  // REWRITES (para SEO: mantener URLs limpias)
  // ============================================================================
  async rewrites() {
    return {
      beforeFiles: [
        // Ya maneja el middleware (proxy.ts) la reescritura de idiomas
      ],
    }
  },

  // ============================================================================
  // HEADERS (GEO + PERFORMANCE + SECURITY)
  // ============================================================================
  async headers() {
    return [
      // ======================================================================
      // ASSETS ESTÁTICOS (1 año: immutable)
      // ======================================================================
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/favicon-temperini/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },

      // ======================================================================
      // CASE STUDIES (GEO: contenido editorial no cambia)
      // ======================================================================
      {
        source: '/(es|en)/(manijapp|digito|gloryfit|levelup|vorterix|rectofinal)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=2592000',
          },
          {
            key: 'Vary',
            value: 'Accept-Language',
          },
        ],
      },

      // ======================================================================
      // SITEMAPS Y ROBOTS (GEO: bots necesitan versiones frescas)
      // ======================================================================
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800',
          },
          {
            key: 'Content-Type',
            value: 'text/plain',
          },
        ],
      },

      // ======================================================================
      // PÁGINAS DINÁMICAS (home, contact - revalidación frecuente)
      // ======================================================================
      {
  source: '/(es|en)',
  headers: [
    {
      key: 'Cache-Control',
      value: 'public, max-age=3600, stale-while-revalidate=86400',
    },
    {
      key: 'Vary',
      value: 'Accept-Language',
    },
  ],
},
{
  source: '/(es|en)/',
  headers: [
    {
      key: 'Cache-Control',
      value: 'public, max-age=3600, stale-while-revalidate=86400',
    },
    {
      key: 'Vary',
      value: 'Accept-Language',
    },
  ],
},

      // ======================================================================
      // SECURITY + GEO HEADERS (todas las rutas)
      // ======================================================================
      {
        source: '/:path*',
        headers: [
          // ---- Performance ----
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          // ---- Security ----
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ]
  },

  // ============================================================================
  // PRODUCTION OPTIMIZATIONS
  // ============================================================================
  productionBrowserSourceMaps: false, // Reduce bundle size
  poweredByHeader: false, // Security: no revelar que usa Next.js
  generateEtags: true, // Para revalidación de cache
}

export default withBundleAnalyzer(nextConfig)