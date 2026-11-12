import { useMemo, useRef } from "react";
import { useCountUp } from "../hooks/useCountUp";
import { useInView } from "../hooks/useInView";
import { useI18n } from "../i18n/context";

interface CountUpProps {
  value: number;
  className?: string;
}

/** Euro amount that counts up when it scrolls into view, formatted per locale. */
export function CountUp({ value, className }: CountUpProps) {
  const { locale } = useI18n();
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref);
  const current = useCountUp(value, visible);

  const format = useMemo(
    () =>
      new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-GB", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }),
    [locale],
  );

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{format.format(value)}</span>
      <span aria-hidden>{format.format(current)}</span>
    </span>
  );
}
