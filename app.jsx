/* BP4 — App shell: estado, idioma, smooth-scroll nav.
   Narrativa: gestión integral de talento (desafío → modelo → recruiting → people care
   → reporting → IA → diferencial → visión). */

const { Hero } = window.BPHero;
const { Header } = window.BPHeader;
const { Clients, Challenge, Model } = window.BPSecA;
const { Recruiting, PeopleCare } = window.BPSecB;
const { Reporting, AI, Differentiators, Vision } = window.BPSecC;
const { CTABand, Contact, Footer, StickyCTA, ContactModal } = window.BPFoot;

function App() {
  const [lang, setLang] = React.useState(() => localStorage.getItem("bp4-lang") || "es");
  const [modal, setModal] = React.useState(false);
  const t = { ...window.BP[lang], lang };
  const clients = window.BP_CLIENT_LOGOS;

  React.useEffect(() => { localStorage.setItem("bp4-lang", lang); }, [lang]);
  React.useEffect(() => { document.documentElement.lang = t.code; }, [t.code]);
  React.useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });

  const goTo = React.useCallback((id) => {
    if (id === "top") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  const onStart = () => setModal(true);

  return (
    <div style={{ background: "var(--surface-page)" }}>
      <a id="top" />
      <Header t={t} lang={lang} setLang={setLang} onStart={onStart} goTo={goTo} />
      <Hero t={t} variant={3} onStart={onStart} goTo={goTo} />
      <Clients t={t} clients={clients} />
      <Challenge t={t} />
      <Model t={t} />
      <Recruiting t={t} />
      <PeopleCare t={t} />
      <Reporting t={t} />
      <AI t={t} />
      <Differentiators t={t} />
      <Vision t={t} />
      <CTABand t={t} onStart={onStart} />
      <Contact t={t} />
      <Footer t={t} goTo={goTo} />
      <StickyCTA t={t} onStart={onStart} />
      <ContactModal t={t} open={modal} onClose={() => setModal(false)} />
    </div>
  );
}

window.__bpRoot = window.__bpRoot || ReactDOM.createRoot(document.getElementById("root"));
window.__bpRoot.render(<App />);
