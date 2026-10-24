# Estado del proyecto (2026-10-22)

## Hecho y comprobado (build + check + prueba en navegador local con Playwright)
- Proyecto reestructurado desde `velnora.html` (SPA de un archivo) a sitio estático con **páginas HTML reales** (mejor SEO): inicio, catálogo, 7 categorías con productos, 7 fichas, novedades, buscador, comparador (máx. 3), favoritos, blog (3 artículos), contacto (Netlify Forms), FAQ, cómo funciona, guía de uso, acerca de, transparencia de afiliados, páginas legales, 404.
- Generador `build.mjs` sin dependencias; CSS/JS con hash; `products.json`/`posts.json`; sitemap.xml y robots.txt (con `site_url`); canonical, Open Graph, JSON-LD (WebSite, Breadcrumb, Product, Article, FAQ).
- Seguridad: CSP por `<meta>` (sin scripts/estilos inline), cabeceras en `_headers`, enlaces afiliados `sponsored nofollow noopener`, URLs afiliadas solo `https`, markdown escapado, honeypot en formulario.
- Cookies configurable (`data/config.json`): aviso informativo si no hay analítica; con `ga4_id` pide consentimiento y carga GA4 solo si se acepta.
- Panel privado: Decap CMS (`admin/`) sobre GitHub, con colecciones de productos, categorías, blog, ajustes y FAQ (YAML validado). **No verificado en vivo** (necesita tu repositorio y OAuth).
- Diseño oscuro minimalista con detalles neón, animaciones (respetan `prefers-reduced-motion`), responsive (revisado en 1280 y 390 px).

## No verificado / pendiente de tus cuentas
- No está publicada ni desplegada. Panel `/admin/`, Netlify Forms y GA4 sin probar en producción.
- Se evitan páginas vacías: categorías sin productos y `/ofertas/` no se generan hasta que haya datos.
- Textos legales: borradores con campos [PENDIENTE]; deben revisarse por un profesional.
- Se eliminaron del diseño original las páginas de pago/descarga propias, marcas y más vendidos, porque el modelo es de afiliación y no había datos.
