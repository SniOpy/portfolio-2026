import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { CORE_STACK, type Project } from "../data/projects";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useI18n } from "../i18n/context";
import { cn } from "../lib/cn";
import { ArrowUpRight, GitHub } from "./icons";

interface ProjectDialogProps {
  project: Project;
  /** Where the card's image sits on screen — the dialog grows out of it. */
  origin: DOMRect;
  onClose: () => void;
}

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const DURATION = 620;

/** Transform that maps `to` back onto `from` (the "Invert" step of FLIP). */
function invert(from: DOMRect, to: DOMRect): string {
  const dx = from.left - to.left;
  const dy = from.top - to.top;
  return `translate(${dx}px, ${dy}px) scale(${from.width / to.width}, ${from.height / to.height})`;
}

/**
 * Shared-element transition: the card's screenshot morphs into the dialog's
 * hero image (FLIP on open, reversed on close) while the rest fades in.
 * Accessible modal: focus moved in and trapped, Escape closes, focus restored,
 * page scroll locked.
 */
export function ProjectDialog({ project, origin, onClose }: ProjectDialogProps) {
  const { t, pick } = useI18n();
  const reduced = usePrefersReducedMotion();
  const titleId = useId();
  const panel = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLDivElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const [closing, setClosing] = useState(false);

  // Open: play the image from the card's rect to its place in the dialog.
  useLayoutEffect(() => {
    const node = hero.current;
    if (!node || reduced) return;
    node.animate([{ transform: invert(origin, node.getBoundingClientRect()), borderRadius: "20px" }, { transform: "none" }], {
      duration: DURATION,
      easing: EASE,
    });
    backdrop.current?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, easing: "ease-out" });
  }, [origin, reduced]);

  const close = useCallback(() => {
    if (closing) return;
    setClosing(true);
    const node = hero.current;
    if (!node || reduced) return onClose();

    panel.current?.querySelectorAll<HTMLElement>("[data-stagger]").forEach((el) =>
      el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 150, fill: "forwards" }),
    );
    backdrop.current?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: DURATION * 0.8, fill: "forwards" });
    const flight = node.animate([{ transform: "none" }, { transform: invert(origin, node.getBoundingClientRect()) }], {
      duration: DURATION * 0.8,
      easing: EASE,
      fill: "forwards",
    });
    flight.onfinish = onClose;
  }, [closing, origin, onClose, reduced]);

  // Latest `close` for the listeners below, which are attached only once.
  const closeRef = useRef(close);
  useEffect(() => {
    closeRef.current = close;
  }, [close]);

  // Focus management, Escape, focus trap and scroll lock — set up once.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButton.current?.focus({ preventScroll: true });

    const root = document.documentElement;
    const scrollbar = window.innerWidth - root.clientWidth;
    const previous = { overflow: root.style.overflow, paddingRight: root.style.paddingRight };
    root.style.overflow = "hidden";
    root.style.paddingRight = `${scrollbar}px`;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeRef.current();
      }
      if (e.key !== "Tab" || !panel.current) return;
      const focusables = panel.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = previous.overflow;
      root.style.paddingRight = previous.paddingRight;
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8">
      <div ref={backdrop} aria-hidden onClick={close} className="absolute inset-0 bg-[#0d0c14]/70 backdrop-blur-md" />

      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative max-h-full w-full max-w-4xl overflow-y-auto rounded-[28px] border border-line bg-bg-light shadow-card"
      >
        <div ref={hero} className="relative aspect-[16/9] overflow-hidden rounded-t-[28px] will-change-transform">
          {project.image ? (
            <img
              src={project.image}
              alt=""
              className={cn("h-full w-full object-cover", project.imagePosition === "center" ? "object-center" : "object-top")}
            />
          ) : (
            <div className="h-full w-full" style={{ background: project.accent }} />
          )}
        </div>

        <button
          ref={closeButton}
          type="button"
          onClick={close}
          aria-label={t.projects.close}
          className="absolute top-4 right-4 grid size-10 place-items-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70"
        >
          ✕
        </button>

        <div className="grid gap-8 p-7 md:grid-cols-[1.2fr_1fr] md:p-10">
          <div>
            <p data-stagger className="dialog-in font-mono text-xs text-accent" style={{ "--d": 1 } as CSSProperties}>
              {pick(project.context)} · {project.year}
            </p>
            <h3 id={titleId} data-stagger className="dialog-in mt-2 text-3xl font-bold" style={{ "--d": 2 } as CSSProperties}>
              {project.name}
            </h3>
            <p data-stagger className="dialog-in mt-4 leading-relaxed text-soft" style={{ "--d": 3 } as CSSProperties}>
              {pick(project.summary)}
            </p>
            <div data-stagger className="dialog-in mt-7 flex flex-wrap gap-4 text-sm" style={{ "--d": 4 } as CSSProperties}>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-primary to-secondary px-4 py-2.5 font-semibold text-white"
                >
                  {t.projects.demo}
                  <ArrowUpRight width={16} height={16} />
                </a>
              )}
              {project.repo ? (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-line px-4 py-2.5 text-soft transition-colors hover:text-white"
                >
                  <GitHub width={16} height={16} />
                  {t.projects.code}
                </a>
              ) : (
                <span className="self-center font-mono text-xs text-muted">{t.projects.privateRepo}</span>
              )}
            </div>
          </div>

          <div>
            <p data-stagger className="dialog-in eyebrow mb-4" style={{ "--d": 3 } as CSSProperties}>
              {t.projects.tabs.engine}
            </p>
            <ul className="space-y-3 text-sm leading-relaxed text-soft">
              {pick(project.engine).map((line, i) => (
                <li
                  key={line}
                  data-stagger
                  className="dialog-in flex gap-3"
                  style={{ "--d": 4 + i } as CSSProperties}
                >
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full" style={{ background: project.accent }} />
                  {line}
                </li>
              ))}
            </ul>
            <ul data-stagger className="dialog-in mt-6 flex flex-wrap gap-1.5" style={{ "--d": 8 } as CSSProperties}>
              {project.stack.map((tech) => (
                <li key={tech} className={cn("chip", tech in CORE_STACK && "border-secondary/50 bg-primary/15 text-accent")}>
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
