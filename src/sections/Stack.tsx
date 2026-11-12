import { useEffect, useRef } from "react";
import { stack } from "../data/projects";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useI18n } from "../i18n/context";

const BASE_SPEED = 40; // px per second when the page is still

/**
 * Scroll-velocity marquee: the band drifts slowly, accelerates with the scroll
 * speed, reverses with the scroll direction and skews under the "wind".
 * One rAF loop writing a transform — no re-render, no CSS keyframes.
 */
export function Stack() {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = track.current;
    if (!node || reduced) return;

    let offset = 0;
    let velocity = 0; // smoothed scroll velocity, px/s
    let direction = -1;
    let lastY = window.scrollY;
    let last = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 20);
      last = now;

      const y = window.scrollY;
      const instant = dt > 0 ? (y - lastY) / dt : 0;
      lastY = y;
      velocity += (instant - velocity) * 0.12; // low-pass filter
      if (Math.abs(velocity) > 5) direction = velocity > 0 ? -1 : 1;

      const speed = BASE_SPEED + Math.min(Math.abs(velocity) * 0.35, 900);
      offset += direction * speed * dt;

      // The list is rendered twice, separated by one gap (gap-10 = 40px).
      const half = (node.scrollWidth + 40) / 2;
      if (half > 0) {
        if (offset <= -half) offset += half;
        if (offset > 0) offset -= half;
      }
      const skew = Math.max(-12, Math.min(12, velocity * -0.006));
      node.style.transform = `translate3d(${offset}px, 0, 0) skewX(${skew}deg)`;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  return (
    <section aria-label={t.stack.eyebrow} className="overflow-hidden border-y border-line bg-bg-light/60 py-6">
      <div className="[mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div ref={track} className="flex w-max gap-10 will-change-transform">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-10">
              {stack.map((tech) => (
                <li key={tech} className="flex items-center gap-10 font-mono text-sm whitespace-nowrap text-soft">
                  {tech}
                  <span aria-hidden className="size-1.5 rounded-full bg-secondary" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
