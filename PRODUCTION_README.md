Resumen de cambios para producción
=================================

He dejado el demo del design system en modo "opt-in" para evitar que monte una app de demostración al cargar la página. Esto evita el "flash" donde se mostraba la versión descartada del hero.

Qué hice
- El archivo `_ds/bp4-design-system-.../_ds_bundle.js` ahora sólo montará la demo si existe la bandera global `window.__BP4_DESIGN_SYSTEM_ALLOW_DEMO = true`.

Pasos recomendados para poner en producción
1. Incluir todos los archivos estáticos en el repositorio (carpetas `_ds` y `assets`) y hacer push a GitHub.
2. Precompilar los archivos JSX y eliminar el transformer de Babel en producción. En `index.html` se usa el loader en-browser (`@babel/standalone`) — reemplazarlo por bundles precompilados evita penalizaciones de rendimiento.

   Ejemplo rápido con `esbuild` (rápido y simple):

   ```bash
   npm init -y
   npm install --save-dev esbuild
   npx esbuild app.jsx ui.jsx header.jsx hero.jsx sections-a.jsx sections-b.jsx sections-c.jsx footer-contact.jsx --bundle --outdir=dist --minify --sourcemap
   ```

   Luego actualizar `index.html` para cargar los bundles desde `dist/` en lugar de `type="text/babel"`.

3. Mantener la bandera del demo desactivada en producción (por defecto está desactivada). Si necesitás ver el demo localmente, antes de cargar `_ds_bundle.js` añade:

   ```html
   <script>window.__BP4_DESIGN_SYSTEM_ALLOW_DEMO = true;</script>
   ```

4. Limpiar caché en Cloudflare después del deploy (purge cache) para forzar que los cambios lleguen al CDN.

Comandos sugeridos para commit & push

```bash
git add .
git commit -m "chore: disable design-system demo by default; add production notes"
git push origin main
```

Notas finales
- Es preferible separar el bundle del design system (biblioteca) y el sitio (app) en builds distintos, así evitas ejecutar código de demostración en producción.

Si querés, hago el commit por vos y preparo un `dist/` precompilado con `esbuild` para reemplazar los `type="text/babel"` en `index.html`.
