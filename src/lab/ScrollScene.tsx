import { useRef, type CSSProperties } from "react";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { useI18n } from "../i18n/context";

/**
 * A tall track with a sticky stage. `--progress` (0 → 1) is written by
 * useScrollProgress; each card derives its own local progress in pure CSS:
 *   --p = clamp(0, progress × count − index, 1)
 */
export function ScrollScene() {
  const { t } = useI18n();
  const track = useRef<HTMLDivElement>(null);
  useScrollProgress(track);
  const steps = t.lab.scroll.steps;

  return (
    <div ref={track} className="relative h-[170vh]" style={{ "--progress": 0, "--count": steps.length } as CSSProperties}>
      <div className="sticky top-0 flex h-screen items-center">
        <div className="glass w-full p-8 md:p-12">
          <div className="mb-10">
            <h3 className="text-xl font-semibold">{t.lab.scroll.title}</h3>
            <p className="mt-1 text-sm text-muted">{t.lab.scroll.hint}</p>
          </div>

          <div className="h-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full origin-left rounded-full bg-gradient-to-r from-primary to-secondary"
              style={{ transform: "scaleX(var(--progress))" }}
            />
          </div>

          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li
                key={step}
                className="scroll-card rounded-2xl border border-line bg-bg-light p-6"
                style={{ "--i": index } as CSSProperties}
              >
                <span className="font-mono text-xs text-secondary">0{index + 1}</span>
                <p className="mt-6 text-lg font-semibold">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
