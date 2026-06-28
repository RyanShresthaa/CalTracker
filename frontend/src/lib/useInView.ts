import { useEffect, useRef, useState } from 'react';

/** Fires once when the element enters (or nears) the viewport — used to defer heavy queries. */
export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { rootMargin: '300px', threshold: 0, ...options },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, options?.rootMargin, options?.threshold]);

  return [ref, inView] as const;
}
