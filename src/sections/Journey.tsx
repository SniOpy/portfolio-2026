import { useRef } from "react";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { useI18n } from "../i18n/context";

const MARKERS = ["#7c3aed", "#ec4899", "#06b6d4", "#f59e0b", "#84cc16"];

export function Journey() {
  const { t } = useI18n();
  const timeline = useRef<HTMLOListElement>(null);
  // The vertical line "draws" itself as the user scrolls through the timeline.
  useScrollProgress(timeline, { mode: "pass" });

  return (
    <section id="journey" aria-labelledby="journey-title" className="section-alt scroll-mt-20 py-24 md:py-32">
      <div className="container-page">
        <SectionHeader id="journey-title" index="03" eyebrow={t.journey.eyebrow} title={t.journey.title} />

        <ol ref={timeline} className="relative ml-3 space-y-12 border-l border-line pl-10 md:ml-[220px]">
          <span
            aria-hidden
            className="absolute top-0 -left-px h-full w-[3px] origin-top bg-gradient-to-b from-primary via-pink to-sky"
            style={{ transform: "scaleY(calc(0.08 + var(--progress, 0) * 0.92))" }}
          />
          {t.journey.items.map((item, index) => (
            <Reveal as="li" key={item.title} delay={index * 60} className="group/item relative">
              <span
                aria-hidden
                className="absolute top-1 -left-[47px] size-4 rotate-45 border-[3px] bg-bg-light transition-transform duration-500 ease-out-expo group-hover/item:rotate-[225deg] group-hover/item:scale-125"
                style={{ borderColor: MARKERS[index % MARKERS.length] }}
              />
              <p className="font-mono text-sm text-accent md:absolute md:top-0.5 md:-left-[208px] md:w-36 md:text-right">
                {item.date}
              </p>
              <h3 className="mt-1 text-xl font-bold md:mt-0">{item.title}</h3>
              <p className="mt-2 max-w-2xl text-soft">{item.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
