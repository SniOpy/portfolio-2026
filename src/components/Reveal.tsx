import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { useInView } from "../hooks/useInView";
import { cn } from "../lib/cn";

interface RevealProps {
  children: ReactNode;
  /** Delay in ms — use it to stagger siblings. */
  delay?: number;
  as?: ElementType;
  className?: string;
}

/** Fades and lifts its content in when it enters the viewport. */
export function Reveal({ children, delay = 0, as: Tag = "div", className }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref);

  return (
    <Tag
      ref={ref}
      data-visible={visible}
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
