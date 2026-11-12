import { ButtonLink } from "../components/Button";
import { ArrowDown, Download, GitHub } from "../components/icons";
import { Reveal } from "../components/Reveal";
import { ScrambleText } from "../components/ScrambleText";
import { TypedName } from "../components/TypedName";
import { site } from "../data/site";
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

export function Hero() {
  const { t } = useI18n();

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pt-36 pb-24 md:pt-44 lg:pb-40">
      {/* Background: faint grid + violet glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.05)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
      />
      <div aria-hidden className="absolute -top-40 left-1/2 -z-10 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary/25 blur-[140px]" />

      <div className="container-page grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
        <div className="min-w-0">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-xs text-soft">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              {t.hero.status}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 id="hero-title" className="mt-7 text-5xl leading-[1.05] font-bold tracking-tight md:text-7xl">
              <TypedName firstName="Soufiane" lastName="Ibnaïche" />
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <ScrambleText
              text={t.hero.role}
              className="mt-4 cursor-default text-xl font-semibold md:text-2xl"
              textClassName="text-gradient"
            />
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-soft">{t.hero.pitch}</p>
          </Reveal>

          <Reveal delay={320} className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="#projects" magnetic icon={<ArrowDown />}>
              {t.hero.ctaProjects}
            </ButtonLink>
            <ButtonLink href={site.cv} download variant="ghost" icon={<Download />}>
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

          <Reveal delay={400}>
            <ul className="mt-10 flex flex-wrap gap-2">
              {t.hero.meta.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative min-w-0 lg:pl-10">
          {/* Portrait: grayscale photo + violet duotone, in the site's glass frame */}
          <figure className="group relative mx-auto max-w-[380px] lg:ml-auto lg:mr-0">
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[32px] bg-gradient-to-br from-primary/40 to-secondary/10 blur-2xl"
            />
            <div className="relative overflow-hidden rounded-[28px] border border-line bg-bg-light p-2 shadow-card">
              <picture>
                <source srcSet="/soufiane.webp" type="image/webp" />
                <img
                  src="/soufiane.jpg"
                  alt={t.hero.photoAlt}
                  width={720}
                  height={896}
                  fetchPriority="high"
                  className="aspect-[4/5] w-full rounded-[22px] object-cover object-top grayscale transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
                />
              </picture>
              {/* Violet tint, same mood as madapes-agency.com */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-2 rounded-[22px] bg-gradient-to-t from-primary/45 via-primary/5 to-transparent mix-blend-multiply"
              />
            </div>
            <figcaption className="glass absolute -top-4 -right-3 px-4 py-2.5 font-mono text-xs text-soft shadow-card">
              <span className="text-emerald-300">✓</span> 0 animation library
            </figcaption>
          </figure>

          {/* Code window overlapping the portrait on large screens */}
          <div className="glass relative z-10 mx-auto -mt-16 max-w-[400px] overflow-hidden bg-bg/80 shadow-card lg:absolute lg:bottom-[-110px] lg:left-0 lg:mt-0 lg:w-[400px]">
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
