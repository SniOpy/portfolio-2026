import { Fragment, useRef, type CSSProperties, type ElementType } from "react";
import { useInView } from "../hooks/useInView";
import { cn } from "../lib/cn";

interface SplitRevealProps {
  text: string;
  as?: ElementType;
  id?: string;
  className?: string;
  /** Delay between two words, in ms. */
  stagger?: number;
}

/**
 * Each word rises out of its own clipping mask, one after the other.
 * Screen readers read the plain sentence; the split words are aria-hidden.
 */
export function SplitReveal({ text, as: Tag = "h2", id, className, stagger = 45 }: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref);
  const words = text.split(" ");

  return (
    <Tag ref={ref} id={id} className={cn("split-reveal", className)} data-visible={visible}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <span className="split-word">
              <span className="split-inner" style={{ "--i": i, "--stagger": `${stagger}ms` } as CSSProperties}>
                {word}
              </span>
            </span>
            {/* The space lives outside the inline-block so it isn't trimmed. */}
            {i < words.length - 1 && " "}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
