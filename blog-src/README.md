# Blog BP4 — cómo publicar

Las notas son archivos Markdown en `blog-src/posts/`. El script `blog-src/build.py` genera las páginas estáticas en `/blog/` (cada nota con sus propios metadatos para compartir en LinkedIn y WhatsApp), el RSS (`/blog/feed.xml`) y el `sitemap.xml`.

## Publicar una nota

1. Crear `blog-src/posts/AAAA-MM-DD-titulo-corto.md` (la URL sale del nombre: `/blog/titulo-corto/`).
2. Encabezado:

   ```
   ---
   title: Título de la nota
   date: 2026-10-08
   description: Resumen de 1–2 oraciones. Se usa en el listado y al compartir.
   category: Nota          (Nota | Noticia | Caso | Evento)
   image: /blog/img/archivo.jpg   (opcional, idealmente 1200×630)
   cover: no               (opcional: la imagen se usa solo al compartir y en el listado)
   author: Equipo BP4      (opcional)
   draft: true             (opcional: si está, no se publica)
   ---
   ```

3. Las imágenes van en `blog/img/`.
4. Desde la carpeta `WEB`, correr `python blog-src/build.py`.
5. Commit y push a GitHub. Cloudflare Pages publica solo.

`python blog-src/build.py --drafts` incluye los borradores para previsualizarlos localmente. Antes de hacer push, hay que volver a correrlo sin `--drafts`.

Para previsualizar localmente: `python -m http.server 8000` dentro de `WEB` y abrir http://localhost:8000/blog/
