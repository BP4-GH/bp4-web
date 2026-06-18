/* BP4 — hero. Reposicionado: "más que staff augmentation".
   Dos variantes (Split claro · Oscuro), con un panel de "salud de la operación"
   que comunica el modelo integral (People Care + Reporting) de un vistazo.
   Exposed on window.BPHero. */

const { Icon: HrIcon, Container: HrContainer, Eyebrow: HrEyebrow, Pebble: HrPebble, Mark: HrMark, PhotoSlot: HrPhoto, ClientLogo: HrClient } = window.BPUI;

/* Foto hexagonal del equipo (PNG con transparencia) — motivo geométrico de marca. */
const HERO_PHOTO = "assets/photos/hero-team.png";
const HERO_PHOTO_WEBP = "assets/photos/hero-team.webp";
function HeroHexPhoto({ style = {} }) {
  return (
    <picture>
      <source srcSet={HERO_PHOTO_WEBP} type="image/webp" />
      <img src={HERO_PHOTO} alt="Equipo BP4" style={{ display: "block", width: "100%", height: "auto", ...style }} />
    </picture>
  );
}

/* Account-health snapshot — the new hero visual. Speaks "gestión integral + datos". */
function SnapshotCard({ s, dark = false }) {
  const toneColor = { ink: dark ? "#fff" : "var(--text-strong)", teal: "var(--bp-teal-500)", orange: "var(--color-brand)" };
  return (
    <div style={{
      width: 320, background: dark ? "rgba(255,255,255,0.07)" : "var(--surface-card)",
      border: dark ? "1px solid rgba(255,255,255,0.14)" : "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-xl)", boxShadow: dark ? "0 24px 60px rgba(0,0,0,0.35)" : "var(--shadow-lg)",
      padding: 22, display: "flex", flexDirection: "column", gap: 16,
      backdropFilter: dark ? "blur(8px)" : "none",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ width: 44, height: 44, borderRadius: "var(--radius-md)", background: dark ? "rgba(255,142,9,0.18)" : "var(--bp-orange-50)", color: "var(--color-brand)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
          <HrIcon name="activity" size={22} />
        </span>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15.5, color: dark ? "#fff" : "var(--text-strong)", lineHeight: 1.1 }}>{s.title}</div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: dark ? "rgba(255,255,255,0.6)" : "var(--text-muted)", marginTop: 2 }}>{s.account}</div>
        </div>
        <span style={{ fontFamily: "var(--font-body)", fontSize: 11.5, fontWeight: 600, padding: "5px 11px", borderRadius: "var(--radius-pill)", background: "var(--bp-teal-50)", color: "var(--bp-teal-700)", display: "inline-flex", alignItems: "center", gap: 6, flex: "none" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--bp-success)" }} /> {s.statusLabel}
        </span>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        {s.metrics.map((m) => (
          <div key={m.label} style={{ flex: 1, padding: "13px 12px", borderRadius: "var(--radius-md)", background: dark ? "rgba(255,255,255,0.05)" : "var(--surface-page)", border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid var(--border-subtle)" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, letterSpacing: "-0.03em", lineHeight: 1, color: toneColor[m.tone] }}>{m.value}</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: dark ? "rgba(255,255,255,0.6)" : "var(--text-muted)", marginTop: 6, lineHeight: 1.3 }}>{m.label}</div>
          </div>
        ))}
      </div>

      <div style={{ height: 1, background: dark ? "rgba(255,255,255,0.12)" : "var(--border-subtle)" }} />

      <div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: dark ? "rgba(255,255,255,0.5)" : "var(--text-muted)", marginBottom: 10 }}>{s.pillarsLabel}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {s.pillars.map((p) => (
            <span key={p} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, padding: "5px 11px", borderRadius: "var(--radius-pill)", background: dark ? "rgba(255,255,255,0.1)" : "var(--bp-neutral-100)", color: dark ? "rgba(255,255,255,0.88)" : "var(--text-body)" }}>
              <HrIcon name="check" size={13} color="var(--bp-teal-500)" strokeWidth={2.6} /> {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatStrip({ stats, dark = false }) {
  return (
    <div className="bp-hero-stats" style={{ display: "flex", gap: 36, marginTop: 30, flexWrap: "wrap" }}>
      {stats.slice(0, 3).map(([v, l], i) => (
        <div key={i}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 32, letterSpacing: "-0.03em", lineHeight: 1, color: dark ? "#fff" : "var(--text-strong)" }}>{v}</div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: dark ? "rgba(255,255,255,0.62)" : "var(--text-muted)", marginTop: 6, maxWidth: 150, lineHeight: 1.3 }}>{l}</div>
        </div>
      ))}
    </div>
  );
}

function HeroButtons({ t, onStart, goTo, dark = false }) {
  return (
    <div style={{ display: "flex", gap: 13, marginTop: 28, flexWrap: "wrap" }}>
      <button onClick={onStart} className="bp-press" style={{
        padding: "16px 30px", border: "none", borderRadius: "var(--radius-lg)", background: "var(--color-brand)",
        color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16.5, cursor: "pointer", boxShadow: "var(--shadow-brand)",
        display: "inline-flex", alignItems: "center", gap: 9,
      }}>{t.hero.primary} <HrIcon name="arrow-right" size={18} /></button>
      <button onClick={() => goTo("modelo")} className="bp-press" style={{
        padding: "16px 28px", borderRadius: "var(--radius-lg)", background: dark ? "rgba(255,255,255,0.08)" : "transparent",
        border: dark ? "2px solid rgba(255,255,255,0.28)" : "2px solid var(--border-default)",
        color: dark ? "#fff" : "var(--text-strong)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16.5, cursor: "pointer",
      }}>{t.hero.secondary}</button>
    </div>
  );
}

/* ---------- V1 — Split claro + snapshot ---------- */
function HeroV1({ t, onStart, goTo }) {
  const h = t.hero.v1;
  return (
    <section className="bp-hero" style={{ position: "relative", overflow: "hidden", padding: "56px 0 64px" }}>
      <HrPebble size={520} color="var(--bp-orange-50)" variant={0} style={{ right: "-12%", top: "-14%", opacity: 0.8 }} />
      <HrPebble size={300} color="var(--bp-teal-50)" variant={2} style={{ left: "-8%", bottom: "-16%", opacity: 0.7 }} />
      <HrContainer style={{ position: "relative" }}>
        <div className="bp-hero-grid">
          <div className="bp-hero-copy">
            <HrEyebrow>{t.hero.eyebrow}</HrEyebrow>
            <div style={{ marginTop: 18 }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 17, fontWeight: 600, color: "var(--text-brand)" }}>{h.kicker}</span>
            </div>
            <h1 className="bp-hero-title" style={{ fontFamily: "var(--font-display)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.035em", color: "var(--text-strong)", margin: "10px 0 0" }}>
              {h.title1} <em style={{ fontStyle: "italic", color: "var(--color-brand)" }}>{h.titleEm}</em>
            </h1>
            <p className="bp-hero-body" style={{ fontFamily: "var(--font-body)", fontSize: 17.5, color: "var(--text-body)", marginTop: 18, maxWidth: 520, lineHeight: 1.58 }}>{h.body}</p>
            <HeroButtons t={t} onStart={onStart} goTo={goTo} />
            <StatStrip stats={t.stats} />
          </div>
          <div className="bp-hero-visual" style={{ position: "relative", minHeight: 420, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <HrPebble size={400} color="var(--bp-orange-100)" variant={1} style={{ inset: "auto", opacity: 0.55 }} />
            <HeroHexPhoto style={{ position: "absolute", left: -8, top: 8, width: 348, filter: "drop-shadow(0 22px 44px rgba(20,20,20,0.18))" }} />
            <div style={{ position: "absolute", right: -16, bottom: 4, transform: "rotate(2deg)" }}>
              <SnapshotCard s={t.hero.snapshot} />
            </div>
          </div>
        </div>
      </HrContainer>
    </section>
  );
}

/* ---------- V3 — Momento de marca oscuro ---------- */
function HeroV3({ t, onStart, goTo }) {
  const h = t.hero.v3;
  return (
    <section className="bp-hero" style={{ position: "relative", overflow: "hidden", padding: "44px 0 56px", background: "var(--surface-inverse)" }}>
      <HrPebble size={560} color="rgba(255,142,9,0.16)" variant={0} style={{ right: "-14%", top: "-18%" }} />
      <HrPebble size={320} color="rgba(0,166,166,0.14)" variant={2} style={{ left: "-9%", bottom: "-14%" }} />
      <HrContainer style={{ position: "relative" }}>
        <div className="bp-hero-grid">
          <div className="bp-hero-copy">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--bp-orange-400)" }}>
              <HrIcon name="sparkles" size={16} /> {h.kicker}
            </span>
            <h1 className="bp-hero-title" style={{ fontFamily: "var(--font-display)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.035em", color: "#fff", margin: "16px 0 0" }}>
              {h.title1} <em style={{ fontStyle: "italic", color: "var(--bp-orange-400)" }}>{h.titleEm}</em>
            </h1>
            <p className="bp-hero-body" style={{ fontFamily: "var(--font-body)", fontSize: 17.5, color: "rgba(255,255,255,0.8)", marginTop: 18, maxWidth: 520, lineHeight: 1.6 }}>{h.body}</p>
            <HeroButtons t={t} onStart={onStart} goTo={goTo} dark />
            <StatStrip stats={t.stats} dark />
          </div>
          <div className="bp-hero-visual" style={{ position: "relative", minHeight: 420, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <HeroHexPhoto style={{ position: "absolute", left: -10, top: 0, width: 360, filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.4))" }} />
            <div style={{ position: "absolute", right: -16, bottom: 0, transform: "rotate(2deg)" }}>
              <SnapshotCard s={t.hero.snapshot} dark />
            </div>
          </div>
        </div>
      </HrContainer>
    </section>
  );
}

function Hero({ t, variant, onStart, goTo }) {
  const props = { t, onStart, goTo };
  if (variant === 3) return <HeroV3 {...props} />;
  return <HeroV1 {...props} />;
}

window.BPHero = { Hero, SnapshotCard };
