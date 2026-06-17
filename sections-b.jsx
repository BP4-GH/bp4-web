/* BP4 — Recruiting (perfiles especializados) · People Care (el corazón: 2 dimensiones + focal point).
   Exposed on window.BPSecB. */

const { Icon: BIcon, Container: BContainer, Eyebrow: BEyebrow, SectionHeading: BHeading, Pebble: BPebble, PhotoSlot: BPhoto } = window.BPUI;

/* ---------- Recruiting — especializado en tecnología ---------- */
function Recruiting({ t }) {
  const r = t.recruiting;
  return (
    <section id="recruiting" data-screen-label="Recruiting" style={{ padding: "100px 0", background: "var(--surface-card)", position: "relative", overflow: "hidden" }}>
      <BPebble size={380} color="var(--bp-teal-50)" variant={2} style={{ right: "-10%", top: "12%", opacity: 0.5 }} />
      <BContainer style={{ position: "relative" }}>
        <div className="bp-recruit-grid">
          <div className="bp-recruit-copy">
            <BEyebrow>{r.eyebrow}</BEyebrow>
            <h2 className="bp-h2" style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.025em", color: "var(--text-strong)", margin: "18px 0 0", lineHeight: 1.06 }}>{r.title}</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 18, color: "var(--text-body)", marginTop: 18, lineHeight: 1.62, maxWidth: 460 }}>{r.body}</p>
            <div className="bp-recruit-punch" style={{ marginTop: 28, padding: "22px 26px", background: "var(--bp-orange-50)", borderRadius: "var(--radius-xl)", borderLeft: "4px solid var(--color-brand)" }}>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17.5, color: "var(--text-strong)", margin: 0, lineHeight: 1.42 }}>{r.punch}</p>
            </div>
          </div>
          <div className="bp-recruit-profiles">
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 18 }}>{r.profilesTitle}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {r.profiles.map((p) => (
                <span key={p} className="bp-profile-chip bp-press" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 15, padding: "11px 17px", borderRadius: "var(--radius-pill)", background: "var(--surface-card)", color: "var(--text-strong)", border: "1px solid var(--border-default)", boxShadow: "var(--shadow-xs)" }}>
                  <BIcon name="code-2" size={15} color="var(--color-brand)" /> {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </BContainer>
    </section>
  );
}

/* ---------- People Care — el corazón del modelo ---------- */
function DimensionCard({ dim, accent }) {
  const isTeal = accent === "teal";
  const soft = isTeal ? "var(--bp-teal-50)" : "var(--bp-orange-50)";
  const text = isTeal ? "var(--bp-teal-700)" : "var(--color-brand)";
  return (
    <div className="bp-dim-card" style={{ background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-2xl)", padding: 32, boxShadow: "var(--shadow-sm)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
        <span style={{ width: 46, height: 46, borderRadius: "var(--radius-md)", background: soft, color: text, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
          <BIcon name={dim.icon} size={23} />
        </span>
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 21, color: "var(--text-strong)", margin: 0 }}>{dim.tag}</h3>
      </div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 2 }}>
        {dim.items.map((it, i) => (
          <li key={i} style={{ display: "flex", gap: 11, alignItems: "center", padding: "10px 0", borderTop: i ? "1px solid var(--border-subtle)" : "none" }}>
            <BIcon name="check" size={16} color={text} strokeWidth={2.4} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: 15.5, color: "var(--text-body)" }}>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PeopleCare({ t }) {
  const p = t.peopleCare;
  return (
    <section id="people-care" data-screen-label="People Care" style={{ padding: "100px 0", background: "var(--surface-page)", position: "relative", overflow: "hidden" }}>
      <BPebble size={440} color="var(--bp-orange-50)" variant={0} style={{ left: "-12%", bottom: "-8%", opacity: 0.5 }} />
      <BContainer style={{ position: "relative" }}>
        <div style={{ maxWidth: 720 }}>
          <BEyebrow>{p.eyebrow}</BEyebrow>
          <h2 className="bp-h2" style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.025em", color: "var(--text-strong)", margin: "18px 0 0", lineHeight: 1.04 }}>
            {p.title.split("BP4")[0]}<em style={{ fontStyle: "italic", color: "var(--color-brand)" }}>BP4</em>{p.title.split("BP4")[1] || ""}
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 18, color: "var(--text-body)", marginTop: 18, lineHeight: 1.62 }}>{p.body}</p>
        </div>

        <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17, color: "var(--text-strong)", margin: "44px 0 22px", maxWidth: 720, lineHeight: 1.5 }}>{p.dimsLead}</p>
        <div className="bp-dims-grid">
          <DimensionCard dim={p.dims[0]} accent="orange" />
          <DimensionCard dim={p.dims[1]} accent="teal" />
        </div>

        {/* Focal point */}
        <div className="bp-focal-card" style={{ marginTop: 24, display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, alignItems: "center", background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-2xl)", padding: "30px 34px", boxShadow: "var(--shadow-sm)" }}>
          <span className="bp-focal-icon" style={{ width: 64, height: 64, borderRadius: "var(--radius-xl)", background: "var(--bp-teal-50)", color: "var(--bp-teal-700)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
            <BIcon name="git-merge" size={30} />
          </span>
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "var(--text-strong)", margin: 0 }}>{p.focalTitle}</h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 15.5, color: "var(--text-body)", marginTop: 8, lineHeight: 1.6 }}>{p.focalBody}</p>
          </div>
        </div>
      </BContainer>
    </section>
  );
}

window.BPSecB = { Recruiting, PeopleCare };
