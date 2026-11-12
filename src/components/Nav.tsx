import { useEffect, useRef, useState } from "react";
import { site } from "../data/site";
import { useI18n } from "../i18n/context";
import { cn } from "../lib/cn";
import { Code } from "./icons";

export function Nav() {
  const { t, locale, setLocale } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      setScrolled(window.scrollY > 24); // React bails out when the value is unchanged
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current?.style.setProperty("transform", `scaleX(${max > 0 ? window.scrollY / max : 0})`);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const links = [
    { href: "#projects", label: t.nav.projects },
    { href: "#lab", label: t.nav.lab },
    { href: "#journey", label: t.nav.journey },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled ? "border-b border-line bg-bg/75 backdrop-blur-lg" : "border-b border-transparent",
      )}
    >
      <nav aria-label="Main" className="container-page flex h-16 items-center justify-between gap-6">
        <a href="#top" className="font-mono text-sm font-medium tracking-tight">
          <span className="text-secondary">{"<"}</span>
          soufiane
          <span className="text-secondary">{" />"}</span>
        </a>

        <ul className="hidden items-center gap-7 text-sm text-soft md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={site.sourceCode}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-lg border border-line px-3 py-2 font-mono text-xs text-soft transition-colors hover:border-secondary/60 hover:text-white sm:inline-flex"
          >
            <Code width={14} height={14} />
            {t.nav.source}
          </a>
          <button
            type="button"
            onClick={() => setLocale(locale === "fr" ? "en" : "fr")}
            className="rounded-lg border border-line px-3 py-2 font-mono text-xs text-soft transition-colors hover:border-secondary/60 hover:text-white"
            aria-label={t.nav.switchTo}
          >
            {locale === "fr" ? "EN" : "FR"}
          </button>
        </div>
      </nav>
      {/* Reading progress */}
      <div
        ref={progress}
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-primary via-secondary to-sky-400"
      />
    </header>
  );
}
