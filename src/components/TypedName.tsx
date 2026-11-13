import { useRef, type CSSProperties } from "react";
import { useInView } from "../hooks/useInView";
import { useTypeLoop } from "../hooks/useTypeLoop";

/**
 * One colour per cycle: the name is typed in violet, erased, retyped in fuchsia, then cyan,
 * and so on. Add entries here to extend the rotation.
 */
const PALETTE = [
  { text: "text-primary", caret: "bg-primary" },
  { text: "text-fuchsia", caret: "bg-fuchsia" },
  { text: "text-sky", caret: "bg-sky" },
] as const;

const HOVER_COLORS = ["#7c3aed", "#ec4899", "#06b6d4", "#f59e0b", "#84cc16"];

interface TypedNameProps {
  firstName: string;
  lastName: string;
}

/**
 * First name is static; the last name loops: typed key by key, held, erased
 * key by key, then retyped in the next colour. The loop pauses while the
 * hero is off-screen, and screen readers get the full name once.
 */
export function TypedName({ firstName, lastName }: TypedNameProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: false, threshold: 0 });
  const { count, cycle } = useTypeLoop(lastName, { paused: !visible });
  const color = PALETTE[cycle % PALETTE.length]!;
  const letters = [...lastName].slice(0, count);

  return (
    <>
      <span className="sr-only">{`${firstName} ${lastName}`}</span>
      <span aria-hidden className="block">
        {[...firstName].map((char, i) => (
          <span
            key={i}
            className="bounce-letter"
            style={{ "--c": HOVER_COLORS[i % HOVER_COLORS.length], "--r": `${i % 2 ? 6 : -6}deg` } as CSSProperties}
          >
            {char}
          </span>
        ))}
      </span>
      {/* min-height reserves the line so nothing below jumps while typing */}
      <span ref={ref} aria-hidden className="block min-h-[1.05em] whitespace-nowrap">
        {letters.map((char, i) => (
          <span key={`${cycle}-${i}`} className={`inline-block animate-keypress ${color.text}`}>
            {char}
          </span>
        ))}
        <span
          className={`ml-1 inline-block h-[0.85em] w-[4px] translate-y-[0.1em] rounded-full ${color.caret} ${
            count === lastName.length ? "animate-blink" : ""
          }`}
        />
      </span>
    </>
  );
}
