import { useEffect, useRef, useState } from "react";
import { site } from "../data/site";
import { useI18n } from "../i18n/context";
import { cn } from "../lib/cn";
import { Code } from "./icons";

export function Nav() {
  const { t, locale, setLocale } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
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
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const links = [
    { href: "#projects", label: t.nav.projects, index: "01" },
    { href: "#lab", label: t.nav.lab, index: "02" },
    { href: "#journey", label: t.nav.journey, index: "03" },
    { href: "#contact", label: t.nav.contact, index: "05" },
  ];

  const control =
    "h-10 items-center gap-2 rounded-lg border border-line bg-card px-3 font-mono text-xs text-soft transition-colors duration-200 hover:border-ink hover:text-ink";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300",
        scrolled || open ? "border-b border-line bg-bg/90 backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <nav aria-label="Main" className="container-page flex h-16 items-center justify-between gap-6">
        <a href="#top" className="font-mono text-sm font-medium tracking-tight">
          <span className="text-primary">{"<"}</span>
          soufiane
          <span className="text-primary">{" />"}</span>
        </a>

        <ul className="hidden items-center gap-8 text-sm text-soft md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="group inline-flex items-baseline gap-1.5 transition-colors hover:text-ink">
                <span className="font-mono text-[11px] text-muted group-hover:text-primary">{link.index}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href={site.sourceCode} target="_blank" rel="noopener noreferrer" className={cn(control, "hidden sm:inline-flex")}>
            <Code width={14} height={14} />
            {t.nav.source}
          </a>
          <button
            type="button"
            onClick={() => setLocale(locale === "fr" ? "en" : "fr")}
            className={cn(control, "inline-flex")}
            aria-label={t.nav.switchTo}
          >
            {locale === "fr" ? "EN" : "FR"}
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Menu"
            className={cn(control, "inline-flex w-10 justify-center md:hidden")}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              {open ? <path d="M3 3l10 10M13 3L3 13" /> : <path d="M2 5h12M2 11h12" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <ul id="mobile-menu" className="container-page animate-fade-in border-t border-line pb-4 md:hidden">
          {links.map((link) => (
            <li key={link.href} className="border-b border-line last:border-b-0">
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center gap-3 text-base font-medium"
              >
                <span className="font-mono text-xs text-primary">{link.index}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* Reading progress */}
      <div
        ref={progress}
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-primary via-pink to-sun"
      />
    </header>
  );
}
