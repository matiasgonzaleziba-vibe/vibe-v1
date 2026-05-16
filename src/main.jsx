import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { createClient } from "@supabase/supabase-js";
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
  Trophy,
  BookOpen,
  BriefcaseBusiness,
  PartyPopper,
  Megaphone,
  DoorClosed,
  Shuffle,
  MapPinned,
  Navigation,
  ArrowRight,
  Sparkles,
  UserCheck,
  CheckCircle2,
  LockKeyhole,
  Globe2,
  Plus,
} from "lucide-react";
import "./styles.css";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://dpdogxovqqcnfdvxeeoo.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_-BYrCmc-NLWqiyFarIWxwg_FUhI94uz";

const supabase = createClient(supabaseUrl, supabaseKey);

const formatDate = (value) => {
  if (!value) return "Fecha por confirmar";
  const originalDate = new Date(value);
  if (Number.isNaN(originalDate.getTime())) return "Fecha por confirmar";

  const today = new Date();
  const dateOnly = new Date(originalDate);
  dateOnly.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffDays = Math.round((dateOnly - today) / 86400000);
  const label = diffDays === 0 ? "Hoy" : diffDays === 1 ? "Mañana" : originalDate.toLocaleDateString("es-CL", { weekday: "long" });
  const time = originalDate.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" });
  return `${label} · ${time}`;
};

const accessLabel = (locationType) => {
  if (locationType === "confirmar") return "Dirección al confirmar";
  if (locationType === "sin_fija") return "Sin ubicación fija";
  return "Ubicación pública";
};

const mapPanoramaFromDb = (row) => ({
  id: row.id,
  source: "supabase",
  category: row.category_key || "all",
  title: row.title || "Panorama sin título",
  subtitle: row.subtitle || "Panorama creado por la comunidad",
  date: formatDate(row.starts_at),
  place: row.zone || row.public_location || "Zona por definir",
  host: row.host_id ? "Host verificado" : "Host visible al unirte",
  seats: `${row.seats_available ?? row.seats_total ?? 0} cupos`,
  access: accessLabel(row.location_type),
  image: row.image_url || "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80",
  vibe: row.description || "Panorama creado en VIBE.",
  callType: row.call_type || "abierta",
  locationType: row.location_type || "publica",
  panoramaType: row.panorama_type || "definido",
});

const defaultImageByCategory = {
  cafe: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80",
  juegos: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=1200&q=80",
  musica: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
  outdoor: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  deporte: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
  fiesta: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
  literario: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=80",
  negocios: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
  custom: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80",
};


const categories = [
  { key: "all", label: "Todos", icon: Sparkles, interests: ["Panoramas cerca", "Planes para hoy", "Nuevas VIBEs"] },
  { key: "cafe", label: "VIBE Café", icon: Coffee, interests: ["Café de especialidad", "Tasting", "Brunch", "Conversación"] },
  { key: "juegos", label: "VIBE Juegos", icon: Gamepad2, interests: ["Juegos de mesa", "Consola", "Cartas", "Trivia"] },
  { key: "musica", label: "VIBE Música", icon: Music, interests: ["Tocatas", "Festivales", "Música en vivo", "Jam session"] },
  { key: "outdoor", label: "VIBE Outdoor", icon: TreePine, interests: ["Caminatas", "Fotos urbanas", "Cerros", "Parques"] },
  { key: "deporte", label: "VIBE Deporte", icon: Trophy, interests: ["Fútbol", "Básquetbol", "Pádel", "Running"] },
  { key: "fiesta", label: "VIBE Fiesta", icon: PartyPopper, interests: ["La previa", "Baile", "Carrete", "Eventos"] },
  { key: "literario", label: "VIBE Literario", icon: BookOpen, interests: ["Club de lectura", "Poesía", "Escritura", "Lectura libre"] },
  { key: "negocios", label: "VIBE Negocios", icon: BriefcaseBusiness, interests: ["Idea de negocio", "Networking", "Founder coffee", "Colegas"] },
];


const quickVibes = [
  { label: "VIBE Café", key: "cafe", icon: Coffee, plan: "Café de especialidad + conversación", hint: "Tasting, brunch o café tranquilo" },
  { label: "VIBE Trekking", key: "outdoor", icon: TreePine, plan: "Caminata suave este fin de semana", hint: "Cerro, parque o ruta urbana" },
  { label: "VIBE Otaku", key: "custom", icon: Sparkles, plan: "Junta otaku, anime o manga", hint: "Anime, manga, cosplay o gaming" },
  { label: "VIBE Negocios", key: "negocios", icon: BriefcaseBusiness, plan: "Café para compartir una idea de negocio", hint: "Ideas, colegas o founder coffee" },
  { label: "VIBE Juegos", key: "juegos", icon: Gamepad2, plan: "Mesa abierta de juegos", hint: "Mesa, consola, trivia o cartas" },
  { label: "VIBE Música", key: "musica", icon: Music, plan: "Acompáñame a una tocata", hint: "Tocata, festival o música en vivo" },
  { label: "VIBE Deporte", key: "deporte", icon: Trophy, plan: "Partido casual esta semana", hint: "Fútbol, básquetbol, pádel o running" },
  { label: "VIBE Literario", key: "literario", icon: BookOpen, plan: "Lectura libre + conversación", hint: "Libro, escritura o poesía" },
  { label: "Otro VIBE", key: "custom", icon: Plus, plan: "Armar un panorama distinto", hint: "Crea tu propia categoría" },
];

const demoPlans = [
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
    title: "Café turismo",
    subtitle: "Café de especialidad, degustación y buena conversación",
    date: "Mañana · 18:00",
    place: "Ñuñoa",
    host: "Host visible al unirte",
    seats: "4 cupos",
    access: "Dirección al confirmar",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80",
    vibe: "Para quienes quieren salir de casa, probar café rico y conversar sobre café.",
  },
  {
    id: 3,
    category: "outdoor",
    title: "Armémonos para ir al cerro",
    subtitle: "Compartamos los mejores spots en la cordillera",
    date: "Sábado · 10:30",
    place: "Cerro Manquehue",
    host: "Host verificado",
    seats: "8 cupos",
    access: "Ubicación pública",
    image: "https://www.outlife.cl/wp-content/uploads/2020/07/2.jpg",
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
    category: "fiesta",
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
    category: "literario",
    title: "VIBE Literario: Crea tu grupo de lectura",
    subtitle: "Comparte un libro, un género o un tema literario",
    date: "Domingo · 10:00",
    place: "Barrio Italia",
    host: "Host verificado",
    seats: "7 cupos",
    access: "Ubicación pública",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=80",
    vibe: "Para compartir lectura, escritura o curiosidad intelectual.",
  },
  {
    id: 7,
    category: "deporte",
    title: "VIBE Básquetbol: partido casual",
    subtitle: "Armar equipo, moverse y jugar",
    date: "Miércoles · 20:30",
    place: "Parque Araucano",
    host: "Host verificado",
    seats: "10 cupos",
    access: "Ubicación pública",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
    vibe: "Ejemplo de cómo una persona puede crear su propia VIBE específica dentro de una categoría general.",
  },
  {
    id: 8,
    category: "negocios",
    title: "Comparte una idea de negocio",
    subtitle: "Un café para conversar ideas, socios o próximos pasos",
    date: "Martes · 08:30",
    place: "Vitacura",
    host: "Host visible al sumarte",
    seats: "5 cupos",
    access: "Dirección al confirmar",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
    vibe: "Para quienes tienen una idea dando vueltas y quieren contrastarla con otras personas.",
  },
];

const moments = [
  {
    title: "Nadie prende",
    text: "Crea un plan y deja que otros se sumen.",
  },
  {
    title: "Quieres pasarlo bien",
    text: "Y te falta con quién. Súmate a algo que ya exista.",
  },
  {
    title: "Tienes un interés",
    text: "Encuentra gente para compartirlo en la vida real.",
  },
];

const steps = [
  { title: "Elige tu VIBE", text: "Parte por una categoría o interés." },
  { title: "Revisa el panorama", text: "Mira fecha, zona y cupos." },
  { title: "Súmate o crea", text: "Únete a uno o arma el tuyo." },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [notice, setNotice] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [customVibe, setCustomVibe] = useState("VIBE Básquetbol");
  const [customPlan, setCustomPlan] = useState("Partido casual mixto este jueves");
  const [creationMode, setCreationMode] = useState("definido");
  const [callType, setCallType] = useState("abierta");
  const [locationType, setLocationType] = useState("publica");
  const [zone, setZone] = useState("Providencia / Ñuñoa");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [dbPlans, setDbPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [supabaseError, setSupabaseError] = useState("");


  useEffect(() => {
    const fetchPanoramas = async () => {
      setLoadingPlans(true);
      setSupabaseError("");

      const { data, error } = await supabase
        .from("panoramas")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching panoramas:", error);
        setSupabaseError("No pude cargar panoramas desde Supabase. Mostrando ejemplos locales.");
        setDbPlans([]);
      } else {
        setDbPlans((data || []).map(mapPanoramaFromDb));
      }

      setLoadingPlans(false);
    };

    fetchPanoramas();
  }, []);

  const plans = dbPlans.length > 0 ? dbPlans : demoPlans;

  const selectQuickVibe = (vibe) => {
    setCustomVibe(vibe.label === "Otro VIBE" ? "VIBE " : vibe.label);
    setCustomPlan(vibe.plan);
    setActiveCategory(vibe.key === "custom" ? "all" : vibe.key);
  };

  const createPanorama = async () => {
    const categoryKey = activeCategory === "all" ? "custom" : activeCategory;
    const locationLabel = locationType === "publica" ? zone : null;

    setNotice("Creando panorama...");

    const { data: vibeData, error: vibeError } = await supabase
      .from("vibes")
      .insert({
        name: customVibe,
        description: customPlan,
        category_key: categoryKey,
        is_public: true,
      })
      .select()
      .single();

    if (vibeError) {
      console.error("Error creating VIBE:", vibeError);
      setNotice("No pude crear la VIBE. Revisa las políticas de Supabase.");
      setTimeout(() => setNotice(""), 3200);
      return;
    }

    const startsAt = eventDate
      ? new Date(`${eventDate}T${eventTime || "19:00"}`).toISOString()
      : new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    const { data: panoramaData, error: panoramaError } = await supabase
      .from("panoramas")
      .insert({
        vibe_id: vibeData?.id,
        title: customPlan,
        subtitle: creationMode === "random"
          ? "Panorama random para ver quién prende"
          : creationMode === "abierto"
            ? "Idea abierta para cerrar con quienes se sumen"
            : "Panorama definido creado en VIBE",
        description: `${customVibe}: ${customPlan}`,
        category_key: categoryKey,
        image_url: defaultImageByCategory[categoryKey] || defaultImageByCategory.custom,
        panorama_type: creationMode,
        call_type: callType,
        location_type: locationType,
        zone,
        public_location: locationLabel,
        starts_at: startsAt,
        seats_total: 6,
        seats_available: 6,
        status: "published",
      })
      .select()
      .single();

    if (panoramaError) {
      console.error("Error creating panorama:", panoramaError);
      setNotice("No pude crear el panorama. Revisa las políticas de Supabase.");
      setTimeout(() => setNotice(""), 3200);
      return;
    }

    const created = mapPanoramaFromDb(panoramaData);
    setDbPlans((prev) => [created, ...prev]);
    setSelectedPlan(created);
    setShowCreate(false);
    setNotice(`Creaste: ${customPlan}`);
    setTimeout(() => setNotice(""), 2600);
  };

  const activeCategoryInfo = categories.find((c) => c.key === activeCategory) || categories[0];

  const filteredPlans = useMemo(() => {
    if (activeCategory === "all") return plans;
    return plans.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const joinPlan = async (plan) => {
    if (plan.source !== "supabase") {
      setNotice(`Te sumarías a: ${plan.title}`);
      setTimeout(() => setNotice(""), 2600);
      return;
    }

    setNotice("Procesando solicitud...");

    if (plan.callType === "cerrada") {
      const { error } = await supabase.from("join_requests").insert({
        panorama_id: plan.id,
        message: "Solicitud creada desde el MVP de VIBE.",
        status: "pending",
      });

      if (error) {
        console.error("Error creating request:", error);
        setNotice("No pude enviar la solicitud. Revisa permisos en Supabase.");
      } else {
        setNotice("Solicitud enviada al host.");
      }
    } else {
      const { error } = await supabase.from("participants").insert({
        panorama_id: plan.id,
        role: "participant",
        status: "confirmed",
      });

      if (error) {
        console.error("Error joining panorama:", error);
        setNotice("No pude sumarte. Revisa permisos en Supabase.");
      } else {
        setNotice(`Te sumaste a: ${plan.title}`);
      }
    }

    setTimeout(() => setNotice(""), 3200);
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
            <button onClick={() => scrollTo("categorias")}>VIBE</button>
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
            <button onClick={() => scrollTo("categorias")}>VIBEs</button>
            <button onClick={() => scrollTo("como-funciona")}>Cómo funciona</button>
            <button onClick={() => setShowCreate(true)}>Crear un plan</button>
          </div>
        )}
      </header>

      <section className="hero" id="inicio">
        <div className="hero-overlay"></div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Planes para hacer hoy</p>
            <h1>¿Qué haces hoy?</h1>
            <p className="hero-text">
              Encuentra panoramas reales con gente que vibra parecido.
            </p>
            <p className="hero-support">
              Cuando quieres salir, aprender o compartir un interés, pero no sabes con quién.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => scrollTo("planes")}>
                Ver panoramas cerca <ArrowRight size={17} />
              </button>
              <button className="btn btn-ghost" onClick={() => setShowCreate(true)}>
                Crear mi VIBE
              </button>
            </div>

            <div className="hero-points">
              <div><UserCheck size={18} /> Host visible</div>
              <div><LockKeyhole size={18} /> Ubicación según tipo de panorama</div>
              <div><Users size={18} /> Grupos chicos y concretos</div>
            </div>
          </div>

          <div className="hero-card">
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80"
              alt="Grupo de personas compartiendo un panorama"
            />
            <div className="hero-card-content">
              <span className="hero-badge">Panorama destacado</span>
              <h3>Cuando nadie se organiza, crea un plan.</h3>
              <p>Con VIBE transformas un deseo o una intención en una acción concreta.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="category-strip" id="categorias">
        <div className="container">
          <div className="mini-head">
            <span>Elige una VIBE</span>
            <p>Las categorías son amplias. Al entrar, puedes explorar intereses más específicos o crear una VIBE propia.</p>
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

      <section className="section" id="planes">
        <div className="container">
          <div className="section-head row">
            <div>
              <span>Cerca de ti</span>
              <h2>Panoramas para partir hoy</h2>
              <p>Elige una VIBE, revisa el panorama y súmate.</p>
              {loadingPlans && <p className="data-note">Cargando panoramas desde Supabase...</p>}
              {supabaseError && <p className="data-note warning">{supabaseError}</p>}
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

      <section className="visual-break">
        <div className="container">
          <div className="visual-grid">
            <img src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=80" alt="Personas conversando en una mesa" />
            <img src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=80" alt="Personas en un evento" />
            <div className="visual-copy">
              <span>La idea</span>
              <h2>Armemos un plan.</h2>
              <p>Elige una VIBE, encuentra algo que te tinca y súmate con gente que está en la misma.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="momentos">
        <div className="container">
          <div className="section-head">
            <span>Para esos momentos</span>
            <h2>Cuando quieres hacer algo y falta el con quién.</h2>
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
            <h2>Elige, revisa y súmate.</h2>
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

      <section className="section cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>Crea una VIBE y activa el plan.</h2>
            <p>Puede partir como un café, una tocata, un partido, una idea de negocio o un grupo literario. Lo importante es convertir la intención en acción.</p>
            <div className="hero-actions centered">
              <button className="btn btn-primary" onClick={() => scrollTo("planes")}>Explorar panoramas</button>
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
          <div className="modal-card create-card simple-create-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-topline">
                <span><Plus size={15} /> Crear una VIBE</span>
                <span><UserCheck size={15} /> Tú eres el host</span>
              </div>

              <h3>Armemos un plan</h3>
              <p className="modal-vibe">
                Elige una VIBE, define lo básico y publica un panorama al que otros puedan sumarse.
              </p>

              <div className="quick-vibe-section">
                <span className="choice-title">Parte rápido con una VIBE</span>
                <div className="quick-vibe-grid">
                  {quickVibes.map((vibe) => {
                    const Icon = vibe.icon;
                    const active = customVibe.trim() === vibe.label;
                    return (
                      <button
                        key={vibe.label}
                        className={`quick-vibe-card ${active ? "active" : ""}`}
                        onClick={() => selectQuickVibe(vibe)}
                      >
                        <Icon size={18} />
                        <strong>{vibe.label}</strong>
                        <small>{vibe.hint}</small>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="create-form-grid">
                <label className="fake-label">
                  Nombre de tu VIBE
                  <input value={customVibe} onChange={(e) => setCustomVibe(e.target.value)} placeholder="VIBE Café, VIBE Trekking, VIBE Otaku..." />
                </label>

                <label className="fake-label">
                  ¿Qué van a hacer?
                  <input value={customPlan} onChange={(e) => setCustomPlan(e.target.value)} placeholder="Ej: Café de especialidad + conversación" />
                </label>

                <label className="fake-label">
                  Fecha
                  <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
                </label>

                <label className="fake-label">
                  Hora
                  <input type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} />
                </label>

                <label className="fake-label wide">
                  Lugar, comuna o zona
                  <input value={zone} onChange={(e) => setZone(e.target.value)} placeholder="Ej: Providencia, Ñuñoa, Parque Araucano..." />
                </label>
              </div>

              <div className="compact-options">
                <div className="choice-block compact">
                  <span className="choice-title">Participación</span>
                  <div className="segmented-control">
                    <button className={callType === "abierta" ? "active" : ""} onClick={() => setCallType("abierta")}>
                      Convocatoria abierta
                    </button>
                    <button className={callType === "cerrada" ? "active" : ""} onClick={() => setCallType("cerrada")}>
                      Evento cerrado
                    </button>
                  </div>
                </div>

                <div className="choice-block compact">
                  <span className="choice-title">Ubicación</span>
                  <div className="segmented-control">
                    <button className={locationType === "publica" ? "active" : ""} onClick={() => setLocationType("publica")}>
                      Pública
                    </button>
                    <button className={locationType === "confirmar" ? "active" : ""} onClick={() => setLocationType("confirmar")}>
                      Al confirmar
                    </button>
                  </div>
                </div>
              </div>

              <details className="advanced-create-options">
                <summary>Más opciones</summary>
                <div className="segmented-control three">
                  <button className={creationMode === "definido" ? "active" : ""} onClick={() => setCreationMode("definido")}>Panorama definido</button>
                  <button className={creationMode === "abierto" ? "active" : ""} onClick={() => setCreationMode("abierto")}>Idea abierta</button>
                  <button className={creationMode === "random" ? "active" : ""} onClick={() => setCreationMode("random")}>Random</button>
                </div>
              </details>

              <div className="preview-vibe compact-preview">
                <span>Preview</span>
                <strong>{customVibe || "VIBE"}</strong>
                <p>{customPlan || "Tu panorama"}</p>
                <div className="preview-meta">
                  <em>{callType === "abierta" ? "Convocatoria abierta" : "Evento cerrado"}</em>
                  <em>{locationType === "publica" ? "Ubicación pública" : "Dirección al confirmar"}</em>
                  <em>{zone}</em>
                </div>
              </div>

              <div className="plan-actions">
                <button className="btn btn-ghost full" onClick={() => setShowCreate(false)}>Cerrar</button>
                <button className="btn btn-primary full" onClick={createPanorama}>Publicar VIBE</button>
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