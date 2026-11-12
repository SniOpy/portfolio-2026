import type { ReactNode } from "react";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { useI18n } from "../i18n/context";
import { ReorderList } from "../lab/ReorderList";
import { ScrollScene } from "../lab/ScrollScene";
import { ShadePicker } from "../lab/ShadePicker";

function DemoCard({ title, hint, children, delay }: { title: string; hint: string; children: ReactNode; delay: number }) {
  return (
    <Reveal delay={delay} className="glass flex flex-col p-7">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 mb-8 text-sm text-muted">{hint}</p>
      <div className="flex-1">{children}</div>
    </Reveal>
  );
}

export function Lab() {
  const { t } = useI18n();

  return (
    <section id="lab" aria-labelledby="lab-title" className="scroll-mt-20 py-28">
      <div className="container-page">
        <SectionHeader id="lab-title" eyebrow={t.lab.eyebrow} title={t.lab.title} intro={t.lab.intro} />

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
