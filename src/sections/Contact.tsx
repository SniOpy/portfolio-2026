import { ButtonLink } from "../components/Button";
import { GitHub, LinkedIn } from "../components/icons";
import { Reveal } from "../components/Reveal";
import { SplitReveal } from "../components/SplitReveal";
import { site } from "../data/site";
import { useI18n } from "../i18n/context";

export function Contact() {
  const { t } = useI18n();

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative scroll-mt-20 overflow-hidden py-32">
      <div aria-hidden className="absolute bottom-0 left-1/2 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />
      <Reveal className="container-page flex flex-col items-center text-center">
        <p className="eyebrow mb-5">{t.contact.eyebrow}</p>
        <SplitReveal
          id="contact-title"
          text={t.contact.title}
          className="max-w-3xl text-4xl leading-tight font-bold md:text-6xl"
          stagger={60}
        />
        <p className="mt-5 text-lg text-soft">{t.contact.text}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
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
    </section>
  );
}
