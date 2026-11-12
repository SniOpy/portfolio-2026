import { Reveal } from "./Reveal";
import { SplitReveal } from "./SplitReveal";

interface SectionHeaderProps {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
}

export function SectionHeader({ id, eyebrow, title, intro }: SectionHeaderProps) {
  return (
    <div className="mb-12 max-w-2xl">
      <Reveal>
        <p className="eyebrow mb-4">{eyebrow}</p>
      </Reveal>
      <SplitReveal id={id} text={title} className="text-3xl leading-tight font-semibold md:text-4xl" />
      {intro && (
        <Reveal delay={250}>
          <p className="mt-4 text-soft">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
