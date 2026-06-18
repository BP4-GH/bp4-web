/* BP4 — Mobile app (React). Exposed on window.BPMobile.
   Implements a responsive, native-React mobile layout based on the
   reference prototype. Uses inline styles and tokens from the design system.
*/

const { Icon: MIcon, Container: MContainer, ClientLogo: MClientLogo } = window.BPUI;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(() => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  React.useEffect(() => {
    try {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      const handler = (e) => setReduced(e.matches);
      if (mq.addEventListener) mq.addEventListener('change', handler); else mq.addListener(handler);
      return () => { if (mq.removeEventListener) mq.removeEventListener('change', handler); else mq.removeListener(handler); };
    } catch (e) {}
  }, []);
  return reduced;
}

function MobileHeader({ t, lang, setLang, openMenu }) {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 30, background: 'rgba(14,53,65,0.92)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingTop: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 14px' }}>
        <img src="assets/bp4-logo-white.png" alt="bp4" style={{ height: 28, width: 'auto', display: 'block' }} />
        <div style={{ marginLeft: 'auto', display: 'inline-flex', background: 'rgba(255,255,255,0.12)', borderRadius: 'var(--radius-pill)', padding: 3 }}>
          {['es','en'].map((l) => {
            const on = lang === l;
            return (
              <button key={l} onClick={() => setLang(l)} className="bp-press" style={{ border: 'none', cursor: 'pointer', padding: '6px 12px', borderRadius: 'var(--radius-pill)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, background: on ? '#fff' : 'transparent', color: on ? 'var(--bp-musgo)' : 'rgba(255,255,255,0.7)' }}>{l.toUpperCase()}</button>
            );
          })}
        </div>
        <button onClick={openMenu} aria-label="Menu" className="bp4m-press bp-press" style={{ flex: 'none', width: 40, height: 40, borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.16)', background: 'rgba(255,255,255,0.08)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <MIcon name="menu" size={20} />
        </button>
      </div>
      <nav style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '8px 12px 14px', WebkitOverflowScrolling: 'touch' }}>
        {t.nav.map((n) => (
          <button key={n.id} onClick={() => { window.requestAnimationFrame(() => { const el = document.getElementById(n.id); if (el) { const y = el.getBoundingClientRect().top + window.scrollY - 72; window.scrollTo({ top: y, behavior: 'smooth' }); } }); }} className="bp-press" style={{ flex: 'none', border: '1px solid rgba(255,255,255,0.16)', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.88)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, padding: '7px 14px', borderRadius: 'var(--radius-pill)', whiteSpace: 'nowrap' }}>{n.label}</button>
        ))}
      </nav>
    </header>
  );
}

function HeroMobile({ t, onStart }) {
  const h = t.hero.v3 || t.hero;
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--surface-inverse)', padding: '22px 16px 28px' }}>
      <div aria-hidden style={{ position: 'absolute', width: 360, height: 360, background: 'rgba(255,142,9,0.16)', borderRadius: '42% 58% 56% 44% / 48% 44% 56% 52%', right: '-34%', top: '-16%' }} />
      <div aria-hidden style={{ position: 'absolute', width: 220, height: 220, background: 'rgba(0,166,166,0.13)', borderRadius: '63% 37% 54% 46% / 42% 56% 44% 58%', left: '-28%', bottom: '-10%' }} />
      <div style={{ position: 'relative' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--bp-orange-400)' }}><MIcon name="sparkles" size={15} /> {h.kicker}</span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, lineHeight: 1.04, letterSpacing: '-0.035em', color: '#fff', margin: '12px 0 0' }}>{h.title1} <em style={{ fontStyle: 'italic', color: 'var(--bp-orange-400)' }}>{h.titleEm}</em></h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.58, color: 'rgba(255,255,255,0.8)', marginTop: 12 }}>{h.body}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
          <button onClick={onStart} className="bp-press" style={{ padding: '13px 18px', border: 'none', borderRadius: 'var(--radius-lg)', background: 'var(--color-brand)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, cursor: 'pointer', boxShadow: 'var(--shadow-brand)' }}>{t.cta} <MIcon name="arrow-right" size={16} /></button>
          <button onClick={() => { const el = document.getElementById('modelo'); if (el) { const y = el.getBoundingClientRect().top + window.scrollY - 72; window.scrollTo({ top: y, behavior: 'smooth' }); } }} className="bp-press" style={{ padding: '12px 18px', borderRadius: 'var(--radius-lg)', background: 'rgba(255,255,255,0.08)', border: '2px solid rgba(255,255,255,0.24)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>{h.secondary || t.hero.secondary}</button>
        </div>

        <div style={{ display: 'flex', gap: 18, marginTop: 18 }}>
          {(t.stats || []).slice(0,3).map((s, i) => (
            <div key={i} style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: '#fff' }}>{s[0]}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 11.5, color: 'rgba(255,255,255,0.6)', marginTop: 6 }}>{s[1]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClientsMobile({ t }) {
  const logos = window.BP_CLIENT_LOGOS || [];
  const trackRef = React.useRef(null);
  const reduced = usePrefersReducedMotion();

  React.useEffect(() => {
    if (!trackRef.current || reduced || logos.length === 0) return;
    const el = trackRef.current;
    let rafId = null;
    const speed = 0.5; // px per frame
    function step() {
      if (!el) return;
      el.scrollLeft = (el.scrollLeft + speed) % (el.scrollWidth / 2);
      rafId = requestAnimationFrame(step);
    }
    rafId = requestAnimationFrame(step);
    return () => { if (rafId) cancelAnimationFrame(rafId); };
  }, [reduced, logos.length]);

  if (!logos.length) return (
    <section id="clientes" style={{ padding: '34px 16px', background: 'var(--surface-card)' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{t.clients.eyebrow}</div>
      <h2 style={{ marginTop: 8 }}>{t.clients.title}</h2>
      <p style={{ marginTop: 8 }}>{t.clients.body}</p>
    </section>
  );

  const row = logos.concat(logos);
  return (
    <section id="clientes" style={{ padding: '26px 12px', background: 'var(--surface-card)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-brand)' }}>{t.clients.eyebrow}</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, margin: '8px 0 0' }}>{t.clients.title}</h2>
          <p style={{ marginTop: 8, color: 'var(--text-body)' }}>{t.clients.body}</p>
        </div>
        <div style={{ flex: 'none', background: 'var(--bp-orange-50)', borderRadius: 'var(--radius-xl)', padding: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 34, color: 'var(--color-brand)' }}>+100</div>
          <div style={{ fontSize: 13 }}>{t.clients.stat}</div>
        </div>
      </div>

      <div style={{ marginTop: 18, overflow: 'hidden', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent)', maskImage: 'linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent)' }}>
        <div ref={trackRef} style={{ display: 'flex', gap: 42, padding: '12px 0', overflowX: 'auto', scrollBehavior: 'smooth' }} aria-hidden>
          {row.map((l, i) => <div key={i} style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', color: 'var(--bp-neutral-400)' }} dangerouslySetInnerHTML={{ __html: l.svg }} />)}
        </div>
      </div>
    </section>
  );
}

function ContactMobile({ t }) {
  const C = window.BP_CONTACT || {};
  const [sent, setSent] = React.useState(false);
  const [vals, setVals] = React.useState({});
  const set = (k, v) => setVals((p) => ({ ...p, [k]: v }));
  const submit = () => {
    const subject = encodeURIComponent('Consulta desde la web BP4');
    const body = encodeURIComponent(`Nombre: ${vals.name || ''}\nEmail: ${vals.email || ''}\nNecesito: ${vals.need || ''}`);
    window.location.href = `mailto:${C.email || 'hello@bp-4.com'}?subject=${subject}&body=${body}`;
    setSent(true);
  };
  return (
    <section id="contacto" style={{ padding: '26px 14px', background: 'var(--surface-inverse)' }}>
      <div style={{ color: 'rgba(255,255,255,0.78)', marginBottom: 12 }}>{t.contact.eyebrow}</div>
      <h2 style={{ color: '#fff' }}>{t.contact.title}</h2>
      <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>{t.contact.body}</p>
      <div style={{ marginTop: 14, background: 'var(--surface-card)', borderRadius: 'var(--radius-2xl)', padding: 16 }}>
        {sent ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 60, height: 60, borderRadius: 999, background: 'var(--bp-teal-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}><MIcon name="check" size={28} /></div>
            <div style={{ fontWeight: 800 }}>{t.contact.successTitle}</div>
            <div style={{ marginTop: 8 }}>{t.contact.successBody}</div>
            <button onClick={() => { setSent(false); setVals({}); }} className="bp-press" style={{ marginTop: 14, padding: '10px 16px', borderRadius: 'var(--radius-lg)', background: 'var(--color-brand)', color: '#fff', border: 'none' }}>{t.contact.another}</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {t.contact.fields.map((f) => (
              <label key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontWeight: 700 }}>{f.label}</div>
                {f.area ? (
                  <textarea value={vals[f.key] || ''} onChange={(e) => set(f.key, e.target.value)} placeholder={f.ph} rows={3} style={{ padding: 10, borderRadius: 'var(--radius-md)' }} />
                ) : (
                  <input value={vals[f.key] || ''} onChange={(e) => set(f.key, e.target.value)} placeholder={f.ph} style={{ padding: 10, borderRadius: 'var(--radius-md)' }} />
                )}
              </label>
            ))}
            <button onClick={submit} className="bp-press" style={{ padding: '12px', borderRadius: 'var(--radius-lg)', background: 'var(--color-brand)', color: '#fff', border: 'none', fontWeight: 700 }}>{t.contact.submit}</button>
          </div>
        )}
      </div>
      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <a href={C.whatsapp} target="_blank" rel="noreferrer" style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 12, borderRadius: 'var(--radius-lg)', textDecoration: 'none', background: 'rgba(255,255,255,0.06)' }} className="bp-press"><MIcon name="message-circle" size={18} /> WhatsApp</a>
        <a href={`mailto:${C.email}`} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 12, borderRadius: 'var(--radius-lg)', textDecoration: 'none', background: 'rgba(255,255,255,0.06)' }} className="bp-press"><MIcon name="mail" size={18} /> Email</a>
      </div>
    </section>
  );
}

function StickyBar({ t }) {
  const C = window.BP_CONTACT || {};
  return (
    <div style={{ position: 'fixed', bottom: 12, left: 12, right: 12, display: 'flex', gap: 10, zIndex: 40 }}>
      <button onClick={() => { const el = document.getElementById('contacto'); if (el) { const y = el.getBoundingClientRect().top + window.scrollY - 72; window.scrollTo({ top: y, behavior: 'smooth' }); } }} className="bp-press" style={{ flex: 1, padding: 14, border: 'none', borderRadius: 'var(--radius-lg)', background: 'var(--color-brand)', color: '#fff', fontWeight: 700 }}> {t.cta} </button>
      <a href={C.whatsapp} target="_blank" rel="noreferrer" className="bp-press" style={{ width: 56, borderRadius: 'var(--radius-lg)', background: 'var(--bp-teal-500)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}><MIcon name="message-circle" size={18} /></a>
    </div>
  );
}

function MobileApp({ t, lang, setLang, goTo, onStart }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <div style={{ background: 'var(--surface-page)', minHeight: '100vh' }}>
      <MobileHeader t={t} lang={lang} setLang={setLang} openMenu={() => setMenuOpen(true)} />
      <main>
        <HeroMobile t={t} onStart={onStart} />
        <ClientsMobile t={t} />
        <section id="modelo" style={{ padding: '26px 14px', background: 'var(--surface-card)' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{t.model.eyebrow}</div>
          <h2 style={{ marginTop: 8 }}>{t.model.title1} <em style={{ fontStyle: 'italic', color: 'var(--color-brand)' }}>{t.model.titleEm}</em></h2>
          <p style={{ marginTop: 8 }}>{t.model.body}</p>
          <div style={{ marginTop: 12 }}>
            {t.model.pillars.map((p) => (
              <div key={p.title} style={{ background: 'var(--surface-page)', borderRadius: 'var(--radius-xl)', padding: 12, marginTop: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}><MIcon name={p.icon} size={20} /> <div style={{ fontWeight: 800 }}>{p.tag}</div></div>
                  <div style={{ fontWeight: 800, fontSize: 18 }}>{p.tag}</div>
                </div>
                <h3 style={{ marginTop: 8 }}>{p.title}</h3>
                <p style={{ marginTop: 8 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="recruiting" style={{ padding: '22px 14px', background: 'var(--surface-page)' }}>
          <div style={{ fontWeight: 700 }}>{t.recruiting.eyebrow}</div>
          <h2 style={{ marginTop: 8 }}>{t.recruiting.title}</h2>
          <p style={{ marginTop: 8 }}>{t.recruiting.body}</p>
        </section>

        <section id="people-care" style={{ padding: '22px 14px', background: 'var(--surface-card)' }}>
          <div style={{ fontWeight: 700 }}>{t.peopleCare.eyebrow}</div>
          <h2 style={{ marginTop: 8 }}>{t.peopleCare.title}</h2>
          <p style={{ marginTop: 8 }}>{t.peopleCare.body}</p>
        </section>

        <section id="reporting" style={{ padding: '22px 14px', background: 'var(--surface-page)' }}>
          <div style={{ fontWeight: 700 }}>{t.reporting.eyebrow}</div>
          <h2 style={{ marginTop: 8 }}>{t.reporting.title}</h2>
          <p style={{ marginTop: 8 }}>{t.reporting.body}</p>
        </section>

        <section id="ia" style={{ padding: '22px 14px', background: 'var(--surface-card)' }}>
          <div style={{ fontWeight: 700 }}>{t.ai.eyebrow}</div>
          <h2 style={{ marginTop: 8 }}>{t.ai.title}</h2>
          <p style={{ marginTop: 8 }}>{t.ai.body}</p>
        </section>

        <section style={{ padding: '22px 14px', background: 'var(--surface-page)' }}>
          <div style={{ fontWeight: 700 }}>{t.diff.eyebrow}</div>
          <h2 style={{ marginTop: 8 }}>{t.diff.title}</h2>
          <p style={{ marginTop: 8 }}>{t.diff.punch}</p>
        </section>

        <section style={{ padding: '22px 14px', background: 'var(--surface-card)' }}>
          <h2 style={{ marginTop: 0 }}>{t.vision.title}</h2>
          <p style={{ marginTop: 8 }}>{t.vision.body}</p>
        </section>

        <section style={{ padding: '22px 14px', background: 'var(--surface-page)' }}>
          <div style={{ background: 'var(--color-brand)', borderRadius: 'var(--radius-2xl)', padding: 18, color: '#fff' }}>
            <h3 style={{ margin: 0 }}>{t.ctaBand.title}</h3>
            <p style={{ marginTop: 8 }}>{t.ctaBand.body}</p>
            <div style={{ marginTop: 12 }}>
              <button onClick={onStart} className="bp-press" style={{ padding: '12px 14px', borderRadius: 'var(--radius-lg)', background: 'var(--surface-inverse)', color: '#fff', border: 'none' }}>{t.ctaBand.button}</button>
            </div>
          </div>
        </section>

        <ContactMobile t={t} />
        <footer style={{ padding: '18px 14px', background: 'var(--bp-musgo-900)', color: 'rgba(255,255,255,0.85)' }}>
          <img src="assets/bp4-logo-white.png" alt="bp4" style={{ height: 28 }} />
          <div style={{ marginTop: 12 }}>{t.footer.tagline}</div>
          <div style={{ marginTop: 12, fontSize: 12 }}>{t.footer.legal}</div>
        </footer>
      </main>

      <StickyBar t={t} />

      {menuOpen && (
        <div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(14,53,65,0.55)', display: 'flex', justifyContent: 'flex-end' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: '78%', maxWidth: 360, background: 'var(--surface-card)', padding: 18, borderRadius: '0 0 var(--radius-2xl) var(--radius-2xl)', marginTop: 72 }}>
            {t.nav.map((n) => <button key={n.id} onClick={() => { setMenuOpen(false); const el = document.getElementById(n.id); if (el) { const y = el.getBoundingClientRect().top + window.scrollY - 72; window.scrollTo({ top: y, behavior: 'smooth' }); } }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 8px', background: 'transparent', border: 'none', fontWeight: 700 }}>{n.label}</button>)}
            <button onClick={() => { setMenuOpen(false); const el = document.getElementById('contacto'); if (el) { const y = el.getBoundingClientRect().top + window.scrollY - 72; window.scrollTo({ top: y, behavior: 'smooth' }); } }} style={{ marginTop: 6, padding: 12, width: '100%', border: 'none', background: 'transparent', textAlign: 'left' }}>{t.candidate}</button>
          </div>
        </div>
      )}
    </div>
  );
}

window.BPMobile = { MobileApp };
