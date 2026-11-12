import { useId, useRef, useState, type CSSProperties } from "react";
import { useTilt } from "../hooks/useTilt";
import { CORE_STACK, type Project } from "../data/projects";
import { useI18n } from "../i18n/context";
import { cn } from "../lib/cn";
import { ArrowUpRight, GitHub } from "./icons";

type Tab = "overview" | "engine";

function Artwork({ project, alt }: { project: Project; alt: string }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={cn(
          "h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]",
          project.imagePosition === "center" ? "object-center" : "object-top",
        )}
      />
    );
  }
  // Generated cover: browser frame + project monogram in its accent colour.
  return (
    <div
      className="relative flex h-full items-end overflow-hidden p-5"
      style={{
        background: `radial-gradient(120% 90% at 85% 0%, color-mix(in srgb, ${project.accent} 45%, transparent), transparent 60%), var(--color-bg-light)`,
      }}
    >
      <div className="absolute inset-x-5 top-5 flex gap-1.5">
        <span className="size-2 rounded-full bg-white/25" />
        <span className="size-2 rounded-full bg-white/25" />
        <span className="size-2 rounded-full bg-white/25" />
      </div>
      <span
        aria-hidden
        className="text-6xl font-bold tracking-tight transition-transform duration-700 ease-out-expo group-hover:-translate-y-1 group-hover:scale-105"
        style={{ color: project.accent }}
      >
        {project.name
          .split(" ")
          .map((w) => w[0])
          .join("")
          .slice(0, 2)}
      </span>
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  /** Opens the detail dialog, which grows out of the image's rect. */
  onOpen: (origin: DOMRect) => void;
  /** True while this project's dialog is open: the image "lives" there. */
  active: boolean;
}

export function ProjectCard({ project, onOpen, active }: ProjectCardProps) {
  const { t, pick } = useI18n();
  const [tab, setTab] = useState<Tab>("overview");
  const baseId = useId();
  const card = useRef<HTMLElement>(null);
  const media = useRef<HTMLButtonElement>(null);
  useTilt(card);

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: t.projects.tabs.overview },
    { id: "engine", label: t.projects.tabs.engine },
  ];
  const activeIndex = tabs.findIndex((x) => x.id === tab);

  return (
    <article
      ref={card}
      className="tilt group glass relative flex h-full flex-col overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-(--accent)/50 hover:shadow-card"
      style={{ "--accent": project.accent } as CSSProperties}
      aria-labelledby={`${baseId}-title`}
    >
      <span aria-hidden className="tilt-glare pointer-events-none absolute inset-0 z-10 rounded-[20px]" />
      <button
        ref={media}
        type="button"
        onClick={() => media.current && onOpen(media.current.getBoundingClientRect())}
        aria-label={`${t.projects.open} : ${project.name}`}
        className={cn(
          "relative block aspect-[16/9] w-full cursor-zoom-in overflow-hidden border-b border-line",
          active && "invisible",
        )}
      >
        <Artwork project={project} alt="" />
        <span className="absolute right-3 bottom-3 translate-y-2 rounded-full bg-black/60 px-3 py-1.5 font-mono text-xs text-white opacity-0 backdrop-blur transition-[opacity,translate] duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {t.projects.open} ↗
        </span>
      </button>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 id={`${baseId}-title`} className="text-xl font-semibold">
            {project.name}
          </h3>
          <span className="font-mono text-xs text-muted">{project.year}</span>
        </div>
        <p className="mt-1 font-mono text-xs text-accent">{pick(project.context)}</p>

        {/* Tabs with an indicator that slides between buttons */}
        <div role="tablist" aria-label={project.name} className="relative mt-5 grid grid-cols-2 rounded-lg bg-white/5 p-1 text-xs">
          <span
            aria-hidden
            className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-md bg-white/10 transition-transform duration-300 ease-out-expo"
            style={{ transform: `translateX(${activeIndex * 100}%)` }}
          />
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={tab === item.id}
              aria-controls={`${baseId}-panel`}
              onClick={() => setTab(item.id)}
              className={cn(
                "relative rounded-md py-1.5 font-medium transition-colors",
                tab === item.id ? "text-white" : "text-muted hover:text-soft",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div
          id={`${baseId}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${tab}`}
          className="mt-4 flex-1 text-sm leading-relaxed text-soft"
        >
          {tab === "overview" ? (
            <p key="overview" className="animate-fade-in">
              {pick(project.summary)}
            </p>
          ) : (
            <ul key="engine" className="animate-fade-in space-y-2">
              {pick(project.engine).map((line) => (
                <li key={line} className="flex gap-2">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full" style={{ background: project.accent }} />
                  {line}
                </li>
              ))}
            </ul>
          )}
        </div>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className={cn("chip", tech in CORE_STACK && "border-secondary/50 bg-primary/15 text-accent")}
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-line pt-5 text-sm">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-white transition-colors hover:text-accent"
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
              className="inline-flex items-center gap-1.5 text-soft transition-colors hover:text-white"
            >
              <GitHub width={16} height={16} />
              {t.projects.code}
            </a>
          ) : (
            <span className="font-mono text-xs text-muted">{t.projects.privateRepo}</span>
          )}
        </div>
      </div>
    </article>
  );
}
