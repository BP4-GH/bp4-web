/* BP4 redesign — CTA band · Contact section · Footer · Sticky CTA · Contact modal.
   Exposed on window.BPFoot. */

const { Icon: FIcon, Container: FContainer, Eyebrow: FEyebrow, Mark: FMark, Pebble: FPebble } = window.BPUI;
const WA = window.BP_CONTACT.whatsapp + window.BP_CONTACT.whatsappText;

/* ---------- CTA band — orange spotlight ---------- */
function CTABand({ t, onStart }) {
  return (
    <section style={{ padding: "0 0 96px", background: "var(--surface-page)" }}>
      <FContainer>
        <div style={{ position: "relative", overflow: "hidden", background: "var(--color-brand)", borderRadius: "var(--radius-2xl)", padding: "60px 56px", boxShadow: "var(--shadow-brand)" }}>
          <FPebble size={360} color="rgba(255,255,255,0.14)" variant={1} style={{ right: "-8%", bottom: "-40%" }} />
          <div className="bp-ctaband-grid" style={{ position: "relative" }}>
            <div>
              <FEyebrow light>{t.ctaBand.eyebrow}</FEyebrow>
              <h2 className="bp-h2" style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.025em", color: "#fff", margin: "16px 0 0", lineHeight: 1.05, maxWidth: 540 }}>{t.ctaBand.title}</h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 18, color: "rgba(255,255,255,0.92)", marginTop: 16, maxWidth: 480, lineHeight: 1.6 }}>{t.ctaBand.body}</p>
            </div>
            <div className="bp-ctaband-actions">
              <button onClick={onStart} className="bp-press" style={{ padding: "16px 30px", border: "none", borderRadius: "var(--radius-lg)", background: "var(--surface-inverse)", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16.5, cursor: "pointer", boxShadow: "var(--shadow-lg)", whiteSpace: "nowrap" }}>{t.ctaBand.button}</button>
              <a href={WA} target="_blank" rel="noreferrer" className="bp-press" style={{ padding: "16px 26px", borderRadius: "var(--radius-lg)", background: "rgba(255,255,255,0.16)", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16.5, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 9, whiteSpace: "nowrap" }}>
                <FIcon name="message-circle" size={19} /> {t.ctaBand.whatsapp}
              </a>
            </div>
          </div>
        </div>
      </FContainer>
    </section>
  );
}

/* ---------- Inline contact form ---------- */
function ContactForm({ t, compact = false }) {
  const [sent, setSent] = React.useState(false);
  const [vals, setVals] = React.useState({});
  const [errs, setErrs] = React.useState({});
  const set = (k, v) => { setVals((p) => ({ ...p, [k]: v })); setErrs((p) => ({ ...p, [k]: false })); };
  const submit = () => {
    const e = {};
    t.contact.fields.forEach((f) => { if (!String(vals[f.key] || "").trim()) e[f.key] = true; });
    if (vals.email && !/^\S+@\S+\.\S+$/.test(vals.email)) e.email = true;
    setErrs(e);
    if (Object.keys(e).length === 0) setSent(true);
  };
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [sent]);
  if (sent) {
    return (
      <div style={{ textAlign: "center", padding: "30px 10px" }}>
        <div style={{ width: 66, height: 66, borderRadius: "50%", background: "var(--bp-teal-50)", color: "var(--bp-teal-700)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
          <FIcon name="check" size={32} strokeWidth={2.4} />
        </div>
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, color: "var(--text-strong)", margin: 0 }}>{t.contact.successTitle}</h3>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 15.5, color: "var(--text-body)", marginTop: 10, maxWidth: 320, marginInline: "auto", lineHeight: 1.55 }}>{t.contact.successBody}</p>
        <button onClick={() => { setSent(false); setVals({}); }} className="bp-press" style={{ marginTop: 22, padding: "12px 24px", border: "none", borderRadius: "var(--radius-lg)", background: "var(--color-brand)", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>{t.contact.another}</button>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {t.contact.fields.map((f) => (
        <label key={f.key} style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 13.5, fontWeight: 600, color: "var(--text-strong)" }}>{f.label}</span>
          {f.area ? (
            <textarea value={vals[f.key] || ""} onChange={(e) => set(f.key, e.target.value)} placeholder={f.ph} rows={3} className="bp-field" style={{ resize: "vertical", borderColor: errs[f.key] ? "var(--bp-error)" : undefined }} />
          ) : (
            <input value={vals[f.key] || ""} onChange={(e) => set(f.key, e.target.value)} placeholder={f.ph} className="bp-field" style={{ borderColor: errs[f.key] ? "var(--bp-error)" : undefined }} />
          )}
        </label>
      ))}
      <button onClick={submit} className="bp-press" style={{ marginTop: 6, padding: "15px", border: "none", borderRadius: "var(--radius-lg)", background: "var(--color-brand)", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, cursor: "pointer", boxShadow: "var(--shadow-brand)" }}>{t.contact.submit}</button>
      <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-muted)", textAlign: "center" }}>{t.contact.hint}</span>
    </div>
  );
}

/* ---------- Contact section ---------- */
function ContactChannel({ icon, label, value, href }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="bp-channel bp-press" style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: "var(--radius-lg)", textDecoration: "none", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
      <span style={{ flex: "none", width: 42, height: 42, borderRadius: "var(--radius-md)", background: "rgba(255,142,9,0.18)", color: "var(--bp-orange-400)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <FIcon name={icon} size={20} />
      </span>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.55)" }}>{label}</div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15.5, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</div>
      </div>
    </a>
  );
}

function Contact({ t }) {
  const C = window.BP_CONTACT;
  return (
    <section id="contacto" data-screen-label="Contacto" style={{ padding: "100px 0", background: "var(--surface-inverse)", position: "relative", overflow: "hidden" }}>
      <FPebble size={460} color="rgba(255,142,9,0.10)" variant={0} style={{ left: "-12%", top: "-20%" }} />
      <FContainer style={{ position: "relative" }}>
        <div className="bp-contact-grid">
          <div className="bp-contact-left">
            <FEyebrow light>{t.contact.eyebrow}</FEyebrow>
            <h2 className="bp-h2" style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.025em", color: "#fff", margin: "18px 0 0", lineHeight: 1.05 }}>{t.contact.title}</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 18, color: "rgba(255,255,255,0.8)", marginTop: 16, lineHeight: 1.6, maxWidth: 420 }}>{t.contact.body}</p>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: "36px 0 14px" }}>{t.contact.directTitle}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 380 }}>
              <ContactChannel icon="message-circle" label="WhatsApp" value="+54 9 11 6481-2711" href={WA} />
              <ContactChannel icon="mail" label="Email" value={C.email} href={`mailto:${C.email}`} />
              <ContactChannel icon="linkedin" label="LinkedIn" value="linkedin.com/company/bp4" href={C.linkedin} />
              <ContactChannel icon="map-pin" label={t.lang === "en" ? "Office" : "Oficina"} value={t.footer.address} href={C.maps} />
            </div>
          </div>
          <div className="bp-contact-form-wrap">
            <ContactForm t={t} />
          </div>
        </div>
      </FContainer>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer({ t, goTo }) {
  const C = window.BP_CONTACT;
  return (
    <footer style={{ background: "var(--bp-musgo-900)", padding: "60px 0 36px" }}>
      <FContainer>
        <div className="bp-footer-grid">
          <div style={{ maxWidth: 300 }}>
            <FMark variant="white" height={42} />
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(255,255,255,0.55)", marginTop: 18, lineHeight: 1.6 }}>{t.footer.tagline}</p>
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              <a href={C.linkedin} target="_blank" rel="noreferrer" className="bp-press" style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.08)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}><FIcon name="linkedin" size={18} /></a>
              <a href={WA} target="_blank" rel="noreferrer" className="bp-press" style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.08)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}><FIcon name="message-circle" size={18} /></a>
              <a href={`mailto:${C.email}`} className="bp-press" style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.08)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}><FIcon name="mail" size={18} /></a>
            </div>
          </div>
          <div className="bp-footer-cols">
            {t.footer.cols.map((col, ci) => (
              <div key={col.h}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, color: "#fff", marginBottom: 14, letterSpacing: "0.08em", textTransform: "uppercase" }}>{col.h}</div>
                {col.items.map((it) => (
                  <button key={it} onClick={() => goTo(ci === 0 ? "modelo" : "clientes")} style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(255,255,255,0.6)", textDecoration: "none", padding: "6px 0", border: "none", background: "transparent", cursor: "pointer", textAlign: "left" }}>{it}</button>
                ))}
              </div>
            ))}
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, color: "#fff", marginBottom: 14, letterSpacing: "0.08em", textTransform: "uppercase" }}>{t.footer.contactH}</div>
              <a href={`mailto:${C.email}`} style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(255,255,255,0.6)", textDecoration: "none", padding: "6px 0" }}>{C.email}</a>
              <a href={C.maps} target="_blank" rel="noreferrer" style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(255,255,255,0.6)", textDecoration: "none", padding: "6px 0", maxWidth: 180, lineHeight: 1.4 }}>{t.footer.address}</a>
            </div>
          </div>
          <div className="bp-footer-somos" style={{ position: "relative" }}>
            <span style={{ width: 46, height: 46, borderRadius: "50%", background: "rgba(255,142,9,0.18)", color: "var(--bp-orange-400)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FIcon name="heart" size={24} />
            </span>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "#fff", lineHeight: 1.15, marginTop: 16, letterSpacing: "-0.01em" }}>
              {t.footer.somos.map((l, i) => <div key={i}>{i === 0 ? <span style={{ color: "var(--bp-orange-400)" }}>{l}</span> : l}</div>)}
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: 44, paddingTop: 22, fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{t.footer.legal}</div>
      </FContainer>
    </footer>
  );
}

/* ---------- Sticky CTA (appears on scroll) ---------- */
function StickyCTA({ t, onStart }) {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button onClick={onStart} className="bp-sticky-cta bp-press" data-show={show} aria-label={t.cta} style={{
      position: "fixed", right: 24, bottom: 24, zIndex: 35, padding: "14px 24px", border: "none",
      borderRadius: "var(--radius-pill)", background: "var(--color-brand)", color: "#fff",
      fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15.5, cursor: "pointer",
      boxShadow: "var(--shadow-brand)", display: "inline-flex", alignItems: "center", gap: 9,
      opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(20px)",
      pointerEvents: show ? "auto" : "none", transition: "opacity var(--duration-normal) var(--ease-out), transform var(--duration-normal) var(--ease-out)",
    }}>
      <FIcon name="rocket" size={18} /> {t.ctaShort}
    </button>
  );
}

/* ---------- Contact modal (quick form) ---------- */
function ContactModal({ t, open, onClose }) {
  React.useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  React.useEffect(() => { if (open && window.lucide) window.lucide.createIcons(); }, [open]);
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(14,53,65,0.58)", backdropFilter: "blur(5px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "bpFade 200ms ease" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "var(--surface-card)", borderRadius: "var(--radius-2xl)", padding: 34, width: 460, maxWidth: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: "var(--shadow-xl)", animation: "bpPop 280ms var(--ease-bounce)", position: "relative" }}>
        <button onClick={onClose} aria-label="Close" className="bp-press" style={{ position: "absolute", right: 18, top: 18, width: 36, height: 36, borderRadius: "50%", border: "none", background: "var(--bp-neutral-100)", color: "var(--text-body)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <FIcon name="x" size={18} />
        </button>
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, color: "var(--text-strong)", margin: "0 40px 0 0", letterSpacing: "-0.01em" }}>{t.contact.title}</h3>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-body)", marginTop: 8 }}>{t.contact.body}</p>
        <div style={{ marginTop: 22 }}>
          <ContactForm t={t} compact />
        </div>
      </div>
    </div>
  );
}

window.BPFoot = { CTABand, Contact, Footer, StickyCTA, ContactModal };
