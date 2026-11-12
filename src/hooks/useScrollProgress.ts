import { useEffect, type RefObject } from "react";

/**
 * - `track`: 0 when the element's top hits the viewport top, 1 when its bottom
 *   reaches the viewport bottom (for tall elements with a sticky child).
 * - `pass`: 0 when the element's top crosses the anchor line, 1 when its
 *   bottom does (for elements that simply scroll by).
 */
type Mode = "track" | "pass";

function computeProgress(rect: DOMRect, mode: Mode, anchor: number): number {
  const vh = window.innerHeight;
  if (mode === "track") {
    const scrollable = rect.height - vh;
    return scrollable > 0 ? -rect.top / scrollable : 0;
  }
  return (vh * anchor - rect.top) / rect.height;
}

/**
 * Exposes how far the user has scrolled through an element as a CSS custom
 * property `--progress` (0 → 1) on that element.
 *
 * Children animate with `calc()` on `var(--progress)`, so scrolling never
 * triggers a React re-render: the browser does all the work.
 */
export function useScrollProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { mode = "track", anchor = 0.6 }: { mode?: Mode; anchor?: number } = {},
): void {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    const update = () => {
      const progress = Math.min(1, Math.max(0, computeProgress(node.getBoundingClientRect(), mode, anchor)));
      node.style.setProperty("--progress", progress.toFixed(4));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, mode, anchor]);
}
