import { useId, useLayoutEffect, useRef, useState } from "react";
import { useI18n } from "../i18n/context";

const SHADES = [
  { name: "Ultra Violet", color: "#8b5cf6" },
  { name: "Flamingo", color: "#f472b6" },
  { name: "Ocean", color: "#38bdf8" },
  { name: "Mint", color: "#34d399" },
  { name: "Sunset", color: "#fb923c" },
] as const;

/**
 * Colour picker built on native radio inputs (keyboard + screen readers for
 * free). The selection ring is a single shared element moved with a transform,
 * measured in a layout effect so it never flickers.
 */
export function ShadePicker() {
  const { t } = useI18n();
  const name = useId();
  const [selected, setSelected] = useState(0);
  const swatches = useRef<(HTMLLabelElement | null)[]>([]);
  const ring = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const target = swatches.current[selected];
    if (!target || !ring.current) return;
    ring.current.style.transform = `translateX(${target.offsetLeft}px)`;
  }, [selected]);

  const shade = SHADES[selected] ?? SHADES[0];

  return (
    <div className="flex h-full flex-col items-center gap-8">
      {/* Product visual reacts to the selected shade */}
      <div className="relative grid size-44 place-items-center">
        <div
          aria-hidden
          className="absolute inset-0 rounded-full blur-2xl transition-colors duration-700"
          style={{ background: shade.color, opacity: 0.35 }}
        />
        <svg viewBox="0 0 120 120" className="relative size-40" aria-hidden>
          <path
            d="M60 8c26 0 46 20 46 46 0 30-18 58-46 58S14 84 14 54C14 28 34 8 60 8Z"
            className="transition-[fill] duration-700"
            fill={shade.color}
          />
          <path d="M38 40c8-12 30-16 42-6" stroke="white" strokeOpacity=".5" strokeWidth="5" strokeLinecap="round" fill="none" />
        </svg>
      </div>

      <fieldset className="w-full">
        <legend className="mb-3 w-full text-center font-mono text-xs text-muted">
          {t.lab.shade.label} · <span className="text-ink">{shade.name}</span>
        </legend>
        <div className="relative mx-auto flex w-max gap-3">
          <span
            ref={ring}
            aria-hidden
            className="pointer-events-none absolute top-0 left-0 size-10 rounded-full ring-2 ring-ink ring-offset-2 ring-offset-bg transition-transform duration-500 ease-out-expo"
          />
          {SHADES.map((item, index) => (
            <label
              key={item.name}
              ref={(node) => {
                swatches.current[index] = node;
              }}
              className="relative size-10 cursor-pointer rounded-full transition-transform hover:scale-110 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-secondary"
              style={{ background: item.color }}
            >
              <input
                type="radio"
                name={name}
                value={item.name}
                checked={selected === index}
                onChange={() => setSelected(index)}
                className="sr-only"
              />
              <span className="sr-only">{item.name}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
