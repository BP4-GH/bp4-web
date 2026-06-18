/* BP4 — Clientes · El desafío · El modelo (4 pilares). Exposed on window.BPSecA. */

const { Icon: AIcon, Container: AContainer, Eyebrow: AEyebrow, SectionHeading: AHeading, Pebble: APebble } = window.BPUI;

/* ---------- Clientes — banda de credibilidad ---------- */
function Clients({ t, clients }) {
  return (
    <section id="clientes" data-screen-label="Clientes" style={{ padding: "92px 0", background: "var(--surface-page)", position: "relative", overflow: "hidden" }}>
      <AContainer>
        <div className="bp-clients-head">
          <div style={{ flex: 1, minWidth: 280 }}>
            <AHeading eyebrow={t.clients.eyebrow} title={t.clients.title} body={t.clients.body} maxBody={520} />
          </div>
          <div className="bp-clients-stat">
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 64, letterSpacing: "-0.04em", lineHeight: 0.9, color: "var(--color-brand)" }}>+100</div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-body)", marginTop: 12, lineHeight: 1.55 }}>{t.clients.stat}</p>
          </div>
        </div>
        <div className="bp-client-grid">
          {clients.map((c) => (
            <div key={c.name} className="bp-client-cell bp-press">
              <window.BPUI.ClientLogo logo={c} cap={48} />
            </div>
          ))}
        </div>
        {t.clients.trustLabel && clients.length > 0 && (
          <div style={{ marginTop: 34 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 14 }}>
              {t.clients.trustLabel}
            </div>
            <window.BPUI.Marquee items={clients} light />
          </div>
        )}
      </AContainer>
    </section>
  );
}

/* ---------- El desafío — el problema real aparece después de incorporar ---------- */
function Challenge({ t }) {
  const c = t.challenge;
  return (
    <section style={{ padding: "100px 0", background: "var(--surface-card)", position: "relative", overflow: "hidden" }}>
      <APebble size={420} color="var(--bp-orange-50)" variant={1} style={{ left: "-12%", top: "8%", opacity: 0.5 }} />
      <AContainer style={{ position: "relative" }}>
        <AHeading center eyebrow={c.eyebrow} title={c.title1} em={c.titleEm} body={c.body} />
        <div className="bp-challenge-grid" style={{ marginTop: 56 }}>
          {/* Necesidades */}
          <div className="bp-challenge-card" style={{ background: "var(--surface-page)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-2xl)", padding: "34px 34px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
              <span style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", background: "var(--bp-teal-50)", color: "var(--bp-teal-700)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                <AIcon name="users" size={21} />
              </span>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "var(--text-strong)", margin: 0 }}>{c.needsTitle}</h3>
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {c.needs.map((n, i) => (
                <li key={i} style={{ display: "flex", gap: 12, padding: "15px 0", borderTop: i ? "1px solid var(--border-subtle)" : "none", alignItems: "baseline" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15.5, color: "var(--text-strong)", flex: "none", minWidth: 132 }}>{n.who}</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-body)", lineHeight: 1.5 }}>{n.what}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Riesgos */}
          <div className="bp-challenge-card bp-challenge-risk" style={{ background: "var(--surface-inverse)", borderRadius: "var(--radius-2xl)", padding: "34px", position: "relative", overflow: "hidden" }}>
            <APebble size={260} color="rgba(245,71,72,0.16)" variant={2} style={{ right: "-16%", bottom: "-24%" }} />
            <div style={{ position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 16 }}>
                <span style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", background: "rgba(245,71,72,0.18)", color: "#FF8A8A", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                  <AIcon name="alert-triangle" size={21} />
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "#fff", margin: 0 }}>{c.risksTitle}</h3>
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "rgba(255,255,255,0.7)", margin: "0 0 18px", lineHeight: 1.5 }}>{c.risksLead}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {c.risks.map((r) => (
                  <span key={r} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15, padding: "9px 15px", borderRadius: "var(--radius-pill)", background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.92)", border: "1px solid rgba(255,255,255,0.12)" }}>
                    <AIcon name="trending-down" size={15} color="#FF8A8A" /> {r}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(22px, 3vw, 30px)", letterSpacing: "-0.02em", color: "var(--text-strong)", margin: 0, lineHeight: 1.2 }}>
            <span style={{ color: "var(--color-brand)" }}>BP4</span>{c.close.replace("BP4", "")}
          </p>
        </div>
      </AContainer>
    </section>
  );
}

/* ---------- El modelo — 4 pilares integrados ---------- */
function Model({ t }) {
  const m = t.model;
  return (
    <section id="modelo" data-screen-label="El modelo" style={{ padding: "100px 0", background: "var(--surface-page)" }}>
      <AContainer>
        <AHeading center eyebrow={m.eyebrow} title={m.title1} em={m.titleEm} body={m.body} />
        <div className="bp-pillars-grid" style={{ marginTop: 56 }}>
          {m.pillars.map((p) => (
            <div key={p.title} className="bp-pillar-card bp-lift">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ width: 52, height: 52, borderRadius: "var(--radius-lg)", background: "var(--bp-orange-50)", color: "var(--color-brand)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                  <AIcon name={p.icon} size={26} />
                </span>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 32, letterSpacing: "-0.03em", color: "var(--bp-neutral-200)" }}>{p.tag}</span>
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 21, color: "var(--text-strong)", margin: "22px 0 0", lineHeight: 1.15 }}>{p.title}</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-body)", marginTop: 10, lineHeight: 1.58 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </AContainer>
    </section>
  );
}

window.BPSecA = { Clients, Challenge, Model };
