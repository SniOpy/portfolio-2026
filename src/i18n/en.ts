import type { Dict } from "./fr";

export const en: Dict = {
  nav: {
    projects: "Projects",
    lab: "Lab",
    journey: "Journey",
    contact: "Contact",
    source: "Site source",
    switchTo: "Français",
  },
  hero: {
    status: "Available · full-time or freelance · fully remote",
    role: "Front-End Developer — React / TypeScript",
    pitch:
      "I build fast, animated and maintainable interfaces. I've been coding since 2016 and shipping React projects to production since 2023. I automate my workflow with AI agents (Claude Code) and n8n.",
    ctaProjects: "See my projects",
    ctaCv: "Download my resume",
    photoAlt: "Portrait of Soufiane Ibnaïche",
    meta: ["Typed components", "Accessible motion", "Mobile-first", "Claude Code & n8n"],
  },
  stack: {
    eyebrow: "Stack",
  },
  projects: {
    eyebrow: "Projects",
    title: "Projects in production, not tutorials.",
    intro: "Ranked by my core stack (React, TypeScript, Node.js), highlighted in violet. Open “Under the hood” to see the technical choices.",
    filters: { all: "All", front: "Front-end", fullstack: "Full stack" },
    tabs: { overview: "Overview", engine: "Under the hood" },
    demo: "Live demo",
    code: "Code",
    privateRepo: "Private code",
    screenshot: "Screenshot of the project",
    open: "View project",
    close: "Close",
  },
  lab: {
    eyebrow: "Lab",
    title: "Three demos to judge my React animations.",
    intro:
      "No animation library: only custom hooks (FLIP, pointer events, scroll progress) that respect the “reduce motion” setting.",
    shade: {
      title: "Shade picker",
      hint: "Inspired by the Colourpig project: shared indicator animated with FLIP.",
      label: "Shade",
    },
    reorder: {
      title: "Reorderable list",
      hint: "Drag the cards, or use ↑ ↓ on the keyboard.",
      moveUp: "Move up",
      moveDown: "Move down",
      items: ["Understand the need", "Design", "Build", "Test", "Ship"],
    },
    scroll: {
      title: "Scroll-driven animation",
      hint: "Scroll progress drives every card (useScrollProgress).",
      steps: ["Component", "Hook", "Context", "Interface"],
    },
  },
  journey: {
    eyebrow: "Journey",
    title: "A long practice, a steady skills progression.",
    items: [
      {
        date: "2016",
        title: "First lines of code",
        text: "Self-taught: Codecademy then OpenClassrooms. My first GitHub repositories date back to February 2016.",
      },
      {
        date: "Apr – Oct 2023",
        title: "Web & mobile developer degree — O'clock",
        text: "French state-certified degree: React, Node.js, PostgreSQL and Scrum teamwork.",
      },
      {
        date: "2023 →",
        title: "Freelance — Madapes Agency",
        text: "Websites and web apps: from the brief to production, including tracking and acquisition.",
      },
      {
        date: "2024",
        title: "Intensive React training — ViDev",
        text: "Advanced hooks, design system, clean code and code reviews by a lead developer.",
      },
      {
        date: "Jan 2026",
        title: "Google Ads training — Digibusiness",
        text: "Coaching with Moneeb Butt: account structure and Quality Score, Search campaigns, conversion tracking, optimisation and budget management, Google Shopping and Performance Max.",
      },
      {
        date: "2026",
        title: "Colourpig — React / TypeScript / Shopify Hydrogen",
        text: "Prototype delivered in one week, then migrated to Shopify Hydrogen.",
      },
      {
        date: "2026",
        title: "Claude Code for teams — ViDev (in progress)",
        text: "Agentic development: AI agent workflow for front-end, back-end, testing, review and DevOps. CLAUDE.md, skills, hooks, sub-agents, MCP, automated PR reviews and deployments.",
      },
    ],
  },
  product: {
    eyebrow: "My edge",
    title: "A developer who thinks in product and conversion.",
    text: "I run Google Ads campaigns for several clients through my agency, and I went deeper in January 2026 with a training at Digibusiness. It shapes the way I build: I know what makes an interface convert, I set up conversion tracking (GA4, Google Tag Manager) and I measure the impact of what I ship.",
    caseText: "One example among my clients: a service business. With a €2,000 monthly budget, its campaigns generated quote requests of up to €120,000 in six months.",
    agency: "See my agency",
    result: {
      label: "Case study · service business",
      upTo: "Up to",
      of: "in quote requests for this client",
      stats: [
        { label: "Ad budget", value: "€2,000 / month" },
        { label: "Duration", value: "6 months" },
      ],
    },
  },
  contact: {
    eyebrow: "Contact",
    title: "A fully remote React role? Let's talk.",
    text: "Available right away, for a full-time position or freelance.",
    linkedin: "Message me on LinkedIn",
    email: "Send me an email",
  },
  footer: {
    built: "Built with React, TypeScript, Vite and Tailwind — no animation library.",
  },
};
