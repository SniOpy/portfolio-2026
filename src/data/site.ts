/**
 * Single source of truth for personal links.
 * Update these values before deploying.
 */
export const site = {
  name: "Soufiane Ibnaïche",
  github: "https://github.com/SniOpy",
  linkedin: "https://www.linkedin.com/in/soufiane-ibnaiche/",
  agency: "https://www.madapes-agency.com",
  /** Repository of this very portfolio — shown as "View the code of this site". */
  sourceCode: "https://github.com/SniOpy/portfolio-2026",
  /** ATS CV in /public, one PDF per language. */
  cv: { fr: "/cv-soufiane-ibnaiche.pdf", en: "/cv-soufiane-ibnaiche-en.pdf" },
  /** Optional: add a public contact email to show a mailto button. */
  email: "",
} as const;
