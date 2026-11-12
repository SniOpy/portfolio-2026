import { useEffect, useState, type RefObject } from "react";

interface Options {
  /** Stop observing after the first intersection (default: true). */
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
}

/** Tracks whether an element is in the viewport with a single IntersectionObserver. */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { once = true, rootMargin = "0px 0px -10% 0px", threshold = 0.15 }: Options = {},
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.disconnect();
      },
      { rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, once, rootMargin, threshold]);

  return inView;
}
