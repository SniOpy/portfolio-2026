import { useCallback, useLayoutEffect, useRef, type DependencyList } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

interface Box {
  x: number;
  y: number;
}

/**
 * FLIP layout animation (First, Last, Invert, Play) for keyed elements.
 *
 * Usage: `const flip = useFlip([items]);` then `<li ref={flip(item.id)} />`.
 * Whenever `deps` change, every registered element animates from its previous
 * position to its new one with the Web Animations API — the same technique
 * libraries use for "layout" animations, without the dependency.
 */
export function useFlip(
  deps: DependencyList,
  {
    duration = 450,
    /** Skip elements animated by something else (e.g. the item being dragged). */
    isExcluded,
  }: { duration?: number; isExcluded?: (key: string) => boolean } = {},
) {
  const reduced = usePrefersReducedMotion();
  const nodes = useRef(new Map<string, HTMLElement>());
  const previous = useRef(new Map<string, Box>());

  const register = useCallback(
    (key: string) => (node: HTMLElement | null) => {
      if (node) nodes.current.set(key, node);
      else nodes.current.delete(key);
    },
    [],
  );

  useLayoutEffect(() => {
    const next = new Map<string, Box>();

    nodes.current.forEach((node, key) => {
      const rect = node.getBoundingClientRect();
      // Document-relative coordinates so page scroll between renders is ignored.
      const box = { x: rect.left + window.scrollX, y: rect.top + window.scrollY };
      next.set(key, box);

      const first = previous.current.get(key);
      if (reduced || isExcluded?.(key)) return;

      if (!first) {
        // Newly mounted element: fade and scale in.
        node.animate(
          [
            { opacity: 0, transform: "scale(0.96)" },
            { opacity: 1, transform: "none" },
          ],
          { duration, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
        );
        return;
      }

      const dx = first.x - box.x;
      const dy = first.y - box.y;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;

      node.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }], {
        duration,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      });
    });

    previous.current = next;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- caller controls when layout changes
  }, deps);

  return register;
}
