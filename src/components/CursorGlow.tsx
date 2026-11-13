import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

/**
 * Violet → pink halo that trails the pointer (signature of madapes-agency.com).
 * Blended in `multiply`, so it tints light sections and vanishes on ink ones.
 * Uses linear interpolation in a rAF loop and only touches CSS variables.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || !window.matchMedia("(pointer: fine)").matches) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 3 };
    const current = { ...target };
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      node.style.opacity = "1"; // only show once the pointer is actually moving
    };
    const tick = () => {
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;
      node.style.setProperty("--x", `${current.x}px`);
      node.style.setProperty("--y", `${current.y}px`);
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 hidden opacity-0 mix-blend-multiply transition-opacity duration-700 md:block"
      style={{
        background:
          "radial-gradient(380px circle at var(--x, 50%) var(--y, 30%), rgb(236 72 153 / 0.14), rgb(124 58 237 / 0.10) 40%, transparent 70%)",
      }}
    />
  );
}
