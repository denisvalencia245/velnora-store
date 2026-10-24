# VELNORA · tienda de afiliación (sitio estático)

Sin dependencias. Requiere Node 18+ solo para generar el sitio.

```
npm run build     # genera dist/
npm run check     # revisa enlaces, títulos, h1, alt, CSP
npm run serve     # prueba local en http://localhost:8080
```

## Estructura
- `data/` → contenido (productos, categorías, blog, FAQ, ajustes). Lo edita el panel `/admin/` o a mano.
- `src/` → CSS y JS. `static/` → imágenes subidas (`static/img/uploads`). `admin/` → panel Decap CMS.
- `build.mjs` → genera `dist/` (páginas HTML reales, sitemap, robots, `_headers`).

## Publicar (Netlify, gratis)
1. Sube la carpeta a un repositorio de GitHub (puede ser privado).
2. Netlify → *Add new site → Import from Git*. Build: `node build.mjs`, publish: `dist` (ya en `netlify.toml`).
3. Rellena `data/config.json` (`site_url`, titular, correo) para activar sitemap, canonical y textos legales.
4. Formulario de contacto: Netlify lo detecta solo (Forms). Revisa los envíos en el panel de Netlify.

## Panel privado (solo tú)
1. En `admin/config.yml` cambia `repo:` por `TU_USUARIO/TU_REPOSITORIO` y `site_url`.
2. Netlify → *Site configuration → Access & security → OAuth → Install provider → GitHub*.
3. Entra en `https://tu-dominio/admin/` con tu cuenta de GitHub. Solo quien tenga permiso de escritura en el repositorio puede guardar; cada guardado crea un commit y Netlify republica.
4. Gestiona: productos (precio, enlace de afiliado, imagen, categoría), categorías, blog, ajustes y FAQ.

Prueba local sin GitHub: descomenta `local_backend: true` y ejecuta `npx decap-server`.

## Enlaces de afiliado
Pega tu enlace real (https) en el campo del producto. Se publica con `rel="sponsored nofollow noopener"` y aviso de afiliación. Sin enlace, el botón queda desactivado. Los 7 productos incluidos son de **demostración** (campo `demo`); bórralos o edítalos.
