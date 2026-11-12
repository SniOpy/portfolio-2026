import { useRef } from "react";
import { useInView } from "../hooks/useInView";
import { useTypeLoop } from "../hooks/useTypeLoop";

/**
 * One colour per cycle: the name is typed in violet, erased, retyped in blue,
 * and so on. Add entries here to extend the rotation.
 */
const PALETTE = [
  { text: "text-secondary", caret: "bg-secondary" },
  { text: "text-sky-400", caret: "bg-sky-400" },
] as const;

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
        {firstName}
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
