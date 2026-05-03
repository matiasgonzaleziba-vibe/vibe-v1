import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Coffee,
  Gamepad2,
  MapPin,
  MessageCircle,
  Music,
  ShieldCheck,
  Sparkles,
  Users,
  Dumbbell,
  Palette,
  Plus,
  ChevronDown,
  Menu,
  X,
  Camera,
  Flame,
} from "lucide-react";
import "./styles.css";

const moods = {
  genz: {
    label: "GEN Z",
    short: "Urbano",
    className: "mood-genz",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=85",
  },
  millennial: {
    label: "MILLENNIAL",
    short: "Curado",
    className: "mood-millennial",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85",
  },
  alpha: {
    label: "GEN ALPHA",
    short: "Lúdico",
    className: "mood-alpha",
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1400&q=85",
  },
};

const quickChips = ["Café", "Música", "Outdoor", "Conversar", "Deporte", "Juegos"];

const useCases = [
  {
    title: "Cuando nadie se organiza",
    text: "Crea un plan y deja que otros se sumen.",
    icon: Plus,
  },
  {
    title: "Cuando quieres salir",
    text: "Encuentra personas cerca con ganas de hacer algo.",
    icon: MapPin,
  },
  {
    title: "Cuando tienes un interés específico",
    text: "Juegos de mesa, café, música, deporte, cultura o cualquier plan que quieras compartir.",
    icon: Gamepad2,
  },
  {
    title: "Cuando quieres probar algo nuevo",
    text: "Súmate a una experiencia sin tener que partir desde cero.",
    icon: Sparkles,
  },
];

const plans = [
  {
    title: "Mesa abierta de juegos de mesa",
    time: "Hoy · 19:30",
    place: "Providencia",
    host: "Anfitrión verificado",
    tag: "Juegos",
    people: "6 cupos",
    image:
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Café para conversar de música y ciudad",
    time: "Mañana · 18:00",
    place: "Ñuñoa",
    host: "Anfitrión visible al sumarte",
    tag: "Café",
    people: "4 cupos",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Caminata suave + fotos urbanas",
    time: "Sábado · 10:30",
    place: "Lastarria",
    host: "Anfitrión verificado",
    tag: "Outdoor",
    people: "8 cupos",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
  },
];

const categories = [
  { name: "Café", icon: Coffee },
  { name: "Música", icon: Music },
  { name: "Juegos", icon: Gamepad2 },
  { name: "Deporte", icon: Dumbbell },
  { name: "Cultura", icon: Palette },
  { name: "Conversar", icon: MessageCircle },
];

function Button({ children, variant = "primary", className = "", ...props }) {
  return (
    <button className={`btn btn-${variant} ${className}`} {...props}>
      {children}
    </button>
  );
}

function App() {
  const [moodKey, setMoodKey] = useState("genz");
  const [showMoodMenu, setShowMoodMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mood = moods[moodKey];

  const rootClass = useMemo(() => `app-shell ${mood.className}`, [mood]);

  return (
    <main className={rootClass}>
      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="#inicio">
            <span className="brand-mark">V</span>
            <span>
              <strong>VIBE</strong>
              <small>Planes, personas y experiencias reales</small>
            </span>
          </a>

          <nav className="desktop-nav">
            <a href="#planes">Planes</a>
            <a href="#usos">Usos</a>
            <a href="#intereses">Intereses</a>
            <a href="#confianza">Confianza</a>
          </nav>

          <Button className="desktop-login">Entrar</Button>

          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            <a href="#planes" onClick={() => setMenuOpen(false)}>Planes</a>
            <a href="#usos" onClick={() => setMenuOpen(false)}>Usos</a>
            <a href="#intereses" onClick={() => setMenuOpen(false)}>Intereses</a>
            <a href="#confianza" onClick={() => setMenuOpen(false)}>Confianza</a>
            <Button>Entrar</Button>
          </div>
        )}
      </header>

      <section id="inicio" className="hero">
        <div className="orb orb-one" />
        <div className="orb orb-two" />

        <div className="hero-inner">
          <motion.div className="hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="eyebrow">
              <Sparkles size={15} />
              Para esos días en que quieres hacer algo
            </div>

            <h1>¿Qué haces hoy?</h1>
            <p className="hero-lead">Encuentra un plan real con gente que vibra parecido.</p>
            <p className="hero-support">
              Cuando quieres salir, aprender o compartir un interés, pero no sabes con quién.
            </p>

            <div className="hero-actions">
              <Button>
                Ver planes cerca <ArrowRight size={18} />
              </Button>
              <Button variant="secondary">Crear un plan</Button>
            </div>

            <div className="quick-chips" aria-label="Filtros rápidos">
              {quickChips.map((chip) => (
                <a key={chip} href="#planes">
                  {chip}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.08 }}>
            <div className="mood-control">
              <button className="mood-chip" onClick={() => setShowMoodMenu((v) => !v)}>
                Mood: {mood.label} <ChevronDown size={14} />
              </button>

              {showMoodMenu && (
                <div className="mood-menu">
                  {Object.entries(moods).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setMoodKey(key);
                        setShowMoodMenu(false);
                      }}
                    >
                      <span>{value.label}</span>
                      <small>{value.short}</small>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="photo-card">
              <img src={mood.image} alt="Personas compartiendo una experiencia real" />
              <div className="photo-gradient" />
              <div className="featured-plan">
                <span className="tag">Plan destacado</span>
                <h3>Juegos de mesa para aprender y jugar</h3>
                <p>Providencia · Hoy 19:30 · 6 cupos</p>
              </div>
            </div>

            <div className="floating-card floating-one">
              <Flame size={18} />
              <span>Cuando tu grupo no prende, encuentra otro que sí.</span>
            </div>
            <div className="floating-card floating-two">
              <Camera size={18} />
              <span>Planes reales, no solo scroll.</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="usos" className="section">
        <div className="section-heading">
          <span>Usos reales</span>
          <h2>¿Para cuándo sirve VIBE?</h2>
        </div>

        <div className="use-grid">
          {useCases.map(({ title, text, icon: Icon }) => (
            <article key={title} className="use-card">
              <div className="icon-badge">
                <Icon size={21} />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="planes" className="section">
        <div className="section-heading row">
          <div>
            <span>Cerca de ti</span>
            <h2>Planes para partir hoy</h2>
          </div>
          <Button variant="ghost" className="hide-mobile">Ver todos</Button>
        </div>

        <div className="plan-grid">
          {plans.map((plan) => (
            <article key={plan.title} className="plan-card">
              <div className="plan-image">
                <img src={plan.image} alt={plan.title} />
                <span>{plan.tag}</span>
              </div>
              <div className="plan-body">
                <h3>{plan.title}</h3>
                <ul>
                  <li><CalendarDays size={15} /> {plan.time}</li>
                  <li><MapPin size={15} /> {plan.place}</li>
                  <li><ShieldCheck size={15} /> {plan.host}</li>
                  <li><Users size={15} /> {plan.people}</li>
                </ul>
                <Button className="full">Sumarme</Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="intereses" className="section">
        <div className="interest-panel">
          <div>
            <span>Explora por interés</span>
            <h2>Cuando tienes un interés, encuentra con quién compartirlo.</h2>
            <p>No necesitas convencer a tu grupo de siempre. Crea un plan o súmate a uno que ya exista.</p>
          </div>

          <div className="category-grid">
            {categories.map(({ name, icon: Icon }) => (
              <a key={name} href="#planes" className="category">
                <Icon size={20} />
                <strong>{name}</strong>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="confianza" className="section trust-section">
        {[
          ["Ubicación visible", "Antes de sumarte, sabes dónde ocurre el plan."],
          ["Anfitrión identificado", "La experiencia siempre tiene una persona responsable."],
          ["Contacto tras verificación", "La coordinación se habilita cuando hay confianza mínima."],
        ].map(([title, text]) => (
          <article key={title} className="trust-card">
            <ShieldCheck size={24} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="final-cta">
        <div>
          <h2>Menos scroll. Más vida real.</h2>
          <p>
            VIBE transforma ganas sueltas en planes concretos: salir, conversar, moverse, aprender o compartir eso que te interesa.
          </p>
          <div className="hero-actions center">
            <Button>Ver planes cerca</Button>
            <Button variant="secondary">Crear un plan</Button>
          </div>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
