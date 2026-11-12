import { CursorGlow } from "./components/CursorGlow";
import { Nav } from "./components/Nav";
import { site } from "./data/site";
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

  return (
    <>
      <a
        href="#projects"
        className="sr-only z-[60] rounded-lg bg-primary px-4 py-2 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        {t.nav.projects}
      </a>
      <CursorGlow />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Stack />
        <Projects />
        <Lab />
        <Journey />
        <Product />
        <Contact />
      </main>
      <footer className="relative z-10 border-t border-line py-8">
        <div className="container-page flex flex-col items-center justify-between gap-3 text-xs text-muted md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="font-mono">{t.footer.built}</p>
        </div>
      </footer>
    </>
  );
}
