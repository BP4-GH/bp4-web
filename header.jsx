/* BP4 redesign — Header with sticky glass nav, ES/EN toggle, mobile menu,
   and a differentiated candidate route. Exposed on window.BPHeader. */

const { Icon: HIcon, Container: HContainer, Mark: HMark } = window.BPUI;

function LangToggle({ lang, setLang, light = false }) {
  return (
    <div style={{
      display: "inline-flex", background: light ? "rgba(255,255,255,0.12)" : "var(--bp-neutral-100)",
      borderRadius: "var(--radius-pill)", padding: 3,
    }}>
      {["es", "en"].map((l) => {
        const on = lang === l;
        return (
          <button key={l} onClick={() => setLang(l)} className="bp-press" style={{
            border: "none", cursor: "pointer", padding: "6px 13px", borderRadius: "var(--radius-pill)",
            fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13,
            background: on ? (light ? "#fff" : "var(--surface-card)") : "transparent",
            color: on ? (light ? "var(--bp-musgo)" : "var(--text-strong)") : (light ? "rgba(255,255,255,0.7)" : "var(--text-muted)"),
            boxShadow: on ? "var(--shadow-xs)" : "none", transition: "all var(--duration-normal) var(--ease-standard)",
          }}>{l.toUpperCase()}</button>
        );
      })}
    </div>
  );
}

function Header({ t, lang, setLang, onStart, goTo }) {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const nav = (id) => { setOpen(false); goTo(id); };

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 40,
      background: scrolled ? "rgba(248,250,250,0.86)" : "rgba(248,250,250,0.55)",
      backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
      borderBottom: `1px solid ${scrolled ? "var(--border-subtle)" : "transparent"}`,
      transition: "background var(--duration-normal) var(--ease-standard), border-color var(--duration-normal) var(--ease-standard)",
    }}>
      <HContainer style={{ display: "flex", alignItems: "center", gap: 24, padding: "10px 32px" }}>
        <a href="#top" onClick={(e) => { e.preventDefault(); nav("top"); }} style={{ display: "flex", flex: "none" }}>
          <HMark variant="orange" height={36} />
        </a>
        <nav className="bp-desktop-nav" style={{ display: "flex", gap: 2, marginLeft: 6 }}>
          {t.nav.map((n) => (
            <button key={n.id} onClick={() => nav(n.id)} className="bp-navlink" style={{
              border: "none", background: "transparent", cursor: "pointer", padding: "9px 14px",
              fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500, color: "var(--text-body)",
              borderRadius: "var(--radius-sm)", whiteSpace: "nowrap",
            }}>{n.label}</button>
          ))}
        </nav>
        <div className="bp-desktop-actions" style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 14 }}>
          <LangToggle lang={lang} setLang={setLang} />
          <button onClick={() => nav("contacto")} className="bp-navlink" style={{
            border: "none", background: "transparent", cursor: "pointer", fontFamily: "var(--font-body)",
            fontWeight: 600, fontSize: 14, color: "var(--text-muted)", whiteSpace: "nowrap", padding: "9px 6px",
          }}>{t.candidate}</button>
          <button onClick={onStart} className="bp-press" style={{
            padding: "11px 20px", border: "none", borderRadius: "var(--radius-lg)", background: "var(--color-brand)",
            color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, cursor: "pointer",
            boxShadow: "var(--shadow-brand)", whiteSpace: "nowrap",
          }}>{t.cta}</button>
        </div>
        <button className="bp-mobile-trigger bp-press" onClick={() => setOpen((v) => !v)} aria-label="Menu" style={{
          marginLeft: "auto", display: "none", border: "none", background: "var(--surface-card)",
          width: 44, height: 44, borderRadius: "var(--radius-md)", cursor: "pointer", alignItems: "center",
          justifyContent: "center", color: "var(--text-strong)", boxShadow: "var(--shadow-xs)",
        }}>
          <HIcon name={open ? "x" : "menu"} size={22} />
        </button>
      </HContainer>

      {open && (
        <div className="bp-mobile-menu" style={{
          background: "var(--surface-card)", borderTop: "1px solid var(--border-subtle)",
          boxShadow: "var(--shadow-lg)", padding: "16px 24px 24px", animation: "bpFade 180ms ease",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {t.nav.map((n) => (
              <button key={n.id} onClick={() => nav(n.id)} style={{
                border: "none", background: "transparent", cursor: "pointer", textAlign: "left", padding: "13px 8px",
                fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "var(--text-strong)",
                borderBottom: "1px solid var(--border-subtle)",
              }}>{n.label}</button>
            ))}
            <button onClick={() => nav("contacto")} style={{
              border: "none", background: "transparent", cursor: "pointer", textAlign: "left", padding: "13px 8px",
              fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 600, color: "var(--text-muted)",
            }}>{t.candidate}</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 18, gap: 14 }}>
            <LangToggle lang={lang} setLang={setLang} />
            <button onClick={() => { setOpen(false); onStart(); }} className="bp-press" style={{
              flex: 1, padding: "13px 20px", border: "none", borderRadius: "var(--radius-lg)", background: "var(--color-brand)",
              color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, cursor: "pointer", boxShadow: "var(--shadow-brand)",
            }}>{t.cta}</button>
          </div>
        </div>
      )}
    </header>
  );
}

window.BPHeader = { Header, LangToggle };
