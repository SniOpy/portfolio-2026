import { useMemo, useState } from "react";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectDialog } from "../components/ProjectDialog";
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
    <section id="projects" aria-labelledby="projects-title" className="theme-light scroll-mt-20 py-28">
      <div className="container-page">
        <SectionHeader id="projects-title" eyebrow={t.projects.eyebrow} title={t.projects.title} intro={t.projects.intro} />

        <div role="group" aria-label="Filter" className="mb-10 flex flex-wrap gap-2">
          {FILTERS.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                filter === value
                  ? "border-secondary bg-primary/20 text-white"
                  : "border-line text-soft hover:border-secondary/50 hover:text-white",
              )}
            >
              {t.projects.filters[value]}
              <span className="ml-2 font-mono text-xs text-muted">
                {value === "all" ? projects.length : projects.filter((p) => p.category === value).length}
              </span>
            </button>
          ))}
        </div>

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <li key={project.id} ref={flip(project.id)}>
              <ProjectCard
                project={project}
                active={opened?.project.id === project.id}
                onOpen={(origin) => setOpened({ project, origin })}
              />
            </li>
          ))}
        </ul>
      </div>
      {opened && <ProjectDialog project={opened.project} origin={opened.origin} onClose={() => setOpened(null)} />}
    </section>
  );
}
