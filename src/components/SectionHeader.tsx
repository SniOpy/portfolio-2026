import type { CSSProperties } from "react";
import { Reveal } from "./Reveal";
import { SplitReveal } from "./SplitReveal";

/** One vivid colour per chapter, so the page changes mood as you scroll. */
export const CHAPTER_COLORS: Record<string, string> = {
  "01": "var(--color-primary)",
  "02": "var(--color-pink)",
  "03": "#0891b2", // darker cyan/amber: keep 3:1 as large text on light
  "04": "#d97706",
  "05": "var(--color-lime)",
};

interface SectionHeaderProps {
  id: string;
  /** Two-digit chapter number, e.g. "01". */
  index: string;
  eyebrow: string;
  title: string;
  intro?: string;
}

/**
 * Swiss-style chapter header: a coloured rule that draws itself, a big
 * chapter number in the left column, the title and intro on the main column.
 */
export function SectionHeader({ id, index, eyebrow, title, intro }: SectionHeaderProps) {
  return (
    <div className="mb-14" style={{ "--chapter": CHAPTER_COLORS[index] } as CSSProperties}>
      <Reveal className="mb-6">
        <div aria-hidden className="rule-draw h-[3px] bg-(--chapter)" />
      </Reveal>
      <div className="grid gap-6 md:grid-cols-[180px_1fr] md:gap-10">
        <Reveal>
          <p className="flex items-baseline gap-3 font-mono text-xs tracking-[0.16em] text-muted uppercase">
            <span className="font-display text-5xl leading-none font-extrabold tracking-tight text-(--chapter)">
              {index}
            </span>
            {eyebrow}
          </p>
        </Reveal>
        <div className="max-w-3xl">
          <SplitReveal id={id} text={title} className="text-3xl leading-[1.1] font-bold md:text-5xl" />
          {intro && (
            <Reveal delay={250}>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-soft">{intro}</p>
            </Reveal>
          )}
        </div>
      </div>
    </div>
  );
}
