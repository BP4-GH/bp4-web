/* BP4 redesign — shared UI primitives. Exposed on window.BPUI.
   Composes the design-system tokens (var(--*)) and the bundle components. */

const Icon = ({ name, size = 24, color, style = {}, strokeWidth = 1.9 }) => (
  React.createElement("i", {
    "data-lucide": name,
    style: { width: size, height: size, color: color || "currentColor", strokeWidth, display: "inline-flex", ...style },
  })
);

function Container({ children, size = 1200, style = {} }) {
  return (
    <div className="bp-container" style={{ maxWidth: size, margin: "0 auto", padding: "0 32px", width: "100%", ...style }}>
      {children}
    </div>
  );
}

function Eyebrow({ children, light = false, center = false }) {
  return (
    <span style={{
      fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13,
      letterSpacing: "0.14em", textTransform: "uppercase",
      color: light ? "rgba(255,255,255,0.78)" : "var(--text-brand)",
      display: "inline-flex", alignItems: "center", gap: 9,
      justifyContent: center ? "center" : "flex-start",
    }}>
      <span style={{ width: 26, height: 3, background: light ? "rgba(255,255,255,0.55)" : "var(--color-brand)", borderRadius: 3 }} />
      {children}
    </span>
  );
}

/* Big section heading: eyebrow + title (optional <em> highlight) + body */
function SectionHeading({ eyebrow, title, em, body, light = false, center = false, maxBody = 620 }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", maxWidth: center ? 760 : 720, margin: center ? "0 auto" : 0 }}>
      {eyebrow && <Eyebrow light={light} center={center}>{eyebrow}</Eyebrow>}
      <h2 className="bp-h2" style={{
        fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.025em",
        color: light ? "#fff" : "var(--text-strong)", margin: "18px 0 0", lineHeight: 1.04,
      }}>
        {title}{em && <> <em style={{ fontStyle: "italic", color: "var(--color-brand)" }}>{em}</em></>}
      </h2>
      {body && (
        <p style={{
          fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.62,
          color: light ? "rgba(255,255,255,0.82)" : "var(--text-body)",
          maxWidth: maxBody, margin: center ? "18px auto 0" : "18px 0 0",
        }}>{body}</p>
      )}
    </div>
  );
}

/* Organic pebble/blob — the signature BP4 motif. Decorative. */
function Pebble({ size = 360, color = "var(--bp-orange-50)", style = {}, variant = 0 }) {
  const shapes = [
    "42% 58% 56% 44% / 48% 44% 56% 52%",
    "58% 42% 38% 62% / 54% 60% 40% 46%",
    "63% 37% 54% 46% / 42% 56% 44% 58%",
  ];
  return (
    <div aria-hidden="true" style={{
      position: "absolute", width: size, height: size, background: color,
      borderRadius: shapes[variant % shapes.length], ...style,
    }} />
  );
}

/* The bp4 pebble logo mark — always an inlined data URI (window.BP_LOGOS),
   so we never request a file path (avoids phantom 404s). */
function Mark({ variant = "orange", height = 38, style = {} }) {
  const src = (window.BP_LOGOS && window.BP_LOGOS[variant]) || "";
  if (!src) return <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: height * 0.7, color: "var(--color-brand)", ...style }}>bp4</span>;
  return <img src={src} alt="bp4" style={{ height, width: "auto", display: "block", ...style }} />;
}

/* Photo placeholder — elegant, on-brand, clearly marked for the client to fill. */
function PhotoSlot({ label, ratio = "4 / 3", tone = "tint", radius = "var(--radius-2xl)", icon = "image", style = {} }) {
  const tones = {
    tint: { bg: "var(--bp-orange-50)", fg: "var(--bp-orange-700)", border: "var(--bp-orange-200)" },
    teal: { bg: "var(--bp-teal-50)", fg: "var(--bp-teal-700)", border: "var(--bp-teal-100)" },
    ink: { bg: "rgba(255,255,255,0.06)", fg: "rgba(255,255,255,0.6)", border: "rgba(255,255,255,0.16)" },
    neutral: { bg: "var(--bp-neutral-100)", fg: "var(--text-muted)", border: "var(--border-subtle)" },
  };
  const c = tones[tone] || tones.tint;
  return (
    <div style={{
      aspectRatio: ratio, width: "100%", borderRadius: radius, background: c.bg,
      border: `2px dashed ${c.border}`, color: c.fg, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 10, textAlign: "center", padding: 20,
      ...style,
    }}>
      <Icon name={icon} size={30} />
      <span style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, lineHeight: 1.4, maxWidth: 200 }}>{label}</span>
    </div>
  );
}

/* Client wordmark chip — typographic placeholder standing in for a real logo. */
function ClientMark({ name, light = false }) {
  return (
    <span className="bp-client-mark" style={{
      fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em",
      color: light ? "rgba(255,255,255,0.92)" : "var(--bp-neutral-700)", whiteSpace: "nowrap",
      lineHeight: 1, display: "inline-flex", alignItems: "center",
    }}>{name}</span>
  );
}

/* Real client logo — inline monochrome SVG, tinted via currentColor.
   The source SVGs carry generous empty margins in their viewBox, so we
   trim the viewBox to the real art bounds on mount, then let it scale to
   fill the cell. `cap` = max height in px the trimmed art may reach. */
function ClientLogo({ logo, light = false, cap = 46 }) {
  const ref = React.useRef(null);
  React.useLayoutEffect(() => {
    const host = ref.current;
    if (!host) return;
    const svg = host.querySelector("svg");
    if (!svg) return;
    try {
      const bb = svg.getBBox();
      if (bb.width && bb.height) {
        const padX = bb.width * 0.04, padY = bb.height * 0.04;
        svg.setAttribute("viewBox", `${bb.x - padX} ${bb.y - padY} ${bb.width + padX * 2} ${bb.height + padY * 2}`);
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
      }
    } catch (e) { /* getBBox can throw if not yet laid out */ }
  }, [logo && logo.name]);
  if (!logo || !logo.svg) return <ClientMark name={logo && logo.name} light={light} />;
  return (
    <span
      ref={ref}
      className="bp-logo-svg"
      role="img"
      aria-label={logo.name}
      title={logo.name}
      style={{ "--logo-cap": cap + "px", color: "currentColor" }}
      dangerouslySetInnerHTML={{ __html: logo.svg }}
    />
  );
}

/* Infinite marquee row of children */
function Marquee({ items, light = false, speed = 38 }) {
  const row = [...items, ...items];
  return (
    <div className="bp-marquee" style={{ overflow: "hidden", maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }}>
      <div className="bp-marquee-track" style={{ display: "inline-flex", gap: 64, alignItems: "center", animation: `bpMarquee ${speed}s linear infinite`, paddingRight: 64 }}>
        {row.map((it, i) => <ClientLogo key={i} logo={it} light={light} cap={30} />)}
      </div>
    </div>
  );
}

window.BPUI = { Icon, Container, Eyebrow, SectionHeading, Pebble, Mark, PhotoSlot, ClientMark, ClientLogo, Marquee };
