#!/usr/bin/env python3
"""BP4 — generador estático del blog.

Lee las notas en blog-src/posts/*.md y genera:
  blog/index.html            listado de notas
  blog/<slug>/index.html     una página por nota (con metadatos para LinkedIn/WhatsApp/Google)
  blog/feed.xml              RSS
  sitemap.xml                home + blog + notas (se reescribe completo)

Uso (desde la carpeta WEB):
  python blog-src/build.py            publica solo notas sin `draft: true`
  python blog-src/build.py --drafts   incluye borradores (para previsualizar; NO pushear así)

Formato de una nota (encabezado entre líneas ---):
  ---
  title: Título de la nota
  date: 2026-10-08
  description: Resumen de 1–2 oraciones (se usa en el listado y al compartir).
  category: Nota            # Nota | Noticia | Caso | Evento ...
  image: /blog/img/mi-imagen.jpg   # opcional; ideal 1200x630
  cover: no                 # opcional; no mostrar la imagen dentro de la nota
  author: Equipo BP4        # opcional
  draft: true               # opcional; si está, no se publica
  ---
  Cuerpo en Markdown...
"""
import html
import json
import re
import shutil
import sys
from datetime import date, datetime
from pathlib import Path

import markdown

SITE = "https://bp-4.com"
ROOT = Path(__file__).resolve().parent.parent          # carpeta WEB
SRC = ROOT / "blog-src" / "posts"
OUT = ROOT / "blog"
DS = "/_ds/bp4-design-system-74aeafca-6a8d-44c7-afc9-dea3e27f2c16/styles.css"
DEFAULT_IMAGE = "/assets/photos/hero-team.png"
WHATSAPP = "https://wa.me/5491164812711?text=Hola,%20quisiera%20saber%20m%C3%A1s%20sobre%20ustedes"
LINKEDIN = "https://www.linkedin.com/company/bp4/"
EMAIL = "hello@bp-4.com"

MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio",
         "agosto", "septiembre", "octubre", "noviembre", "diciembre"]

NAV = [("/#modelo", "El modelo"), ("/#people-care", "People Care"),
       ("/#reporting", "Reporting"), ("/#clientes", "Clientes"), ("/blog/", "Blog")]


def esc(s):
    return html.escape(str(s or ""), quote=True)


def fecha_es(d):
    return f"{d.day} de {MESES[d.month - 1]} de {d.year}"


def slugify(s):
    s = s.lower()
    for a, b in zip("áéíóúüñ", "aeiouun"):
        s = s.replace(a, b)
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


def parse(path):
    raw = path.read_text(encoding="utf-8")
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n(.*)$", raw, re.S)
    if not m:
        sys.exit(f"[error] {path.name}: falta el encabezado entre ---")
    meta = {}
    for line in m.group(1).splitlines():
        line = re.split(r"\s{2,}#", line)[0].rstrip()   # comentarios: dos espacios + #
        if not line.strip() or ":" not in line:
            continue
        k, v = line.split(":", 1)
        meta[k.strip().lower()] = v.strip().strip('"').strip("'")
    for req in ("title", "date", "description"):
        if not meta.get(req):
            sys.exit(f"[error] {path.name}: falta '{req}' en el encabezado")
    try:
        meta["date"] = datetime.strptime(meta["date"], "%Y-%m-%d").date()
    except ValueError:
        sys.exit(f"[error] {path.name}: la fecha debe ser AAAA-MM-DD")
    meta["draft"] = meta.get("draft", "").lower() in ("true", "si", "sí", "yes", "1")
    meta["slug"] = meta.get("slug") or slugify(re.sub(r"^\d{4}-\d{2}(-\d{2})?-", "", path.stem))
    meta["category"] = meta.get("category") or "Nota"
    meta["author"] = meta.get("author") or "Equipo BP4"
    body = m.group(2)
    meta["html"] = markdown.markdown(body, extensions=["extra", "sane_lists", "smarty"],
                                     output_format="html5")
    words = len(re.findall(r"\w+", body))
    meta["minutes"] = max(1, round(words / 220))
    return meta


def abs_url(p):
    return p if p.startswith("http") else SITE + p


def head(title, description, url, image, og_type="website", extra=""):
    return f"""<!DOCTYPE html>
<html lang="es-419">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{esc(title)}</title>
<meta name="description" content="{esc(description)}" />
<link rel="canonical" href="{esc(url)}" />
<meta property="og:title" content="{esc(title)}" />
<meta property="og:description" content="{esc(description)}" />
<meta property="og:url" content="{esc(url)}" />
<meta property="og:type" content="{og_type}" />
<meta property="og:site_name" content="BP4" />
<meta property="og:locale" content="es_419" />
<meta property="og:image" content="{esc(abs_url(image))}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{esc(title)}" />
<meta name="twitter:description" content="{esc(description)}" />
<meta name="twitter:image" content="{esc(abs_url(image))}" />
<link rel="alternate" type="application/rss+xml" title="Blog BP4" href="{SITE}/blog/feed.xml" />
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="stylesheet" href="{DS}" />
<link rel="stylesheet" href="/blog/blog.css" />
{extra}</head>
<body>
"""


def header():
    cur = ' aria-current="page"'
    links = "".join(f'<a href="{h}"{cur if h == "/blog/" else ""}>{esc(l)}</a>' for h, l in NAV)
    return f"""<header class="b-header">
  <div class="b-wrap b-header-row">
    <a href="/" class="b-logo" aria-label="BP4 — inicio"><img src="/assets/logos/bp4-logo-orange.png" alt="bp4" width="43" height="36" /></a>
    <nav class="b-nav">{links}</nav>
    <a class="b-btn" href="/#contacto">Hablemos</a>
  </div>
</header>
"""


def footer():
    year = date.today().year
    return f"""<section class="b-cta">
  <div class="b-wrap b-cta-row">
    <div>
      <h2>¿Querés sumar talento tecnológico a tu equipo?</h2>
      <p>Te contamos cómo trabajamos con Recruiting, People Care, Reporting y Capacitaciones.</p>
    </div>
    <div class="b-cta-actions">
      <a class="b-btn b-btn-lg" href="/#contacto">Hablemos</a>
      <a class="b-btn b-btn-ghost b-btn-lg" href="{WHATSAPP}" target="_blank" rel="noopener">WhatsApp</a>
    </div>
  </div>
</section>
<footer class="b-footer">
  <div class="b-wrap b-footer-row">
    <a href="/"><img src="/assets/logos/bp4-logo-white.png" alt="bp4" width="43" height="35" /></a>
    <p>Gestión integral de talento tecnológico.</p>
    <div class="b-footer-links">
      <a href="{LINKEDIN}" target="_blank" rel="noopener">LinkedIn</a>
      <a href="mailto:{EMAIL}">{EMAIL}</a>
      <a href="/blog/feed.xml">RSS</a>
    </div>
  </div>
  <div class="b-wrap b-legal">© {year} BP4. Todos los derechos reservados.</div>
</footer>
</body>
</html>
"""


def card(p, big=False):
    img = (f'<div class="b-card-img"><img src="{esc(p["image"])}" alt="" loading="lazy" /></div>'
           if p.get("image") else "")
    return f"""<a class="b-card{' b-card-big' if big else ''}{' has-img' if p.get('image') else ''}" href="/blog/{p['slug']}/">
  {img}<div class="b-card-body">
    <div class="b-meta"><span class="b-tag">{esc(p['category'])}</span><time datetime="{p['date'].isoformat()}">{fecha_es(p['date'])}</time></div>
    <h2>{esc(p['title'])}</h2>
    <p>{esc(p['description'])}</p>
    <span class="b-more">Leer nota →</span>
  </div>
</a>"""


def row(p):
    img = (f'<div class="b-row-img"><img src="{esc(p["image"])}" alt="" loading="lazy" /></div>'
           if p.get("image") else '<div class="b-row-img b-row-noimg"><span>bp4</span></div>')
    return f"""<a class="b-row" href="/blog/{p['slug']}/">
  {img}<div class="b-row-body">
    <div class="b-meta"><span class="b-tag">{esc(p['category'])}</span><time datetime="{p['date'].isoformat()}">{fecha_es(p['date'])}</time></div>
    <h2>{esc(p['title'])}</h2>
    <p>{esc(p['description'])}</p>
  </div>
</a>"""


def page_index(posts):
    desc = "Notas, novedades y miradas de BP4 sobre talento tecnológico, gestión de equipos e inteligencia artificial."
    if posts:
        grid = '<div class="b-rows">' + "\n".join(row(p) for p in posts) + "</div>"
    else:
        grid = '<p class="b-empty">Muy pronto vamos a publicar las primeras notas.</p>'
    return (head("Blog — BP4", desc, f"{SITE}/blog/", DEFAULT_IMAGE) + header() + f"""<main>
<section class="b-wrap b-intro">
  <span class="b-eyebrow">Blog BP4</span>
  <h1>Notas y novedades</h1>
  <p>{esc(desc)}</p>
</section>
<section class="b-wrap b-list">
{grid}
</section>
</main>
""" + footer())


def page_post(p, others):
    url = f"{SITE}/blog/{p['slug']}/"
    image = p.get("image") or DEFAULT_IMAGE
    ld = {
        "@context": "https://schema.org", "@type": "BlogPosting",
        "headline": p["title"], "description": p["description"],
        "datePublished": p["date"].isoformat(), "dateModified": p["date"].isoformat(),
        "author": {"@type": "Organization", "name": p["author"]},
        "publisher": {"@type": "Organization", "name": "BP4", "url": SITE + "/",
                      "logo": {"@type": "ImageObject", "url": SITE + "/assets/logos/bp4-logo-orange.png"}},
        "image": abs_url(image), "mainEntityOfPage": url, "inLanguage": "es-419",
    }
    extra = (f'<meta property="article:published_time" content="{p["date"].isoformat()}" />\n'
             f'<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>\n')
    # cover: no  → la imagen se usa solo para compartir/listado (ej. placas con el título)
    show_cover = p.get("image") and p.get("cover", "").lower() not in ("no", "false")
    cover = (f'<figure class="b-cover"><img src="{esc(p["image"])}" alt="" /></figure>'
             if show_cover else "")
    more = ""
    if others:
        more = ('<section class="b-wrap b-related"><h2>Más notas</h2><div class="b-grid">'
                + "\n".join(card(o) for o in others[:3]) + "</div></section>")
    draft_banner = '<div class="b-draft">BORRADOR — esta nota no se publica</div>' if p["draft"] else ""
    return (head(f"{p['title']} — Blog BP4", p["description"], url, image, "article", extra)
            + header() + f"""<main>
{draft_banner}
<article class="b-article">
  <div class="b-article-head">
    <a class="b-back" href="/blog/">← Blog</a>
    <div class="b-meta"><span class="b-tag">{esc(p['category'])}</span><time datetime="{p['date'].isoformat()}">{fecha_es(p['date'])}</time><span>· {p['minutes']} min de lectura</span></div>
    <h1>{esc(p['title'])}</h1>
    <p class="b-lead">{esc(p['description'])}</p>
    <div class="b-byline">Por {esc(p['author'])}</div>
  </div>
  {cover}
  <div class="b-prose">
{p['html']}
  </div>
  <div class="b-share">
    <span>Compartir:</span>
    <a href="https://www.linkedin.com/sharing/share-offsite/?url={esc(url)}" target="_blank" rel="noopener">LinkedIn</a>
    <a href="https://wa.me/?text={esc(p['title'])}%20{esc(url)}" target="_blank" rel="noopener">WhatsApp</a>
  </div>
</article>
{more}
</main>
""" + footer())


def feed(posts):
    items = "".join(f"""
  <item>
    <title>{esc(p['title'])}</title>
    <link>{SITE}/blog/{p['slug']}/</link>
    <guid>{SITE}/blog/{p['slug']}/</guid>
    <pubDate>{datetime.combine(p['date'], datetime.min.time()).strftime('%a, %d %b %Y 12:00:00 -0300')}</pubDate>
    <description>{esc(p['description'])}</description>
  </item>""" for p in posts)
    return f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>Blog BP4</title>
  <link>{SITE}/blog/</link>
  <description>Notas y novedades de BP4</description>
  <language>es-419</language>{items}
</channel>
</rss>
"""


def sitemap(posts):
    urls = [(f"{SITE}/", None, "1.0"), (f"{SITE}/blog/", posts[0]["date"] if posts else None, "0.8")]
    urls += [(f"{SITE}/blog/{p['slug']}/", p["date"], "0.6") for p in posts]
    body = "".join(
        f"\n  <url>\n    <loc>{u}</loc>" + (f"\n    <lastmod>{d.isoformat()}</lastmod>" if d else "")
        + f"\n    <priority>{pr}</priority>\n  </url>" for u, d, pr in urls)
    return ('<?xml version="1.0" encoding="UTF-8"?>\n'
            f'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{body}\n</urlset>\n')


def main():
    include_drafts = "--drafts" in sys.argv
    posts = [parse(f) for f in sorted(SRC.glob("*.md"))]
    slugs = [p["slug"] for p in posts]
    dup = {s for s in slugs if slugs.count(s) > 1}
    if dup:
        sys.exit(f"[error] slugs repetidos: {', '.join(dup)}")
    visible = [p for p in posts if include_drafts or not p["draft"]]
    visible.sort(key=lambda p: p["date"], reverse=True)
    published = [p for p in visible if not p["draft"]]

    # Avisar si quedaron carpetas de notas que ya no existen (no se borran solas)
    current = {p["slug"] for p in visible}
    stale = [d.name for d in OUT.iterdir() if OUT.exists() and d.is_dir()
             and (d / "index.html").exists() and d.name not in current] if OUT.exists() else []
    OUT.mkdir(exist_ok=True)

    (OUT / "index.html").write_text(page_index(visible), encoding="utf-8")
    for p in visible:
        d = OUT / p["slug"]
        d.mkdir(exist_ok=True)
        others = [o for o in visible if o is not p]
        (d / "index.html").write_text(page_post(p, others), encoding="utf-8")
    (OUT / "feed.xml").write_text(feed(published), encoding="utf-8")
    (ROOT / "sitemap.xml").write_text(sitemap(published), encoding="utf-8")

    print(f"OK — {len(published)} publicadas, {len(visible) - len(published)} borradores incluidos")
    for p in visible:
        print(f"  {'[BORRADOR] ' if p['draft'] else ''}/blog/{p['slug']}/")
    for name in stale:
        print(f"AVISO: blog/{name}/ ya no corresponde a ninguna nota publicada; borrala a mano.")
    if include_drafts:
        print("ATENCIÓN: generado con --drafts. Volvé a correr sin --drafts antes de subir.")


if __name__ == "__main__":
    main()
