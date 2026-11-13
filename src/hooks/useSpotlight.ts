import { useEffect } from "react";

/**
 * One delegated listener for the whole page: whichever `.spotlight` element
 * is under the pointer gets `--sx` / `--sy` (local px), which its CSS uses
 * to paint a light that follows the cursor along its border.
 */
export function useSpotlight(): void {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>(".spotlight");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--sx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--sy", `${e.clientY - rect.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
}
