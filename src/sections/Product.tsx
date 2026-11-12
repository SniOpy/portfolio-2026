import { ButtonLink } from "../components/Button";
import { ArrowUpRight } from "../components/icons";
import { Reveal } from "../components/Reveal";
import { SplitReveal } from "../components/SplitReveal";
import { CountUp } from "../components/CountUp";
import { site } from "../data/site";
import { useI18n } from "../i18n/context";

export function Product() {
  const { t } = useI18n();

  return (
    <section aria-labelledby="product-title" className="py-28">
      <div className="container-page">
        <div className="glass grid items-center gap-12 overflow-hidden p-8 md:p-14 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-4">{t.product.eyebrow}</p>
            <SplitReveal id="product-title" text={t.product.title} className="text-3xl leading-tight font-semibold md:text-4xl" />
            <p className="mt-5 text-soft">{t.product.text}</p>
            <p className="mt-4 text-soft">{t.product.caseText}</p>
            <ButtonLink href={site.agency} target="_blank" variant="ghost" className="mt-8" icon={<ArrowUpRight />}>
              {t.product.agency}
            </ButtonLink>
          </Reveal>

          <Reveal delay={150} className="rounded-2xl bg-white p-7 text-[#14141a]">
            <p className="text-xs font-medium tracking-wide text-[#5c5c69] uppercase">{t.product.result.label}</p>
            <p className="mt-3 text-sm text-[#5c5c69]">{t.product.result.upTo}</p>
            <CountUp value={120000} className="block text-5xl font-bold tracking-tight text-primary tabular-nums md:text-6xl" />
            <p className="mt-1 text-sm text-[#5c5c69]">{t.product.result.of}</p>
            <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-[#ece8f5] pt-6">
              {t.product.result.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-xs text-[#5c5c69]">{stat.label}</dt>
                  <dd className="mt-1 text-2xl font-semibold">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
