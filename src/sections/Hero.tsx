import { useRef } from "react";
import { ButtonLink } from "../components/Button";
import { ArrowDown, Download, GitHub } from "../components/icons";
import { Reveal } from "../components/Reveal";
import { ScrambleText } from "../components/ScrambleText";
import { TypedName } from "../components/TypedName";
import { site } from "../data/site";
import { usePointerParallax } from "../hooks/usePointerParallax";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { useI18n } from "../i18n/context";

/** Simplified excerpt of this repository's src/hooks/useFlip.ts. */
const SNIPPET = [
  { tokens: [["kw", "export function "], ["fn", "useFlip"], ["tx", "(deps) {"]] },
  { tokens: [["tx", "  "], ["kw", "const "], ["tx", "reduced = "], ["fn", "usePrefersReducedMotion"], ["tx", "();"]] },
  { tokens: [["fn", "  useLayoutEffect"], ["tx", "(() => {"]] },
  { tokens: [["cm", "    // First → Last → Invert → Play"]] },
  { tokens: [["tx", "    node."], ["fn", "animate"], ["tx", "(["], ["st", "{ transform }"], ["tx", ", "], ["st", "{ none }"], ["tx", "]);"]] },
  { tokens: [["tx", "  }, deps);"]] },
  { tokens: [["tx", "}"]] },
] as const;

const tokenColor = {
  kw: "text-secondary",
  fn: "text-accent",
  st: "text-emerald-300",
  cm: "text-muted italic",
  tx: "text-soft",
} as const;

const FACT_COLORS = ["#7c3aed", "#ec4899", "#06b6d4", "#f59e0b"];

export function Hero() {
  const { t, pick } = useI18n();
  const section = useRef<HTMLElement>(null);
  usePointerParallax(section);
  useScrollProgress(section, { mode: "pass", anchor: 0 });

  return (
    <section ref={section} id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-32 pb-20 md:pt-40 lg:pb-28">
      {/* Drifting colour lights + floating geometric shapes */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="depth blob top-[-10%] right-[-5%] size-[520px] bg-primary/35 [--depth:-40px]" />
        <div className="depth blob top-[25%] right-[25%] size-[380px] bg-pink/30 [--depth:60px] [animation-delay:-6s]" />
        <div className="depth blob top-[-15%] left-[-10%] size-[420px] bg-sky/25 [--depth:-30px] [animation-delay:-12s]" />
        <div className="depth absolute top-[18%] left-[46%] hidden size-10 animate-bob [--depth:70px] md:block rounded-full border-[6px] border-sun" />
        <div className="depth absolute top-[62%] left-[4%] hidden size-6 animate-spin-slow [--depth:-55px] md:block bg-lime" />
        <svg
          viewBox="0 0 24 24"
          className="depth absolute top-[12%] right-[6%] size-9 animate-bob text-pink [--bob-rotate:-20deg] [--depth:45px] [animation-delay:-2s]"
        >
          <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        </svg>
        <svg viewBox="0 0 40 12" className="depth absolute bottom-[30%] left-[52%] hidden w-16 animate-bob [--depth:-65px] md:block text-sky [animation-delay:-4s]">
          <path d="M2 6c4-6 8 6 12 0s8 6 12 0 8 6 12 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      <div className="hero-exit container-page grid grid-cols-1 items-end gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="min-w-0 lg:col-span-7">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-xs text-soft">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {t.hero.status}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1
              id="hero-title"
              className="mt-8 text-[clamp(3rem,9vw,6.5rem)] leading-[0.95] font-extrabold tracking-[-0.04em]"
            >
              <TypedName firstName="Soufiane" lastName="Ibnaïche" />
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <ScrambleText
              text={t.hero.role}
              className="mt-6 cursor-default font-mono text-base font-semibold md:text-lg"
              textClassName="text-shimmer"
            />
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-soft">{t.hero.pitch}</p>
          </Reveal>

          <Reveal delay={320} className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="#projects" magnetic icon={<ArrowDown />}>
              {t.hero.ctaProjects}
            </ButtonLink>
            <ButtonLink href={pick(site.cv)} download variant="ghost" icon={<Download />}>
              {t.hero.ctaCv}
            </ButtonLink>
            <ButtonLink
              href={site.github}
              target="_blank"
              variant="ghost"
              aria-label="GitHub"
              className="px-3.5"
              icon={<GitHub />}
            />
          </Reveal>
        </div>

        <Reveal delay={200} className="relative min-w-0 lg:col-span-5">
          <figure className="depth group relative mx-auto max-w-[380px] [--depth:-18px] lg:mr-0 lg:ml-auto">
            {/* Colour block behind the portrait: swings out on hover */}
            <div
              aria-hidden
              className="absolute inset-0 rotate-3 rounded-xl bg-gradient-to-br from-primary via-fuchsia to-sun transition-transform duration-500 ease-out-expo group-hover:translate-x-3 group-hover:translate-y-3 group-hover:rotate-6"
            />
            <div className="relative overflow-hidden rounded-xl border-4 border-bg-light bg-card-strong shadow-card transition-transform duration-500 ease-out-expo group-hover:-rotate-2">
              <picture>
                <source srcSet="/soufiane.webp" type="image/webp" />
                <img
                  src="/soufiane.jpg"
                  alt={t.hero.photoAlt}
                  width={720}
                  height={896}
                  fetchPriority="high"
                  className="aspect-[4/5] w-full object-cover object-top grayscale transition-[filter,scale] duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
              </picture>
            </div>
            <figcaption className="absolute -top-4 -right-4 animate-bob rounded-md bg-ink px-3 py-2 font-mono text-xs text-bg shadow-card [--bob-rotate:3deg]">
              <span className="text-lime">✓</span> 0 animation library
            </figcaption>
          </figure>
        </Reveal>
      </div>

      {/* Facts row + code window: the "spec sheet" under the hero */}
      <div className="container-page mt-16 grid grid-cols-1 gap-6 border-t border-line pt-8 lg:grid-cols-12 lg:gap-10">
        <Reveal delay={400} className="lg:col-span-7">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 lg:grid-cols-2">
            {t.hero.meta.map((item, i) => (
              <li
                key={item}
                className="group/fact border-l-4 pl-3 transition-transform duration-300 ease-out-expo hover:translate-x-1"
                style={{ borderColor: FACT_COLORS[i % FACT_COLORS.length] }}
              >
                <span className="block font-mono text-[11px] text-muted">0{i + 1}</span>
                <span className="mt-1 block text-sm font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={460} className="min-w-0 lg:col-span-5">
          <div className="theme-dark animate-bob overflow-hidden rounded-xl border border-line shadow-[0_24px_60px_rgb(124_58_237/0.35)] [--bob-rotate:0deg] [animation-duration:8s]">
            <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-red-400/80" />
              <span className="size-2.5 rounded-full bg-yellow-400/80" />
              <span className="size-2.5 rounded-full bg-emerald-400/80" />
              <span className="ml-3 font-mono text-[11px] text-muted">src/hooks/useFlip.ts</span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-6">
              <code>
                {SNIPPET.map((line, i) => (
                  <div key={i} className="flex">
                    <span className="mr-4 w-4 shrink-0 text-right text-muted/60 select-none">{i + 1}</span>
                    <span>
                      {line.tokens.map(([kind, text], j) => (
                        <span key={j} className={tokenColor[kind]}>
                          {text}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
