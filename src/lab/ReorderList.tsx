import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { useFlip } from "../hooks/useFlip";
import { useI18n } from "../i18n/context";
import { cn } from "../lib/cn";

interface Item {
  id: string;
  label: string;
}

interface DragState {
  id: string;
  pointerId: number;
  /** Distance between the pointer and the top of the grabbed card. */
  grabOffset: number;
  listTop: number;
  slot: number;
}

function move<T>(list: T[], from: number, to: number): T[] {
  const next = [...list];
  const [item] = next.splice(from, 1);
  if (item !== undefined) next.splice(to, 0, item);
  return next;
}

/**
 * Drag-and-drop list with pointer events (mouse, touch, pen) and a keyboard
 * fallback. Siblings glide with FLIP; the dragged card follows the pointer.
 */
export function ReorderList() {
  const { t } = useI18n();
  const [items, setItems] = useState<Item[]>(() =>
    t.lab.reorder.items.map((label, i) => ({ id: `step-${i}`, label })),
  );
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const drag = useRef<DragState | null>(null);
  const nodes = useRef(new Map<string, HTMLLIElement>());
  const listRef = useRef<HTMLOListElement>(null);

  // Keep labels in sync with the language while preserving the user's order.
  useEffect(() => {
    setItems((current) =>
      current.map((item) => ({ ...item, label: t.lab.reorder.items[Number(item.id.split("-")[1])] ?? item.label })),
    );
  }, [t]);

  const flip = useFlip([items], { isExcluded: (key) => key === drag.current?.id });

  const register = (id: string) => (node: HTMLLIElement | null) => {
    flip(id)(node);
    if (node) nodes.current.set(id, node);
    else nodes.current.delete(id);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLButtonElement>, id: string) => {
    const node = nodes.current.get(id);
    const list = listRef.current;
    if (!node || !list) return;
    event.currentTarget.setPointerCapture(event.pointerId);

    const rect = node.getBoundingClientRect();
    const gap = parseFloat(getComputedStyle(list).rowGap) || 0;
    drag.current = {
      id,
      pointerId: event.pointerId,
      grabOffset: event.clientY - rect.top,
      listTop: list.getBoundingClientRect().top,
      slot: rect.height + gap,
    };
    setDraggingId(id);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const state = drag.current;
    if (!state || state.pointerId !== event.pointerId) return;
    const node = nodes.current.get(state.id);
    if (!node) return;

    const desiredTop = event.clientY - state.grabOffset - state.listTop;
    const to = Math.max(0, Math.min(items.length - 1, Math.round(desiredTop / state.slot)));

    setItems((current) => {
      const from = current.findIndex((i) => i.id === state.id);
      return from === to ? current : move(current, from, to);
    });
    // Follow the pointer relative to the card's (new) slot.
    node.style.transform = `translateY(${desiredTop - to * state.slot}px)`;
  };

  const endDrag = () => {
    const state = drag.current;
    if (!state) return;
    const node = nodes.current.get(state.id);
    node?.animate([{ transform: node.style.transform || "none" }, { transform: "none" }], {
      duration: 300,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    });
    if (node) node.style.transform = "";
    drag.current = null;
    setDraggingId(null);
  };

  const nudge = (index: number, delta: -1 | 1) => {
    const to = index + delta;
    if (to < 0 || to >= items.length) return;
    setItems((current) => move(current, index, to));
  };

  return (
    <ol ref={listRef} className="flex flex-col gap-2.5">
      {items.map((item, index) => (
        <li
          key={item.id}
          ref={register(item.id)}
          className={cn(
            "relative flex items-center gap-3 rounded-lg border bg-bg-light px-3 py-2 text-sm",
            draggingId === item.id ? "z-10 border-primary shadow-glow" : "border-line",
          )}
        >
          <button
            type="button"
            aria-label={`${item.label} — drag`}
            onPointerDown={(e) => onPointerDown(e, item.id)}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp") {
                e.preventDefault();
                nudge(index, -1);
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                nudge(index, 1);
              }
            }}
            className="grid size-10 shrink-0 cursor-grab touch-none place-items-center rounded-md text-muted hover:bg-card-strong hover:text-ink active:cursor-grabbing"
          >
            <svg width="12" height="16" viewBox="0 0 12 16" fill="currentColor" aria-hidden>
              {[2, 8, 14].flatMap((y) => [
                <circle key={`l${y}`} cx="3" cy={y} r="1.5" />,
                <circle key={`r${y}`} cx="9" cy={y} r="1.5" />,
              ])}
            </svg>
          </button>
          <span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>
          <span className="flex-1">{item.label}</span>
          <span className="flex gap-1">
            <button
              type="button"
              onClick={() => nudge(index, -1)}
              disabled={index === 0}
              aria-label={`${t.lab.reorder.moveUp} : ${item.label}`}
              className="grid size-10 place-items-center rounded-md text-muted hover:bg-card-strong hover:text-ink disabled:opacity-30"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => nudge(index, 1)}
              disabled={index === items.length - 1}
              aria-label={`${t.lab.reorder.moveDown} : ${item.label}`}
              className="grid size-10 place-items-center rounded-md text-muted hover:bg-card-strong hover:text-ink disabled:opacity-30"
            >
              ↓
            </button>
          </span>
        </li>
      ))}
    </ol>
  );
}
