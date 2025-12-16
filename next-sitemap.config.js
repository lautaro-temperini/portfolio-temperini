module.exports = {
  siteUrl: 'https://temperini.vercel.app',
  generateRobotsTxt: true,
  exclude: ['/api/*'],
  // Configuración adicional para rutas dinámicas
  generateIndexSitemap: true,
  // Rutas adicionales que pueden no detectarse automáticamente
  additionalPaths: async (config) => {
    const result = []
    
    // Agregar rutas de idiomas para cada página principal
    const languages = ['es', 'en']
    const routes = [
      '',
      '/contact',
      '/playground',
      '/digito',
      '/gloryfit',
      '/levelup',
      '/vorterix',
      '/rectofinal',
      '/under-construction',
    ]
    
    routes.forEach(route => {
      languages.forEach(lang => {
        result.push({
          loc: `/${lang}${route}`,
          changefreq: route === '' ? 'daily' : 'weekly',
          priority: route === '' ? 1.0 : 0.8,
          lastmod: new Date().toISOString(),
        })
      })
    })
    
    return result
  },
}; 