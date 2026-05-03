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
  Wine,
  Trophy,
  BookOpen,
  ArrowRight,
  Sparkles,
  MessageCircle,
  BadgeCheck,
  UserCheck,
  CheckCircle2,
  LockKeyhole,
  Globe2,
  Plus,
} from "lucide-react";
import "./styles.css";

const categories = [
  { key: "all", label: "Todos", icon: Sparkles, interests: ["Panoramas", "Nuevos intereses", "Planes cerca"] },
  { key: "cafe", label: "VIBE Café", icon: Coffee, interests: ["Café de especialidad", "Tasting", "Conversación"] },
  { key: "juegos", label: "VIBE Juegos", icon: Gamepad2, interests: ["Juegos de mesa", "PS5 / Switch", "Cartas / Trivia"] },
  { key: "musica", label: "VIBE Música", icon: Music, interests: ["Tocatas", "Festivales", "Música en vivo"] },
  { key: "outdoor", label: "VIBE Outdoor", icon: TreePine, interests: ["Caminatas", "Fotos urbanas", "Cerros / parques"] },
  { key: "previa", label: "VIBE La previa", icon: Wine, interests: ["Traguitos", "Antes de salir", "Buena conversación"] },
  { key: "fiesta", label: "VIBE Fiesta", icon: Sparkles, interests: ["Carrete", "Baile", "Eventos"] },
  { key: "deporte", label: "VIBE Deporte", icon: Trophy, interests: ["Básquetbol", "Fútbol", "Running / Pádel"] },
  { key: "estudio", label: "VIBE Estudio", icon: BookOpen, interests: ["Grupo de lectura", "Grupo de estudio", "Aprender algo"] },
];

const plans = [
  {
    id: 1,
    category: "juegos",
    title: "Mesa abierta de juegos de mesa",
    subtitle: "Aprender, jugar y conversar sin tener que organizarlo todo",
    date: "Hoy · 19:30",
    place: "Providencia",
    host: "Host verificado",
    seats: "6 cupos",
    access: "Ubicación pública",
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=1200&q=80",
    vibe: "Ideal si te gustan los juegos de mesa, cartas, estrategia o incluso quieres partir aprendiendo desde cero.",
  },
  {
    id: 2,
    category: "cafe",
    title: "Tasting de café + conversación",
    subtitle: "Café de especialidad, sabores nuevos y grupo chico",
    date: "Mañana · 18:00",
    place: "Ñuñoa",
    host: "Host visible al sumarte",
    seats: "4 cupos",
    access: "Dirección al confirmar",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80",
    vibe: "Para quienes quieren salir de casa, probar café rico y conversar sin convertirlo en trámite.",
  },
  {
    id: 3,
    category: "outdoor",
    title: "Caminata suave + fotos urbanas",
    subtitle: "Moverse, mirar la ciudad y compartir interés",
    date: "Sábado · 10:30",
    place: "Lastarria",
    host: "Host verificado",
    seats: "8 cupos",
    access: "Ubicación pública",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    vibe: "Para quienes quieren hacer algo distinto sin partir desde cero ni convencer al grupo de siempre.",
  },
  {
    id: 4,
    category: "musica",
    title: "Acompáñame a una tocata",
    subtitle: "Música en vivo, conversación y buena vibra",
    date: "Viernes · 20:00",
    place: "Bellavista",
    host: "Host verificado",
    seats: "5 cupos",
    access: "Ubicación pública",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
    vibe: "Para quienes quieren ir a una tocata, festival o show, pero no siempre tienen con quién.",
  },
  {
    id: 5,
    category: "previa",
    title: "La previa: traguitos y buena conversación",
    subtitle: "Un punto de partida antes de salir",
    date: "Jueves · 21:00",
    place: "El Golf",
    host: "Host visible al sumarte",
    seats: "10 cupos",
    access: "Dirección al confirmar",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
    vibe: "Para partir el carrete sin llegar solo, con un plan simple y un grupo acotado.",
  },
  {
    id: 6,
    category: "estudio",
    title: "Grupo de lectura sobre IA y futuro",
    subtitle: "Comparte un libro, una idea o un tema de estudio",
    date: "Domingo · 10:00",
    place: "Barrio Italia",
    host: "Host verificado",
    seats: "7 cupos",
    access: "Ubicación pública",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=80",
    vibe: "Para compartir lectura, estudio o curiosidad intelectual sin hacerlo solemne.",
  },
  {
    id: 7,
    category: "deporte",
    title: "VIBE Básquetbol: equipo mixto casual",
    subtitle: "Armar partido, moverse y conocer gente",
    date: "Miércoles · 20:30",
    place: "Las Condes",
    host: "Host verificado",
    seats: "10 cupos",
    access: "Ubicación pública",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
    vibe: "Ejemplo de cómo una persona puede crear su propia VIBE específica dentro de una categoría.",
  },
  {
    id: 8,
    category: "fiesta",
    title: "VIBE Fiesta: grupo para festival urbano",
    subtitle: "Coordinar llegada, entrada y previa liviana",
    date: "Sábado · 22:00",
    place: "Parque O'Higgins",
    host: "Host visible al sumarte",
    seats: "12 cupos",
    access: "Ubicación pública",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80",
    vibe: "Para ir a un evento con grupo, no quedar botado y coordinar mejor la experiencia.",
  },
];

const moments = [
  {
    title: "Cuando nadie se organiza",
    text: "Crea un plan y deja que otros se sumen. Menos chat eterno, más acción.",
  },
  {
    title: "Cuando quieres pasarlo bien",
    text: "Y te falta con quién. Crea un plan o súmate a uno que ya exista.",
  },
  {
    title: "Cuando tienes un interés específico",
    text: "Juegos, café, música, deporte, lectura o estudio: encuentra con quién compartirlo.",
  },
  {
    title: "Cuando te falta con quién",
    text: "VIBE convierte ganas sueltas en experiencias reales, pequeñas y posibles.",
  },
];

const steps = [
  { title: "Elige una vibra", text: "Parte por una categoría o interés: café, juegos, música, deporte, estudio o previa." },
  { title: "Explora planes", text: "Mira fecha, cupos, comuna, host y si la ubicación es pública o se libera al confirmar." },
  { title: "Abre el detalle", text: "Revisa contexto, señales del host y cómo se coordina el encuentro." },
  { title: "Súmate o crea", text: "Puedes sumarte a un plan o crear tu propia VIBE: fútbol, básquetbol, libro, tocata o lo que te mueva." },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [notice, setNotice] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [customVibe, setCustomVibe] = useState("VIBE Básquetbol");
  const [customInterest, setCustomInterest] = useState("Partido casual mixto");

  const activeCategoryInfo = categories.find((c) => c.key === activeCategory) || categories[0];

  const filteredPlans = useMemo(() => {
    if (activeCategory === "all") return plans;
    return plans.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
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
            <button onClick={() => scrollTo("momentos")}>Momentos</button>
            <button onClick={() => scrollTo("como-funciona")}>Cómo funciona</button>
          </nav>

          <div className="desktop-actions">
            <button className="btn btn-ghost" onClick={() => scrollTo("planes")}>Explorar</button>
            <button className="btn btn-primary" onClick={() => setShowCreate(true)}>Crear un plan</button>
          </div>

          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            <button onClick={() => scrollTo("planes")}>Planes</button>
            <button onClick={() => scrollTo("momentos")}>Momentos</button>
            <button onClick={() => scrollTo("como-funciona")}>Cómo funciona</button>
            <button onClick={() => setShowCreate(true)}>Crear un plan</button>
          </div>
        )}
      </header>

      <section className="hero" id="inicio">
        <div className="hero-overlay"></div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Personas, panoramas y experiencias en tu misma frecuencia</p>
            <h1>¿Qué haces hoy?</h1>
            <p className="hero-text">
              Planes reales con gente que vibra parecido.
            </p>
            <p className="hero-support">
              Cuando quieres salir, aprender o compartir un interés, pero no sabes con quién.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => scrollTo("planes")}>
                Ver planes cerca <ArrowRight size={17} />
              </button>
              <button className="btn btn-ghost" onClick={() => setShowCreate(true)}>
                Crear mi VIBE
              </button>
            </div>

            <div className="hero-points">
              <div><UserCheck size={18} /> Host visible</div>
              <div><LockKeyhole size={18} /> Ubicación según tipo de plan</div>
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
              <p>Con VIBE transformas un deseo o una intención en una acción concreta.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="category-strip" id="categorias">
        <div className="container">
          <div className="mini-head">
            <span>Parte por lo que te mueve</span>
            <p>Cada categoría puede abrir intereses específicos: VIBE Básquetbol, VIBE Fútbol, grupo de lectura, tasting de café, tocata o lo que quieras crear.</p>
          </div>
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

          <div className="interest-pills">
            {activeCategoryInfo.interests.map((interest) => (
              <span key={interest}>{interest}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="momentos">
        <div className="container">
          <div className="section-head">
            <span>Para esos momentos</span>
            <h2>Cuando tienes ganas de hacer algo, pero falta el con quién.</h2>
            <p>VIBE no necesita explicarse como manual: parte desde situaciones cotidianas que todos reconocemos.</p>
          </div>

          <div className="use-grid">
            {moments.map((item) => (
              <article className="use-card" key={item.title}>
                <div className="use-icon"><Sparkles size={18} /></div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section how-section" id="como-funciona">
        <div className="container">
          <div className="section-head">
            <span>Cómo funciona</span>
            <h2>Del interés al plan en cuatro pasos.</h2>
            <p>Esto aparece como segundo nivel para quien ya se interesó y quiere entender cómo se usa.</p>
          </div>

          <div className="steps-grid">
            {steps.map((step, index) => (
              <article className="step-card" key={step.title}>
                <div className="step-number">{index + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
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
              <p>Elige una vibra, abre el detalle y súmate.</p>
            </div>
            <button className="btn btn-ghost small" onClick={() => setActiveCategory("all")}>Ver todos</button>
          </div>

          <div className="plan-grid">
            {filteredPlans.map((plan) => (
              <article className="plan-card" key={plan.id}>
                <div className="plan-image">
                  <img src={plan.image} alt={plan.title} />
                  <span className="plan-tag">{categories.find(c => c.key === plan.category)?.label || "Plan"}</span>
                  {plan.host === "Host verificado" && (
                    <span className="verified-badge"><CheckCircle2 size={14} /> Host verificado</span>
                  )}
                </div>
                <div className="plan-body">
                  <h3>{plan.title}</h3>
                  <p className="plan-subtitle">{plan.subtitle}</p>

                  <ul className="plan-meta">
                    <li><CalendarDays size={15} /> {plan.date}</li>
                    <li><MapPin size={15} /> {plan.place}</li>
                    <li><ShieldCheck size={15} /> {plan.host}</li>
                    <li>{plan.access === "Ubicación pública" ? <Globe2 size={15} /> : <LockKeyhole size={15} />} {plan.access}</li>
                    <li><Users size={15} /> {plan.seats}</li>
                  </ul>

                  <div className="plan-actions">
                    <button className="btn btn-ghost small full" onClick={() => setSelectedPlan(plan)}>Ver detalle</button>
                    <button className="btn btn-primary small full" onClick={() => joinPlan(plan)}>Sumarme</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>Menos scroll. Más vida real.</h2>
            <p>VIBE busca resolver algo simple: ganas de hacer algo, intereses que no siempre calzan con tu grupo y planes que podrían pasar si alguien los activa.</p>
            <div className="hero-actions centered">
              <button className="btn btn-primary" onClick={() => scrollTo("planes")}>Explorar planes</button>
              <button className="btn btn-ghost" onClick={() => setShowCreate(true)}>Crear mi VIBE</button>
            </div>
          </div>
        </div>
      </section>

      {selectedPlan && (
        <div className="modal-backdrop" onClick={() => setSelectedPlan(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <img src={selectedPlan.image} alt={selectedPlan.title} />
            <div className="modal-content">
              <div className="modal-topline">
                <span><CheckCircle2 size={15} /> {selectedPlan.host}</span>
                <span>{selectedPlan.access === "Ubicación pública" ? <Globe2 size={15} /> : <LockKeyhole size={15} />} {selectedPlan.access}</span>
              </div>
              <h3>{selectedPlan.title}</h3>
              <p className="modal-vibe">{selectedPlan.vibe}</p>
              <ul className="plan-meta modal-meta">
                <li><CalendarDays size={15} /> {selectedPlan.date}</li>
                <li><MapPin size={15} /> {selectedPlan.place}</li>
                <li><ShieldCheck size={15} /> {selectedPlan.host}</li>
                <li>{selectedPlan.access === "Ubicación pública" ? <Globe2 size={15} /> : <LockKeyhole size={15} />} {selectedPlan.access}</li>
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

      {showCreate && (
        <div className="modal-backdrop" onClick={() => setShowCreate(false)}>
          <div className="modal-card create-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-topline">
                <span><Plus size={15} /> Crear una VIBE</span>
                <span><UserCheck size={15} /> Tú eres el host</span>
              </div>
              <h3>Crea tu propio plan</h3>
              <p className="modal-vibe">
                Esta parte sería clave para el éxito de la app: que el usuario sienta que puede transformar su interés en un plan concreto.
              </p>

              <label className="fake-label">
                Nombre de tu VIBE
                <input value={customVibe} onChange={(e) => setCustomVibe(e.target.value)} />
              </label>

              <label className="fake-label">
                Interés o intención
                <input value={customInterest} onChange={(e) => setCustomInterest(e.target.value)} />
              </label>

              <div className="preview-vibe">
                <span>Preview</span>
                <strong>{customVibe}</strong>
                <p>{customInterest}</p>
              </div>

              <div className="plan-actions">
                <button className="btn btn-ghost full" onClick={() => setShowCreate(false)}>Cerrar</button>
                <button
                  className="btn btn-primary full"
                  onClick={() => {
                    setNotice(`Crearías: ${customVibe}`);
                    setShowCreate(false);
                    setTimeout(() => setNotice(""), 2600);
                  }}
                >
                  Crear preview
                </button>
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
