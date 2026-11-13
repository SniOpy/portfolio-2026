import { ButtonLink } from "../components/Button";
import { GitHub, LinkedIn } from "../components/icons";
import { Reveal } from "../components/Reveal";
import { SplitReveal } from "../components/SplitReveal";
import { site } from "../data/site";
import { useI18n } from "../i18n/context";

export function Contact() {
  const { t } = useI18n();

  return (
    <section id="contact" aria-labelledby="contact-title" className="theme-dark relative isolate scroll-mt-20 overflow-hidden pt-24 md:pt-36">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="blob top-[-20%] right-[-5%] size-[600px] bg-primary/50" />
        <div className="blob bottom-[-10%] left-[-10%] size-[520px] bg-fuchsia/35 [animation-delay:-8s]" />
        <div className="blob top-[30%] left-[40%] size-[360px] bg-lime/15 [animation-delay:-14s]" />
      </div>
      <div className="container-page grid gap-6 border-t-[3px] border-lime pt-6 md:grid-cols-[180px_1fr] md:gap-10">
        <Reveal>
          <p className="flex items-baseline gap-3 font-mono text-xs tracking-[0.16em] text-muted uppercase">
            <span className="font-display text-5xl leading-none font-extrabold tracking-tight text-lime">05</span>
            {t.contact.eyebrow}
          </p>
        </Reveal>
        <div>
          <SplitReveal
            id="contact-title"
            text={t.contact.title}
            className="max-w-4xl text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.02] font-extrabold tracking-[-0.03em]"
            stagger={60}
          />
          <Reveal delay={200}>
            <p className="mt-6 text-lg text-soft">{t.contact.text}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={site.linkedin} target="_blank" magnetic icon={<LinkedIn />}>
                {t.contact.linkedin}
              </ButtonLink>
              {site.email && (
                <ButtonLink href={`mailto:${site.email}`} variant="ghost">
                  {t.contact.email}
                </ButtonLink>
              )}
              <ButtonLink href={site.github} target="_blank" variant="ghost" icon={<GitHub />}>
                GitHub
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Giant outlined marquee closing the page */}
      <div aria-hidden className="mt-24 overflow-hidden border-t border-line py-6 md:mt-32">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((copy) => (
            <p key={copy} className="flex shrink-0 items-center font-display text-[clamp(3.5rem,10vw,9rem)] leading-none font-extrabold uppercase">
              {Array.from({ length: 4 }, (_, i) => (
                <span key={i} className="flex items-center">
                  <span className={i % 2 === 0 ? "text-outline" : "text-shimmer"}>{t.contact.eyebrow}</span>
                  <span className="mx-8 text-[0.5em] text-lime">✦</span>
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
