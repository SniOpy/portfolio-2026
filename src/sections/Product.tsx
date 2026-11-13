import { ButtonLink } from "../components/Button";
import { CountUp } from "../components/CountUp";
import { ArrowUpRight } from "../components/icons";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { site } from "../data/site";
import { useI18n } from "../i18n/context";

export function Product() {
  const { t } = useI18n();

  return (
    <section aria-labelledby="product-title" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeader id="product-title" index="04" eyebrow={t.product.eyebrow} title={t.product.title} />

        <div className="grid items-start gap-10 md:grid-cols-[180px_1fr] md:gap-10">
          <div aria-hidden className="hidden md:block" />
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <Reveal>
              <p className="text-lg leading-relaxed text-soft">{t.product.text}</p>
              <p className="mt-4 leading-relaxed text-soft">{t.product.caseText}</p>
              <ButtonLink href={site.agency} target="_blank" variant="ghost" className="mt-8" icon={<ArrowUpRight />}>
                {t.product.agency}
              </ButtonLink>
            </Reveal>

            <Reveal delay={150} className="theme-dark relative overflow-hidden rounded-xl bg-gradient-to-br from-[#2e1065] via-primary to-fuchsia p-7 shadow-[0_30px_60px_-15px_rgb(124_58_237/0.55)] md:p-9">
              <div aria-hidden className="blob -top-20 -right-20 size-64 bg-sun/50" />
              <p className="relative font-mono text-xs tracking-[0.12em] text-white/80 uppercase">{t.product.result.label}</p>
              <p className="relative mt-6 text-sm text-white/85">{t.product.result.upTo}</p>
              <CountUp
                value={120000}
                className="relative block font-display text-5xl font-extrabold tracking-tight text-white tabular-nums md:text-7xl"
              />
              <p className="relative mt-1 text-sm text-white/85">{t.product.result.of}</p>
              <dl className="relative mt-8 grid grid-cols-2 gap-4 border-t border-white/25 pt-6">
                {t.product.result.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-xs text-white/80">{stat.label}</dt>
                    <dd className="mt-1 font-display text-2xl font-bold">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
