module.exports = {
  siteUrl: 'https://temperini.vercel.app',
  generateRobotsTxt: false, // Ya generamos robots.txt manualmente en public/
  exclude: ['/api/*', '/admin/*', '/_next/*'],
  generateIndexSitemap: true,
  sitemapSize: 50000,
  changefreq: 'weekly',
  priority: 0.7,

  // ============================================================================
  // RUTAS ADICIONALES CON LASTMOD DINÁMICO PARA GEO
  // ============================================================================
  additionalPaths: async (config) => {
    const result = []

    const languages = ['es', 'en']

    // Rutas y su metadata (fecha de última publicación real)
    const routes = [
      // HOME - daily crawl, highest priority
      { path: '', changefreq: 'daily', priority: 1.0, lastmod: '2026-04-24' },

      // CASE STUDIES (caso study más importante arriba)
      { path: '/manijapp', changefreq: 'weekly', priority: 0.95, lastmod: '2026-04-24' },
      { path: '/estoyai', changefreq: 'weekly', priority: 0.9, lastmod: '2026-08-30' },
      { path: '/digito', changefreq: 'weekly', priority: 0.85, lastmod: '2026-03-15' },
      { path: '/gloryfit', changefreq: 'monthly', priority: 0.8, lastmod: '2026-02-10' },
      { path: '/levelup', changefreq: 'monthly', priority: 0.8, lastmod: '2026-01-20' },
      { path: '/vorterix', changefreq: 'monthly', priority: 0.75, lastmod: '2025-12-05' },
      { path: '/rectofinal', changefreq: 'monthly', priority: 0.75, lastmod: '2025-11-30' },

      // INTERACTIVE / TOOLS
      { path: '/playground', changefreq: 'monthly', priority: 0.7, lastmod: '2026-03-01' },

      // UTILITY
      { path: '/contact', changefreq: 'weekly', priority: 0.6, lastmod: '2026-04-20' },

      // DEPRECATED (baja prioridad, pero indexable)
      { path: '/under-construction', changefreq: 'never', priority: 0.3, lastmod: '2026-01-01' },
    ]

    // Generar URLs para cada idioma con alternates (hreflang)
    routes.forEach(route => {
      languages.forEach(lang => {
        const url = `/${lang}${route.path}`

        // Construir el objeto con lastmod ISO correcto
        const urlEntry = {
          loc: url,
          changefreq: route.changefreq,
          priority: route.priority,
          lastmod: route.lastmod + 'T00:00:00Z', // Convertir a ISO 8601
        }

        // Agregar alternates (hreflang) para multiidioma
        // Esto ayuda a los crawlers a entender que hay una versión en otra lengua
        urlEntry.alternateRefs = languages
          .filter(l => l !== lang) // Excluir el idioma actual
          .map(altLang => ({
            href: `https://temperini.vercel.app/${altLang}${route.path}`,
            hreflang: altLang === 'es' ? 'es-AR' : 'en',
          }))

        result.push(urlEntry)
      })
    })

    return result
  },

  // ============================================================================
  // CONFIGURACIÓN PARA BOTS DE IA
  // ============================================================================
  // next-sitemap automáticamente:
  // - Incluye <lastmod> en cada URL (crítico para GEO — informa cuándo se actualizó)
  // - Genera sitemap-0.xml y sitemap.xml index
  // - Respeta robots.txt (que permite a todos los AI bots)
}; 