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
  primary: "btn-gradient text-on-primary",
  ghost: "border border-line bg-card text-ink hover:border-primary hover:text-primary",
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
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-[translate,box-shadow,background-color,border-color] duration-200 ease-out",
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
