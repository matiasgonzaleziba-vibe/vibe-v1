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
  Mail,
  Eye,
  EyeOff,
  Trash2,
  LogOut,
  UserCircle,
} from "lucide-react";
import "./styles.css";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://dpdogxovqqcnfdvxeeoo.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_-BYrCmc-NLWqiyFarIWxwg_FUhI94uz";

const supabase = createClient(supabaseUrl, supabaseKey);

const appRedirectUrl =
  import.meta.env.VITE_APP_URL ||
  (typeof window !== "undefined" ? window.location.origin : "https://vibe-v1-iota.vercel.app");

const pendingCreateDraftKey = "vibe_pending_create_draft";

const profileInterestOptions = [
  "VIBE Café",
  "Viajes",
  "VIBE Negocios",
  "Comida",
  "VIBE Outdoor",
  "Deportes",
  "Juegos de mesa",
  "Gaming",
  "VIBE Música",
  "Fiesta",
  "VIBE Literario",
  "Cine",
  "Danza",
  "VIBE Cultura Pop",
  "Cultura",
  "Bienestar",
  "Mascotas",
  "Fotografía",
  "Arte",
  "Idiomas",
  "Voluntariado",
  "Otros",
];

const normalizeInterest = (interest) => {
  const clean = String(interest || "").replace(/^VIBE\s+/i, "").trim();
  if (clean === "VIBE Deporte") return "Deportes";
  if (clean === "Literario") return "VIBE Literario";
  if (clean === "VIBE Juegos") return "Juegos de mesa";
  return clean;
};



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
  hostId: row.host_id || "",
  organizadorId: row.organizador_id || "",
  createdBy: row.created_by || "",
  category: row.category_key || "all",
  title: row.title || "Panorama sin título",
  subtitle: row.subtitle || "Panorama creado por la comunidad",
  date: formatDate(row.starts_at),
  place: row.zone || row.public_location || "Zona por definir",
  organizador: row.host_id ? "Organizador verificado" : "Organizador identificado al unirte",
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

const photoPresets = [
  {
    label: "VIBE Café",
    url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "VIBE Outdoor",
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "VIBE Juegos",
    url: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "VIBE Música",
    url: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "VIBE Negocios",
    url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "VIBE Literario",
    url: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1200&q=80",
  },
];



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
  { label: "VIBE Café", key: "cafe", icon: Coffee, plan: "Café de especialidad + conversación", hint: "" },
  { label: "VIBE Outdoor", key: "outdoor", icon: TreePine, plan: "Caminata suave este fin de semana", hint: "" },
  { label: "VIBE Cultura Pop", key: "custom", icon: Sparkles, plan: "Junta otaku, anime o manga", hint: "" },
  { label: "VIBE Negocios", key: "negocios", icon: BriefcaseBusiness, plan: "Café para compartir una idea de negocio", hint: "" },
  { label: "VIBE Juegos", key: "juegos", icon: Gamepad2, plan: "Mesa abierta de juegos", hint: "" },
  { label: "VIBE Música", key: "musica", icon: Music, plan: "Acompáñame a una tocata", hint: "" },
  { label: "VIBE Deporte", key: "deporte", icon: Trophy, plan: "Partido casual esta semana", hint: "" },
  { label: "VIBE Literario", key: "literario", icon: BookOpen, plan: "Lectura libre + conversación", hint: "" },
  { label: "Otro VIBE", key: "custom", icon: Plus, plan: "Armar un panorama distinto", hint: "" },
];


const onboardingKey = "vibe_onboarding_v3";

const onboardingLocations = [
  { city: "Santiago", country: "Chile", label: "Santiago, Chile", language: "es", lat: -33.45, lng: -70.66 },
  { city: "Viña del Mar", country: "Chile", label: "Viña del Mar, Chile", language: "es", lat: -33.02, lng: -71.55 },
  { city: "Buenos Aires", country: "Argentina", label: "Buenos Aires, Argentina", language: "es", lat: -34.6, lng: -58.38 },
  { city: "São Paulo", country: "Brasil", label: "São Paulo, Brasil", language: "pt", lat: -23.55, lng: -46.63 },
  { city: "Brasília", country: "Brasil", label: "Brasília, Brasil", language: "pt", lat: -15.79, lng: -47.88 },
  { city: "Rio de Janeiro", country: "Brasil", label: "Rio de Janeiro, Brasil", language: "pt", lat: -22.91, lng: -43.17 },
  { city: "Ciudad de México", country: "México", label: "Ciudad de México, México", language: "es", lat: 19.43, lng: -99.13 },
  { city: "Lima", country: "Perú", label: "Lima, Perú", language: "es", lat: -12.05, lng: -77.04 },
  { city: "Bogotá", country: "Colombia", label: "Bogotá, Colombia", language: "es", lat: 4.71, lng: -74.07 },
  { city: "Miami", country: "USA", label: "Miami, USA", language: "en", lat: 25.76, lng: -80.19 },
  { city: "San Francisco", country: "California, USA", label: "San Francisco, California", language: "en", lat: 37.77, lng: -122.42 },
  { city: "Los Angeles", country: "California, USA", label: "Los Angeles, California", language: "en", lat: 34.05, lng: -118.24 },
  { city: "Madrid", country: "España", label: "Madrid, España", language: "es", lat: 40.42, lng: -3.7 },
  { city: "Barcelona", country: "España", label: "Barcelona, España", language: "es", lat: 41.38, lng: 2.17 },
  { city: "Amsterdam", country: "Países Bajos", label: "Amsterdam, Países Bajos", language: "en", lat: 52.37, lng: 4.90 },
  { city: "Rotterdam", country: "Países Bajos", label: "Rotterdam, Países Bajos", language: "en", lat: 51.92, lng: 4.48 },
  { city: "Paris", country: "France", label: "Paris, France", language: "fr", lat: 48.86, lng: 2.35 },
  { city: "Tokyo", country: "Japan", label: "Tokyo, Japan", language: "ja", lat: 35.68, lng: 139.76 },
  { city: "Osaka", country: "Japan", label: "Osaka, Japan", language: "ja", lat: 34.69, lng: 135.50 },
  { city: "Kyoto", country: "Japan", label: "Kyoto, Japan", language: "ja", lat: 35.01, lng: 135.77 },
  { city: "Shanghai", country: "China", label: "Shanghai, China", language: "zh", lat: 31.23, lng: 121.47 },
  { city: "Beijing", country: "China", label: "Beijing, China", language: "zh", lat: 39.90, lng: 116.40 },
];

const languageOptions = [
  { key: "es", label: "Español" },
  { key: "en", label: "English" },
  { key: "pt", label: "Português" },
  { key: "fr", label: "Français" },
  { key: "ja", label: "日本語" },
  { key: "zh", label: "中文" },
];

const onboardingCopy = {
  es: {
    locationTitle: "¿Desde dónde te conectas?",
    locationText: "Pinea tu ubicación para mostrarte VIBEs cercanas y ajustar el idioma.",
    introKicker: "Para esos momentos",
    introTitle: "Cuando quieres hacer algo y falta el con quién.",
    introText: "VIBE parte desde situaciones cotidianas que todos reconocemos.",
    introCards: [
      { title: "Nadie prende", text: "Crea un plan y deja que otros se sumen." },
      { title: "Quieres pasarlo bien", text: "Y te falta con quién. Súmate a algo que ya exista." },
      { title: "Tienes un interés", text: "Encuentra gente para compartirlo en la vida real." },
    ],
    howKicker: "Cómo funciona",
    howTitle: "Elige, revisa y súmate.",
    howSteps: [
      { title: "Elige tu VIBE", text: "Parte por una categoría o interés." },
      { title: "Revisa el panorama", text: "Mira fecha, zona y cupos." },
      { title: "Súmate o crea", text: "Únete a uno o arma el tuyo." },
    ],
    searchPlaceholder: "Busca ciudad o país",
    continue: "Continuar",
    nameTitle: "¿Cómo te llamas?",
    nameText: "Esto ayuda a que tu perfil se sienta más humano cuando crees o te sumes a una VIBE.",
    namePlaceholder: "Tu nombre",
    prefsTitle: "¿Con qué vibras?",
    prefsText: "Elige algunos intereses para personalizar tus primeras recomendaciones.",
    discover: "Descubrir VIBEs",
    create: "Crear mi primera VIBE",
    back: "Volver",
  },
  en: {
    locationTitle: "Where are you joining from?",
    locationText: "Pin your location so VIBE can show nearby plans and set your language.",
    introKicker: "For those moments",
    introTitle: "When you want to do something, but you need someone to join.",
    introText: "VIBE starts from everyday moments: a plan, an interest, a conversation or a place you want to share.",
    introCards: [
      { title: "No one takes the lead", text: "Create a plan and let others join." },
      { title: "You want to have fun", text: "And you need someone to go with. Join something that already exists." },
      { title: "You have an interest", text: "Find people to share it with in real life." },
    ],
    howKicker: "How it works",
    howTitle: "Choose, check and join.",
    howSteps: [
      { title: "Choose your VIBE", text: "Start with a category or interest." },
      { title: "Check the plan", text: "See the date, area and available spots." },
      { title: "Join or create", text: "Join a plan or start your own." },
    ],
    searchPlaceholder: "Search city or country",
    continue: "Continue",
    nameTitle: "What should we call you?",
    nameText: "This helps your profile feel more human when you create or join a VIBE.",
    namePlaceholder: "Your name",
    prefsTitle: "What do you vibe with?",
    prefsText: "Choose a few interests to personalize your first recommendations.",
    discover: "Discover VIBEs",
    create: "Create my first VIBE",
    back: "Back",
  },
  pt: {
    locationTitle: "De onde você está se conectando?",
    locationText: "Marque sua localização para ver VIBEs próximas e ajustar o idioma.",
    introKicker: "Para esses momentos",
    introTitle: "Quando você quer fazer algo, mas falta com quem.",
    introText: "VIBE começa em situações simples: um plano, um interesse, uma conversa ou um lugar para compartilhar.",
    introCards: [
      { title: "Ninguém organiza", text: "Crie um plano e deixe outras pessoas participarem." },
      { title: "Você quer se divertir", text: "E falta com quem. Entre em algo que já exista." },
      { title: "Você tem um interesse", text: "Encontre pessoas para compartilhar isso na vida real." },
    ],
    howKicker: "Como funciona",
    howTitle: "Escolha, revise e participe.",
    howSteps: [
      { title: "Escolha sua VIBE", text: "Comece por uma categoria ou interesse." },
      { title: "Revise o plano", text: "Veja data, região e vagas." },
      { title: "Participe ou crie", text: "Entre em um plano ou crie o seu." },
    ],
    searchPlaceholder: "Buscar cidade ou país",
    continue: "Continuar",
    nameTitle: "Como devemos te chamar?",
    nameText: "Isso ajuda seu perfil a parecer mais humano ao criar ou entrar numa VIBE.",
    namePlaceholder: "Seu nome",
    prefsTitle: "Com o que você vibra?",
    prefsText: "Escolha alguns interesses para personalizar suas primeiras recomendações.",
    discover: "Descobrir VIBEs",
    create: "Criar minha primeira VIBE",
    back: "Voltar",
  },
  fr: {
    locationTitle: "D’où te connectes-tu ?",
    locationText: "Épingle ta localisation pour voir des VIBEs proches et régler la langue.",
    introKicker: "Pour ces moments-là",
    introTitle: "Quand tu as envie de faire quelque chose, mais qu’il te manque quelqu’un.",
    introText: "VIBE part de moments simples : une idée, un intérêt, une conversation ou un lieu à partager.",
    introCards: [
      { title: "Personne ne lance le plan", text: "Crée un plan et laisse d’autres personnes se joindre." },
      { title: "Tu veux passer un bon moment", text: "Et tu ne sais pas avec qui. Rejoins une VIBE déjà ouverte." },
      { title: "Tu as un intérêt", text: "Trouve des personnes avec qui le partager dans la vraie vie." },
    ],
    howKicker: "Comment ça marche",
    howTitle: "Choisis, regarde et rejoins.",
    howSteps: [
      { title: "Choisis ta VIBE", text: "Commence par une catégorie ou un intérêt." },
      { title: "Regarde le plan", text: "Vois la date, la zone et les places disponibles." },
      { title: "Rejoins ou crée", text: "Rejoins un plan ou lance le tien." },
    ],
    searchPlaceholder: "Cherche une ville ou un pays",
    continue: "Continuer",
    nameTitle: "Comment veux-tu qu’on t’appelle ?",
    nameText: "Cela rend ton profil plus humain quand tu crées ou rejoins une VIBE.",
    namePlaceholder: "Ton prénom",
    prefsTitle: "Qu’est-ce qui te fait vibrer ?",
    prefsText: "Choisis quelques intérêts pour personnaliser tes premières recommandations.",
    discover: "Découvrir des VIBEs",
    create: "Créer ma première VIBE",
    back: "Retour",
  },
  ja: {
    locationTitle: "どこから参加しますか？",
    locationText: "場所を選ぶと、近くのVIBEと表示言語を合わせられます。",
    introKicker: "そんな瞬間に",
    introTitle: "何かしたい。でも一緒に行く人がいない。",
    introText: "VIBEは、予定・興味・会話・共有したい場所から始まります。",
    introCards: [
      { title: "誰も企画しない", text: "自分でプランを作って、参加したい人を待ちましょう。" },
      { title: "楽しみたい", text: "でも一緒に行く人がいない。すでにあるVIBEに参加できます。" },
      { title: "興味がある", text: "同じ興味を持つ人とリアルでつながりましょう。" },
    ],
    howKicker: "使い方",
    howTitle: "選ぶ、見る、参加する。",
    howSteps: [
      { title: "VIBEを選ぶ", text: "カテゴリや興味から始めます。" },
      { title: "プランを見る", text: "日時、場所、空き枠を確認します。" },
      { title: "参加または作成", text: "参加するか、自分のプランを作ります。" },
    ],
    searchPlaceholder: "都市または国を検索",
    continue: "続ける",
    nameTitle: "何と呼べばいいですか？",
    nameText: "VIBEを作成したり参加したりするときに、プロフィールがより自然に見えます。",
    namePlaceholder: "名前",
    prefsTitle: "何にワクワクしますか？",
    prefsText: "最初のおすすめを調整するために、興味をいくつか選んでください。",
    discover: "VIBEを見つける",
    create: "最初のVIBEを作る",
    back: "戻る",
  },
  zh: {
    locationTitle: "你从哪里连接？",
    locationText: "选择你的位置，让 VIBE 显示附近的活动并调整语言。",
    introKicker: "为这些时刻而来",
    introTitle: "当你想做点什么，却缺少一起去的人。",
    introText: "VIBE 从日常的小想法开始：一个计划、一个兴趣、一段对话，或一个想分享的地方。",
    introCards: [
      { title: "没人组织", text: "创建一个计划，让别人加入。" },
      { title: "想玩得开心", text: "但缺少一起去的人。加入已经存在的 VIBE。" },
      { title: "有一个兴趣", text: "找到能在现实生活中一起分享的人。" },
    ],
    howKicker: "如何使用",
    howTitle: "选择、查看、加入。",
    howSteps: [
      { title: "选择你的 VIBE", text: "从一个类别或兴趣开始。" },
      { title: "查看计划", text: "看看日期、区域和名额。" },
      { title: "加入或创建", text: "加入一个计划，或创建自己的计划。" },
    ],
    searchPlaceholder: "搜索城市或国家",
    continue: "继续",
    nameTitle: "我们该怎么称呼你？",
    nameText: "这会让你在创建或加入 VIBE 时，个人资料更真实。",
    namePlaceholder: "你的名字",
    prefsTitle: "什么让你有共鸣？",
    prefsText: "选择一些兴趣，让你的初始推荐更贴近你。",
    discover: "发现 VIBE",
    create: "创建我的第一个 VIBE",
    back: "返回",
  },
};

const defaultOnboarding = {
  completed: false,
  language: "es",
  location: onboardingLocations[0],
  name: "",
  interests: ["Café", "Outdoor", "Música"],
};


const siteCopy = {
  es: {
    navExplore: "Explorar",
    navMyVibes: "Mis VIBEs",
    login: "Iniciar sesión",
    create: "Crear una VIBE",
    tagline: "Encuentra tu VIBE. Vive la experiencia.",
    heroBadge: "Planes para hacer hoy",
    heroTitle: "¿Qué haces hoy?",
    heroText: "Encuentra panoramas reales con gente que vibra parecido.",
    heroSupport: "Cuando quieres salir, aprender o compartir un interés, pero no sabes con quién.",
    heroExplore: "Ver panoramas cerca",
    heroCreate: "Crear mi VIBE",
    trustOrganizer: "Organizador identificado",
    trustLocation: "Ubicación según convocatoria",
    trustSmallGroups: "Grupos chicos y concretos",
    categoryKicker: "Elige una VIBE",
    categoryText: "Las categorías son amplias. Al entrar, puedes explorar intereses más específicos o crear una VIBE propia.",
    plansKicker: "Cerca de ti",
    plansTitle: "Panoramas para partir hoy",
    plansText: "Elige una VIBE, revisa el panorama y súmate.",
    viewAll: "Ver todos",
    ideaTitle: "Crear VIBE.",
    ideaText: "Elige categoría, encuentra algo que te tinca y súmate con gente que está en la misma.",
    ctaTitle: "Crea una VIBE y activa el plan.",
    ctaText: "Puede partir como un café, una tocata, un partido, una idea de negocio o un grupo literario. Lo importante es convertir la intención en acción.",
    explorePlans: "Explorar panoramas",
    createMyVibe: "Crear mi VIBE",
  },
  en: {
    navExplore: "Explore",
    navMyVibes: "My VIBEs",
    login: "Log in",
    create: "Create a VIBE",
    tagline: "Find your VIBE. Live the experience.",
    heroBadge: "Plans for today",
    heroTitle: "What are you doing today?",
    heroText: "Find real plans with people who share your vibe.",
    heroSupport: "When you want to go out, learn or share an interest, but do not know who to go with.",
    heroExplore: "See nearby plans",
    heroCreate: "Create my VIBE",
    trustOrganizer: "Identified organizer",
    trustLocation: "Location depends on the plan",
    trustSmallGroups: "Small, concrete groups",
    categoryKicker: "Choose a VIBE",
    categoryText: "Categories are broad. Once inside, you can explore more specific interests or create your own VIBE.",
    plansKicker: "Near you",
    plansTitle: "Plans to start today",
    plansText: "Choose a VIBE, check the plan and join.",
    viewAll: "View all",
    ideaTitle: "Create a VIBE.",
    ideaText: "Choose a category, find something that feels right and join people on the same frequency.",
    ctaTitle: "Create a VIBE and make the plan happen.",
    ctaText: "It can start as coffee, a concert, a game, a business idea or a reading group. The point is to turn intention into action.",
    explorePlans: "Explore plans",
    createMyVibe: "Create my VIBE",
  },
  pt: {
    navExplore: "Explorar",
    navMyVibes: "Minhas VIBEs",
    login: "Entrar",
    create: "Criar uma VIBE",
    tagline: "Encontre sua VIBE. Viva a experiência.",
    heroBadge: "Planos para hoje",
    heroTitle: "O que você vai fazer hoje?",
    heroText: "Encontre planos reais com pessoas que vibram parecido.",
    heroSupport: "Quando você quer sair, aprender ou compartilhar um interesse, mas não sabe com quem.",
    heroExplore: "Ver planos por perto",
    heroCreate: "Criar minha VIBE",
    trustOrganizer: "Organizador identificado",
    trustLocation: "Local conforme o tipo de plano",
    trustSmallGroups: "Grupos pequenos e concretos",
    categoryKicker: "Escolha uma VIBE",
    categoryText: "As categorias são amplas. Ao entrar, você pode explorar interesses mais específicos ou criar sua própria VIBE.",
    plansKicker: "Perto de você",
    plansTitle: "Planos para começar hoje",
    plansText: "Escolha uma VIBE, revise o plano e participe.",
    viewAll: "Ver todos",
    ideaTitle: "Criar uma VIBE.",
    ideaText: "Escolha uma categoria, encontre algo que combine com você e participe com pessoas na mesma frequência.",
    ctaTitle: "Crie uma VIBE e ative o plano.",
    ctaText: "Pode começar como um café, um show, um jogo, uma ideia de negócio ou um grupo de leitura. O importante é transformar intenção em ação.",
    explorePlans: "Explorar planos",
    createMyVibe: "Criar minha VIBE",
  },
  fr: {
    navExplore: "Explorer",
    navMyVibes: "Mes VIBEs",
    login: "Se connecter",
    create: "Créer une VIBE",
    tagline: "Trouve ta VIBE. Vis l’expérience.",
    heroBadge: "Plans pour aujourd’hui",
    heroTitle: "Tu fais quoi aujourd’hui ?",
    heroText: "Trouve de vrais plans avec des personnes qui vibrent comme toi.",
    heroSupport: "Quand tu veux sortir, apprendre ou partager un intérêt, mais que tu ne sais pas avec qui.",
    heroExplore: "Voir les plans proches",
    heroCreate: "Créer ma VIBE",
    trustOrganizer: "Organisateur identifié",
    trustLocation: "Lieu selon le type de plan",
    trustSmallGroups: "Petits groupes concrets",
    categoryKicker: "Choisis une VIBE",
    categoryText: "Les catégories sont larges. Tu peux ensuite explorer des intérêts plus précis ou créer ta propre VIBE.",
    plansKicker: "Près de toi",
    plansTitle: "Plans pour commencer aujourd’hui",
    plansText: "Choisis une VIBE, regarde le plan et rejoins-le.",
    viewAll: "Tout voir",
    ideaTitle: "Créer une VIBE.",
    ideaText: "Choisis une catégorie, trouve quelque chose qui te parle et rejoins des personnes sur la même fréquence.",
    ctaTitle: "Crée une VIBE et lance le plan.",
    ctaText: "Cela peut commencer par un café, un concert, un match, une idée de business ou un groupe de lecture. L’important est de transformer l’intention en action.",
    explorePlans: "Explorer les plans",
    createMyVibe: "Créer ma VIBE",
  },
  ja: {
    navExplore: "探す",
    navMyVibes: "マイVIBE",
    login: "ログイン",
    create: "VIBEを作る",
    tagline: "自分のVIBEを見つけよう。体験しよう。",
    heroBadge: "今日できるプラン",
    heroTitle: "今日は何する？",
    heroText: "同じ空気感の人と、リアルなプランを見つけよう。",
    heroSupport: "出かけたい、学びたい、興味を共有したい。でも誰と行けばいいかわからない時に。",
    heroExplore: "近くのプランを見る",
    heroCreate: "自分のVIBEを作る",
    trustOrganizer: "確認済みの主催者",
    trustLocation: "プランに応じた場所表示",
    trustSmallGroups: "小さく具体的なグループ",
    categoryKicker: "VIBEを選ぶ",
    categoryText: "カテゴリは広めです。中に入ると、より具体的な興味を探したり、自分のVIBEを作れます。",
    plansKicker: "近くで",
    plansTitle: "今日始められるプラン",
    plansText: "VIBEを選び、プランを確認して参加しましょう。",
    viewAll: "すべて見る",
    ideaTitle: "VIBEを作る。",
    ideaText: "カテゴリを選んで、自分に合うものを見つけ、同じ波長の人と参加しましょう。",
    ctaTitle: "VIBEを作って、プランを動かそう。",
    ctaText: "カフェ、ライブ、スポーツ、ビジネスアイデア、読書会から始められます。大事なのは、思いを行動に変えること。",
    explorePlans: "プランを探す",
    createMyVibe: "自分のVIBEを作る",
  },
  zh: {
    navExplore: "探索",
    navMyVibes: "我的 VIBE",
    login: "登录",
    create: "创建 VIBE",
    tagline: "找到你的 VIBE，体验真实生活。",
    heroBadge: "今天可以开始的计划",
    heroTitle: "你今天想做什么？",
    heroText: "找到真实的计划，遇见与你有相同频率的人。",
    heroSupport: "当你想出去、学习或分享一个兴趣，却不知道和谁一起时。",
    heroExplore: "查看附近计划",
    heroCreate: "创建我的 VIBE",
    trustOrganizer: "已识别的组织者",
    trustLocation: "地点根据计划类型显示",
    trustSmallGroups: "小而具体的群组",
    categoryKicker: "选择一个 VIBE",
    categoryText: "类别是开放的。进入后，你可以探索更具体的兴趣，或创建自己的 VIBE。",
    plansKicker: "在你附近",
    plansTitle: "今天可以开始的计划",
    plansText: "选择一个 VIBE，查看计划并加入。",
    viewAll: "查看全部",
    ideaTitle: "创建一个 VIBE。",
    ideaText: "选择类别，找到适合你的计划，和同频的人一起参与。",
    ctaTitle: "创建 VIBE，让计划发生。",
    ctaText: "它可以从一杯咖啡、一场演出、一场比赛、一个商业想法或一个读书小组开始。关键是把想法变成行动。",
    explorePlans: "探索计划",
    createMyVibe: "创建我的 VIBE",
  },
};

const loadOnboarding = () => {
  if (typeof window === "undefined") return defaultOnboarding;
  try {
    const raw = window.localStorage.getItem(onboardingKey);
    return raw ? { ...defaultOnboarding, ...JSON.parse(raw) } : defaultOnboarding;
  } catch (_error) {
    return defaultOnboarding;
  }
};


const planMetaLabels = {
  es: {
    organizerVerified: "Organizador verificado",
    organizerOnJoin: "Organizador identificado al unirte",
    organizerOnJoinShort: "Organizador identificado al sumarte",
    publicLocation: "Ubicación pública",
    confirmLocation: "Dirección al confirmar",
    seats: (n) => `${n} cupos`,
  },
  en: {
    organizerVerified: "Verified organizer",
    organizerOnJoin: "Organizer identified when you join",
    organizerOnJoinShort: "Organizer identified when you join",
    publicLocation: "Public location",
    confirmLocation: "Address after confirmation",
    seats: (n) => `${n} spots`,
  },
  pt: {
    organizerVerified: "Organizador verificado",
    organizerOnJoin: "Organizador identificado ao participar",
    organizerOnJoinShort: "Organizador identificado ao participar",
    publicLocation: "Localização pública",
    confirmLocation: "Endereço após confirmação",
    seats: (n) => `${n} vagas`,
  },
  fr: {
    organizerVerified: "Organisateur vérifié",
    organizerOnJoin: "Organisateur identifié à l’inscription",
    organizerOnJoinShort: "Organisateur identifié à l’inscription",
    publicLocation: "Lieu public",
    confirmLocation: "Adresse après confirmation",
    seats: (n) => `${n} places`,
  },
  ja: {
    organizerVerified: "確認済みの主催者",
    organizerOnJoin: "参加時に主催者を確認",
    organizerOnJoinShort: "参加時に主催者を確認",
    publicLocation: "公開場所",
    confirmLocation: "承認後に住所を表示",
    seats: (n) => `${n}枠`,
  },
  zh: {
    organizerVerified: "已验证组织者",
    organizerOnJoin: "加入后可查看组织者",
    organizerOnJoinShort: "加入后可查看组织者",
    publicLocation: "公开地点",
    confirmLocation: "确认后显示地址",
    seats: (n) => `${n}个名额`,
  },
};

const planTranslations = {
  en: {
    1: { title: "Open board game table", subtitle: "Learn, play and talk without organizing everything yourself", date: "Today · 7:30 PM", vibe: "Ideal if you like board games, cards, strategy or want to start from zero." },
    2: { title: "Coffee crawl", subtitle: "Specialty coffee, tasting and good conversation", date: "Tomorrow · 6:00 PM", vibe: "For people who want to get out, try good coffee and talk about coffee." },
    3: { title: "Let’s go hiking", subtitle: "Share the best spots near the mountains", date: "Saturday · 10:30 AM", vibe: "For people who want something different without convincing the usual group." },
    4: { title: "Join me for a live show", subtitle: "Live music, conversation and good energy", date: "Friday · 8:00 PM", vibe: "For people who want to go to a show or festival but do not always have someone to go with." },
    5: { title: "Pre-game: drinks and conversation", subtitle: "A simple starting point before going out", date: "Thursday · 9:00 PM", vibe: "Start the night without arriving alone, with a simple plan and a small group." },
    6: { title: "Literature: start a reading group", subtitle: "Share a book, a genre or a topic", date: "Sunday · 10:00 AM", vibe: "For sharing reading, writing or intellectual curiosity." },
    7: { title: "Basketball VIBE: casual game", subtitle: "Build a team, move and play", date: "Wednesday · 8:30 PM", vibe: "An example of a specific VIBE created inside a broader category." },
    8: { title: "Share a business idea", subtitle: "Coffee to discuss ideas, partners or next steps", date: "Tuesday · 8:30 AM", vibe: "For people with an idea in mind who want to contrast it with others." },
  },
  pt: {
    1: { title: "Mesa aberta de jogos", subtitle: "Aprender, jogar e conversar sem organizar tudo sozinho", date: "Hoje · 19:30", vibe: "Ideal para quem gosta de jogos de mesa, cartas, estratégia ou quer começar do zero." },
    2: { title: "Rota de cafés", subtitle: "Café especial, degustação e boa conversa", date: "Amanhã · 18:00", vibe: "Para quem quer sair de casa, provar um bom café e conversar." },
    3: { title: "Vamos fazer uma trilha", subtitle: "Compartilhar bons lugares perto da montanha", date: "Sábado · 10:30", vibe: "Para quem quer fazer algo diferente sem convencer o grupo de sempre." },
    4: { title: "Venha comigo a um show", subtitle: "Música ao vivo, conversa e boa vibe", date: "Sexta · 20:00", vibe: "Para quem quer ir a um show ou festival, mas nem sempre tem com quem." },
    5: { title: "Pré: drinks e conversa", subtitle: "Um ponto de partida antes de sair", date: "Quinta · 21:00", vibe: "Para começar a noite com um plano simples e um grupo pequeno." },
    6: { title: "Literatura: crie seu grupo de leitura", subtitle: "Compartilhe um livro, gênero ou tema", date: "Domingo · 10:00", vibe: "Para compartilhar leitura, escrita ou curiosidade intelectual." },
    7: { title: "VIBE Basquete: jogo casual", subtitle: "Montar equipe, se mexer e jogar", date: "Quarta · 20:30", vibe: "Um exemplo de VIBE específica dentro de uma categoria geral." },
    8: { title: "Compartilhe uma ideia de negócio", subtitle: "Um café para conversar ideias, sócios ou próximos passos", date: "Terça · 08:30", vibe: "Para quem tem uma ideia e quer contrastá-la com outras pessoas." },
  },
  fr: {
    1: { title: "Table ouverte de jeux de société", subtitle: "Apprendre, jouer et discuter sans tout organiser", date: "Aujourd’hui · 19:30", vibe: "Idéal si tu aimes les jeux de société, les cartes ou la stratégie." },
    2: { title: "Balade café", subtitle: "Café de spécialité, dégustation et conversation", date: "Demain · 18:00", vibe: "Pour sortir, goûter un bon café et discuter." },
    3: { title: "Allons marcher en montagne", subtitle: "Partager les meilleurs spots près des reliefs", date: "Samedi · 10:30", vibe: "Pour faire quelque chose de différent sans convaincre le groupe habituel." },
    4: { title: "Viens avec moi à un concert", subtitle: "Musique live, conversation et bonne vibe", date: "Vendredi · 20:00", vibe: "Pour aller à un concert ou festival sans y aller seul." },
    5: { title: "Avant-soirée : verres et conversation", subtitle: "Un point de départ avant de sortir", date: "Jeudi · 21:00", vibe: "Pour commencer la soirée avec un plan simple et un petit groupe." },
    6: { title: "Littérature : crée ton club de lecture", subtitle: "Partage un livre, un genre ou un sujet", date: "Dimanche · 10:00", vibe: "Pour partager lecture, écriture ou curiosité intellectuelle." },
    7: { title: "VIBE Basket : match casual", subtitle: "Former une équipe, bouger et jouer", date: "Mercredi · 20:30", vibe: "Un exemple de VIBE spécifique dans une catégorie large." },
    8: { title: "Partage une idée business", subtitle: "Un café pour discuter idées, associés ou prochaines étapes", date: "Mardi · 08:30", vibe: "Pour tester une idée avec d’autres personnes." },
  },
  ja: {
    1: { title: "ボードゲームのオープン卓", subtitle: "全部を企画しなくても、学んで遊んで話せる", date: "今日 · 19:30", vibe: "ボードゲーム、カード、戦略ゲームが好きな人におすすめ。" },
    2: { title: "カフェ巡り", subtitle: "スペシャルティコーヒー、試飲、会話", date: "明日 · 18:00", vibe: "家を出て、おいしいコーヒーを試しながら話したい人へ。" },
    3: { title: "山へ行こう", subtitle: "山の近くのおすすめスポットを共有", date: "土曜 · 10:30", vibe: "いつもの友達を説得しなくても、少し違うことをしたい人へ。" },
    4: { title: "ライブに一緒に行こう", subtitle: "ライブ音楽、会話、いい雰囲気", date: "金曜 · 20:00", vibe: "ライブやフェスに行きたいけれど、一人では行きにくい人へ。" },
    5: { title: "プレ会：ドリンクと会話", subtitle: "出かける前のシンプルな集合", date: "木曜 · 21:00", vibe: "少人数で気軽に夜を始めたい人へ。" },
    6: { title: "読書会をつくる", subtitle: "本、ジャンル、テーマを共有", date: "日曜 · 10:00", vibe: "読書、文章、知的好奇心を共有したい人へ。" },
    7: { title: "バスケVIBE：カジュアル試合", subtitle: "チームを作って動いて遊ぶ", date: "水曜 · 20:30", vibe: "広いカテゴリの中に具体的なVIBEを作る例です。" },
    8: { title: "ビジネスアイデアを話す", subtitle: "アイデア、仲間、次の一歩をコーヒーで相談", date: "火曜 · 08:30", vibe: "頭の中のアイデアを他の人と試したい人へ。" },
  },
  zh: {
    1: { title: "开放桌游局", subtitle: "不用自己安排全部，也能学习、游戏和聊天", date: "今天 · 19:30", vibe: "适合喜欢桌游、卡牌、策略，或想从零开始的人。" },
    2: { title: "咖啡探索", subtitle: "精品咖啡、品鉴和好聊天", date: "明天 · 18:00", vibe: "适合想出门喝好咖啡、聊咖啡的人。" },
    3: { title: "一起去爬山", subtitle: "分享山边的好去处", date: "周六 · 10:30", vibe: "想做点不一样的事，又不想说服老朋友群的人。" },
    4: { title: "一起去看现场演出", subtitle: "现场音乐、聊天和好氛围", date: "周五 · 20:00", vibe: "想去演出或音乐节，但不想一个人去的人。" },
    5: { title: "出门前：小酌和聊天", subtitle: "出门前的简单集合点", date: "周四 · 21:00", vibe: "用简单计划和小群体开始夜晚。" },
    6: { title: "文学：创建读书小组", subtitle: "分享一本书、一个类型或一个主题", date: "周日 · 10:00", vibe: "分享阅读、写作或知识好奇心。" },
    7: { title: "篮球 VIBE：轻松比赛", subtitle: "组队、运动、一起玩", date: "周三 · 20:30", vibe: "在大类中创建具体 VIBE 的例子。" },
    8: { title: "分享一个商业想法", subtitle: "喝咖啡聊想法、伙伴或下一步", date: "周二 · 08:30", vibe: "适合想和别人碰撞商业想法的人。" },
  },
};

const knownTitleTranslations = {
  en: {
    "Café de especialidad + conversación": { title: "Specialty coffee + conversation", subtitle: "A VIBE created around coffee and conversation", vibe: "For people who want to meet around a simple, low-pressure plan." },
    "Partido casual mixto este jueves": { title: "Casual mixed game this Thursday", subtitle: "A defined plan created on VIBE", vibe: "A simple sports plan to join without organizing the full group." },
  },
  pt: {
    "Café de especialidad + conversación": { title: "Café especial + conversa", subtitle: "Uma VIBE criada em torno de café e conversa", vibe: "Para se encontrar em um plano simples e sem pressão." },
    "Partido casual mixto este jueves": { title: "Jogo casual misto nesta quinta", subtitle: "Panorama criado na VIBE", vibe: "Um plano esportivo simples para participar sem organizar tudo." },
  },
  fr: {
    "Café de especialidad + conversación": { title: "Café de spécialité + conversation", subtitle: "Une VIBE autour du café et de la conversation", vibe: "Pour se retrouver autour d’un plan simple et sans pression." },
    "Partido casual mixto este jueves": { title: "Match mixte casual ce jeudi", subtitle: "Plan créé sur VIBE", vibe: "Un plan sportif simple à rejoindre sans tout organiser." },
  },
  ja: {
    "Café de especialidad + conversación": { title: "スペシャルティコーヒー＋会話", subtitle: "コーヒーと会話を中心にしたVIBE", vibe: "気軽なプランで人と会いたい人へ。" },
    "Partido casual mixto este jueves": { title: "今週木曜のカジュアルミックス試合", subtitle: "VIBEで作られたプラン", vibe: "全部を企画せずに参加できるシンプルなスポーツプラン。" },
  },
  zh: {
    "Café de especialidad + conversación": { title: "精品咖啡 + 聊天", subtitle: "围绕咖啡和聊天创建的 VIBE", vibe: "适合用轻松计划认识新的人。" },
    "Partido casual mixto este jueves": { title: "本周四轻松混合比赛", subtitle: "在 VIBE 创建的计划", vibe: "不用组织整个群体，也能加入的简单运动计划。" },
  },
};

const translatePlan = (plan, language = "es") => {
  if (!plan || language === "es") return plan;
  const meta = planMetaLabels[language] || planMetaLabels.es;
  const byId = plan.source !== "supabase" ? (planTranslations[language]?.[plan.id] || {}) : {};
  const byTitle = knownTitleTranslations[language]?.[plan.title] || {};
  const seatsNumber = String(plan.seats || "").match(/\d+/)?.[0];

  let organizador = plan.organizador;
  if (/verificado/i.test(organizador || "")) organizador = meta.organizerVerified;
  if (/identificado/i.test(organizador || "")) organizador = meta.organizerOnJoin;

  let access = plan.access;
  if (/pública|publica|public/i.test(access || "")) access = meta.publicLocation;
  if (/confirmar|confirm/i.test(access || "")) access = meta.confirmLocation;

  return {
    ...plan,
    ...byId,
    ...byTitle,
    organizador,
    access,
    seats: seatsNumber ? meta.seats(seatsNumber) : plan.seats,
  };
};


const demoPlans = [
  {
    id: 1,
    category: "juegos",
    title: "Mesa abierta de juegos de mesa",
    subtitle: "Aprender, jugar y conversar sin tener que organizarlo todo",
    date: "Hoy · 19:30",
    place: "Providencia",
    organizador: "Organizador verificado",
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
    organizador: "Organizador identificado al unirte",
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
    organizador: "Organizador verificado",
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
    organizador: "Organizador verificado",
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
    organizador: "{currentSiteCopy.trustOrganizer} al sumarte",
    seats: "10 cupos",
    access: "Dirección al confirmar",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
    vibe: "Para partir el carrete sin llegar solo, con un plan simple y un grupo acotado.",
  },
  {
    id: 6,
    category: "literario",
    title: "Literatura: Crea tu grupo de lectura",
    subtitle: "Comparte un libro, un género o un tema literario",
    date: "Domingo · 10:00",
    place: "Barrio Italia",
    organizador: "Organizador verificado",
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
    organizador: "Organizador verificado",
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
    organizador: "{currentSiteCopy.trustOrganizer} al sumarte",
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


const ensureUserProfile = async (user, fullName = "") => {
  if (!user) return;
  await supabase.from("profiles").upsert(
    {
      id: user.id,
      email: user.email,
      full_name: fullName || user.user_metadata?.full_name || user.email?.split("@")[0] || "Usuario VIBE",
      is_organizador: true,
    },
    { onConflict: "id" }
  );
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [activeRoom, setActiveRoom] = useState(null);
  const [notice, setNotice] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [customVibe, setCustomVibe] = useState("VIBE Básquetbol");
  const [customPlan, setCustomPlan] = useState("Partido casual mixto este jueves");
  const [photoImageUrl, setPhotoImageUrl] = useState("");
  const [creationMode, setCreationMode] = useState("definido");
  const [callType, setCallType] = useState("abierta");
  const [locationType, setLocationType] = useState("publica");
  const [eventFormat, setEventFormat] = useState("presencial");
  const [zone, setZone] = useState("Providencia / Ñuñoa");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [dbPlans, setDbPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [supabaseError, setSupabaseError] = useState("");
  const [session, setSession] = useState(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [showAuthPassword, setShowAuthPassword] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [profileName, setProfileName] = useState("");
  const [profileBio, setProfileBio] = useState("");
  const [profileWhatsapp, setProfileWhatsapp] = useState("");
  const [profileZone, setProfileZone] = useState("");
  const [profileInterests, setProfileInterests] = useState("Café, Juegos, VIBE Outdoor");
  const [profileAlerts, setProfileAlerts] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [profileEditMode, setProfileEditMode] = useState(false);
  const [showMyEvents, setShowMyEvents] = useState(false);
  const [myEvents, setMyEvents] = useState([]);
  const [loadingMyEvents, setLoadingMyEvents] = useState(false);
  const [onboarding, setOnboarding] = useState(() => loadOnboarding());
  const [onboardingStep, setOnboardingStep] = useState(() => loadOnboarding().completed ? "done" : "location");
  const [locationQuery, setLocationQuery] = useState("");
  const [globeIndex, setGlobeIndex] = useState(0);


  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session || null);
      if (data.session?.user) {
        ensureUserProfile(data.session.user);
        setAuthEmail(data.session.user.email || "");
        restorePendingCreateDraft();
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession || null);
      if (nextSession?.user) {
        ensureUserProfile(nextSession.user);
        setAuthEmail(nextSession.user.email || "");
        restorePendingCreateDraft();
      }
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(onboardingKey, JSON.stringify(onboarding));
    } catch (_error) {
      // localStorage may be unavailable in private mode.
    }
  }, [onboarding]);

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

  const rawPlans = dbPlans.length > 0 ? dbPlans : demoPlans;
  const plans = rawPlans.map((plan) => translatePlan(plan, onboarding.language));

  const savePendingCreateDraft = () => {
    try {
      localStorage.setItem(
        pendingCreateDraftKey,
        JSON.stringify({
          customVibe,
          customPlan,
          creationMode,
          callType,
          locationType,
          eventFormat,
          zone,
          eventDate,
          eventTime,
          activeCategory,
          photoImageUrl,
        })
      );
    } catch (error) {
      console.warn("Could not save pending VIBE draft", error);
    }
  };

  const restorePendingCreateDraft = () => {
    try {
      const rawDraft = localStorage.getItem(pendingCreateDraftKey);
      if (!rawDraft) return false;

      const draft = JSON.parse(rawDraft);
      setCustomVibe(draft.customVibe || "VIBE ");
      setCustomPlan(draft.customPlan || "");
      setCreationMode(draft.creationMode || "definido");
      setCallType(draft.callType || "abierta");
      setLocationType(draft.locationType || "publica");
      setZone(draft.zone || "");
      setEventDate(draft.eventDate || "");
      setEventTime(draft.eventTime || "");
      setActiveCategory(draft.activeCategory || "all");
      setPhotoImageUrl(draft.photoImageUrl || "");
      setShowCreate(true);
      setShowAuth(false);
      localStorage.removeItem(pendingCreateDraftKey);
      setNotice("Retomemos la VIBE que estabas creando.");
      setTimeout(() => setNotice(""), 3200);
      return true;
    } catch (error) {
      console.warn("Could not restore pending VIBE draft", error);
      localStorage.removeItem(pendingCreateDraftKey);
      return false;
    }
  };

  const signInWithPassword = async () => {
    if (!authEmail.trim() || !authPassword.trim()) {
      setNotice("Ingresa correo y contraseña.");
      setTimeout(() => setNotice(""), 2600);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: authEmail.trim(),
      password: authPassword,
    });

    if (error) {
      console.error("Password login error:", error);
      setNotice("No pude iniciar sesión. Revisa correo y contraseña.");
    } else {
      setNotice("Sesión iniciada.");
      setShowAuth(false);
    }

    setTimeout(() => setNotice(""), 3200);
  };

  const signUpWithPassword = async () => {
    if (!authEmail.trim() || !authPassword.trim()) {
      setNotice("Ingresa correo y una contraseña.");
      setTimeout(() => setNotice(""), 2600);
      return;
    }

    if (authPassword.length < 6) {
      setNotice("La contraseña debe tener al menos 6 caracteres.");
      setTimeout(() => setNotice(""), 3000);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: authEmail.trim(),
      password: authPassword,
      options: {
        emailRedirectTo: appRedirectUrl,
      },
    });

    if (error) {
      console.error("Password signup error:", error);
      setNotice("No pude crear la cuenta. Quizás ese correo ya existe.");
    } else {
      setNotice("Revisa tu correo para confirmar la cuenta.");
      setAuthMode("login");
    }

    setTimeout(() => setNotice(""), 3600);
  };

  const resetPassword = async () => {
    if (!authEmail.trim()) {
      setNotice("Ingresa tu correo para recuperar contraseña.");
      setTimeout(() => setNotice(""), 2600);
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(authEmail.trim(), {
      redirectTo: appRedirectUrl,
    });

    if (error) {
      console.error("Reset password error:", error);
      setNotice("No pude enviar el correo de recuperación.");
    } else {
      setNotice("Te envié un correo para cambiar tu contraseña.");
    }

    setTimeout(() => setNotice(""), 3600);
  };

  const sendMagicLink = async () => {
    if (!authEmail.trim()) {
      setNotice("Ingresa tu correo para iniciar sesión.");
      setTimeout(() => setNotice(""), 2600);
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email: authEmail.trim(),
      options: {
        emailRedirectTo: appRedirectUrl,
      },
    });

    if (error) {
      console.error("Auth error:", error);
      setNotice("No pude enviar el link de acceso.");
    } else {
      setNotice("Te envié un link de acceso al correo.");
    }

    setTimeout(() => setNotice(""), 3600);
  };

  const toggleProfileInterest = (interest) => {
    const normalizedInterest = normalizeInterest(interest);
    const current = profileInterests
      .split(",")
      .map(normalizeInterest)
      .filter(Boolean);

    const next = current.includes(normalizedInterest)
      ? current.filter((item) => item !== normalizedInterest)
      : [...current, normalizedInterest];

    setProfileInterests(next.join(", "));
  };

  const loadProfile = async () => {
    if (!session?.user) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("full_name, bio, whatsapp, preferred_zone, interests, notify_new_vibes")
      .eq("id", session.user.id)
      .maybeSingle();

    if (error) {
      console.error("Load profile error:", error);
      return;
    }

    if (data) {
      setProfileName(data.full_name || session.user.email?.split("@")[0] || "");
      setProfileBio(data.bio || "");
      setProfileWhatsapp(data.whatsapp || "");
      setProfileZone(data.preferred_zone || "");
      setProfileInterests(
        Array.isArray(data.interests)
          ? data.interests.map(normalizeInterest).filter(Boolean).join(", ")
          : ""
      );
      setProfileAlerts(data.notify_new_vibes ?? true);
    }
  };

  const openProfile = async () => {
    if (!session?.user) {
      setShowAuth(true);
      return;
    }
    setProfileEditMode(false);
    setShowProfile(true);
    await loadProfile();
  };

  const saveProfile = async () => {
    if (!session?.user) {
      setShowAuth(true);
      return;
    }

    const { error } = await supabase.from("profiles").upsert(
      {
        id: session.user.id,
        email: session.user.email,
        full_name: profileName || session.user.email?.split("@")[0] || "Usuario VIBE",
        bio: profileBio,
        whatsapp: profileWhatsapp,
        preferred_zone: profileZone,
        interests: profileInterests
          .split(",")
          .map(normalizeInterest)
          .filter(Boolean),
        notify_new_vibes: profileAlerts,
        is_organizador: true,
      },
      { onConflict: "id" }
    );

    if (error) {
      console.error("Profile error:", error);
      setNotice("No pude guardar el perfil.");
    } else {
      setNotice("Cambios guardados.");
      setProfileEditMode(false);
    }

    setTimeout(() => setNotice(""), 2600);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setMyEvents([]);
    setMenuOpen(false);
    setProfileMenuOpen(false);
    setShowProfile(false);
    setShowMyEvents(false);
    setNotice("Sesión cerrada.");
    setTimeout(() => setNotice(""), 2200);
  };

  const openCreateModal = () => {
    setMenuOpen(false);
    setProfileMenuOpen(false);
    setShowAuth(false);
    setShowProfile(false);
    setShowMyEvents(false);
    setSelectedPlan(null);
    setActiveRoom(null);
    setShowCreate(true);
  };

  const openMyEvents = async () => {
    if (!session?.user) {
      setShowAuth(true);
      return;
    }

    setShowMyEvents(true);
    setLoadingMyEvents(true);

    const { data, error } = await supabase
      .from("panoramas")
      .select("*")
      .eq("host_id", session.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("My events error:", error);
      setNotice("No pude cargar tus eventos.");
      setMyEvents([]);
    } else {
      setMyEvents((data || []).map(mapPanoramaFromDb));
    }

    setLoadingMyEvents(false);
    setTimeout(() => setNotice(""), 2600);
  };

  const deleteMyEvent = async (planId) => {
    if (!session?.user) return;

    const { error } = await supabase
      .from("panoramas")
      .update({ status: "cancelled" })
      .eq("id", planId)
      .eq("host_id", session.user.id);

    if (error) {
      console.error("Delete event error:", error);
      setNotice("No pude eliminar el evento.");
    } else {
      setMyEvents((prev) => prev.filter((event) => event.id !== planId));
      setDbPlans((prev) => prev.filter((event) => event.id !== planId));
      setNotice("Evento eliminado.");
    }

    setTimeout(() => setNotice(""), 2600);
  };

  const canManagePlan = (plan) => {
    if (!session?.user || !plan || plan.source !== "supabase") return false;
    return [plan.hostId, plan.organizadorId, plan.createdBy].filter(Boolean).includes(session.user.id);
  };

  const selectQuickVibe = (vibe) => {
    const label = vibe.label === "Otro VIBE" || vibe.label === "Otro VIBE" ? "" : vibe.label.replace(/^VIBE\s+/i, "");
    setCustomVibe(label ? `VIBE ${label}` : "VIBE ");
    setCustomPlan(vibe.plan);
    setActiveCategory(vibe.key === "custom" ? "all" : vibe.key);

    const suggestedPhoto = photoPresets.find((photo) =>
      label && photo.label.toLowerCase().includes(label.toLowerCase())
    );
    if (suggestedPhoto && !photoImageUrl) {
      setPhotoImageUrl(suggestedPhoto.url);
    }
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setPhotoImageUrl(localUrl);
    setNotice("Foto cargada como preview. Para guardarla real, luego conectamos Supabase Storage.");
    setTimeout(() => setNotice(""), 3400);
  };

  const isMeetingUrl = (value) => {
    if (!value) return false;
    return /^https?:\/\//i.test(value.trim());
  };

  const createPanorama = async () => {
    const cleanZone = zone.trim();
    const finalPlace =
      eventFormat === "online"
        ? cleanZone || "Online · link por definir"
        : cleanZone || "Lugar por confirmar";
    const finalLocationType =
      eventFormat === "online" ? "online" : locationType;

    if (!session?.user) {
      savePendingCreateDraft();
      setShowAuth(true);
      setShowCreate(false);
      setNotice("Inicia sesión y seguimos desde donde quedaste.");
      setTimeout(() => setNotice(""), 3200);
      return;
    }

    await ensureUserProfile(session.user, profileName);

    const categoryKey = activeCategory === "all" ? "custom" : activeCategory;
    const locationLabel = locationType === "publica" ? zone : null;

    setNotice("Creando panorama...");

    const { data: vibeData, error: vibeError } = await supabase
      .from("vibes")
      .insert({
        name: customVibe,
        description: customPlan,
        category_key: categoryKey,
        created_by: session.user.id,
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
        host_id: session.user.id,
        title: customPlan,
        subtitle: creationMode === "random"
          ? "Panorama creado en VIBE"
          : creationMode === "abierto"
            ? "Panorama creado en VIBE"
            : "Panorama creado en VIBE",
        description: `${customVibe}: ${customPlan}`,
        category_key: categoryKey,
        image_url: photoImageUrl || defaultImageByCategory[categoryKey] || defaultImageByCategory.custom,
        panorama_type: creationMode,
        call_type: callType,
        location_type: finalLocationType,
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
      setNotice("No pude crear el panorama. Revisa permisos o columnas de Supabase.");
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
    const categoryFiltered = activeCategory === "all" ? plans : plans.filter((p) => p.category === activeCategory);
    const city = onboarding.location?.city?.toLowerCase?.() || "";
    const prefs = (onboarding.interests || []).join(" ").toLowerCase();

    return [...categoryFiltered].sort((a, b) => {
      const aText = `${a.place} ${a.title} ${a.subtitle} ${a.category}`.toLowerCase();
      const bText = `${b.place} ${b.title} ${b.subtitle} ${b.category}`.toLowerCase();
      const aScore = (city && aText.includes(city) ? 3 : 0) + (prefs && prefs.includes(a.category) ? 1 : 0);
      const bScore = (city && bText.includes(city) ? 3 : 0) + (prefs && prefs.includes(b.category) ? 1 : 0);
      return bScore - aScore;
    });
  }, [activeCategory, plans, onboarding.location, onboarding.interests]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const openVibeRoom = (plan, roomStatus = "joined") => {
    setActiveRoom({ ...plan, roomStatus });
    setSelectedPlan(null);
  };

  const updateOnboarding = (patch) => {
    setOnboarding((prev) => ({ ...prev, ...patch }));
  };

  const resetOnboardingFlow = () => {
    const fresh = { ...defaultOnboarding, completed: false };
    setOnboarding(fresh);
    setOnboardingStep("location");
    setLocationQuery("");
    window.localStorage.removeItem("vibe_onboarding_v1");
    window.localStorage.removeItem("vibe_onboarding_v2");
    window.localStorage.setItem(onboardingKey, JSON.stringify(fresh));
  };

  const selectedOnboardingLocation = onboarding.location || onboardingLocations[globeIndex] || onboardingLocations[0];
  const currentOnboardingCopy = onboardingCopy[onboarding.language] || onboardingCopy.es;
  const currentSiteCopy = siteCopy[onboarding.language] || siteCopy.es;
  const locationMatches = onboardingLocations.filter((location) => {
    const text = `${location.city} ${location.country} ${location.label}`.toLowerCase();
    return text.includes(locationQuery.toLowerCase());
  });

  const rotateGlobe = (direction) => {
    const next = (globeIndex + direction + onboardingLocations.length) % onboardingLocations.length;
    setGlobeIndex(next);
    updateOnboarding({ location: onboardingLocations[next], language: onboardingLocations[next].language || onboarding.language });
  };

  const selectOnboardingLocation = (location) => {
    const index = onboardingLocations.findIndex((item) => item.label === location.label);
    setGlobeIndex(index >= 0 ? index : globeIndex);
    updateOnboarding({ location, language: location.language || onboarding.language });
  };

  const toggleOnboardingInterest = (interest) => {
    const current = onboarding.interests || [];
    updateOnboarding({
      interests: current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest],
    });
  };

  const finishOnboarding = (openCreate = false) => {
    const finalOnboarding = { ...onboarding, completed: true };
    setOnboarding(finalOnboarding);
    setOnboardingStep("done");
    setProfileName((prev) => prev || finalOnboarding.name || "");
    setProfileZone((prev) => prev || finalOnboarding.location?.city || "");
    setProfileInterests((finalOnboarding.interests || []).join(", "));
    setActiveCategory("all");
    if (openCreate) {
      setTimeout(() => openCreateModal(), 0);
    } else {
      setTimeout(() => scrollTo("planes"), 0);
    }
  };

  const joinPlan = async (plan) => {
    if (!session?.user) {
      setShowAuth(true);
      setNotice("Inicia sesión para sumarte.");
      setTimeout(() => setNotice(""), 2600);
      return;
    }

    await ensureUserProfile(session.user, profileName);

    if (plan.source !== "supabase") {
      openVibeRoom(plan, "joined");
      setNotice(`Te sumaste a: ${plan.title}`);
      setTimeout(() => setNotice(""), 2600);
      return;
    }

    setNotice("Procesando solicitud...");

    if (plan.callType === "cerrada") {
      const { error } = await supabase.from("join_requests").insert({
        panorama_id: plan.id,
        requester_id: session.user.id,
        message: "Solicitud creada desde el MVP de VIBE.",
        status: "pending",
      });

      if (error) {
        console.error("Error creating request:", error);
        setNotice("No pude enviar la solicitud. Revisa permisos en Supabase.");
      } else {
        openVibeRoom(plan, "pending");
        setNotice("Solicitud enviada al organizador.");
      }
    } else {
      const { error } = await supabase.from("participants").insert({
        panorama_id: plan.id,
        profile_id: session.user.id,
        role: "participant",
        status: "confirmed",
      });

      if (error) {
        console.error("Error joining panorama:", error);
        setNotice("No pude sumarte. Revisa permisos en Supabase.");
      } else {
        openVibeRoom(plan, "joined");
        setNotice(`Te sumaste a: ${plan.title}`);
      }
    }

    setTimeout(() => setNotice(""), 3200);
  };

  const onboardingGate = !onboarding.completed ? (
      <div className="onboarding-shell onboarding-gate">
        <div className="onboarding-brand onboarding-brand-wide">
          <div className="onboarding-brand-left">
            <span className="brand-mark">V</span>
            <strong>VIBE</strong>
          </div>

          <div className="onboarding-brand-actions">
            <div className="onboarding-language-switch">
              {languageOptions.map((language) => (
                <button
                  key={language.key}
                  className={onboarding.language === language.key ? "active" : ""}
                  onClick={() => updateOnboarding({ language: language.key })}
                >
                  {language.key.toUpperCase()}
                </button>
              ))}
            </div>
            <button className="skip-onboarding-btn" onClick={() => finishOnboarding(false)}>
              Ver landing
            </button>
          </div>
        </div>

        {onboardingStep === "location" && (
          <main className="onboarding-card location-card">
            <div className="onboarding-copy">
              <span className="onboarding-kicker">Start VIBE</span>
              <h1>{currentOnboardingCopy.locationTitle}</h1>
              <p>{currentOnboardingCopy.locationText}</p>

              <div className="language-row">
                {languageOptions.map((language) => (
                  <button
                    key={language.key}
                    className={onboarding.language === language.key ? "active" : ""}
                    onClick={() => updateOnboarding({ language: language.key })}
                  >
                    {language.label}
                  </button>
                ))}
              </div>

              <div className="location-search">
                <Globe2 size={18} />
                <input
                  value={locationQuery}
                  onChange={(event) => setLocationQuery(event.target.value)}
                  placeholder={currentOnboardingCopy.searchPlaceholder}
                />
              </div>

              <div className="location-results">
                {(locationQuery ? locationMatches : onboardingLocations.slice(0, 8)).map((location) => (
                  <button
                    key={location.label}
                    className={selectedOnboardingLocation.label === location.label ? "active" : ""}
                    onClick={() => selectOnboardingLocation(location)}
                  >
                    <MapPin size={15} /> {location.label}
                  </button>
                ))}
              </div>

              <button className="btn btn-primary onboarding-main-btn" onClick={() => setOnboardingStep("intro")}>
                {currentOnboardingCopy.continue} <ArrowRight size={18} />
              </button>
            </div>

            <div
              className="globe-stage"
              onWheel={(event) => {
                event.preventDefault();
                rotateGlobe(event.deltaY > 0 ? 1 : -1);
              }}
            >
              <button className="globe-control left" onClick={() => rotateGlobe(-1)}>‹</button>
              <div className="vibe-globe" style={{ "--globe-rotation": `${globeIndex * -34}deg` }} onClick={() => rotateGlobe(1)}>
                <div className="globe-grid"></div>
                <div className="globe-pin main-pin"><MapPin size={22} /></div>
                <div className="globe-pin pin-two"></div>
                <div className="globe-pin pin-three"></div>
                <div className="globe-dot dot-one"></div>
                <div className="globe-dot dot-two"></div>
                <div className="globe-dot dot-three"></div>
                <div className="globe-dot dot-four"></div>
                <div className="globe-dot dot-five"></div>
                <div className="globe-dot dot-six"></div>
              </div>
              <button className="globe-control right" onClick={() => rotateGlobe(1)}>›</button>
              <div className="globe-location-card">
                <span>Location</span>
                <strong>{selectedOnboardingLocation.label}</strong>
                <small>{onboarding.language.toUpperCase()}</small>
              </div>
            </div>
          </main>
        )}


        {onboardingStep === "intro" && (
          <main className="onboarding-card intro-onboarding-card">
            <span className="onboarding-kicker">{currentOnboardingCopy.introKicker}</span>
            <h1>{currentOnboardingCopy.introTitle}</h1>
            <p>{currentOnboardingCopy.introText}</p>

            <div className="onboarding-moment-grid">
              {currentOnboardingCopy.introCards.map((item) => (
                <article className="onboarding-mini-card" key={item.title}>
                  <div className="use-icon"><Sparkles size={18} /></div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>

            <div className="onboarding-how-block">
              <span>{currentOnboardingCopy.howKicker}</span>
              <h2>{currentOnboardingCopy.howTitle}</h2>
              <div className="onboarding-step-row">
                {currentOnboardingCopy.howSteps.map((step, index) => (
                  <article key={step.title}>
                    <strong>{index + 1}</strong>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="onboarding-actions">
              <button className="btn btn-gorganizador" onClick={() => setOnboardingStep("location")}>{currentOnboardingCopy.back}</button>
              <button className="btn btn-primary" onClick={() => setOnboardingStep("name")}>{currentOnboardingCopy.continue}</button>
            </div>
          </main>
        )}

        {onboardingStep === "name" && (
          <main className="onboarding-card compact-onboarding-card">
            <span className="onboarding-kicker">Profile</span>
            <h1>{currentOnboardingCopy.nameTitle}</h1>
            <p>{currentOnboardingCopy.nameText}</p>
            <input
              className="onboarding-input"
              value={onboarding.name}
              onChange={(event) => updateOnboarding({ name: event.target.value })}
              placeholder={currentOnboardingCopy.namePlaceholder}
              autoFocus
            />
            <div className="onboarding-actions">
              <button className="btn btn-gorganizador" onClick={() => setOnboardingStep("intro")}>{currentOnboardingCopy.back}</button>
              <button className="btn btn-primary" onClick={() => setOnboardingStep("preferences")}>{currentOnboardingCopy.continue}</button>
            </div>
          </main>
        )}

        {onboardingStep === "preferences" && (
          <main className="onboarding-card compact-onboarding-card wide-preferences">
            <span className="onboarding-kicker">Interests</span>
            <h1>{currentOnboardingCopy.prefsTitle}</h1>
            <p>{currentOnboardingCopy.prefsText}</p>

            <div className="onboarding-interest-grid">
              {profileInterestOptions.slice(0, 18).map((interest) => {
                const clean = normalizeInterest(interest);
                const selected = (onboarding.interests || []).includes(clean);
                return (
                  <button
                    key={interest}
                    className={selected ? "selected" : ""}
                    onClick={() => toggleOnboardingInterest(clean)}
                  >
                    {clean}
                  </button>
                );
              })}
            </div>

            <div className="onboarding-actions">
              <button className="btn btn-gorganizador" onClick={() => setOnboardingStep("name")}>{currentOnboardingCopy.back}</button>
              <button className="btn btn-gorganizador" onClick={() => finishOnboarding(false)}>{currentOnboardingCopy.discover}</button>
              <button className="btn btn-primary" onClick={() => finishOnboarding(true)}>{currentOnboardingCopy.create}</button>
            </div>
          </main>
        )}
      </div>
    ) : null;

  return (
    <div className="page-shell">
      {onboardingGate}
      <header className="topbar">
        <div className="container topbar-inner">
          <button className="brand" onClick={() => scrollTo("inicio")}>
            <span className="brand-mark">V</span>
            <span className="brand-copy">
              <strong>VIBE</strong>
              <small>{currentSiteCopy.tagline}</small>
            </span>
          </button>

          <nav className="desktop-nav compact-nav">
            <button onClick={() => scrollTo("planes")}>{currentSiteCopy.navExplore}</button>
            {session?.user && <button onClick={openMyEvents}>{currentSiteCopy.navMyVibes}</button>}
          </nav>

          <div className="desktop-actions">
            <div className="header-language-switch">
              {languageOptions.map((language) => (
                <button
                  key={language.key}
                  className={onboarding.language === language.key ? "active" : ""}
                  onClick={() => updateOnboarding({ language: language.key })}
                >
                  {language.key.toUpperCase()}
                </button>
              ))}
            </div>
            <button className="btn btn-primary" onClick={openCreateModal}>{currentSiteCopy.create}</button>

            {session?.user ? (
              <div className="profile-dropdown">
                <button
                  className="profile-menu-button"
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                >
                  {profileName || session.user.email?.split("@")[0] || "Mi perfil"} ▾
                </button>

                {profileMenuOpen && (
                  <div className="profile-menu-panel">
                    <button
                      onClick={() => {
                        setProfileMenuOpen(false);
                        openProfile();
                      }}
                    >
                      Mi perfil
                    </button>
                    <button
                      onClick={() => {
                        setProfileMenuOpen(false);
                        openMyEvents();
                      }}
                    >
                      Mis VIBEs
                    </button>
                    <button onClick={signOut}>Cerrar sesión</button>
                  </div>
                )}
              </div>
            ) : (
              <button className="btn btn-ghost" onClick={() => setShowAuth(true)}>{currentSiteCopy.login}</button>
            )}
          </div>

          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            <div className="mobile-language-switch">
              {languageOptions.map((language) => (
                <button
                  key={language.key}
                  className={onboarding.language === language.key ? "active" : ""}
                  onClick={() => updateOnboarding({ language: language.key })}
                >
                  {language.key.toUpperCase()}
                </button>
              ))}
              <button onClick={resetOnboardingFlow}>Onboarding</button>
            </div>
            <button onClick={() => scrollTo("planes")}>{currentSiteCopy.navExplore}</button>
            <button onClick={openCreateModal}>{currentSiteCopy.create}</button>
            {session?.user && <button onClick={openMyEvents}>{currentSiteCopy.navMyVibes}</button>}
            {session?.user ? (
              <>
                <button onClick={openProfile}>Mi perfil</button>
                <button onClick={signOut}>Cerrar sesión</button>
              </>
            ) : (
              <button onClick={() => setShowAuth(true)}>{currentSiteCopy.login}</button>
            )}
          </div>
        )}
      </header>

      <section className="hero" id="inicio">
        <div className="hero-overlay"></div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{onboarding.location?.city ? `Planes en ${onboarding.location.city}` : "Planes para hacer hoy"}</p>
            <h1>{currentSiteCopy.heroTitle}</h1>
            <p className="hero-text">
              {currentSiteCopy.heroText}
            </p>
            <p className="hero-support">
              {currentSiteCopy.heroSupport}
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => scrollTo("planes")}>
                Ver panoramas cerca <ArrowRight size={17} />
              </button>
              <button className="btn btn-gorganizador" onClick={openCreateModal}>
                Crear mi VIBE
              </button>
            </div>

            <div className="hero-points">
              <div><UserCheck size={18} /> {currentSiteCopy.trustOrganizer}</div>
              <div><LockKeyhole size={18} /> {currentSiteCopy.trustLocation}</div>
              <div><Users size={18} /> {currentSiteCopy.trustSmallGroups}</div>
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
            <span>Elige categoría</span>
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
              <span>{onboarding.location?.label || "Cerca de ti"}</span>
              <h2>Panoramas para partir hoy</h2>
              <p>Elige categoría, revisa el panorama y súmate.</p>
              {loadingPlans && <p className="data-note">Cargando panoramas desde Supabase...</p>}
              {supabaseError && <p className="data-note warning">{supabaseError}</p>}
            </div>
            <button className="btn btn-gorganizador small" onClick={() => setActiveCategory("all")}>{currentSiteCopy.viewAll}</button>
          </div>

          <div className="plan-grid">
            {filteredPlans.map((plan) => (
              <article className="plan-card" key={plan.id}>
                <div className="plan-image">
                  <img src={plan.image} alt={plan.title} />
                  <span className="plan-tag">{categories.find(c => c.key === plan.category)?.label || "Plan"}</span>
                  {plan.organizador === "Organizador verificado" && (
                    <span className="verified-badge"><CheckCircle2 size={14} /> Organizador verificado</span>
                  )}
                </div>
                <div className="plan-body">
                  <h3>{plan.title}</h3>
                  <p className="plan-subtitle">{plan.subtitle}</p>

                  <ul className="plan-meta">
                    <li><CalendarDays size={15} /> {plan.date}</li>
                    <li><MapPin size={15} /> {plan.place}</li>
                    <li><ShieldCheck size={15} /> {plan.organizador}</li>
                    <li>{plan.access === "Ubicación pública" ? <Globe2 size={15} /> : <LockKeyhole size={15} />} {plan.access}</li>
                    <li><Users size={15} /> {plan.seats}</li>
                  </ul>

                  <div className="plan-actions">
                    <button className="btn btn-gorganizador small full" onClick={() => setSelectedPlan(plan)}>Ver detalle</button>
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
              <h2>{currentSiteCopy.ideaTitle}</h2>
              <p>{currentSiteCopy.ideaText}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>{currentSiteCopy.ctaTitle}</h2>
            <p>{currentSiteCopy.ctaText}</p>
            <div className="hero-actions centered">
              <button className="btn btn-primary" onClick={() => scrollTo("planes")}>{currentSiteCopy.explorePlans}</button>
              <button className="btn btn-gorganizador" onClick={openCreateModal}>{currentSiteCopy.heroCreate}</button>
            </div>
          </div>
        </div>
      </section>

      {selectedPlan && (
        <div className="modal-backdrop" onClick={() => setSelectedPlan(null)}>
          <div className="modal-card event-detail-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-top-right" onClick={() => setSelectedPlan(null)} aria-label="Cerrar detalle del evento">
              <X size={20} />
            </button>
            <img src={selectedPlan.image} alt={selectedPlan.title} />
            <div className="modal-content">
              <div className="modal-topline">
                <span><CheckCircle2 size={15} /> {selectedPlan.organizador}</span>
                <span>{selectedPlan.access === "Ubicación pública" ? <Globe2 size={15} /> : <LockKeyhole size={15} />} {selectedPlan.access}</span>
              </div>
              <h3>{selectedPlan.title}</h3>
              <p className="modal-vibe">{selectedPlan.vibe}</p>
              <ul className="plan-meta modal-meta">
                <li><CalendarDays size={15} /> {selectedPlan.date}</li>
                <li><MapPin size={15} /> {selectedPlan.place}</li>
                <li><ShieldCheck size={15} /> {selectedPlan.organizador}</li>
                <li>{selectedPlan.access === "Ubicación pública" ? <Globe2 size={15} /> : <LockKeyhole size={15} />} {selectedPlan.access}</li>
                <li><Users size={15} /> {selectedPlan.seats}</li>
              </ul>
              <div className={`plan-actions ${canManagePlan(selectedPlan) ? "two" : "one"}`}>
                {canManagePlan(selectedPlan) ? (
                  <>
                    <button className="btn btn-gorganizador full" onClick={() => setSelectedPlan(null)}>Cerrar</button>
                    <button
                      className="btn btn-danger full"
                      onClick={() => {
                        deleteMyEvent(selectedPlan.id);
                        setSelectedPlan(null);
                      }}
                    >
                      <Trash2 size={16} /> Eliminar mi VIBE
                    </button>
                  </>
                ) : (
                  <button className="btn btn-primary full" onClick={() => joinPlan(selectedPlan)}>Sumarme</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}


      {activeRoom && (
        <div className="modal-backdrop" onClick={() => setActiveRoom(null)}>
          <div className="modal-card vibe-room-card event-detail-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-top-right" onClick={() => setActiveRoom(null)} aria-label="Cerrar sala VIBE">
              <X size={20} />
            </button>

            <div className="modal-content">
              <div className="modal-topline">
                <span><Users size={15} /> Sala VIBE</span>
                <span>{activeRoom.roomStatus === "pending" ? "Solicitud enviada" : "Ya estás dentro"}</span>
              </div>

              <h3>{activeRoom.title}</h3>
              <p className="modal-vibe">
                {activeRoom.roomStatus === "pending"
                  ? "Esta VIBE es cerrada. El organizador debe aceptar tu solicitud antes de liberar coordinación y ubicación exacta."
                  : "Esta es la sala del panorama. Aquí deberías ver participantes, coordinación y próximos pasos."}
              </p>

              <div className="room-grid">
                <div className="room-panel">
                  <span className="summary-kicker">Estado</span>
                  <strong>{activeRoom.roomStatus === "pending" ? "Esperando aprobación del organizador" : "Participación confirmada"}</strong>
                </div>
                <div className="room-panel">
                  <span className="summary-kicker">Ubicación</span>
                  <strong>{activeRoom.access === "Ubicación pública" ? activeRoom.place : "Se libera al confirmar"}</strong>
                </div>
                <div className="room-panel">
                  <span className="summary-kicker">Participantes</span>
                  <strong>Próximo paso</strong>
                  <p>Aquí mostraremos inscritos, solicitudes pendientes y confirmados.</p>
                </div>
                <div className="room-panel">
                  <span className="summary-kicker">Grupo</span>
                  <strong>WhatsApp / chat</strong>
                  <p>Más adelante podrás crear o abrir el grupo de coordinación del panorama.</p>
                </div>
              </div>

              <div className="plan-actions one">
                <button className="btn btn-primary full" onClick={() => setActiveRoom(null)}>Entendido</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCreate && (
        <div className="modal-backdrop" onClick={() => setShowCreate(false)}>
          <div className="modal-card create-card simple-create-card event-detail-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-top-right" onClick={() => setShowCreate(false)} aria-label="Cerrar creación de VIBE">
              <X size={20} />
            </button>
            <div className="modal-content">
              <div className="modal-topline">
                <span><Plus size={15} /> Crear una VIBE</span>
                <span><UserCheck size={15} /> Tú organizas</span>
              </div>

              <h3>Crear VIBE</h3>
              <p className="modal-vibe">
                Toca una opción y completa lo básico.
              </p>

              <div className="quick-vibe-section">
                <span className="choice-title">Elige categoría</span>
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
                  Nombre
                  <div className="vibe-name-input">
                    <span>VIBE</span>
                    <input
                      value={customVibe.replace(/^VIBE\s*/i, "")}
                      onChange={(e) => setCustomVibe(`VIBE ${e.target.value}`)}
                      placeholder="Café, Trekking, Cultura Pop..."
                    />
                  </div>
                </label>

                <label className="fake-label">
                  Panorama
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
                  {eventFormat === "online" ? "Link o plataforma" : "Lugar"}
                  <input
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    placeholder={eventFormat === "online" ? "Ej: link de Meet, Zoom o 'link por definir'" : "Ej: Providencia, Ñuñoa, Parque Araucano..."}
                  />
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
                  <span className="choice-title">Formato</span>
                  <div className="segmented-control">
                    <button className={eventFormat === "presencial" ? "active" : ""} onClick={() => setEventFormat("presencial")}>
                      Presencial
                    </button>
                    <button className={eventFormat === "online" ? "active" : ""} onClick={() => setEventFormat("online")}>
                      Online
                    </button>
                  </div>
                </div>

                {eventFormat === "presencial" && (
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
                )}
              </div>
<div className="preview-vibe compact-preview">
                <span>Preview</span>
                <strong>{customVibe || "VIBE"}</strong>
                <p>{customPlan || "Tu panorama"}</p>
                <div className="preview-meta">
                  <em>{callType === "abierta" ? "Convocatoria abierta" : "Evento cerrado"}</em>
                  <em>{eventFormat === "online" ? "Online" : locationType === "publica" ? "Ubicación pública" : "Dirección al confirmar"}</em>
                  <em>{eventFormat === "online" ? (zone || "Link por definir") : zone}</em>
                </div>
              </div>

              <div className="plan-actions">
                <button type="button" className="btn btn-gorganizador full" onClick={() => setShowCreate(false)}>Cerrar</button>
                <button type="button" className="btn btn-primary full" onClick={createPanorama}>Publicar</button>
              </div>
            </div>
          </div>
        </div>
      )}


      {showAuth && (
        <div className="modal-backdrop" onClick={() => setShowAuth(false)}>
          <div className="modal-card auth-card event-detail-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-top-right" onClick={() => setShowAuth(false)} aria-label="Cerrar inicio de sesión">
              <X size={20} />
            </button>
            <div className="modal-content">
              <div className="modal-topline">
                <span><Mail size={15} /> Acceso VIBE</span>
              </div>

              <h3>Inicia sesión en VIBE</h3>
              <p className="modal-vibe">
                Usa tu correo y contraseña. Si la olvidaste, puedes recuperarla desde aquí.
              </p>

              <div className="auth-tabs">
                <button
                  className={authMode === "login" ? "active" : ""}
                  onClick={() => setAuthMode("login")}
                >
                  Iniciar sesión
                </button>
                <button
                  className={authMode === "signup" ? "active" : ""}
                  onClick={() => setAuthMode("signup")}
                >
                  Crear cuenta
                </button>
              </div>

              <label className="fake-label">
                Correo
                <input
                  type="email"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="tu@email.com"
                />
              </label>

              <label className="fake-label">
                Contraseña
                <div className="password-input-wrap">
                  <input
                    type={showAuthPassword ? "text" : "password"}
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder={authMode === "signup" ? "Crea una contraseña" : "Tu contraseña"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowAuthPassword((current) => !current)}
                    aria-label={showAuthPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showAuthPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    {showAuthPassword ? "Ocultar" : "Ver"}
                  </button>
                </div>
              </label>

              <div className="plan-actions one">
                {authMode === "signup" ? (
                  <button className="btn btn-primary full" onClick={signUpWithPassword}>
                    Crear cuenta
                  </button>
                ) : (
                  <button className="btn btn-primary full" onClick={signInWithPassword}>
                    Iniciar sesión
                  </button>
                )}
              </div>

              <div className="auth-secondary-actions">
                <button onClick={resetPassword}>Olvidé mi contraseña</button>
              </div>
            </div>
          </div>
        </div>
      )}

            {showProfile && (
        <div className="modal-backdrop" onClick={() => setShowProfile(false)}>
          <div className="modal-card profile-card event-detail-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-top-right" onClick={() => setShowProfile(false)} aria-label="Cerrar perfil">
              <X size={20} />
            </button>

            <div className="modal-content">
              <div className="modal-topline">
                <span><UserCircle size={15} /> Mi perfil</span>
                {session?.user && <span>{session.user.email}</span>}
              </div>

              {!profileEditMode ? (
                <>
                  <h3>Mi perfil VIBE</h3>
                  <p className="modal-vibe">
                    Tu resumen VIBE. Puedes editar intereses, datos y alertas cuando lo necesites.
                  </p>

                  <section className="profile-summary-hero editable-summary">
                    <label>
                      <span className="summary-kicker">Quién soy</span>
                      <textarea
                        value={profileBio}
                        onChange={(e) => setProfileBio(e.target.value)}
                        placeholder="Cuenta brevemente qué te gusta hacer o qué VIBEs te interesan."
                        rows={2}
                      />
                    </label>
                    <label className="summary-side">
                      <span>Ciudad</span>
                      <input
                        value={profileZone}
                        onChange={(e) => setProfileZone(e.target.value)}
                        placeholder="Ej: Santiago"
                      />
                    </label>
                  </section>
                  <button className="inline-save-btn" onClick={saveProfile}>
                    Guardar quién soy y ciudad
                  </button>

                  <section className="profile-section compact-profile-section">
                    <div className="profile-section-head">
                      <span>Mis intereses</span>
                      <small>Estos intereses ayudan a sugerirte panoramas más afines.</small>
                    </div>

                    <div className="summary-interest-grid">
                      {profileInterestOptions.map((interest) => {
                        const selected = profileInterests
                          .split(",")
                          .map(normalizeInterest)
                          .filter(Boolean)
                          .includes(interest);

                        return (
                          <button
                            type="button"
                            key={interest}
                            className={`summary-interest-chip ${selected ? "selected" : ""}`}
                            onClick={() => toggleProfileInterest(interest)}
                          >
                            {interest}
                          </button>
                        );
                      })}
                    </div>
                    <button className="inline-save-btn" onClick={saveProfile}>
                      Guardar intereses
                    </button>
                  </section>

                  <section className="profile-section compact-profile-section">
                    <div className="profile-section-head">
                      <span>Mis datos</span>
                      <small>Tus datos básicos y preferencias de contacto quedan privados.</small>
                    </div>

                    <div className="profile-summary-grid three">
                      <div>
                        <span>Mi correo</span>
                        <strong>{session?.user?.email || "Configurado"}</strong>
                      </div>
                      <div>
                        <span>WhatsApp</span>
                        <strong>{profileWhatsapp ? "Configurado" : "No configurado"}</strong>
                      </div>
                      <div>
                        <span>Alertas</span>
                        <strong>{profileAlerts ? "Activadas" : "Desactivadas"}</strong>
                      </div>
                    </div>
                  </section>

                  <div className="plan-actions">
                    <button className="btn btn-gorganizador full" onClick={signOut}><LogOut size={16} /> Cerrar sesión</button>
                    <button className="btn btn-primary full" onClick={() => setProfileEditMode(true)}>Editar perfil</button>
                  </div>
                </>
              ) : (
                <>
                  <h3>Editar datos del perfil</h3>
                  <p className="modal-vibe">
                    Ajusta tu descripción, ciudad, WhatsApp y preferencias de contacto. Tus intereses se editan directamente en el resumen.
                  </p>

                  <section className="profile-section">
                    <div className="profile-section-head">
                      <span>Quién soy</span>
                      <small>Información simple para facilitar confianza cuando creas o te sumas a una VIBE.</small>
                    </div>

                    <div className="profile-form-grid">
                      <label className="fake-label">
                        Nombre visible
                        <input
                          value={profileName}
                          onChange={(e) => setProfileName(e.target.value)}
                          placeholder="Ej: Matías"
                        />
                      </label>

                      <label className="fake-label">
                        Ciudad
                        <input
                          value={profileZone}
                          onChange={(e) => setProfileZone(e.target.value)}
                          placeholder="Ej: Santiago, Ñuñoa, Providencia"
                        />
                      </label>

                      <label className="fake-label wide">
                        Descripción breve
                        <textarea
                          value={profileBio}
                          onChange={(e) => setProfileBio(e.target.value)}
                          placeholder="Cuenta qué te gusta hacer, qué tipo de panoramas buscas o qué VIBEs te gustaría crear."
                          rows={4}
                        />
                      </label>
                    </div>
                  </section>

                  <details className="profile-contact-details">
                    <summary>Mis datos, acceso y alertas</summary>

                    <div className="contact-explain">
                      <strong>WhatsApp y acceso</strong>
                      <p>
                        WhatsApp se usará para avisarte cuando alguien solicite sumarse a una VIBE que tú creaste.
                        Tu acceso puede ser con contraseña.
                      </p>
                    </div>

                    <div className="profile-form-grid">
                      <label className="fake-label wide">
                        Mi correo
                        <input
                          value={session?.user?.email || ""}
                          readOnly
                        />
                        <small className="field-hint">Este es el correo con el que iniciaste sesión.</small>
                      </label>

                      <label className="fake-label wide">
                        WhatsApp
                        <input
                          value={profileWhatsapp}
                          onChange={(e) => setProfileWhatsapp(e.target.value)}
                          placeholder="+56 9 ..."
                        />
                        <small className="field-hint">No lo mostramos como dato público en esta etapa.</small>
                      </label>

                      <label className="alert-toggle wide">
                        <input
                          type="checkbox"
                          checked={profileAlerts}
                          onChange={(e) => setProfileAlerts(e.target.checked)}
                        />
                        <span>
                          <strong>Quiero recibir alertas de nuevas VIBEs asociadas a mis intereses.</strong>
                          <small>Por ahora queda guardado en tu perfil. Luego lo conectamos a email o WhatsApp.</small>
                        </span>
                      </label>
                    </div>
                  </details>

                  <div className="plan-actions">
                    <button className="btn btn-gorganizador full" onClick={() => setProfileEditMode(false)}>Cancelar</button>
                    <button className="btn btn-primary full" onClick={saveProfile}>Guardar cambios</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

            {showMyEvents && (
        <div className="modal-backdrop" onClick={() => setShowMyEvents(false)}>
          <div className="modal-card my-events-card event-detail-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-top-right" onClick={() => setShowMyEvents(false)} aria-label="Cerrar Mis VIBEs">
              <X size={20} />
            </button>
            <div className="modal-content">
              <div className="modal-topline">
                <span><CalendarDays size={15} /> Mis VIBEs</span>
                <span>{session?.user?.email}</span>
              </div>
              <h3>Tus VIBEs creadas</h3>
              <p className="modal-vibe">
                Desde aquí puedes revisar y gestionar las VIBEs que publicaste.
              </p>

              {loadingMyEvents && <p className="data-note">Cargando tus eventos...</p>}

              {!loadingMyEvents && myEvents.length === 0 && (
                <div className="empty-state">
                  <strong>Todavía no tienes VIBEs creadas.</strong>
                  <p>Crea tu primera VIBE y aparecerá en esta sección.</p>
                  <button
                    className="btn btn-primary empty-state-action"
                    onClick={openCreateModal}
                  >
                    Crear una VIBE
                  </button>
                </div>
              )}

              <div className="my-events-list">
                {myEvents.map((event) => (
                  <article className="my-event-item" key={event.id}>
                    <img src={event.image} alt={event.title} />
                    <div>
                      <span>{event.category}</span>
                      <h4>{event.title}</h4>
                      <p>{event.date} · {event.place}</p>
                      <small>{event.access}</small>
                    </div>
                    <button className="delete-btn" onClick={() => deleteMyEvent(event.id)}>
                      <Trash2 size={16} />
                      Eliminar
                    </button>
                  </article>
                ))}
              </div>

              <div className="plan-actions">
                <button
                  className="btn btn-gorganizador full"
                  onClick={() => {
                    setShowMyEvents(false);
                    scrollTo("planes");
                  }}
                >
                  Explorar VIBEs
                </button>
                <button
                  className="btn btn-primary full"
                  onClick={openCreateModal}
                >
                  Crear una VIBE
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