import { useEffect, type RefObject } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Writes the pointer position over an element as `--mx` / `--my` (-1 → 1),
 * eased in a rAF loop. Children opt in with the `.depth` class and a
 * `--depth` (px of travel), so layers drift at different speeds — parallax
 * without re-renders. Fine pointers only; disabled under reduced motion.
 */
export function usePointerParallax<T extends HTMLElement>(ref: RefObject<T | null>): void {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || !window.matchMedia("(pointer: fine)").matches) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;
    let running = false;

    const tick = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      node.style.setProperty("--mx", current.x.toFixed(4));
      node.style.setProperty("--my", current.y.toFixed(4));
      // Sleep once settled: no rAF loop while the pointer is still.
      if (Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > 0.001) {
        frame = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };
    const wake = () => {
      if (!running) {
        running = true;
        frame = requestAnimationFrame(tick);
      }
    };
    const onMove = (e: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      target.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      target.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      wake();
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      wake();
    };

    node.addEventListener("pointermove", onMove, { passive: true });
    node.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, [ref, reduced]);
}
