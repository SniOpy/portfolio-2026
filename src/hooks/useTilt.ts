import { useEffect, type RefObject } from "react";
import { Spring, SPRINGS } from "../lib/spring";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * 3D tilt that follows the pointer, driven by four springs (rotate X/Y and the
 * glare position). Writes CSS variables only — zero React re-renders:
 *   --rx, --ry  rotation in degrees
 *   --gx, --gy  glare position in %
 *   --go        glare opacity (0 → 1)
 */
export function useTilt<T extends HTMLElement>(ref: RefObject<T | null>, { max = 7 } = {}): void {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || !window.matchMedia("(pointer: fine)").matches) return;

    const springs = {
      rx: new Spring(0, SPRINGS.snappy),
      ry: new Spring(0, SPRINGS.snappy),
      gx: new Spring(50, SPRINGS.gentle),
      gy: new Spring(50, SPRINGS.gentle),
      go: new Spring(0, SPRINGS.gentle),
    };
    let frame = 0;
    let last = 0;

    const tick = (now: number) => {
      const dt = last ? (now - last) / 1000 : 1 / 60;
      last = now;
      let settled = true;
      for (const spring of Object.values(springs)) settled = spring.step(dt) && settled;

      node.style.setProperty("--rx", `${springs.rx.value.toFixed(3)}deg`);
      node.style.setProperty("--ry", `${springs.ry.value.toFixed(3)}deg`);
      node.style.setProperty("--gx", `${springs.gx.value.toFixed(2)}%`);
      node.style.setProperty("--gy", `${springs.gy.value.toFixed(2)}%`);
      node.style.setProperty("--go", springs.go.value.toFixed(3));

      frame = settled ? 0 : requestAnimationFrame(tick);
    };
    const wake = () => {
      if (frame) return;
      last = 0;
      frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width; // 0 → 1
      const py = (e.clientY - rect.top) / rect.height;
      springs.ry.target = (px - 0.5) * 2 * max;
      springs.rx.target = (0.5 - py) * 2 * max;
      springs.gx.target = px * 100;
      springs.gy.target = py * 100;
      springs.go.target = 1;
      wake();
    };
    const onLeave = () => {
      springs.rx.target = 0;
      springs.ry.target = 0;
      springs.go.target = 0;
      wake();
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, [ref, max, reduced]);
}
