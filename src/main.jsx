import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import {
  ArrowRight, CalendarDays, Coffee, Gamepad2, MapPin, MessageCircle,
  Music, ShieldCheck, Sparkles, Users, Dumbbell, Palette, Plus,
  ChevronDown, Menu, X
} from "lucide-react";
import "./styles.css";

const moods = {
  genz: {
    label: "GEN Z",
    short: "Urbano",
    hero: "from-[#08030f] via-[#3d0b69] to-[#ff4a2f]",
    glow: "bg-fuchsia-500/35",
    chip: "border-fuchsia-300/40 bg-fuchsia-400/15 text-fuchsia-50",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
  },
  millennial: {
    label: "MILLENNIAL",
    short: "Curado",
    hero: "from-[#050407] via-[#311039] to-[#c94e22]",
    glow: "bg-orange-500/30",
    chip: "border-orange-300/40 bg-orange-400/15 text-orange-50",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  },
  alpha: {
    label: "GEN ALPHA",
    short: "Lúdico",
    hero: "from-[#080313] via-[#5d19a8] to-[#ff6b35]",
    glow: "bg-violet-400/35",
    chip: "border-violet-300/40 bg-violet-400/15 text-violet-50",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80",
  },
};

const quickChips = ["Café", "Música", "Outdoor", "Conversar", "Deporte", "Juegos"];

const useCases = [
  { title: "Cuando nadie se organiza", text: "Crea un plan y deja que otros se sumen.", icon: Plus },
  { title: "Cuando quieres salir", text: "Encuentra personas cerca con ganas de hacer algo.", icon: MapPin },
  { title: "Cuando tienes un interés específico", text: "Juegos de mesa, café, música, deporte o cultura.", icon: Gamepad2 },
  { title: "Cuando quieres probar algo nuevo", text: "Súmate a una experiencia sin tener que partir desde cero.", icon: Sparkles },
];

const plans = [
  {
    title: "Mesa abierta de juegos de mesa",
    time: "Hoy · 19:30",
    place: "Providencia",
    host: "Anfitrión verificado",
    tag: "Juegos",
    people: "6 cupos",
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Café para conversar de música y ciudad",
    time: "Mañana · 18:00",
    place: "Ñuñoa",
    host: "Anfitrión visible al sumarte",
    tag: "Café",
    people: "4 cupos",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Caminata suave + fotos urbanas",
    time: "Sábado · 10:30",
    place: "Lastarria",
    host: "Anfitrión verificado",
    tag: "Outdoor",
    people: "8 cupos",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
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
  const base = "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition active:scale-[0.98]";
  const styles = variant === "outline"
    ? "border border-white/25 bg-white/8 text-white hover:bg-white/15"
    : "bg-white text-black hover:bg-white/90";
  return <button className={`${base} ${styles} ${className}`} {...props}>{children}</button>;
}

function App() {
  const [moodKey, setMoodKey] = useState("genz");
  const [showMoodMenu, setShowMoodMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mood = moods[moodKey];
  const heroStyle = useMemo(() => `bg-gradient-to-br ${mood.hero}`, [mood]);

  return (
    <main className="min-h-screen bg-[#07040b] text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-orange-400 via-fuchsia-500 to-violet-700 font-black shadow-lg shadow-fuchsia-900/30">V</div>
            <div>
              <p className="text-sm font-black tracking-[0.18em]">VIBE</p>
              <p className="hidden text-xs text-white/45 sm:block">Planes, personas y experiencias reales</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            <a href="#planes" className="hover:text-white">Planes</a>
            <a href="#usos" className="hover:text-white">Usos</a>
            <a href="#confianza" className="hover:text-white">Confianza</a>
          </nav>
          <div className="hidden md:block"><Button>Entrar</Button></div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && (
          <div className="border-t border-white/10 bg-black/80 px-4 py-4 md:hidden">
            <div className="flex flex-col gap-3 text-white/75">
              <a href="#planes">Planes</a><a href="#usos">Usos</a><a href="#confianza">Confianza</a><Button className="mt-2">Entrar</Button>
            </div>
          </div>
        )}
      </header>

      <section className={`relative overflow-hidden pt-20 ${heroStyle}`}>
        <div className={`absolute right-[-10%] top-[18%] h-64 w-64 rounded-full blur-3xl ${mood.glow}`} />
        <div className="absolute left-[-8%] top-[45%] h-56 w-56 rounded-full bg-orange-500/25 blur-3xl" />

        <div className="mx-auto grid min-h-[92vh] max-w-6xl gap-8 px-4 pb-10 pt-8 md:grid-cols-[0.92fr_1.08fr] md:items-center md:px-6 md:pt-14">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/80 backdrop-blur">
              <Sparkles size={14} className="text-orange-200" />
              Para esos días en que quieres hacer algo
            </div>
            <h1 className="max-w-xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">¿Qué haces hoy?</h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/78 md:text-xl">Encuentra un plan real con gente que vibra parecido.</p>
            <p className="mt-3 max-w-lg text-base text-white/62">Cuando quieres salir, aprender o compartir un interés, pero no sabes con quién.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button>Ver planes cerca <ArrowRight className="ml-2" size={18} /></Button>
              <Button variant="outline">Crear un plan</Button>
            </div>
            <div className="mt-6 flex gap-2 overflow-x-auto pb-2 md:flex-wrap">
              {quickChips.map((chip) => (
                <button key={chip} className="shrink-0 rounded-full border border-white/15 bg-black/20 px-4 py-2 text-sm text-white/82 backdrop-blur transition hover:bg-white/12">{chip}</button>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.08 }} className="relative">
            <div className="absolute right-3 top-3 z-20">
              <button onClick={() => setShowMoodMenu((v) => !v)} className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold shadow-xl backdrop-blur ${mood.chip}`}>Mood: {mood.label}<ChevronDown size={14} /></button>
              {showMoodMenu && (
                <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-2xl border border-white/10 bg-black/80 p-1 shadow-2xl backdrop-blur-xl">
                  {Object.entries(moods).map(([key, value]) => (
                    <button key={key} onClick={() => { setMoodKey(key); setShowMoodMenu(false); }} className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-white/80 hover:bg-white/10">
                      <span>{value.label}</span><span className="text-xs text-white/45">{value.short}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative overflow-hidden rounded-[2.2rem] border border-white/12 bg-white/8 p-3 shadow-2xl shadow-black/35 backdrop-blur">
              <img src={mood.image} alt="Personas compartiendo una experiencia" className="h-[430px] w-full rounded-[1.7rem] object-cover md:h-[600px]" />
              <div className="absolute inset-x-3 bottom-3 rounded-[1.7rem] border border-white/10 bg-black/48 p-4 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/45">Plan destacado</p>
                    <p className="mt-1 text-lg font-bold">Juegos de mesa para aprender y jugar</p>
                    <p className="mt-1 text-sm text-white/65">Providencia · Hoy 19:30 · 6 cupos</p>
                  </div>
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-orange-500 text-white"><Gamepad2 size={22} /></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="usos" className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-200/75">Usos reales</p>
        <h2 className="text-3xl font-black md:text-4xl">¿Para cuándo sirve VIBE?</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {useCases.map(({ title, text, icon: Icon }) => (
            <article key={title} className="rounded-3xl border border-white/10 bg-white/[0.055] p-5 shadow-xl shadow-black/15 backdrop-blur">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-orange-400 to-fuchsia-600"><Icon size={20} /></div>
              <h3 className="font-bold leading-tight">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/58">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="planes" className="mx-auto max-w-6xl px-4 pb-12 md:px-6 md:pb-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div><p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-200/75">Cerca de ti</p><h2 className="text-3xl font-black md:text-4xl">Planes para partir hoy</h2></div>
          <Button variant="outline" className="hidden md:inline-flex">Ver todos</Button>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {plans.map((plan) => (
            <article key={plan.title} className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.055] shadow-xl shadow-black/15 backdrop-blur">
              <div className="relative h-48 overflow-hidden"><img src={plan.image} alt={plan.title} className="h-full w-full object-cover transition duration-500 hover:scale-105" /><div className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs font-bold backdrop-blur">{plan.tag}</div></div>
              <div className="p-5">
                <h3 className="text-lg font-bold leading-tight">{plan.title}</h3>
                <div className="mt-4 space-y-2 text-sm text-white/65">
                  <p className="flex items-center gap-2"><CalendarDays size={15} className="text-orange-200" />{plan.time}</p>
                  <p className="flex items-center gap-2"><MapPin size={15} className="text-orange-200" />{plan.place}</p>
                  <p className="flex items-center gap-2"><ShieldCheck size={15} className="text-orange-200" />{plan.host}</p>
                  <p className="flex items-center gap-2"><Users size={15} className="text-orange-200" />{plan.people}</p>
                </div>
                <Button className="mt-5 w-full">Sumarme</Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 md:px-6 md:pb-16">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div><p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-200/75">Explora por interés</p><h2 className="text-3xl font-black">Cuando tienes un interés, encuentra con quién compartirlo.</h2><p className="mt-3 text-white/60">No necesitas convencer a tu grupo de siempre. Crea un plan o súmate a uno que ya exista.</p></div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {categories.map(({ name, icon: Icon }) => (
                <button key={name} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-left transition hover:bg-white/10"><Icon size={20} className="text-orange-200" /><span className="font-semibold">{name}</span></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="confianza" className="mx-auto max-w-6xl px-4 pb-12 md:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[["Ubicación visible", "Antes de sumarte, sabes dónde ocurre el plan."], ["Anfitrión identificado", "La experiencia siempre tiene una persona responsable."], ["Contacto tras verificación", "La coordinación se habilita cuando hay confianza mínima."]].map(([title, text]) => (
            <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.055] p-5"><ShieldCheck className="mb-3 text-orange-200" /><h3 className="font-bold">{title}</h3><p className="mt-2 text-sm text-white/58">{text}</p></div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
        <div className="overflow-hidden rounded-[2rem] border border-orange-300/20 bg-gradient-to-br from-[#2b0a57] via-[#16091d] to-[#ff552f] p-7 text-center md:p-12">
          <h2 className="text-3xl font-black md:text-5xl">Menos scroll. Más vida real.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/72">VIBE transforma ganas sueltas en planes concretos: salir, conversar, moverse, aprender o compartir eso que te interesa.</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Button>Ver planes cerca</Button><Button variant="outline">Crear un plan</Button></div>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
