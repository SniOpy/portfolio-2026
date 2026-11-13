import { useMemo, useState } from "react";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectDialog } from "../components/ProjectDialog";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { projectsByStack as projects, type Project, type ProjectCategory } from "../data/projects";
import { useFlip } from "../hooks/useFlip";
import { useI18n } from "../i18n/context";
import { cn } from "../lib/cn";

type Filter = "all" | ProjectCategory;
const FILTERS: Filter[] = ["all", "front", "fullstack"];

export function Projects() {
  const { t } = useI18n();
  const [filter, setFilter] = useState<Filter>("all");
  const [opened, setOpened] = useState<{ project: Project; origin: DOMRect } | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );
  // Cards glide to their new slot when the filter changes.
  const flip = useFlip([visible]);

  return (
    <section id="projects" aria-labelledby="projects-title" className="section-alt relative isolate scroll-mt-20 overflow-hidden py-24 md:py-32">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="blob top-[10%] right-[-10%] size-[460px] bg-primary/15" />
        <div className="blob bottom-[5%] left-[-10%] size-[420px] bg-pink/15 [animation-delay:-9s]" />
      </div>
      <div className="container-page">
        <SectionHeader id="projects-title" index="01" eyebrow={t.projects.eyebrow} title={t.projects.title} intro={t.projects.intro} />

        <div role="group" aria-label="Filter" className="mb-10 flex flex-wrap gap-2">
          {FILTERS.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
              className={cn(
                "inline-flex min-h-10 items-center rounded-md border px-4 text-sm transition-colors duration-200",
                filter === value
                  ? "border-primary bg-primary text-on-primary shadow-glow"
                  : "border-line bg-card text-soft hover:border-primary hover:text-primary",
              )}
            >
              {t.projects.filters[value]}
              <span className="ml-2 font-mono text-xs opacity-60">
                {value === "all" ? projects.length : projects.filter((p) => p.category === value).length}
              </span>
            </button>
          ))}
        </div>

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, index) => (
            <li key={project.id} ref={flip(project.id)}>
              <Reveal delay={(index % 3) * 110} className="h-full">
                <ProjectCard
                  project={project}
                  active={opened?.project.id === project.id}
                  onOpen={(origin) => setOpened({ project, origin })}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
      {opened && <ProjectDialog project={opened.project} origin={opened.origin} onClose={() => setOpened(null)} />}
    </section>
  );
}
