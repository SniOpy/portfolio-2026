import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type Phase = "typing" | "holding" | "deleting" | "waiting";

interface Options {
  typeSpeed?: number;
  deleteSpeed?: number;
  /** Pause once the word is fully typed. */
  hold?: number;
  /** Pause once the word is fully erased, before the next cycle. */
  wait?: number;
  /** Pause the loop (e.g. when the element is off-screen). */
  paused?: boolean;
}

/**
 * Infinite type → hold → delete → wait loop, driven by a tiny state machine
 * (one timeout at a time, cleaned up on every transition).
 * Returns how many characters are visible and the current cycle index,
 * so callers can change style on each new cycle.
 */
export function useTypeLoop(
  text: string,
  { typeSpeed = 130, deleteSpeed = 70, hold = 1800, wait = 400, paused = false }: Options = {},
): { count: number; cycle: number } {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>("typing");
  const [count, setCount] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reduced || paused) return;

    let delay: number;
    let step: () => void;

    switch (phase) {
      case "typing":
        delay = typeSpeed;
        step = () => (count < text.length ? setCount(count + 1) : setPhase("holding"));
        break;
      case "holding":
        delay = hold;
        step = () => setPhase("deleting");
        break;
      case "deleting":
        delay = deleteSpeed;
        step = () => (count > 0 ? setCount(count - 1) : setPhase("waiting"));
        break;
      case "waiting":
        delay = wait;
        step = () => {
          setCycle((c) => c + 1);
          setPhase("typing");
        };
        break;
    }

    const id = setTimeout(step, delay);
    return () => clearTimeout(id);
  }, [phase, count, text, typeSpeed, deleteSpeed, hold, wait, paused, reduced]);

  return reduced ? { count: text.length, cycle: 0 } : { count, cycle };
}
