/* BP4 — Reporting (gestión por datos + reporte ejecutivo) · IA + UTN · Diferencial (dark) · Visión.
   Exposed on window.BPSecC. */

const { Icon: CIcon, Container: CContainer, Eyebrow: CEyebrow, SectionHeading: CHeading, Pebble: CPebble } = window.BPUI;

/* ---------- Reporting — gestión basada en datos ---------- */
/* ---------- Reporte real + dashboard — dos cartas superpuestas ---------- */
function ReportStack({ r }) {
  const s = r.stack || {};
  return (
    <div className="bp-report-stack">
      <figure className="bp-rs-back">
        <span className="bp-rs-tag bp-rs-tag-teal"><CIcon name="file-text" size={14} /> {s.reportLabel}</span>
        <img src="assets/report-real.png" alt={s.reportLabel} loading="lazy" />
      </figure>
      <figure className="bp-rs-front">
        <span className="bp-rs-tag bp-rs-tag-orange"><CIcon name="layout-dashboard" size={14} /> {s.dashLabel}</span>
        <img src="assets/dashboard-real.png" alt={s.dashLabel} loading="lazy" />
      </figure>
    </div>
  );
}

function Reporting({ t }) {
  const r = t.reporting;
  return (
    <section id="reporting" data-screen-label="Reporting" style={{ padding: "100px 0", background: "var(--surface-card)", position: "relative", overflow: "hidden" }}>
      <CPebble size={420} color="var(--bp-teal-50)" variant={1} style={{ right: "-12%", top: "6%", opacity: 0.5 }} />
      <CContainer style={{ position: "relative" }}>
        <CHeading eyebrow={r.eyebrow} title={r.title} body={r.body} maxBody={680} />

        <div className="bp-report-grid" style={{ marginTop: 52 }}>
          {/* Qué medimos */}
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 18 }}>{r.measureTitle}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
              {r.measures.map((m) => (
                <span key={m} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 14.5, padding: "9px 15px", borderRadius: "var(--radius-pill)", background: "var(--surface-page)", color: "var(--text-body)", border: "1px solid var(--border-subtle)" }}>
                  <CIcon name="activity" size={14} color="var(--bp-teal-500)" /> {m}
                </span>
              ))}
            </div>
            <div style={{ marginTop: 30 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "var(--text-strong)", margin: 0 }}>{r.detectTitle}</h3>
              <ul style={{ listStyle: "none", margin: "16px 0 0", padding: 0, display: "grid", gap: 2 }}>
                {r.detect.map((d, i) => (
                  <li key={i} style={{ display: "flex", gap: 11, alignItems: "flex-start", padding: "9px 0", borderTop: i ? "1px solid var(--border-subtle)" : "none" }}>
                    <CIcon name="arrow-up-right" size={17} color="var(--color-brand)" strokeWidth={2.2} style={{ marginTop: 1, flex: "none" }} />
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 15.5, color: "var(--text-body)", lineHeight: 1.45 }}>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Reporte ejecutivo + dashboard */}
          <div className="bp-report-side">
            <ReportStack r={r} />
            <div style={{ marginTop: 22, padding: "24px 26px", background: "var(--surface-page)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-xl)" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "var(--text-strong)", margin: 0 }}>{r.reportTitle}</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-body)", marginTop: 9, lineHeight: 1.58 }}>{r.reportBody}</p>
            </div>
          </div>
        </div>
      </CContainer>
    </section>
  );
}

/* ---------- IA aplicada + Partnership UTN ---------- */
function AI({ t }) {
  const a = t.ai;
  return (
    <section id="ia" data-screen-label="IA" style={{ padding: "100px 0", background: "var(--surface-page)", position: "relative", overflow: "hidden" }}>
      <CContainer style={{ position: "relative" }}>
        <div className="bp-ai-grid">
          <div className="bp-ai-copy">
            <CEyebrow>{a.eyebrow}</CEyebrow>
            <h2 className="bp-h2" style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.025em", color: "var(--text-strong)", margin: "18px 0 0", lineHeight: 1.06 }}>{a.title}</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 18, color: "var(--text-body)", marginTop: 18, lineHeight: 1.62, maxWidth: 470 }}>{a.body}</p>
          </div>
          <div className="bp-utn-card" style={{ position: "relative", overflow: "hidden", background: "var(--surface-inverse)", borderRadius: "var(--radius-2xl)", padding: "36px", boxShadow: "var(--shadow-lg)" }}>
            <CPebble size={300} color="rgba(255,142,9,0.16)" variant={0} style={{ right: "-14%", top: "-24%" }} />
            <div style={{ position: "relative" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--bp-orange-400)", padding: "6px 13px", borderRadius: "var(--radius-pill)", background: "rgba(255,142,9,0.14)" }}>
                <CIcon name="sparkles" size={15} /> {a.utnTag}
              </span>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, color: "#fff", margin: "18px 0 0", lineHeight: 1.15 }}>{a.utnTitle}</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 15.5, color: "rgba(255,255,255,0.78)", marginTop: 12, lineHeight: 1.6 }}>{a.utnBody}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 22 }}>
                {a.items.map((it) => (
                  <span key={it} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 13.5, padding: "8px 13px", borderRadius: "var(--radius-pill)", background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.12)" }}>
                    <CIcon name="check" size={13} color="var(--bp-orange-400)" strokeWidth={2.6} /> {it}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CContainer>
    </section>
  );
}

/* ---------- Diferencial — momento de marca oscuro ---------- */
function Differentiators({ t }) {
  const d = t.diff;
  return (
    <section style={{ padding: "30px 0 96px", background: "var(--surface-card)" }}>
      <CContainer>
        <div style={{ position: "relative", overflow: "hidden", background: "var(--surface-inverse)", borderRadius: "var(--radius-2xl)", padding: "64px 56px" }}>
          <CPebble size={420} color="rgba(255,142,9,0.14)" variant={0} style={{ right: "-10%", top: "-30%" }} />
          <CPebble size={260} color="rgba(0,166,166,0.12)" variant={2} style={{ left: "-6%", bottom: "-30%" }} />
          <div style={{ position: "relative", textAlign: "center", maxWidth: 760, margin: "0 auto" }}>
            <CEyebrow light center>{d.eyebrow}</CEyebrow>
            <h2 className="bp-h2" style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.025em", color: "#fff", margin: "18px 0 0", lineHeight: 1.08 }}>{d.title}</h2>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14, margin: "34px 0 0" }}>
              {d.verbs.map((v) => (
                <span key={v} style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(22px, 3.4vw, 34px)", letterSpacing: "-0.02em", color: "var(--bp-orange-400)" }}>{v}</span>
              ))}
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 18, color: "rgba(255,255,255,0.82)", margin: "26px auto 0", maxWidth: 600, lineHeight: 1.6 }}>{d.body}</p>
            <div style={{ height: 1, background: "rgba(255,255,255,0.14)", margin: "36px auto", maxWidth: 200 }} />
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(19px, 2.6vw, 24px)", color: "#fff", margin: 0, maxWidth: 640, marginInline: "auto", lineHeight: 1.4 }}>{d.punch}</p>
          </div>
        </div>
      </CContainer>
    </section>
  );
}

/* ---------- Visión ---------- */
function Vision({ t }) {
  const v = t.vision;
  return (
    <section style={{ padding: "60px 0 100px", background: "var(--surface-card)" }}>
      <CContainer size={920}>
        <div style={{ textAlign: "center" }}>
          <CEyebrow center>{v.eyebrow}</CEyebrow>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(26px, 4vw, 42px)", letterSpacing: "-0.025em", color: "var(--text-strong)", margin: "18px auto 0", lineHeight: 1.12, maxWidth: 820 }}>{v.title}</h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 18.5, color: "var(--text-body)", margin: "22px auto 0", maxWidth: 680, lineHeight: 1.62 }}>{v.body}</p>
        </div>
      </CContainer>
    </section>
  );
}

window.BPSecC = { Reporting, AI, Differentiators, Vision };
