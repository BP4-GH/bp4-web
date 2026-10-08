# BP4 Design System

Branded interface foundations, components and UI kits for **BP4** — IT staffing and team-acceleration.

> BP4 acelera la expansión de equipos de software con más de 13 años de experiencia: staffing especializado en IT, selección ágil y acompañamiento cultural para garantizar rendimiento y retención. El equipo, con origen en desarrollo, evalúa perfiles en profundidad, implementa planes de desarrollo y entrega reportes claros para que los clientes sepan exactamente dónde está la inversión y cómo optimizarla.

BP4 is an Argentine/LatAm B2B IT talent partner. Audience: tech leaders, CTOs, founders and HR teams looking to scale software squads. The brand voice is **warm, upbeat and personal** ("buena onda") — closer to a trusted teammate than a vendor.

## Sources

This system was authored from brand assets supplied directly (no codebase or Figma):
- `BP4_logo_negro.png`, `BP4_logo_blanco.png`, `BP4_logo_naranja.png` — the bp4 "pebble" wordmark in ink, reversed and orange.
- Montserrat + Inter font families (full weight range, variable fonts).
- Brand notes: primary type Montserrat (titles/highlights), secondary Inter (body); prefer direct hex (e.g. `#FF8E09`); tone of *alegría y buena onda*.

No live product UI was provided, so the UI kit (`ui_kits/website/`) is an **original, on-brand recreation** of a plausible BP4 marketing site — not a copy of an existing screen. Treat it as a reference composition, not a pixel match.

---

## CONTENT FUNDAMENTALS

How BP4 writes.

- **Language:** Rioplatense / Latin-American Spanish (es-419). Voseo — "contanos", "armá", "sabés", "querés". The system also ships an **English (en)** voice for international audiences.
- **Bilingual (ES / EN):** The brand supports two languages — **Español (Latinoamérica, es-419)** and **English (en)**. Keep copy in a centralized strings layer per surface (see `ui_kits/website/strings.js` for the pattern: one dictionary per language, identical key shape) and drive the whole surface from a single language toggle that persists the choice. Translate *meaning and warmth*, not word-for-word: "buena onda" → "good vibes", "Armemos tu equipo" → "Let's build your team". `<html lang>` should be `es-419` or `en` accordingly.
- **Person:** Second person, direct. Speak to *vos* (the reader) and as *nosotros* (BP4). "Contanos qué equipo querés armar y nosotros nos encargamos."
- **Tone:** Alegría y buena onda. Upbeat, warm, human, optimistic. We want the reader to *feel good*. Empathetic — we put ourselves in the reader's shoes and personalize the message because we know who we're talking to.
- **Register:** Natural and conversational, never corporate or stiff. Avoid passive voice ("se entregan reportes") in favor of active, personal phrasing ("te entregamos reportes claros").
- **Casing:** Sentence case for almost everything (headings, buttons, labels). Reserve ALL-CAPS for small eyebrows/overlines only, with wide letter-spacing.
- **Punctuation:** Light, friendly use of exclamation ("¡Vamos juntos!") — sparingly, to land warmth, not to shout. Em-dashes and short sentences for rhythm.
- **Emoji:** Not part of the core brand expression — avoid in product UI and formal copy. Warmth comes from words and color, not emoji.
- **Numbers & proof:** Concrete and honest ("+13 años", "reportes claros"). No invented stats or data slop.

**Examples**
- ✅ "Armemos tu equipo de software, juntos." ❌ "Soluciones de dotación de personal."
- ✅ "Sabés exactamente dónde está tu inversión." ❌ "El cliente recibe visibilidad de la inversión."
- ✅ "Te respondemos en 24hs." ❌ "Tiempo de respuesta estimado: 24 horas."

---

## VISUAL FOUNDATIONS

- **Color:** The official *Paleta Cromática* has three roles. **Primarios** — Naranja `#FF8E09` (Pantone 151 C) and Mandarina `#FF6000` (Bright Orange C); orange is the brand's energy, carrying CTAs and highlights. **Secundarios** — Verde agua `#00A6A6` (320 C) and Celeste `#9BC0D3` (644 C); cool teals that balance the warm orange. **Resalte** (accent/dark) — Rojo `#F54748` (Warm Red C) for alerts/emphasis and Musgo `#0E3541` (547 C), the brand's dark slate used for inverse surfaces (footer, dark sections) and ink. Always prefer the direct hex; note the PDF caveat that print export may shift color, so proof before printing. Surfaces stay clean: white and a cool off-white (`#F8FAFA`). Orange is a spotlight, not a wash — use accents on key actions and small fills, not large flat backgrounds (except deliberate brand moments). Soft tints back focus rings and highlights.
- **Type:** Montserrat (ExtraBold/Bold) for display & headings — geometric, rounded, confident. Inter (Regular/Medium) for body & UI — quiet and legible. Headings run tight (`-0.015em`); eyebrows are uppercase with wide `0.12em` tracking. Italic Montserrat in orange is a nice highlight device.
- **Shape & radius:** Generous, rounded, friendly — echoing the pebble logo. Buttons `--radius-lg` (18px), cards `--radius-xl` (24px), pills fully round. A `--radius-blob` organic shape is available for brand flourishes.
- **Backgrounds:** Predominantly clean — white and warm off-white. No heavy gradients, no purple. Brand moments may use a solid orange block or the ink-dark section. The pebble/blob silhouette is the signature graphic motif (use the logo shape, not invented illustration).
- **Shadows:** Soft, warm-tinted, diffuse (`rgba(20,20,20,0.06–0.16)`) — never harsh black. Orange CTAs get a subtle orange glow (`--shadow-brand`).
- **Cards:** White surface, 1px subtle warm border, soft `--shadow-sm`, large radius. On hover they lift ~3px and deepen to `--shadow-lg`. An `accent` variant swaps the border for orange.
- **Borders:** 1–2px, warm neutrals. Inputs use a 2px border that turns orange on focus with a soft orange ring.
- **Motion:** Quick and lively with a little bounce. `--ease-bounce` for press/toggle, `--ease-out` for entrances. Durations 120–360ms. Buttons scale to 0.96 on press and brighten slightly on hover. Nothing slow or floaty; respect `prefers-reduced-motion`.
- **Hover / press:** Hover = slight brightness drop (filled) or color shift (text). Press = scale-down (0.96) with bounce. Toggles slide with bounce.
- **Transparency / blur:** Used sparingly — soft focus rings and the orange glow. No heavy glassmorphism.
- **Imagery vibe:** When photography is used, prefer warm, bright, human, candid team shots — optimistic and real, never cold corporate stock. (No imagery shipped here; use placeholders.)

---

## ICONOGRAPHY

No proprietary icon set was supplied with the brand assets. BP4's mark itself is the only bespoke glyph (the rounded "bp4" pebble).

- **Recommendation / substitution:** Use **[Lucide](https://lucide.dev)** (CDN) as the icon system — its rounded line caps and even ~2px stroke match BP4's soft, friendly geometry. **This is a substitution; flag to the client and swap if BP4 has an official set.**
- **Style:** Line icons, ~1.75–2px stroke, rounded caps/joins, 24px grid. Stroke inherits text color; use brand orange only for emphasis.
- **No emoji** as iconography in product UI. Avoid unicode-glyph icons. Prefer real SVG (Lucide) over PNG.
- **Logo usage:** Orange mark on light, ink mark on light/paper, white mark on dark. Keep clear space ≈ the height of the "b"; never recolor outside the three official variants.

---

## INDEX

Root manifest of this design system.

- **`styles.css`** — global entry point (import this one file). `@import`s all tokens + fonts.
- **`tokens/`** — `colors.css`, `typography.css`, `spacing.css` (radii/shadows/motion/layout), `fonts.css` (@font-face).
- **`guidelines/`** — foundation specimen cards (Colors, Type, Spacing, Brand) shown in the Design System tab.
- **`components/`** — reusable React primitives:
  - `core/` — **Button**, **Badge**, **Card**
  - `forms/` — **Input**, **Switch**
  - `data/` — **Avatar**
  - `navigation/` — **Tabs**
- **`ui_kits/website/`** — interactive BP4 marketing-site recreation (hero, services, CTA) composing the primitives.
- **`assets/`** — `logos/` (orange / black / white pebble marks), `fonts/` (Montserrat + Inter variable).
- **`SKILL.md`** — Agent-Skill manifest for use in Claude Code.

### Usage

```html
<link rel="stylesheet" href="styles.css" />
```
```jsx
const { Button, Card, Badge } = window.BP4DesignSystem_74aeaf;
```
Reference colors/spacing/type via the CSS custom properties (`var(--color-brand)`, `var(--font-display)`, `var(--radius-xl)`, …). Prefer semantic aliases (`--text-strong`, `--surface-card`) over raw scale values.
