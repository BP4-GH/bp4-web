/* BP4 — Mobile app layout (native React). Renders on phones (≤900px).
   Reads window.BP4M_DATA (bp4-data.js) + window.BP_CLIENT_LOGOS + window.BP_LOGOS.
   Exposed on window.BPMobile. Icons via window.BPUI.Icon (lucide). */

const { Icon: MIcon } = window.BPUI;
const { useState, useEffect } = React;

/* Trim the generous viewBox margins on the inline client SVGs so the marquee
   logos sit tight (same technique as BPUI.ClientLogo). */
function bp4mTrimLogos(attempt) {
  attempt = attempt || 0;
  const pending = document.querySelectorAll(".bp4m-logo:not([data-trimmed]) svg");
  if (!pending.length) return;
  pending.forEach((svg) => {
    try {
      const bb = svg.getBBox();
      if (bb.width && bb.height) {
        const px = bb.width * 0.04, py = bb.height * 0.04;
        svg.setAttribute("viewBox", (bb.x - px) + " " + (bb.y - py) + " " + (bb.width + px * 2) + " " + (bb.height + py * 2));
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        svg.parentNode.setAttribute("data-trimmed", "1");
      }
    } catch (e) {}
  });
  // getBBox can return 0×0 before first layout — retry a few frames until done.
  if (attempt < 10 && document.querySelectorAll(".bp4m-logo:not([data-trimmed]) svg").length) {
    requestAnimationFrame(() => bp4mTrimLogos(attempt + 1));
  }
}

/* Section eyebrow: bar + uppercase label */
function MEyebrow({ children, dark }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: dark ? "rgba(255,255,255,0.78)" : "var(--text-brand)" }}>
      <span style={{ width: 22, height: 3, background: dark ? "rgba(255,255,255,0.55)" : "var(--color-brand)", borderRadius: 3 }} /> {children}
    </span>
  );
}

function MobileApp({ lang, setLang }) {
  const D = window.BP4M_DATA || {};
  const t = D[lang] || D.es || {};
  const C = D.contact || {};
  const isEn = lang === "en";

  const [open, setOpen] = useState({});
  const [showProfiles, setShowProfiles] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [vals, setVals] = useState({});

  useEffect(() => { if (window.lucide) window.lucide.createIcons(); bp4mTrimLogos(); });

  const toggle = (id) => setOpen((o) => ({ ...o, [id]: !o[id] }));
  const changeLang = (l) => { setLang(l); setMenuOpen(false); };
  const scrollTo = (id) => {
    setMenuOpen(false);
    requestAnimationFrame(() => {
      const el = document.getElementById("s-" + id);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 78, behavior: "smooth" });
    });
  };
  const goContact = () => scrollTo("contacto");
  const goModel = () => scrollTo("modelo");

  const hero = t.hero || {};
  const heroStats = (t.stats || []).map((s) => ({ v: s[0], l: s[1] }));
  const nav = t.nav || [];

  const allProfiles = (t.recruiting || {}).profiles || [];
  const profilesShown = showProfiles ? allProfiles : allProfiles.slice(0, 6);
  const moreCount = Math.max(0, allProfiles.length - 6);
  const ui = t.ui || {};

  const challengeCloseRest = ((t.challenge || {}).close || "").replace(/^BP4\s*/, "");
  const pcParts = ((t.peopleCare || {}).title || "").split("BP4");
  const pcDims = ((t.peopleCare || {}).dims || []);

  const contactFields = ((t.contact || {}).fields || []);
  const setVal = (k, v) => setVals((s) => ({ ...s, [k]: v }));
  const submit = () => {
    const v = vals;
    const subject = encodeURIComponent("Consulta desde la web BP4");
    const body = encodeURIComponent("Nombre: " + (v.name || "") + "\nEmail: " + (v.email || "") + "\nNecesito: " + (v.need || ""));
    window.location.href = "mailto:" + (C.email || "hello@bp-4.com") + "?subject=" + subject + "&body=" + body;
    setSent(true);
  };

  const logos = window.BP_CLIENT_LOGOS || [];
  const logoSpan = (l, k) => (
    <span key={k} className="bp4m-logo" data-bp-logo="" title={l.name} aria-label={l.name}
      style={{ flex: "none", display: "inline-flex", alignItems: "center", color: "var(--bp-neutral-400)" }}
      dangerouslySetInnerHTML={{ __html: l.svg }} />
  );
  const logoGroup = (gk, hidden) => (
    <div key={gk} aria-hidden={hidden ? "true" : undefined} style={{ display: "flex", gap: 42, paddingRight: 42, alignItems: "center" }}>
      {logos.map((l, i) => logoSpan(l, gk + "-" + i))}
    </div>
  );

  const press = "bp-press";
  const whiteLogo = (window.BP_LOGOS && window.BP_LOGOS.white) || "assets/logos/bp4-logo-white.png";

  const langBtn = (active) => ({ border: "none", cursor: "pointer", padding: "6px 12px", borderRadius: "var(--radius-pill)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, background: active ? "#fff" : "transparent", color: active ? "var(--bp-musgo)" : "rgba(255,255,255,0.7)" });
  const chevron = (isOpen) => ({ width: 20, height: 20, color: "var(--text-muted)", transition: "transform 200ms ease", transform: isOpen ? "rotate(180deg)" : "none" });

  return (
    <div style={{ background: "var(--surface-page)", position: "relative", minHeight: "100vh", fontFamily: "var(--font-body)", overflowX: "hidden" }}>

      {/* ===== STICKY HEADER ===== */}
      <header style={{ position: "sticky", top: 0, zIndex: 30, background: "rgba(14,53,65,0.92)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingTop: "max(10px, env(safe-area-inset-top))" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 18px" }}>
          <img src={whiteLogo} alt="bp4" style={{ height: 28, width: "auto", display: "block" }} />
          <div style={{ marginLeft: "auto", display: "inline-flex", background: "rgba(255,255,255,0.12)", borderRadius: "var(--radius-pill)", padding: 3 }}>
            <button onClick={() => changeLang("es")} className={press} style={langBtn(lang === "es")}>ES</button>
            <button onClick={() => changeLang("en")} className={press} style={langBtn(lang === "en")}>EN</button>
          </div>
          <button onClick={() => setMenuOpen(true)} aria-label="Menu" className={press} style={{ flex: "none", width: 40, height: 40, borderRadius: "var(--radius-md)", border: "1px solid rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.08)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <MIcon name="menu" size={20} />
          </button>
        </div>
        <div className="bp4m-scroll-x" style={{ display: "flex", gap: 8, overflowX: "auto", padding: "2px 18px 12px" }}>
          {nav.map((n) => (
            <button key={n.id} onClick={() => scrollTo(n.id)} className={press} style={{ flex: "none", border: "1px solid rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.88)", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 13, padding: "7px 14px", borderRadius: "var(--radius-pill)", cursor: "pointer", whiteSpace: "nowrap" }}>{n.label}</button>
          ))}
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section style={{ position: "relative", overflow: "hidden", background: "var(--surface-inverse)", padding: "30px 20px 36px" }}>
        <div aria-hidden="true" style={{ position: "absolute", width: 360, height: 360, background: "rgba(255,142,9,0.16)", borderRadius: "42% 58% 56% 44% / 48% 44% 56% 52%", right: "-34%", top: "-16%" }} />
        <div aria-hidden="true" style={{ position: "absolute", width: 220, height: 220, background: "rgba(0,166,166,0.13)", borderRadius: "63% 37% 54% 46% / 42% 56% 44% 58%", left: "-28%", bottom: "-10%" }} />
        <div style={{ position: "relative" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--bp-orange-400)" }}>
            <MIcon name="sparkles" size={15} /> {hero.kicker}
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 34, lineHeight: 1.04, letterSpacing: "-0.035em", color: "#fff", margin: "14px 0 0" }}>{hero.title1} <em style={{ fontStyle: "italic", color: "var(--bp-orange-400)" }}>{hero.titleEm}</em></h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.58, color: "rgba(255,255,255,0.8)", margin: "16px 0 0" }}>{hero.body}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 22 }}>
            <button onClick={goContact} className={press} style={{ padding: "15px 22px", border: "none", borderRadius: "var(--radius-lg)", background: "var(--color-brand)", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, cursor: "pointer", boxShadow: "var(--shadow-brand)", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9 }}>{hero.primary} <MIcon name="arrow-right" size={18} /></button>
            <button onClick={goModel} className={press} style={{ padding: "14px 22px", borderRadius: "var(--radius-lg)", background: "rgba(255,255,255,0.08)", border: "2px solid rgba(255,255,255,0.24)", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, cursor: "pointer" }}>{hero.secondary}</button>
          </div>
          <div style={{ display: "flex", gap: 18, marginTop: 26 }}>
            {heroStats.map((s, i) => (
              <div key={i} style={{ flex: 1 }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, letterSpacing: "-0.03em", lineHeight: 1, color: "#fff" }}>{s.v}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 11.5, color: "rgba(255,255,255,0.6)", marginTop: 6, lineHeight: 1.3 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CLIENTES ===== */}
      <section id="s-clientes" data-screen-label="Clientes" style={{ padding: "46px 20px", background: "var(--surface-card)" }}>
        <MEyebrow>{(t.clients || {}).eyebrow}</MEyebrow>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 25, lineHeight: 1.1, letterSpacing: "-0.025em", color: "var(--text-strong)", margin: "14px 0 0" }}>{(t.clients || {}).title}</h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.6, color: "var(--text-body)", margin: "12px 0 0" }}>{(t.clients || {}).body}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "22px 0 0", padding: 18, background: "var(--bp-orange-50)", borderRadius: "var(--radius-xl)" }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 52, letterSpacing: "-0.04em", lineHeight: 0.9, color: "var(--color-brand)", flex: "none" }}>+100</div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "var(--text-body)", margin: 0, lineHeight: 1.5 }}>{(t.clients || {}).stat}</p>
        </div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", margin: "26px 0 14px" }}>{isEn ? "Companies that trust us" : "Empresas que confían en nosotros"}</div>
        <div style={{ margin: "0 -20px" }}>
          {logos.length > 0 && (
            <div style={{ overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent)", maskImage: "linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent)" }}>
              <div className="bp4m-mtrack" style={{ display: "flex", width: "max-content", animation: "bp4mMarquee 34s linear infinite" }}>
                {logoGroup("g1", false)}
                {logoGroup("g2", true)}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== EL DESAFÍO ===== */}
      <section style={{ padding: "46px 20px", background: "var(--surface-page)", position: "relative", overflow: "hidden" }}>
        <div style={{ textAlign: "center" }}>
          <MEyebrow>{(t.challenge || {}).eyebrow}</MEyebrow>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 25, lineHeight: 1.12, letterSpacing: "-0.025em", color: "var(--text-strong)", margin: "14px 0 0" }}>{(t.challenge || {}).title1} <em style={{ fontStyle: "italic", color: "var(--color-brand)" }}>{(t.challenge || {}).titleEm}</em></h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.6, color: "var(--text-body)", margin: "12px auto 0" }}>{(t.challenge || {}).body}</p>
        </div>
        <div style={{ marginTop: 24, background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
          <button onClick={() => toggle("needs")} style={{ width: "100%", display: "flex", alignItems: "center", gap: 11, padding: 18, border: "none", background: "transparent", cursor: "pointer", textAlign: "left" }}>
            <span style={{ width: 38, height: 38, borderRadius: "var(--radius-md)", background: "var(--bp-teal-50)", color: "var(--bp-teal-700)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}><MIcon name="users" size={19} /></span>
            <h3 style={{ flex: 1, fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 17, color: "var(--text-strong)", margin: 0 }}>{(t.challenge || {}).needsTitle}</h3>
            <MIcon name="chevron-down" style={chevron(!!open.needs)} />
          </button>
          {open.needs && (
            <ul style={{ listStyle: "none", margin: 0, padding: "0 18px 8px" }}>
              {((t.challenge || {}).needs || []).map((n, i) => (
                <li key={i} style={{ display: "flex", flexDirection: "column", gap: 2, padding: "12px 0", borderTop: "1px solid var(--border-subtle)" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14.5, color: "var(--text-strong)" }}>{n.who}</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-body)", lineHeight: 1.5 }}>{n.what}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div style={{ marginTop: 14, background: "var(--surface-inverse)", borderRadius: "var(--radius-xl)", padding: 22, position: "relative", overflow: "hidden" }}>
          <div aria-hidden="true" style={{ position: "absolute", width: 200, height: 200, background: "rgba(245,71,72,0.16)", borderRadius: "63% 37% 54% 46% / 42% 56% 44% 58%", right: "-30%", bottom: "-40%" }} />
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 14 }}>
              <span style={{ width: 38, height: 38, borderRadius: "var(--radius-md)", background: "rgba(245,71,72,0.18)", color: "#FF8A8A", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}><MIcon name="alert-triangle" size={19} /></span>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 17, color: "#fff", margin: 0 }}>{(t.challenge || {}).risksTitle}</h3>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "rgba(255,255,255,0.7)", margin: "0 0 14px", lineHeight: 1.5 }}>{(t.challenge || {}).risksLead}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {((t.challenge || {}).risks || []).map((r, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13.5, padding: "8px 13px", borderRadius: "var(--radius-pill)", background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.92)", border: "1px solid rgba(255,255,255,0.12)" }}><MIcon name="trending-down" size={14} color="#FF8A8A" /> {r}</span>
              ))}
            </div>
          </div>
        </div>
        <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 19, letterSpacing: "-0.02em", color: "var(--text-strong)", margin: "24px 0 0", textAlign: "center", lineHeight: 1.3 }}><span style={{ color: "var(--color-brand)" }}>BP4</span> {challengeCloseRest}</p>
      </section>

      {/* ===== EL MODELO ===== */}
      <section id="s-modelo" data-screen-label="El modelo" style={{ padding: "46px 20px", background: "var(--surface-card)" }}>
        <div style={{ textAlign: "center" }}>
          <MEyebrow>{(t.model || {}).eyebrow}</MEyebrow>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 25, lineHeight: 1.1, letterSpacing: "-0.025em", color: "var(--text-strong)", margin: "14px 0 0" }}>{(t.model || {}).title1} <em style={{ fontStyle: "italic", color: "var(--color-brand)" }}>{(t.model || {}).titleEm}</em></h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.6, color: "var(--text-body)", margin: "12px auto 0" }}>{(t.model || {}).body}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
          {((t.model || {}).pillars || []).map((p, i) => (
            <div key={i} style={{ background: "var(--surface-page)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-xl)", padding: 20, boxShadow: "var(--shadow-xs)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ width: 46, height: 46, borderRadius: "var(--radius-lg)", background: "var(--bp-orange-50)", color: "var(--color-brand)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}><MIcon name={p.icon} size={23} /></span>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28, letterSpacing: "-0.03em", color: "var(--bp-neutral-200)" }}>{p.tag}</span>
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 19, color: "var(--text-strong)", margin: "16px 0 0", lineHeight: 1.15 }}>{p.title}</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-body)", margin: "8px 0 0", lineHeight: 1.55 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== RECRUITING ===== */}
      <section id="s-recruiting" data-screen-label="Recruiting" style={{ padding: "46px 20px", background: "var(--surface-page)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", width: 240, height: 240, background: "var(--bp-teal-50)", borderRadius: "63% 37% 54% 46% / 42% 56% 44% 58%", right: "-34%", top: "4%", opacity: 0.6 }} />
        <div style={{ position: "relative" }}>
          <MEyebrow>{(t.recruiting || {}).eyebrow}</MEyebrow>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, lineHeight: 1.12, letterSpacing: "-0.025em", color: "var(--text-strong)", margin: "14px 0 0" }}>{(t.recruiting || {}).title}</h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.6, color: "var(--text-body)", margin: "12px 0 0" }}>{(t.recruiting || {}).body}</p>
          <div style={{ marginTop: 18, padding: "18px 20px", background: "var(--bp-orange-50)", borderRadius: "var(--radius-xl)", borderLeft: "4px solid var(--color-brand)" }}>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15.5, color: "var(--text-strong)", margin: 0, lineHeight: 1.42 }}>{(t.recruiting || {}).punch}</p>
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", margin: "24px 0 14px" }}>{(t.recruiting || {}).profilesTitle}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {profilesShown.map((p, i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 14, padding: "10px 15px", borderRadius: "var(--radius-pill)", background: "var(--surface-card)", color: "var(--text-strong)", border: "1px solid var(--border-default)", boxShadow: "var(--shadow-xs)" }}><MIcon name="code-2" size={14} color="var(--color-brand)" /> {p}</span>
            ))}
          </div>
          {moreCount > 0 && (
            <button onClick={() => setShowProfiles((v) => !v)} className={press} style={{ marginTop: 14, padding: "10px 18px", border: "1px dashed var(--border-default)", background: "transparent", borderRadius: "var(--radius-pill)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13.5, color: "var(--text-brand)", cursor: "pointer" }}>{showProfiles ? ui.collapse : ("+ " + moreCount + " " + (ui.expand || ""))}</button>
          )}
        </div>
      </section>

      {/* ===== PEOPLE CARE ===== */}
      <section id="s-people-care" data-screen-label="People Care" style={{ padding: "46px 20px", background: "var(--surface-card)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", width: 260, height: 260, background: "var(--bp-orange-50)", borderRadius: "42% 58% 56% 44% / 48% 44% 56% 52%", left: "-34%", bottom: "-6%", opacity: 0.6 }} />
        <div style={{ position: "relative" }}>
          <MEyebrow>{(t.peopleCare || {}).eyebrow}</MEyebrow>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 25, lineHeight: 1.1, letterSpacing: "-0.025em", color: "var(--text-strong)", margin: "14px 0 0" }}>{pcParts[0]}<em style={{ fontStyle: "italic", color: "var(--color-brand)" }}>BP4</em>{pcParts.length > 1 ? pcParts[1] : ""}</h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.6, color: "var(--text-body)", margin: "12px 0 0" }}>{(t.peopleCare || {}).body}</p>
          <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15, color: "var(--text-strong)", margin: "22px 0 14px", lineHeight: 1.5 }}>{(t.peopleCare || {}).dimsLead}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {pcDims.map((d, i) => (
              <div key={i} style={{ background: "var(--surface-page)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-xs)", overflow: "hidden" }}>
                <button onClick={() => toggle("pc" + i)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 11, padding: 18, border: "none", background: "transparent", cursor: "pointer", textAlign: "left" }}>
                  <span style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", background: "var(--bp-orange-50)", color: "var(--color-brand)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}><MIcon name={d.icon} size={20} /></span>
                  <h3 style={{ flex: 1, fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 17, color: "var(--text-strong)", margin: 0 }}>{d.tag}</h3>
                  <MIcon name="chevron-down" style={chevron(!!open["pc" + i])} />
                </button>
                {open["pc" + i] && (
                  <ul style={{ listStyle: "none", margin: 0, padding: "0 18px 10px" }}>
                    {(d.items || []).map((it, j) => (
                      <li key={j} style={{ display: "flex", gap: 10, alignItems: "center", padding: "9px 0", borderTop: "1px solid var(--border-subtle)" }}>
                        <MIcon name="check" size={15} color="var(--bp-teal-500)" style={{ flex: "none" }} />
                        <span style={{ fontFamily: "var(--font-body)", fontSize: 14.5, color: "var(--text-body)" }}>{it}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, display: "flex", gap: 16, alignItems: "flex-start", background: "var(--bp-teal-50)", borderRadius: "var(--radius-xl)", padding: 20 }}>
            <span style={{ width: 52, height: 52, borderRadius: "var(--radius-lg)", background: "#fff", color: "var(--bp-teal-700)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none", boxShadow: "var(--shadow-xs)" }}><MIcon name="git-merge" size={25} /></span>
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 17, color: "var(--text-strong)", margin: 0 }}>{(t.peopleCare || {}).focalTitle}</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-body)", margin: "7px 0 0", lineHeight: 1.55 }}>{(t.peopleCare || {}).focalBody}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== REPORTING ===== */}
      <section id="s-reporting" data-screen-label="Reporting" style={{ padding: "46px 20px", background: "var(--surface-page)", position: "relative", overflow: "hidden" }}>
        <MEyebrow>{(t.reporting || {}).eyebrow}</MEyebrow>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, lineHeight: 1.12, letterSpacing: "-0.025em", color: "var(--text-strong)", margin: "14px 0 0" }}>{(t.reporting || {}).title}</h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.6, color: "var(--text-body)", margin: "12px 0 0" }}>{(t.reporting || {}).body}</p>
        <div style={{ position: "relative", margin: "24px 0 0", paddingBottom: 30 }}>
          <figure style={{ margin: 0, borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-md)", border: "1px solid var(--border-subtle)", position: "relative" }}>
            <span style={{ position: "absolute", top: 10, left: 10, zIndex: 2, display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11, padding: "5px 11px", borderRadius: "var(--radius-pill)", background: "var(--bp-teal-500)", color: "#fff" }}><MIcon name="file-text" size={13} /> {(t.reporting || {}).reportLabel}</span>
            <img src="assets/report-real.png" alt="Reporte ejecutivo" loading="lazy" style={{ display: "block", width: "100%" }} />
          </figure>
          <figure style={{ margin: 0, position: "absolute", right: 0, bottom: 0, width: "62%", borderRadius: "var(--radius-md)", overflow: "hidden", boxShadow: "var(--shadow-lg)", border: "2px solid #fff" }}>
            <span style={{ position: "absolute", top: 8, left: 8, zIndex: 2, display: "inline-flex", alignItems: "center", gap: 5, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 10, padding: "4px 9px", borderRadius: "var(--radius-pill)", background: "var(--color-brand)", color: "#fff" }}><MIcon name="layout-dashboard" size={11} /> {(t.reporting || {}).dashLabel}</span>
            <img src="assets/dashboard-real.png" alt="Dashboard en vivo" loading="lazy" style={{ display: "block", width: "100%" }} />
          </figure>
        </div>
        <div style={{ marginTop: 14, padding: "18px 20px", background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-xl)" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16, color: "var(--text-strong)", margin: 0 }}>{(t.reporting || {}).reportTitle}</h3>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-body)", margin: "8px 0 0", lineHeight: 1.55 }}>{(t.reporting || {}).reportBody}</p>
        </div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", margin: "26px 0 12px" }}>{(t.reporting || {}).measureTitle}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {((t.reporting || {}).measures || []).map((m, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 13.5, padding: "8px 13px", borderRadius: "var(--radius-pill)", background: "var(--surface-card)", color: "var(--text-body)", border: "1px solid var(--border-subtle)" }}><MIcon name="activity" size={13} color="var(--bp-teal-500)" /> {m}</span>
          ))}
        </div>
        <div style={{ marginTop: 18, background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-xs)", overflow: "hidden" }}>
          <button onClick={() => toggle("report")} style={{ width: "100%", display: "flex", alignItems: "center", gap: 11, padding: 18, border: "none", background: "transparent", cursor: "pointer", textAlign: "left" }}>
            <span style={{ width: 38, height: 38, borderRadius: "var(--radius-md)", background: "var(--bp-orange-50)", color: "var(--color-brand)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}><MIcon name="radar" size={19} /></span>
            <h3 style={{ flex: 1, fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16, color: "var(--text-strong)", margin: 0 }}>{(t.reporting || {}).detectTitle}</h3>
            <MIcon name="chevron-down" style={chevron(!!open.report)} />
          </button>
          {open.report && (
            <ul style={{ listStyle: "none", margin: 0, padding: "0 18px 10px" }}>
              {((t.reporting || {}).detect || []).map((d, i) => (
                <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 0", borderTop: "1px solid var(--border-subtle)" }}>
                  <MIcon name="arrow-up-right" size={16} color="var(--color-brand)" style={{ flex: "none", marginTop: 1 }} />
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 14.5, color: "var(--text-body)", lineHeight: 1.45 }}>{d}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ===== IA + UTN ===== */}
      <section id="s-ia" data-screen-label="IA" style={{ padding: "46px 20px", background: "var(--surface-card)" }}>
        <MEyebrow>{(t.ai || {}).eyebrow}</MEyebrow>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, lineHeight: 1.12, letterSpacing: "-0.025em", color: "var(--text-strong)", margin: "14px 0 0" }}>{(t.ai || {}).title}</h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.6, color: "var(--text-body)", margin: "12px 0 0" }}>{(t.ai || {}).body}</p>
        <div style={{ marginTop: 20, position: "relative", overflow: "hidden", background: "var(--surface-inverse)", borderRadius: "var(--radius-2xl)", padding: 26, boxShadow: "var(--shadow-lg)" }}>
          <div aria-hidden="true" style={{ position: "absolute", width: 220, height: 220, background: "rgba(255,142,9,0.16)", borderRadius: "42% 58% 56% 44% / 48% 44% 56% 52%", right: "-32%", top: "-28%" }} />
          <div style={{ position: "relative" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--bp-orange-400)", padding: "6px 12px", borderRadius: "var(--radius-pill)", background: "rgba(255,142,9,0.14)" }}><MIcon name="sparkles" size={14} /> {(t.ai || {}).utnTag}</span>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "#fff", margin: "16px 0 0", lineHeight: 1.15 }}>{(t.ai || {}).utnTitle}</h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14.5, color: "rgba(255,255,255,0.78)", margin: "10px 0 0", lineHeight: 1.55 }}>{(t.ai || {}).utnBody}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 18 }}>
              {((t.ai || {}).items || []).map((it, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 12.5, padding: "7px 12px", borderRadius: "var(--radius-pill)", background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.12)" }}><MIcon name="check" size={12} color="var(--bp-orange-400)" /> {it}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== DIFERENCIAL ===== */}
      <section style={{ padding: "8px 20px 40px", background: "var(--surface-card)" }}>
        <div style={{ position: "relative", overflow: "hidden", background: "var(--surface-inverse)", borderRadius: "var(--radius-2xl)", padding: "44px 26px" }}>
          <div aria-hidden="true" style={{ position: "absolute", width: 260, height: 260, background: "rgba(255,142,9,0.14)", borderRadius: "42% 58% 56% 44% / 48% 44% 56% 52%", right: "-30%", top: "-34%" }} />
          <div aria-hidden="true" style={{ position: "absolute", width: 180, height: 180, background: "rgba(0,166,166,0.12)", borderRadius: "63% 37% 54% 46% / 42% 56% 44% 58%", left: "-24%", bottom: "-30%" }} />
          <div style={{ position: "relative", textAlign: "center" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.78)" }}><span style={{ width: 22, height: 3, background: "rgba(255,255,255,0.55)", borderRadius: 3 }} /> {(t.diff || {}).eyebrow}</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, lineHeight: 1.14, letterSpacing: "-0.025em", color: "#fff", margin: "16px 0 0" }}>{(t.diff || {}).title}</h2>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px 16px", margin: "26px 0 0" }}>
              {((t.diff || {}).verbs || []).map((v, i) => (
                <span key={i} style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, letterSpacing: "-0.02em", color: "var(--bp-orange-400)" }}>{v}</span>
              ))}
            </div>
            <div style={{ height: 1, background: "rgba(255,255,255,0.14)", margin: "28px auto", maxWidth: 160 }} />
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, color: "#fff", margin: 0, lineHeight: 1.4 }}>{(t.diff || {}).punch}</p>
          </div>
        </div>
      </section>

      {/* ===== VISIÓN ===== */}
      <section style={{ padding: "8px 24px 46px", background: "var(--surface-card)", textAlign: "center" }}>
        <MEyebrow>{(t.vision || {}).eyebrow}</MEyebrow>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, lineHeight: 1.16, letterSpacing: "-0.025em", color: "var(--text-strong)", margin: "16px 0 0" }}>{(t.vision || {}).title}</h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 15.5, lineHeight: 1.62, color: "var(--text-body)", margin: "14px 0 0" }}>{(t.vision || {}).body}</p>
      </section>

      {/* ===== CTA BAND ===== */}
      <section style={{ padding: "8px 20px 46px", background: "var(--surface-card)" }}>
        <div style={{ position: "relative", overflow: "hidden", background: "var(--color-brand)", borderRadius: "var(--radius-2xl)", padding: "32px 24px", boxShadow: "var(--shadow-brand)" }}>
          <div aria-hidden="true" style={{ position: "absolute", width: 240, height: 240, background: "rgba(255,255,255,0.14)", borderRadius: "58% 42% 38% 62% / 54% 60% 40% 46%", right: "-26%", bottom: "-44%" }} />
          <div style={{ position: "relative" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)" }}><span style={{ width: 22, height: 3, background: "rgba(255,255,255,0.6)", borderRadius: 3 }} /> {(t.ctaBand || {}).eyebrow}</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, lineHeight: 1.1, letterSpacing: "-0.025em", color: "#fff", margin: "14px 0 0" }}>{(t.ctaBand || {}).title}</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.55, color: "rgba(255,255,255,0.92)", margin: "12px 0 0" }}>{(t.ctaBand || {}).body}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 22 }}>
              <button onClick={goContact} className={press} style={{ padding: 15, border: "none", borderRadius: "var(--radius-lg)", background: "var(--surface-inverse)", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15.5, cursor: "pointer", boxShadow: "var(--shadow-lg)" }}>{(t.ctaBand || {}).button}</button>
              <a href={C.whatsapp} target="_blank" rel="noreferrer" className={press} style={{ padding: 14, borderRadius: "var(--radius-lg)", background: "rgba(255,255,255,0.18)", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15.5, textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9 }}><MIcon name="message-circle" size={18} /> {(t.ctaBand || {}).whatsapp}</a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACTO ===== */}
      <section id="s-contacto" data-screen-label="Contacto" style={{ padding: "46px 20px", background: "var(--surface-inverse)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", width: 280, height: 280, background: "rgba(255,142,9,0.1)", borderRadius: "42% 58% 56% 44% / 48% 44% 56% 52%", left: "-30%", top: "-16%" }} />
        <div style={{ position: "relative" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.78)" }}><span style={{ width: 22, height: 3, background: "rgba(255,255,255,0.55)", borderRadius: 3 }} /> {(t.contact || {}).eyebrow}</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 25, lineHeight: 1.1, letterSpacing: "-0.025em", color: "#fff", margin: "14px 0 0" }}>{(t.contact || {}).title}</h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.58, color: "rgba(255,255,255,0.8)", margin: "12px 0 0" }}>{(t.contact || {}).body}</p>
          <div style={{ marginTop: 22, background: "var(--surface-card)", borderRadius: "var(--radius-2xl)", padding: 22, boxShadow: "var(--shadow-lg)" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "14px 6px" }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", background: "var(--bp-teal-50)", color: "var(--bp-teal-700)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><MIcon name="check" size={30} /></div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--text-strong)", margin: 0 }}>{isEn ? "Done!" : "¡Listo!"}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14.5, color: "var(--text-body)", margin: "10px 0 0", lineHeight: 1.55 }}>{isEn ? "We got your message. We'll reply within 24h. Thanks for reaching out!" : "Recibimos tu mensaje. Te respondemos en 24hs. ¡Gracias por escribirnos!"}</p>
                <button onClick={() => { setSent(false); setVals({}); }} className={press} style={{ marginTop: 18, padding: "12px 22px", border: "none", borderRadius: "var(--radius-lg)", background: "var(--color-brand)", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14.5, cursor: "pointer" }}>{isEn ? "Send another request" : "Enviar otra consulta"}</button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {contactFields.map((f) => (
                  <label key={f.key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, color: "var(--text-strong)" }}>{f.label}</span>
                    {f.area ? (
                      <textarea value={vals[f.key] || ""} onChange={(e) => setVal(f.key, e.target.value)} placeholder={f.ph} rows={3} style={{ resize: "vertical", fontFamily: "var(--font-body)", fontSize: 15, padding: "12px 14px", border: "2px solid var(--border-subtle)", borderRadius: "var(--radius-md)", background: "var(--surface-page)", color: "var(--text-strong)", outline: "none" }} />
                    ) : (
                      <input value={vals[f.key] || ""} onChange={(e) => setVal(f.key, e.target.value)} placeholder={f.ph} style={{ fontFamily: "var(--font-body)", fontSize: 15, padding: "12px 14px", border: "2px solid var(--border-subtle)", borderRadius: "var(--radius-md)", background: "var(--surface-page)", color: "var(--text-strong)", outline: "none" }} />
                    )}
                  </label>
                ))}
                <button onClick={submit} className={press} style={{ marginTop: 4, padding: 15, border: "none", borderRadius: "var(--radius-lg)", background: "var(--color-brand)", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15.5, cursor: "pointer", boxShadow: "var(--shadow-brand)" }}>{(t.contact || {}).submit}</button>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "var(--text-muted)", textAlign: "center" }}>{(t.contact || {}).hint}</span>
              </div>
            )}
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: "28px 0 12px" }}>{(t.contact || {}).directTitle}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <a href={C.whatsapp} target="_blank" rel="noreferrer" className={press} style={{ display: "flex", alignItems: "center", gap: 13, padding: "13px 15px", borderRadius: "var(--radius-lg)", textDecoration: "none", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <span style={{ flex: "none", width: 40, height: 40, borderRadius: "var(--radius-md)", background: "rgba(255,142,9,0.18)", color: "var(--bp-orange-400)", display: "flex", alignItems: "center", justifyContent: "center" }}><MIcon name="message-circle" size={19} /></span>
              <div style={{ minWidth: 0 }}><div style={{ fontFamily: "var(--font-body)", fontSize: 11.5, color: "rgba(255,255,255,0.55)" }}>WhatsApp</div><div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14.5, color: "#fff" }}>{C.phone}</div></div>
            </a>
            <a href={"mailto:" + (C.email || "")} className={press} style={{ display: "flex", alignItems: "center", gap: 13, padding: "13px 15px", borderRadius: "var(--radius-lg)", textDecoration: "none", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <span style={{ flex: "none", width: 40, height: 40, borderRadius: "var(--radius-md)", background: "rgba(255,142,9,0.18)", color: "var(--bp-orange-400)", display: "flex", alignItems: "center", justifyContent: "center" }}><MIcon name="mail" size={19} /></span>
              <div style={{ minWidth: 0 }}><div style={{ fontFamily: "var(--font-body)", fontSize: 11.5, color: "rgba(255,255,255,0.55)" }}>Email</div><div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14.5, color: "#fff" }}>{C.email}</div></div>
            </a>
            <a href={C.maps} target="_blank" rel="noreferrer" className={press} style={{ display: "flex", alignItems: "center", gap: 13, padding: "13px 15px", borderRadius: "var(--radius-lg)", textDecoration: "none", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <span style={{ flex: "none", width: 40, height: 40, borderRadius: "var(--radius-md)", background: "rgba(255,142,9,0.18)", color: "var(--bp-orange-400)", display: "flex", alignItems: "center", justifyContent: "center" }}><MIcon name="map-pin" size={19} /></span>
              <div style={{ minWidth: 0 }}><div style={{ fontFamily: "var(--font-body)", fontSize: 11.5, color: "rgba(255,255,255,0.55)" }}>{ui.office}</div><div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "#fff", lineHeight: 1.3 }}>{C.address}</div></div>
            </a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ background: "var(--bp-musgo-900)", padding: "40px 20px 30px" }}>
        <img src={whiteLogo} alt="bp4" style={{ height: 34, width: "auto", display: "block" }} />
        <p style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "rgba(255,255,255,0.55)", margin: "16px 0 0", lineHeight: 1.6 }}>{(t.footer || {}).tagline}</p>
        <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
          <a href={C.linkedin} target="_blank" rel="noreferrer" className={press} style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.08)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.25 8h4.5V23H.25V8zm7.5 0h4.31v2.05h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V23h-4.5v-6.6c0-1.57-.03-3.6-2.19-3.6-2.2 0-2.53 1.71-2.53 3.48V23h-4.5V8z"/></svg></a>
          <a href={C.whatsapp} target="_blank" rel="noreferrer" className={press} style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.08)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}><MIcon name="message-circle" size={18} /></a>
          <a href={"mailto:" + (C.email || "")} className={press} style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.08)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}><MIcon name="mail" size={18} /></a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 26, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <span style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,142,9,0.18)", color: "var(--bp-orange-400)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}><MIcon name="heart" size={22} /></span>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "#fff", lineHeight: 1.18, letterSpacing: "-0.01em" }}>
            {((t.footer || {}).somos || []).map((l, i) => (
              <div key={i} style={{ color: i === 0 ? "var(--bp-orange-400)" : "#fff" }}>{l}</div>
            ))}
          </div>
        </div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 22 }}>{(t.footer || {}).legal}</div>
      </footer>

      <div style={{ height: 86 }} />

      {/* ===== STICKY BOTTOM BAR ===== */}
      <div style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 28, display: "flex", gap: 10, padding: "12px 16px max(16px, env(safe-area-inset-bottom))", background: "linear-gradient(to top, var(--surface-page) 62%, rgba(248,250,250,0))" }}>
        <button onClick={goContact} className={press} style={{ flex: 1, padding: 14, border: "none", borderRadius: "var(--radius-lg)", background: "var(--color-brand)", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15.5, cursor: "pointer", boxShadow: "var(--shadow-brand)", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}><MIcon name="rocket" size={17} /> {t.cta}</button>
        <a href={C.whatsapp} target="_blank" rel="noreferrer" className={press} style={{ flex: "none", width: 52, borderRadius: "var(--radius-lg)", background: "var(--bp-teal-500)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}><MIcon name="message-circle" size={22} /></a>
      </div>

      {/* ===== MENU SHEET ===== */}
      {menuOpen && (
        <div onClick={() => setMenuOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 45, background: "rgba(14,53,65,0.55)", backdropFilter: "blur(5px)" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ marginTop: "calc(64px + env(safe-area-inset-top))", background: "var(--surface-card)", borderRadius: "0 0 var(--radius-2xl) var(--radius-2xl)", padding: "14px 18px 24px", boxShadow: "var(--shadow-xl)", animation: "bp4mSheet 200ms ease" }}>
            {nav.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} style={{ display: "block", width: "100%", textAlign: "left", border: "none", background: "transparent", cursor: "pointer", padding: "13px 6px", fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "var(--text-strong)", borderBottom: "1px solid var(--border-subtle)" }}>{n.label}</button>
            ))}
            <button onClick={goContact} style={{ display: "block", width: "100%", textAlign: "left", border: "none", background: "transparent", cursor: "pointer", padding: "14px 6px 4px", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: "var(--text-muted)" }}>{t.candidate}</button>
          </div>
        </div>
      )}

    </div>
  );
}

window.BPMobile = { MobileApp };
