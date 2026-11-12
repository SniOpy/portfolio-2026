import { useEffect, type RefObject } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Makes an element gently follow the pointer while hovered.
 * Writes transforms directly to the DOM in a rAF loop: zero React re-renders.
 */
export function useMagnetic<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { strength = 0.25, enabled = true } = {},
): void {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !enabled || reduced || !window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    const move = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * strength;
      const y = (event.clientY - rect.top - rect.height / 2) * strength;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        // Individual `translate` property: composes with any existing transform.
        node.style.translate = `${x}px ${y}px`;
      });
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      node.style.translate = "";
    };

    node.addEventListener("pointermove", move);
    node.addEventListener("pointerleave", reset);
    return () => {
      cancelAnimationFrame(frame);
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerleave", reset);
      node.style.translate = "";
    };
  }, [ref, strength, enabled, reduced]);
}
