import { useScramble } from "../hooks/useScramble";

interface ScrambleTextProps {
  text: string;
  className?: string;
  /** Classes for the visible glyphs (e.g. a gradient — background-clip:text
   *  must sit on the positioned layer itself to paint). */
  textClassName?: string;
}

/** Text that "decodes" itself on mount and again on hover / focus. */
export function ScrambleText({ text, className, textClassName }: ScrambleTextProps) {
  const { output, replay } = useScramble(text);

  return (
    <p className={className} onPointerEnter={replay}>
      <span className="sr-only">{text}</span>
      {/* The invisible final text reserves the layout, so glyphs never shift it. */}
      <span aria-hidden className="relative inline-block">
        <span className="invisible">{text}</span>
        <span className={`absolute inset-0 ${textClassName ?? ""}`}>{output}</span>
      </span>
    </p>
  );
}
