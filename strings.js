/* BP4 — capa de copy bilingüe (es-419 · en) para el sitio.
   Narrativa basada en el "Documento de Posicionamiento Institucional y Propuesta de Valor":
   gestión integral de talento tecnológico sobre 4 pilares (Recruiting · People Care ·
   Reporting · Desarrollo y Capacitaciones). Toda la copy user-facing vive acá.
   Expuesto en window.BP. */

window.BP = {
  es: {
    code: "es-419",
    nav: [
      { id: "modelo", label: "El modelo" },
      { id: "people-care", label: "People Care" },
      { id: "reporting", label: "Reporting" },
      { id: "recruiting", label: "Recruiting" },
      { id: "ia", label: "IA" },
      { id: "clientes", label: "Clientes" },
      { id: "contacto", label: "Contacto" },
    ],
    candidate: "¿Buscás trabajo?",
    cta: "Hablemos",
    ctaShort: "Hablemos",

    hero: {
      eyebrow: "Gestión integral de talento · +13 años",
      v1: {
        kicker: "El mejor staffing nace del match correcto.",
        title1: "Alineamos talento, cultura y objetivos para construir equipos que",
        titleEm: "permanecen.",
        body: "Combinamos recruiting especializado, gestión continua de personas, métricas y capacitación en un solo modelo. Así sostenemos equipos de alto desempeño a lo largo del tiempo.",
      },
      v3: {
        kicker: "El mejor staffing nace del match correcto.",
        title1: "Alineamos talento, cultura y objetivos para construir equipos que",
        titleEm: "permanecen.",
        body: "Combinamos recruiting especializado, gestión continua de personas, métricas y capacitación en un solo modelo. Así sostenemos equipos de alto desempeño a lo largo del tiempo.",
      },
      primary: "Hablemos de tu equipo",
      secondary: "Conocé el modelo",
      trustLine: "Gestionamos equipos en:",
      snapshot: {
        title: "Salud de la cuenta",
        account: "Cuenta · Banca",
        statusLabel: "Operación estable",
        metrics: [
          { label: "Dotación activa", value: "24", tone: "ink" },
          { label: "Renovaciones al día", value: "100%", tone: "teal" },
          { label: "Riesgos detectados", value: "2", tone: "orange" },
        ],
        pillarsLabel: "Pilares activos",
        pillars: ["Recruiting", "People Care", "Reporting", "Capacitación"],
      },
    },

    stats: [
      ["+13", "años gestionando talento tech"],
      ["+100", "colaboradores en proyectos críticos"],
      ["+10", "empresas líderes confían en BP4"],
      ["4", "capacidades integradas en un modelo"],
    ],

    clients: {
      eyebrow: "Clientes",
      title: "Gestionamos equipos para empresas líderes",
      body: "Banca, telco, consumo masivo, salud, automotriz y tecnología. Organizaciones que confían a BP4 la gestión de sus equipos tecnológicos.",
      stat: "+100 colaboradores gestionados en proyectos críticos de negocio.",
      trustLabel: "Empresas que confían en nosotros",
    },

    challenge: {
      eyebrow: "El desafío",
      title1: "Incorporar talento es importante.",
      titleEm: "Sostenerlo es lo que genera valor.",
      body: "La mayoría de las compañías concentra el esfuerzo en contratar. Pero la experiencia demuestra que los mayores desafíos aparecen después de la incorporación — y ahí es donde se define el resultado.",
      needsTitle: "Lo que cada parte necesita",
      needs: [
        { who: "Los equipos", what: "mantenerse productivos, motivados y alineados al negocio." },
        { who: "Los líderes", what: "visibilidad sobre lo que pasa en la operación." },
        { who: "Recursos Humanos", what: "información clara para decidir." },
        { who: "Tecnología", what: "estabilidad operativa sostenida." },
        { who: "Los colaboradores", what: "acompañamiento, desarrollo y claridad sobre su crecimiento." },
      ],
      risksTitle: "Cuando algo de eso falla",
      risksLead: "Aparecen los costos que nadie planifica:",
      risks: ["Rotación", "Pérdida de productividad", "Demoras en proyectos", "Desgaste de los equipos", "Aumento de costos"],
      close: "BP4 fue construido para gestionar esa complejidad.",
    },

    model: {
      eyebrow: "Nuestro modelo",
      title1: "Cuatro capacidades integradas,",
      titleEm: "un solo equipo.",
      body: "Evolucionamos desde un modelo tradicional de staffing hacia un modelo integral de gestión de talento. La integración de estas cuatro dimensiones brinda una experiencia consistente para el cliente y para el colaborador.",
      pillars: [
        { icon: "search", tag: "01", title: "Recruiting", body: "Identificación, evaluación e incorporación de talento tecnológico especializado." },
        { icon: "heart-handshake", tag: "02", title: "People Care", body: "Gestión continua de cada colaborador durante toda su permanencia en el proyecto." },
        { icon: "bar-chart-3", tag: "03", title: "Reporting", body: "Métricas e información accionable para la toma de decisiones." },
        { icon: "graduation-cap", tag: "04", title: "Desarrollo y Capacitaciones", body: "Evolución de las capacidades técnicas y profesionales de los equipos." },
      ],
    },

    recruiting: {
      eyebrow: "Recruiting",
      title: "Recruiting especializado en tecnología",
      body: "Nuestro equipo trabaja exclusivamente sobre perfiles tecnológicos. El conocimiento técnico acumulado durante años en la industria nos permite comprender cada requerimiento y evaluar con una mirada alineada a la realidad de los proyectos.",
      profilesTitle: "Perfiles que buscamos",
      profiles: [
        "Backend", "Frontend", "Fullstack", "Consultores SAP", "Consultores COBOL",
        "UX/UI", "QA Manual & Automation", "Analistas Funcionales", "Scrum Masters",
        "Project Managers", "Líderes Técnicos", "Arquitectos", "Especialistas Cloud", "Perfiles de IA",
      ],
      punch: "Nuestro objetivo no es presentar candidatos. Es generar el mejor match posible entre el profesional, el proyecto y la organización.",
    },

    peopleCare: {
      eyebrow: "People Care",
      title: "El corazón del modelo BP4",
      body: "A diferencia del staff augmentation tradicional, donde la relación con el colaborador disminuye una vez hecha la incorporación, BP4 mantiene una gestión activa y permanente durante toda la asignación. Detectamos oportunidades de mejora y riesgos antes de que impacten en la operación.",
      dims: [
        {
          tag: "Dimensión operativa", icon: "clipboard-list",
          items: ["Gestión contractual", "Renovaciones y ajustes", "Licencias y vacaciones", "Horas y horas extra", "Consumo de presupuesto", "Seguimiento administrativo", "Control de desvíos operativos"],
        },
        {
          tag: "Dimensión humana", icon: "heart",
          items: ["Clima laboral", "Motivación y satisfacción", "Integración al equipo", "Relación con líderes", "Expectativas profesionales", "Desarrollo de carrera", "Sentido de pertenencia"],
        },
      ],
      dimsLead: "Combinamos dos dimensiones complementarias para comprender el contexto completo de cada colaborador — y actuar antes de que los problemas se materialicen.",
      focalTitle: "El rol del focal point",
      focalBody: "Trabajamos junto a un referente designado por el cliente —habitualmente de Recursos Humanos o Talent Management— para centralizar la comunicación, consolidar información de distintos equipos y asegurar una visión integral sobre la dotación. No reemplaza la relación con los managers: la ordena y la potencia.",
    },

    reporting: {
      eyebrow: "Reporting",
      title: "Gestión basada en datos, no en intuición",
      body: "La estabilidad de los equipos no se gestiona por intuición. Se gestiona con información. A través de seguimiento continuo, reuniones periódicas y análisis de datos, transformamos información dispersa en conocimiento útil para decidir.",
      measureTitle: "Qué medimos",
      measures: [
        "Rotación", "Riesgos detectados", "Intervenciones realizadas", "Tiempo de cobertura",
        "Renovaciones y continuidad", "Evolución de la dotación", "Desvíos operativos",
        "Match colaborador–proyecto", "Necesidades de capacitación", "Salud general de la cuenta",
      ],
      reportTitle: "Reporte ejecutivo + dashboards",
      reportBody: "Consolidamos lo más relevante de cada cuenta en un reporte ejecutivo y lo complementamos con dashboards interactivos para visualizar los datos en tiempo real. El objetivo no es solo describir lo que ocurrió — es anticipar lo que puede ocurrir.",
      stack: { reportLabel: "Reporte ejecutivo", dashLabel: "Dashboard en vivo" },
      detectTitle: "Qué nos permite anticipar",
      detect: [
        "Desajustes entre seniority y responsabilidades",
        "Necesidades de capacitación",
        "Riesgos de rotación",
        "Problemas de adaptación al proyecto",
        "Sobrecarga de trabajo y horas extra",
        "Expectativas desalineadas",
        "Oportunidades de desarrollo profesional",
      ],
    },

    ai: {
      eyebrow: "Innovación",
      title: "Inteligencia Artificial aplicada a tus equipos",
      body: "La IA ya forma parte del día a día de los profesionales tecnológicos. Desarrollamos una línea específica enfocada en adopción, capacitación y medición de impacto. Nuestro objetivo no es solo enseñar herramientas — es ayudar a los equipos a capturar valor real a partir de ellas.",
      utnTag: "Partnership",
      utnTitle: "Programas junto a la UTN",
      utnBody: "Junto a la Universidad Tecnológica Nacional desarrollamos programas de capacitación orientados a equipos de desarrollo, para transformar la adopción espontánea de IA en una ventaja competitiva medible.",
      items: [
        "Diagnóstico inicial", "Formación práctica", "Casos de uso reales",
        "Frameworks de adopción", "Construcción de playbooks", "Métricas de impacto", "Roadmaps de implementación",
      ],
    },

    diff: {
      eyebrow: "Qué nos diferencia",
      title: "Combinamos lo que otros tienen separado.",
      verbs: ["Reclutamos.", "Gestionamos.", "Medimos.", "Desarrollamos.", "Capacitamos.", "Acompañamos."],
      body: "Y transformamos toda esa información en decisiones concretas que mejoran la continuidad y el desempeño de los equipos.",
      punch: "Nuestro diferencial no es únicamente encontrar talento. Es ayudar a que ese talento permanezca, evolucione y genere impacto sostenido en el tiempo.",
    },

    vision: {
      eyebrow: "Nuestra visión",
      title: "El socio estratégico para construir y sostener equipos tech de alto desempeño.",
      body: "Combinamos experiencia técnica, gestión basada en métricas, cercanía con las personas y una mirada permanente sobre la evolución del mercado. Porque los mejores resultados se logran cuando la tecnología, los procesos y las personas trabajan en la misma dirección.",
    },

    ctaBand: {
      eyebrow: "Empecemos",
      title: "Construyamos tu próxima operación tecnológica",
      body: "Contanos qué equipo necesitás gestionar y te mostramos cómo trabajamos. Te respondemos en 24 horas. O escribinos directo por WhatsApp.",
      button: "Hablemos de tu equipo",
      whatsapp: "Escribinos por WhatsApp",
    },

    contact: {
      eyebrow: "Hablemos",
      title: "Hablemos de tu equipo",
      body: "Contanos qué buscás y nos ponemos en campaña. Te respondemos en 24hs.",
      fields: [
        { key: "name", label: "Tu nombre", ph: "¿Cómo te llamás?" },
        { key: "email", label: "Email de trabajo", ph: "vos@empresa.com" },
        { key: "company", label: "Empresa", ph: "Nombre de tu empresa" },
        { key: "need", label: "¿En qué podemos ayudarte?", ph: "Ej: gestionar un squad de 8 devs + QA", area: true },
      ],
      submit: "Enviar consulta",
      hint: "Te respondemos en 24hs. Sin compromiso.",
      successTitle: "¡Listo!",
      successBody: "Recibimos tu mensaje. Te respondemos en 24hs. ¡Gracias por escribirnos!",
      another: "Enviar otra consulta",
      directTitle: "O escribinos directo",
    },

    footer: {
      tagline: "Gestión integral de talento tecnológico. Reclutamos, cuidamos, medimos y desarrollamos equipos de software.",
      somos: ["Somos IT.", "Gestionamos talento", "de punta a punta."],
      cols: [
        { h: "Modelo", items: ["Recruiting", "People Care", "Reporting", "Capacitaciones"] },
        { h: "Empresa", items: ["El modelo", "Clientes", "Visión"] },
      ],
      contactH: "Contacto",
      address: "Chile 537, Buenos Aires, Argentina",
      legal: "© 2026 BP4. Todos los derechos reservados. Hecho con buena onda.",
    },
  },

  en: {
    code: "en",
    nav: [
      { id: "modelo", label: "The model" },
      { id: "people-care", label: "People Care" },
      { id: "reporting", label: "Reporting" },
      { id: "recruiting", label: "Recruiting" },
      { id: "ia", label: "AI" },
      { id: "clientes", label: "Clients" },
      { id: "contacto", label: "Contact" },
    ],
    candidate: "Looking for a job?",
    cta: "Let's talk",
    ctaShort: "Let's talk",

    hero: {
      eyebrow: "End-to-end talent management · 13+ years",
      v1: {
        kicker: "Great staffing starts with the right match.",
        title1: "We align talent, culture and goals to build teams that",
        titleEm: "stay.",
        body: "We combine specialized recruiting, continuous people management, metrics and training in a single model. That's how we sustain high-performance teams over time.",
      },
      v3: {
        kicker: "Great staffing starts with the right match.",
        title1: "We align talent, culture and goals to build teams that",
        titleEm: "stay.",
        body: "We combine specialized recruiting, continuous people management, metrics and training in a single model. That's how we sustain high-performance teams over time.",
      },
      primary: "Let's talk about your team",
      secondary: "See the model",
      trustLine: "We manage teams at:",
      snapshot: {
        title: "Account health",
        account: "Account · Banking",
        statusLabel: "Stable operation",
        metrics: [
          { label: "Active headcount", value: "24", tone: "ink" },
          { label: "Renewals on track", value: "100%", tone: "teal" },
          { label: "Risks flagged", value: "2", tone: "orange" },
        ],
        pillarsLabel: "Active pillars",
        pillars: ["Recruiting", "People Care", "Reporting", "Training"],
      },
    },

    stats: [
      ["13+", "years managing tech talent"],
      ["100+", "people on critical projects"],
      ["10+", "leading companies trust BP4"],
      ["4", "capabilities in one model"],
    ],

    clients: {
      eyebrow: "Clients",
      title: "We manage teams for leading companies",
      body: "Banking, telco, consumer goods, healthcare, automotive and tech. Organizations that trust BP4 to manage their technology teams.",
      stat: "100+ people managed on business-critical projects.",
      trustLabel: "Companies that trust us",
    },

    challenge: {
      eyebrow: "The challenge",
      title1: "Hiring talent matters.",
      titleEm: "Sustaining it is what creates value.",
      body: "Most companies focus their effort on hiring. But experience shows the biggest challenges appear after onboarding — and that's where the outcome is decided.",
      needsTitle: "What each side needs",
      needs: [
        { who: "Teams", what: "to stay productive, motivated and aligned with the business." },
        { who: "Leaders", what: "visibility into what's happening in the operation." },
        { who: "HR", what: "clear information to decide." },
        { who: "Technology", what: "sustained operational stability." },
        { who: "People", what: "support, growth and clarity about their path." },
      ],
      risksTitle: "When any of that fails",
      risksLead: "The costs no one planned for show up:",
      risks: ["Turnover", "Lost productivity", "Project delays", "Team burnout", "Rising costs"],
      close: "BP4 was built to manage that complexity.",
    },

    model: {
      eyebrow: "Our model",
      title1: "Four integrated capabilities,",
      titleEm: "one team.",
      body: "We evolved from a traditional staffing model into an integrated talent-management model. Integrating these four dimensions delivers a consistent experience for both the client and the person.",
      pillars: [
        { icon: "search", tag: "01", title: "Recruiting", body: "Sourcing, assessment and onboarding of specialized tech talent." },
        { icon: "heart-handshake", tag: "02", title: "People Care", body: "Continuous management of every person throughout the assignment." },
        { icon: "bar-chart-3", tag: "03", title: "Reporting", body: "Metrics and actionable information for decision-making." },
        { icon: "graduation-cap", tag: "04", title: "Development & Training", body: "Growing the technical and professional capabilities of teams." },
      ],
    },

    recruiting: {
      eyebrow: "Recruiting",
      title: "Recruiting specialized in technology",
      body: "Our team works exclusively on tech profiles. The technical knowledge built over years in the industry lets us understand each requirement and assess with a lens aligned to the reality of projects.",
      profilesTitle: "Profiles we source",
      profiles: [
        "Backend", "Frontend", "Fullstack", "SAP Consultants", "COBOL Consultants",
        "UX/UI", "QA Manual & Automation", "Functional Analysts", "Scrum Masters",
        "Project Managers", "Tech Leads", "Architects", "Cloud Specialists", "AI Profiles",
      ],
      punch: "Our goal isn't to present candidates. It's to create the best possible match between the professional, the project and the organization.",
    },

    peopleCare: {
      eyebrow: "People Care",
      title: "The heart of the BP4 model",
      body: "Unlike traditional staff augmentation, where the relationship with the person fades once they're onboarded, BP4 keeps active, permanent management throughout the assignment. We spot improvement opportunities and risks before they hit the operation.",
      dims: [
        {
          tag: "Operational dimension", icon: "clipboard-list",
          items: ["Contract management", "Renewals & adjustments", "Leave & vacations", "Hours & overtime", "Budget consumption", "Administrative tracking", "Operational deviation control"],
        },
        {
          tag: "Human dimension", icon: "heart",
          items: ["Work climate", "Motivation & satisfaction", "Team integration", "Relationship with leaders", "Professional expectations", "Career development", "Sense of belonging"],
        },
      ],
      dimsLead: "We combine two complementary dimensions to understand each person's full context — and act before problems materialize.",
      focalTitle: "The focal point role",
      focalBody: "We work alongside a client-designated referent —usually from HR or Talent Management— to centralize communication, consolidate information across teams and ensure an integral view of the headcount. It doesn't replace the relationship with managers: it organizes and amplifies it.",
    },

    reporting: {
      eyebrow: "Reporting",
      title: "Data-driven management, not intuition",
      body: "Team stability isn't managed by intuition. It's managed with information. Through continuous follow-up, periodic meetings and data analysis, we turn scattered information into knowledge that's useful for deciding.",
      measureTitle: "What we measure",
      measures: [
        "Turnover", "Risks flagged", "Interventions made", "Coverage time",
        "Renewals & continuity", "Headcount evolution", "Operational deviations",
        "Person–project match", "Training needs", "Overall account health",
      ],
      reportTitle: "Executive report + dashboards",
      reportBody: "We consolidate each account's most relevant information into an executive report, complemented by interactive dashboards to visualize the data in real time. Its goal isn't only to describe what happened — it's to anticipate what may happen.",
      stack: { reportLabel: "Executive report", dashLabel: "Live dashboard" },
      detectTitle: "What it lets us anticipate",
      detect: [
        "Seniority vs. responsibility mismatches",
        "Training needs",
        "Turnover risks",
        "Project adaptation issues",
        "Workload and overtime",
        "Misaligned expectations",
        "Professional development opportunities",
      ],
    },

    ai: {
      eyebrow: "Innovation",
      title: "Artificial Intelligence applied to your teams",
      body: "AI is already part of tech professionals' day-to-day. We built a dedicated practice focused on adoption, training and impact measurement. Our goal isn't only to teach tools — it's to help teams capture real value from them.",
      utnTag: "Partnership",
      utnTitle: "Programs with UTN",
      utnBody: "Together with Universidad Tecnológica Nacional we develop training programs for development teams, turning spontaneous AI adoption into a measurable competitive advantage.",
      items: [
        "Initial diagnosis", "Hands-on training", "Real use cases",
        "Adoption frameworks", "Playbook building", "Impact metrics", "Implementation roadmaps",
      ],
    },

    diff: {
      eyebrow: "What sets us apart",
      title: "We combine what others keep separate.",
      verbs: ["We recruit.", "We manage.", "We measure.", "We develop.", "We train.", "We support."],
      body: "And we turn all that information into concrete decisions that improve the continuity and performance of teams.",
      punch: "Our edge isn't only finding talent. It's helping that talent stay, evolve and create sustained impact over time.",
    },

    vision: {
      eyebrow: "Our vision",
      title: "The strategic partner to build and sustain high-performance tech teams.",
      body: "We combine technical experience, metrics-based management, closeness to people and a permanent eye on how the market evolves. Because the best results happen when technology, processes and people move in the same direction.",
    },

    ctaBand: {
      eyebrow: "Let's start",
      title: "Let's build your next technology operation",
      body: "Tell us which team you need to manage and we'll show you how we work. We reply within 24 hours. Or message us directly on WhatsApp.",
      button: "Let's talk about your team",
      whatsapp: "Message us on WhatsApp",
    },

    contact: {
      eyebrow: "Let's talk",
      title: "Let's talk about your team",
      body: "Tell us what you're after and we'll get to work. We reply within 24h.",
      fields: [
        { key: "name", label: "Your name", ph: "What's your name?" },
        { key: "email", label: "Work email", ph: "you@company.com" },
        { key: "company", label: "Company", ph: "Your company name" },
        { key: "need", label: "How can we help?", ph: "e.g. manage a squad of 8 devs + QA", area: true },
      ],
      submit: "Send request",
      hint: "We reply within 24h. No strings attached.",
      successTitle: "Done!",
      successBody: "We got your message. We'll reply within 24h. Thanks for reaching out!",
      another: "Send another request",
      directTitle: "Or reach us directly",
    },

    footer: {
      tagline: "End-to-end tech talent management. We recruit, care for, measure and develop software teams.",
      somos: ["We're IT.", "We manage talent", "end to end."],
      cols: [
        { h: "Model", items: ["Recruiting", "People Care", "Reporting", "Training"] },
        { h: "Company", items: ["The model", "Clients", "Vision"] },
      ],
      contactH: "Contact",
      address: "Chile 537, Buenos Aires, Argentina",
      legal: "© 2026 BP4. All rights reserved. Made with good vibes.",
    },
  },
};

/* Contact constants */
window.BP_CONTACT = {
  whatsapp: "https://wa.me/5491164812711",
  whatsappText: "?text=Hola,%20quisiera%20saber%20m%C3%A1s%20sobre%20ustedes",
  email: "hello@bp-4.com",
  phone: "+54 9 11 6481-2711",
  linkedin: "https://www.linkedin.com/company/bp4/",
  maps: "https://maps.app.goo.gl/Tkwnt6vTdSgQCxPr6",
};
