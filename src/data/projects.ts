import type { Localized } from "../i18n/types";

export type ProjectCategory = "front" | "fullstack";

export interface Project {
  id: string;
  name: string;
  year: string;
  category: ProjectCategory;
  /** Accent used by the card artwork. */
  accent: string;
  context: Localized;
  summary: Localized;
  /** Technical decisions shown in the "Under the hood" tab. */
  engine: Localized<string[]>;
  stack: string[];
  demo?: string;
  repo?: string;
  /** Optional screenshot placed in /public/projects. */
  image?: string;
  /** CSS object-position for the image (default: "top"). */
  imagePosition?: "top" | "center";
}

export const projects: Project[] = [
  {
    id: "colourpig",
    name: "Colourpig",
    year: "2026",
    category: "front",
    accent: "#f472b6",
    image: "/projects/colourpig.webp",
    context: { fr: "E-commerce · Shopify Hydrogen", en: "E-commerce · Shopify Hydrogen" },
    summary: {
      fr: "Site e-commerce d'une marque australienne de coloration capillaire réutilisable. Prototype livré en une semaine, puis migré vers Shopify Hydrogen.",
      en: "E-commerce site for an Australian reusable hair-colour brand. Prototype delivered in one week, then migrated to Shopify Hydrogen.",
    },
    engine: {
      fr: [
        "Sélecteur de variantes interactif relié à une galerie d'images",
        "Animations au défilement et vidéo en parallaxe",
        "Composants organisés pour faire évoluer le site sans réécriture",
        "Migration vers Shopify Hydrogen : catalogue et commandes gérés dans Shopify",
      ],
      en: [
        "Interactive variant picker bound to an image gallery",
        "Scroll-driven animations and parallax video",
        "Components structured so the site can evolve without rewrites",
        "Migration to Shopify Hydrogen: catalogue and orders managed in Shopify",
      ],
    },
    stack: ["React", "TypeScript", "Shopify Hydrogen", "Vercel"],
    demo: "https://colourpig-preview.vercel.app/",
  },
  {
    id: "tadara",
    name: "Tadara",
    year: "2026",
    category: "fullstack",
    accent: "#60a5fa",
    image: "/projects/tadara.webp",
    context: { fr: "Landing page · liste d'attente", en: "Landing page · waitlist" },
    summary: {
      fr: "Landing page d'un abonnement de lettres pour enfants sur l'héritage de la civilisation arabo-musulmane, avec inscription à la liste d'attente.",
      en: "Landing page for a kids' monthly letter subscription about the heritage of Arab-Muslim civilisation, with a waitlist sign-up.",
    },
    engine: {
      fr: [
        "Monorepo : la landing React et l'API dans le même dépôt",
        "Landing React stylée avec styled-components",
        "API Express qui enregistre les inscriptions dans Supabase",
        "E-mail de confirmation envoyé avec Nodemailer",
      ],
      en: [
        "Monorepo: the React landing and the API live in one repository",
        "React landing styled with styled-components",
        "Express API storing sign-ups in Supabase",
        "Confirmation email sent with Nodemailer",
      ],
    },
    stack: ["React", "styled-components", "Express", "Supabase"],
    demo: "https://tadara-landing-sniopy-sniopys-projects.vercel.app/",
    repo: "https://github.com/SniOpy/funooni",
  },
  {
    id: "odog",
    name: "O'Dog Next Door",
    year: "2023",
    category: "fullstack",
    accent: "#38bdf8",
    image: "/projects/odog.webp",
    context: { fr: "Application web · équipe de 5", en: "Web app · team of 5" },
    summary: {
      fr: "Application de garde partagée d'animaux entre voisins : profils, recherche géolocalisée, réservations et messagerie.",
      en: "Shared pet-sitting app between neighbours: profiles, geolocated search, bookings and messaging.",
    },
    engine: {
      fr: [
        "État global avec Redux Toolkit, formulaires validés avec Yup",
        "Carte interactive avec React Leaflet",
        "API Express + PostgreSQL, sessions stockées dans Redis",
        "Scrum en équipe : sprints, daily, revues de code",
      ],
      en: [
        "Global state with Redux Toolkit, forms validated with Yup",
        "Interactive map with React Leaflet",
        "Express + PostgreSQL API, sessions stored in Redis",
        "Team Scrum: sprints, dailies, code reviews",
      ],
    },
    stack: ["React", "Redux Toolkit", "Leaflet", "Express", "PostgreSQL", "Redis"],
    demo: "https://odog-next-door-sniopys-projects.vercel.app",
    repo: "https://github.com/SniOpy/Dog-Next-door-",
  },
  {
    id: "crazee-burger",
    name: "Crazee Burger",
    year: "2024",
    category: "front",
    accent: "#fb923c",
    image: "/projects/crazee-burger.webp",
    context: { fr: "Application de commande en ligne", en: "Online ordering app" },
    summary: {
      fr: "Application de commande en ligne avec un mode admin : chaque utilisateur gère son propre menu, synchronisé en temps réel.",
      en: "Online ordering app with an admin mode: each user manages their own menu, synced in real time.",
    },
    engine: {
      fr: [
        "Hooks personnalisés pour isoler la logique métier",
        "Design system avec styled-components",
        "Synchronisation temps réel avec Firebase Firestore",
        "Chaque merge validé en revue de code par un lead dev",
      ],
      en: [
        "Custom hooks to isolate business logic",
        "Design system with styled-components",
        "Real-time sync with Firebase Firestore",
        "Every merge approved in code review by a lead developer",
      ],
    },
    stack: ["React", "Vite", "styled-components", "Firebase"],
    demo: "https://crazee-burger-eta-nine.vercel.app",
    repo: "https://github.com/SniOpy/crazee-burger",
  },
  {
    id: "ecotrend",
    name: "EcoTrend",
    year: "2025",
    category: "fullstack",
    accent: "#4ade80",
    image: "/projects/ecotrend.webp",
    context: { fr: "E-commerce full stack", en: "Full-stack e-commerce" },
    summary: {
      fr: "Boutique en ligne éco-responsable : catalogue filtrable, panier dynamique, fiches produits et authentification.",
      en: "Eco-friendly online store: filterable catalogue, dynamic cart, product pages and authentication.",
    },
    engine: {
      fr: [
        "Front React + Vite avec React Router et styled-components",
        "API REST Node.js / Express sécurisée par JWT",
        "Base PostgreSQL, mots de passe hashés avec bcrypt",
        "Front déployé sur Vercel, API et base sur Render",
      ],
      en: [
        "React + Vite front-end with React Router and styled-components",
        "Node.js / Express REST API secured with JWT",
        "PostgreSQL database, passwords hashed with bcrypt",
        "Front-end on Vercel, API and database on Render",
      ],
    },
    stack: ["React", "Express", "PostgreSQL", "JWT"],
    demo: "https://eco-trend-front-m24kl5eti-sniopys-projects.vercel.app/",
    repo: "https://github.com/SniOpy/ecoTrend",
  },
  {
    id: "dabago",
    name: "DabaGo",
    year: "2026",
    category: "fullstack",
    accent: "#e9b949",
    image: "/projects/dabago.webp",
    imagePosition: "center",
    context: { fr: "Application de livraison · Maroc", en: "Delivery app · Morocco" },
    summary: {
      fr: "Application de livraison entre particuliers et commerçants : les livreurs reçoivent des missions, suivent le trajet sur une carte et encaissent à la livraison.",
      en: "Delivery app connecting individuals and merchants: couriers receive missions, follow the route on a map and collect payment on delivery.",
    },
    engine: {
      fr: [
        "Espace livreur : tableau de bord, missions pas à pas, historique et profil",
        "Carte Leaflet / OpenStreetMap avec les points de retrait et de livraison",
        "Calcul du montant à encaisser : produit, frais de livraison et frais de service",
        "API Express + TypeScript + PostgreSQL : JWT, validation des entrées, limitation de débit",
      ],
      en: [
        "Courier space: dashboard, step-by-step missions, history and profile",
        "Leaflet / OpenStreetMap map with pickup and drop-off points",
        "Amount-to-collect breakdown: product, delivery fee and service fee",
        "Express + TypeScript + PostgreSQL API: JWT, input validation, rate limiting",
      ],
    },
    stack: ["TypeScript", "Leaflet", "Express", "PostgreSQL", "JWT"],
    repo: "https://github.com/SniOpy/sifta-backend",
  },
  {
    id: "madapes",
    name: "Madapes Agency",
    year: "2026",
    category: "front",
    accent: "#a855f7",
    image: "/projects/madapes.webp",
    context: { fr: "Site vitrine · acquisition", en: "Showcase site · acquisition" },
    summary: {
      fr: "Site de mon agence : identité premium, landing pages orientées conversion et un « Lab » de démos interactives.",
      en: "My agency's website: premium identity, conversion-focused landing pages and a “Lab” of interactive demos.",
    },
    engine: {
      fr: [
        "Design tokens en variables CSS, réutilisés dans ce portfolio",
        "Démos interactives (Lab) et carrousels accessibles",
        "Bilingue FR / EN",
        "Tracking des conversions et campagnes Google Ads",
      ],
      en: [
        "Design tokens as CSS variables, reused in this portfolio",
        "Interactive demos (Lab) and accessible carousels",
        "Bilingual FR / EN",
        "Conversion tracking and Google Ads campaigns",
      ],
    },
    stack: ["HTML", "CSS", "JavaScript", "Google Ads", "GTM"],
    demo: "https://www.madapes-agency.com",
    repo: "https://github.com/SniOpy/madapes-v2",
  },
];

export const stack = [
  "React",
  "TypeScript",
  "Vite",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "PostgreSQL",
  "Redux Toolkit",
  "Shopify Hydrogen",
  "Firebase",
  "Git / GitHub",
  "Claude Code",
  "MCP",
  "n8n",
  "Google Ads",
  "GA4 / GTM",
] as const;

/**
 * My core stack, weighted by how central it is to the roles I target.
 * Projects are ranked by how much of this stack they use.
 */
export const CORE_STACK: Readonly<Record<string, number>> = {
  React: 3,
  TypeScript: 3,
  Express: 2,
  "Node.js": 2,
  PostgreSQL: 1,
  Vite: 1,
  "Tailwind CSS": 1,
  "Redux Toolkit": 1,
};

export const stackScore = (project: Project): number =>
  project.stack.reduce((score, tech) => score + (CORE_STACK[tech] ?? 0), 0);

/** Most core-stack-heavy first; ties go to the most recent project. */
export const projectsByStack: Project[] = [...projects].sort(
  (a, b) => stackScore(b) - stackScore(a) || Number(b.year) - Number(a.year),
);
