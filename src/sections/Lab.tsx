import type { ReactNode } from "react";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { useI18n } from "../i18n/context";
import { ReorderList } from "../lab/ReorderList";
import { ScrollScene } from "../lab/ScrollScene";
import { ShadePicker } from "../lab/ShadePicker";

function DemoCard({ title, hint, children, delay }: { title: string; hint: string; children: ReactNode; delay: number }) {
  return (
    <Reveal delay={delay} className="spotlight panel flex flex-col bg-card/70 p-6 backdrop-blur-sm transition-[border-color,translate] duration-300 hover:-translate-y-1 hover:border-pink/60 md:p-8">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-1 mb-8 text-sm text-muted">{hint}</p>
      <div className="flex-1">{children}</div>
    </Reveal>
  );
}

export function Lab() {
  const { t } = useI18n();

  return (
    <section id="lab" aria-labelledby="lab-title" className="theme-dark relative isolate scroll-mt-20 overflow-clip py-24 md:py-32">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="blob top-[2%] left-[-8%] size-[520px] bg-pink/30" />
        <div className="blob top-[30%] right-[-10%] size-[560px] bg-primary/40 [animation-delay:-7s]" />
        <div className="blob bottom-[5%] left-[20%] size-[460px] bg-sky/20 [animation-delay:-13s]" />
      </div>
      <div className="container-page">
        <SectionHeader id="lab-title" index="02" eyebrow={t.lab.eyebrow} title={t.lab.title} intro={t.lab.intro} />

        <div className="grid gap-6 lg:grid-cols-2">
          <DemoCard title={t.lab.shade.title} hint={t.lab.shade.hint} delay={0}>
            <ShadePicker />
          </DemoCard>
          <DemoCard title={t.lab.reorder.title} hint={t.lab.reorder.hint} delay={120}>
            <ReorderList />
          </DemoCard>
        </div>

        <ScrollScene />
      </div>
    </section>
  );
}
