import { CursorGlow } from "./components/CursorGlow";
import { Nav } from "./components/Nav";
import { site } from "./data/site";
import { useSpotlight } from "./hooks/useSpotlight";
import { useI18n } from "./i18n/context";
import { Contact } from "./sections/Contact";
import { Hero } from "./sections/Hero";
import { Journey } from "./sections/Journey";
import { Lab } from "./sections/Lab";
import { Product } from "./sections/Product";
import { Projects } from "./sections/Projects";
import { Stack } from "./sections/Stack";

export function App() {
  const { t } = useI18n();
  useSpotlight();

  return (
    <>
      <a
        href="#projects"
        className="sr-only z-[60] rounded-lg bg-primary px-4 py-2 text-on-primary focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        {t.nav.projects}
      </a>
      <CursorGlow />
      <div aria-hidden className="grain" />
      <Nav />
      <main>
        <Hero />
        <Stack />
        <Projects />
        <Lab />
        <Journey />
        <Product />
        <Contact />
      </main>
      <footer className="theme-dark border-t border-line py-8">
        <div className="container-page flex flex-col items-start justify-between gap-3 text-xs text-muted md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="font-mono">{t.footer.built}</p>
        </div>
      </footer>
    </>
  );
}
