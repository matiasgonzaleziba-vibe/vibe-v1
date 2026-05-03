import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Menu,
  X,
  MapPin,
  CalendarDays,
  Users,
  ShieldCheck,
  Coffee,
  Gamepad2,
  Music,
  TreePine,
  PartyPopper,
  ArrowRight,
  Sparkles,
  MessageCircle,
  Dumbbell,
  BadgeCheck,
} from "lucide-react";
import "./styles.css";

const categories = [
  { key: "all", label: "Todos", icon: Sparkles },
  { key: "cafe", label: "VIBE Café", icon: Coffee },
  { key: "juegos", label: "VIBE Juegos", icon: Gamepad2 },
  { key: "musica", label: "VIBE Música", icon: Music },
  { key: "outdoor", label: "VIBE Outdoor", icon: TreePine },
  { key: "fiesta", label: "VIBE Fiesta", icon: PartyPopper },
];

const plans = [
  {
    id: 1,
    category: "juegos",
    title: "Mesa abierta de juegos de mesa",
    subtitle: "Aprender, jugar y conversar sin presión",
    date: "Hoy · 19:30",
    place: "Providencia",
    host: "Anfitrión verificado",
    seats: "6 cupos",
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=1200&q=80",
    vibe: "Ideal si te cuesta encontrar con quién jugar",
  },
  {
    id: 2,
    category: "cafe",
    title: "Café para conversar de música y ciudad",
    subtitle: "Un plan simple para cortar la rutina",
    date: "Mañana · 18:00",
    place: "Ñuñoa",
    host: "Anfitrión visible al sumarte",
    seats: "4 cupos",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    vibe: "Perfecto si quieres salir pero no sabes con quién",
  },
  {
    id: 3,
    category: "outdoor",
    title: "Caminata suave + fotos urbanas",
    subtitle: "Moverse, mirar la ciudad y compartir interés",
    date: "Sábado · 10:30",
    place: "Lastarria",
    host: "Anfitrión verificado",
    seats: "8 cupos",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    vibe: "Para quienes quieren hacer algo distinto sin organizarlo todo",
  },
  {
    id: 4,
    category: "musica",
    title: "Listening session + recomendaciones",
    subtitle: "Música, conversación y buena vibra",
    date: "Viernes · 20:00",
    place: "Bellavista",
    host: "Anfitrión verificado",
    seats: "5 cupos",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
    vibe: "Para descubrir música con personas afines",
  },
  {
    id: 5,
    category: "fiesta",
    title: "After relax para conocer gente",
    subtitle: "Un panorama simple para cortar el aburrimiento",
    date: "Jueves · 21:00",
    place: "El Golf",
    host: "Anfitrión visible al sumarte",
    seats: "10 cupos",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    vibe: "Más panorama que trámite",
  },
  {
    id: 6,
    category: "cafe",
    title: "Desayuno de domingo + lectura libre",
    subtitle: "Café, libros y conversación amable",
    date: "Domingo · 10:00",
    place: "Barrio Italia",
    host: "Anfitrión verificado",
    seats: "7 cupos",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
    vibe: "Para salir de casa y compartir un interés real",
  },
];

const useCases = [
  {
    title: "Cuando nadie se organiza",
    text: "Crea un plan y deja que otros se sumen. Menos chat eterno, más acción.",
  },
  {
    title: "Cuando quieres salir",
    text: "Encuentra personas cerca con ganas de hacer algo, sin depender del grupo de siempre.",
  },
  {
    title: "Cuando tienes un interés específico",
    text: "Juegos de mesa, café, música, deporte o conversación: encuentra con quién compartirlo.",
  },
  {
    title: "Cuando te pega el aburrimiento o la soledad",
    text: "VIBE transforma ganas sueltas en experiencias reales y concretas.",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [notice, setNotice] = useState("");

  const filteredPlans = useMemo(() => {
    if (activeCategory === "all") return plans;
    return plans.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const openPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const joinPlan = (plan) => {
    setNotice(`Te sumarías a: ${plan.title}`);
    setTimeout(() => setNotice(""), 2600);
  };

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <button className="brand" onClick={() => scrollTo("inicio")}>
            <span className="brand-mark">V</span>
            <span className="brand-copy">
              <strong>VIBE</strong>
              <small>Encuentra tu VIBE. Vive la experiencia.</small>
            </span>
          </button>

          <nav className="desktop-nav">
            <button onClick={() => scrollTo("planes")}>Planes</button>
            <button onClick={() => scrollTo("usos")}>Usos reales</button>
            <button onClick={() => scrollTo("confianza")}>Confianza</button>
          </nav>

          <div className="desktop-actions">
            <button className="btn btn-ghost" onClick={() => scrollTo("planes")}>Explorar</button>
            <button className="btn btn-primary" onClick={() => scrollTo("hero-categories")}>Crear un plan</button>
          </div>

          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            <button onClick={() => scrollTo("planes")}>Planes</button>
            <button onClick={() => scrollTo("usos")}>Usos reales</button>
            <button onClick={() => scrollTo("confianza")}>Confianza</button>
            <button onClick={() => scrollTo("hero-categories")}>Crear un plan</button>
          </div>
        )}
      </header>

      <section className="hero" id="inicio">
        <div className="hero-overlay"></div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">VIBE no es una app de citas románticas</p>
            <h1>Planes reales con gente que vibra parecido.</h1>
            <p className="hero-text">
              Cuando quieres salir, aprender o compartir un interés, pero no sabes con quién.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => scrollTo("planes")}>
                Ver planes cerca <ArrowRight size={17} />
              </button>
              <button className="btn btn-ghost" onClick={() => scrollTo("usos")}>
                Cómo funciona
              </button>
            </div>

            <div className="hero-points">
              <div><BadgeCheck size={18} /> Ubicación visible</div>
              <div><ShieldCheck size={18} /> Anfitrión identificado</div>
              <div><Users size={18} /> Planes pequeños y concretos</div>
            </div>
          </div>

          <div className="hero-card">
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80"
              alt="Grupo de personas compartiendo un panorama"
            />
            <div className="hero-card-content">
              <span className="hero-badge">Hook real</span>
              <h3>Cuando nadie se organiza, crea un plan.</h3>
              <p>Cuando quieres salir, pero no sabes con quién, VIBE te ayuda a partir.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="category-strip" id="hero-categories">
        <div className="container">
          <div className="category-row">
            {categories.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                className={`category-chip ${activeCategory === key ? "active" : ""}`}
                onClick={() => {
                  setActiveCategory(key);
                  scrollTo("planes");
                }}
              >
                <Icon size={16} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="usos">
        <div className="container">
          <div className="section-head">
            <span>Usos reales</span>
            <h2>¿Para cuándo sirve VIBE?</h2>
            <p>No es “hacer match”. Es encontrar un plan que te haga sentido y sumarte.</p>
          </div>

          <div className="use-grid">
            {useCases.map((item) => (
              <article className="use-card" key={item.title}>
                <div className="use-icon"><Sparkles size={18} /></div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="planes">
        <div className="container">
          <div className="section-head row">
            <div>
              <span>Cerca de ti</span>
              <h2>Planes para partir hoy</h2>
              <p>Cards más compactas, visuales y útiles.</p>
            </div>
            <button className="btn btn-ghost small" onClick={() => setActiveCategory("all")}>Ver todos</button>
          </div>

          <div className="plan-grid">
            {filteredPlans.map((plan) => (
              <article className="plan-card" key={plan.id}>
                <div className="plan-image">
                  <img src={plan.image} alt={plan.title} />
                  <span className="plan-tag">{categories.find(c => c.key === plan.category)?.label || "Plan"}</span>
                </div>
                <div className="plan-body">
                  <h3>{plan.title}</h3>
                  <p className="plan-subtitle">{plan.subtitle}</p>

                  <ul className="plan-meta">
                    <li><CalendarDays size={15} /> {plan.date}</li>
                    <li><MapPin size={15} /> {plan.place}</li>
                    <li><ShieldCheck size={15} /> {plan.host}</li>
                    <li><Users size={15} /> {plan.seats}</li>
                  </ul>

                  <div className="plan-actions">
                    <button className="btn btn-ghost small full" onClick={() => openPlan(plan)}>Ver detalle</button>
                    <button className="btn btn-primary small full" onClick={() => joinPlan(plan)}>Sumarme</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="confianza">
        <div className="container">
          <div className="section-head">
            <span>Confianza</span>
            <h2>Lo mínimo para que la experiencia se sienta segura.</h2>
          </div>

          <div className="trust-grid">
            <article className="trust-card">
              <ShieldCheck size={22} />
              <h3>Ubicación visible</h3>
              <p>Antes de sumarte, sabes dónde ocurre el plan.</p>
            </article>
            <article className="trust-card">
              <BadgeCheck size={22} />
              <h3>Anfitrión identificado</h3>
              <p>Siempre hay una persona responsable detrás de la experiencia.</p>
            </article>
            <article className="trust-card">
              <MessageCircle size={22} />
              <h3>Contacto después de validar</h3>
              <p>El siguiente paso puede ser habilitar contacto y verificación de identidad.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>Menos scroll. Más vida real.</h2>
            <p>VIBE busca resolver un problema simple pero potente: aburrimiento, desconexión y ganas de hacer algo sin saber con quién.</p>
            <div className="hero-actions centered">
              <button className="btn btn-primary" onClick={() => scrollTo("planes")}>Explorar planes</button>
              <button className="btn btn-ghost" onClick={() => scrollTo("inicio")}>Volver arriba</button>
            </div>
          </div>
        </div>
      </section>

      {selectedPlan && (
        <div className="modal-backdrop" onClick={() => setSelectedPlan(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <img src={selectedPlan.image} alt={selectedPlan.title} />
            <div className="modal-content">
              <h3>{selectedPlan.title}</h3>
              <p className="modal-vibe">{selectedPlan.vibe}</p>
              <ul className="plan-meta modal-meta">
                <li><CalendarDays size={15} /> {selectedPlan.date}</li>
                <li><MapPin size={15} /> {selectedPlan.place}</li>
                <li><ShieldCheck size={15} /> {selectedPlan.host}</li>
                <li><Users size={15} /> {selectedPlan.seats}</li>
              </ul>
              <div className="plan-actions">
                <button className="btn btn-ghost full" onClick={() => setSelectedPlan(null)}>Cerrar</button>
                <button className="btn btn-primary full" onClick={() => joinPlan(selectedPlan)}>Sumarme</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {notice && <div className="toast">{notice}</div>}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
