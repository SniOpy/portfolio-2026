import { useRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { useMagnetic } from "../hooks/useMagnetic";
import { cn } from "../lib/cn";

type Variant = "primary" | "ghost";

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  magnetic?: boolean;
  icon?: ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-primary to-secondary text-white shadow-glow hover:brightness-110",
  ghost: "border border-line bg-card text-white hover:border-secondary/60 hover:bg-card-strong",
};

/** Link styled as a button. External links get safe `rel` automatically. */
export function ButtonLink({
  variant = "primary",
  magnetic = false,
  icon,
  className,
  children,
  target,
  rel,
  ...props
}: ButtonLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  useMagnetic(ref, { enabled: magnetic });

  return (
    <a
      ref={ref}
      target={target}
      rel={target === "_blank" ? (rel ?? "noopener noreferrer") : rel}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-[translate,filter,background-color,border-color] duration-300 ease-out-expo",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
      {icon}
    </a>
  );
}
