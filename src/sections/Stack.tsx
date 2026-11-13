import { useEffect, useRef } from "react";
import { stack } from "../data/projects";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useI18n } from "../i18n/context";

const BASE_SPEED = 40; // px per second when the page is still

/**
 * Two crossing scroll-velocity marquees: each band drifts slowly, accelerates
 * with the scroll speed, reverses with the scroll direction and skews under
 * the "wind". The second band runs the other way. One rAF loop writing
 * transforms — no re-render, no CSS keyframes.
 */
export function Stack() {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const tracks = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const nodes = tracks.current.filter((n): n is HTMLDivElement => n !== null);
    if (nodes.length === 0 || reduced) return;

    const offsets = nodes.map(() => 0);
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
      const skew = Math.max(-12, Math.min(12, velocity * -0.006));

      nodes.forEach((node, i) => {
        const sign = i % 2 === 0 ? 1 : -1; // odd bands run the other way
        let offset = offsets[i]! + sign * direction * speed * dt;
        // The list is rendered twice, separated by one gap (gap-10 = 40px).
        const half = (node.scrollWidth + 40) / 2;
        if (half > 0) {
          if (offset <= -half) offset += half;
          if (offset > 0) offset -= half;
        }
        offsets[i] = offset;
        node.style.transform = `translate3d(${offset}px, 0, 0) skewX(${sign * skew}deg)`;
      });
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  const bands = [
    { className: "-rotate-2 bg-primary text-on-primary", dot: ["bg-lime", "bg-sun", "bg-pink"] },
    { className: "rotate-2 bg-lime text-ink", dot: ["bg-primary", "bg-ink", "bg-fuchsia"] },
  ];

  return (
    <section aria-label={t.stack.eyebrow} className="relative z-10 -my-4 overflow-hidden py-14">
      {bands.map((band, b) => (
        <div
          key={b}
          aria-hidden={b === 1}
          className={`${band.className} ${b === 1 ? "absolute inset-x-[-2%] top-1/2 -z-10 -translate-y-1/2" : "relative -mx-[2%]"} py-4 shadow-card`}
        >
          <div
            ref={(node) => {
              tracks.current[b] = node;
            }}
            className="flex w-max gap-10 will-change-transform"
          >
            {[0, 1].map((copy) => (
              <ul key={copy} aria-hidden={copy === 1 || b === 1} className="flex shrink-0 gap-10">
                {stack.map((tech, i) => (
                  <li key={tech} className="flex items-center gap-10 font-display text-xl font-bold whitespace-nowrap uppercase">
                    {tech}
                    <span aria-hidden className={`size-3 rotate-45 ${band.dot[i % band.dot.length]}`} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
