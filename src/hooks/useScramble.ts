import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#01";

/**
 * "Decoding" text effect: characters resolve left to right out of random
 * glyphs. Returns the text to render and a `replay` function (e.g. on hover).
 */
export function useScramble(text: string, { duration = 900 } = {}) {
  const reduced = usePrefersReducedMotion();
  const [output, setOutput] = useState(text);
  const frame = useRef(0);

  const replay = useCallback(() => {
    if (reduced) return;
    cancelAnimationFrame(frame.current);
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const resolved = Math.floor(progress * text.length);
      let next = text.slice(0, resolved);
      for (let i = resolved; i < text.length; i++) {
        const char = text[i]!;
        next += char === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOutput(next);
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  }, [text, duration, reduced]);

  useEffect(() => {
    setOutput(text);
    replay();
    return () => cancelAnimationFrame(frame.current);
  }, [text, replay]);

  return { output, replay };
}
