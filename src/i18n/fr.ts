export const fr = {
  nav: {
    projects: "Projets",
    lab: "Lab",
    journey: "Parcours",
    contact: "Contact",
    source: "Code du site",
    switchTo: "English",
  },
  hero: {
    status: "Disponible · CDI ou freelance · full remote",
    role: "Développeur Front-End React / TypeScript",
    pitch:
      "Je conçois des interfaces rapides, animées et maintenables. Je code depuis 2016 et je livre des projets React en production depuis 2023. J'automatise mon workflow avec des agents IA (Claude Code) et n8n.",
    ctaProjects: "Voir mes projets",
    ctaCv: "Télécharger mon CV",
    photoAlt: "Portrait de Soufiane Ibnaïche",
    meta: ["Composants typés", "Animations accessibles", "Mobile-first", "Claude Code & n8n"],
  },
  stack: {
    eyebrow: "Stack",
  },
  projects: {
    eyebrow: "Projets",
    title: "Des projets en production, pas des tutos.",
    intro:
      "Classés selon ma stack principale (React, TypeScript, Node.js), qui ressort en violet. Ouvrez « Sous le capot » pour voir les choix techniques.",
    filters: { all: "Tous", front: "Front-end", fullstack: "Full stack" },
    tabs: { overview: "Aperçu", engine: "Sous le capot" },
    demo: "Démo",
    code: "Code",
    privateRepo: "Code privé",
    screenshot: "Capture d'écran du projet",
    open: "Voir le projet",
    close: "Fermer",
  },
  lab: {
    eyebrow: "Lab",
    title: "Trois démos pour juger mes animations React.",
    intro:
      "Aucune librairie d'animation : uniquement des hooks maison (FLIP, pointer events, scroll progress) qui respectent le réglage « réduire les animations ».",
    shade: {
      title: "Sélecteur de teintes",
      hint: "Inspiré du projet Colourpig : indicateur partagé animé en FLIP.",
      label: "Teinte",
    },
    reorder: {
      title: "Liste réordonnable",
      hint: "Glissez les cartes, ou utilisez ↑ ↓ au clavier.",
      moveUp: "Monter",
      moveDown: "Descendre",
      items: ["Analyser le besoin", "Maquetter", "Développer", "Tester", "Mettre en ligne"],
    },
    scroll: {
      title: "Animation pilotée par le scroll",
      hint: "La progression du scroll pilote chaque carte (useScrollProgress).",
      steps: ["Composant", "Hook", "Contexte", "Interface"],
    },
  },
  journey: {
    eyebrow: "Parcours",
    title: "Une pratique longue, une montée en compétence continue.",
    items: [
      {
        date: "2016",
        title: "Premières lignes de code",
        text: "Autodidacte : Codecademy puis OpenClassrooms. Mes premiers dépôts GitHub datent de février 2016.",
      },
      {
        date: "Avr. – oct. 2023",
        title: "Titre professionnel — O'clock",
        text: "Développeur d'application web et mobile : React, Node.js, PostgreSQL et travail en équipe Scrum.",
      },
      {
        date: "2023 →",
        title: "Freelance — Madapes Agency",
        text: "Sites et applications web : du besoin à la mise en production, avec le tracking et l'acquisition.",
      },
      {
        date: "2024",
        title: "Formation intensive React — ViDev",
        text: "Hooks avancés, design system, clean code et revue de code par un lead dev.",
      },
      {
        date: "Janv. 2026",
        title: "Formation Google Ads — Digibusiness",
        text: "Accompagnement avec Moneeb Butt : structure de compte et Quality Score, campagnes Search, tracking des conversions, optimisation et pilotage du budget, Google Shopping et Performance Max.",
      },
      {
        date: "2026",
        title: "Colourpig — React / TypeScript / Shopify Hydrogen",
        text: "Prototype livré en une semaine, puis migration vers Shopify Hydrogen.",
      },
      {
        date: "2026",
        title: "Claude Code en entreprise — ViDev (en cours)",
        text: "Développement agentique : workflow d'agents IA front, back, tests, review et DevOps. CLAUDE.md, skills, hooks, sub-agents, MCP, reviews de PR et déploiement automatisés.",
      },
    ],
  },
  product: {
    eyebrow: "Mon plus",
    title: "Un développeur qui pense produit et conversion.",
    text: "Je gère des campagnes Google Ads pour plusieurs clients via mon agence, et j'ai approfondi le sujet en janvier 2026 avec une formation chez Digibusiness. Ça change ma façon de développer : je sais ce qui fait qu'une interface convertit, je mets en place le suivi des conversions (GA4, Google Tag Manager) et je mesure l'impact de ce que je livre.",
    caseText: "Un exemple parmi mes clients : une entreprise de prestation de services. Avec un budget de 2 000 € par mois, ses campagnes ont généré en six mois des demandes de devis allant jusqu'à 120 000 €.",
    agency: "Voir mon agence",
    result: {
      label: "Étude de cas · prestation de services",
      upTo: "Jusqu'à",
      of: "de demandes de devis pour ce client",
      stats: [
        { label: "Budget publicitaire", value: "2 000 € / mois" },
        { label: "Durée", value: "6 mois" },
      ],
    },
  },
  contact: {
    eyebrow: "Contact",
    title: "Un poste React en full remote ? Parlons-en.",
    text: "Je suis disponible immédiatement, en CDI comme en freelance.",
    linkedin: "Écrire sur LinkedIn",
    email: "M'envoyer un e-mail",
  },
  footer: {
    built: "Construit avec React, TypeScript, Vite et Tailwind — sans librairie d'animation.",
  },
};

export type Dict = typeof fr;
