"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Stagger in milliseconds, applied once the element enters the viewport. */
  delay?: number;
};

function inViewport(el: Element) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < vh && rect.bottom > 0;
}

/**
 * Fades and lifts content into place the first time it scrolls into view.
 *
 * IntersectionObserver callbacks never fire while the document is hidden
 * (background tab, prerender), which would otherwise leave the page blank at
 * opacity 0. So we also measure directly on mount and on visibilitychange —
 * anything already on screen reveals without waiting for the observer.
 */
export default function Reveal({ children, className = "", delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setVisible(true);
      observer.disconnect();
      document.removeEventListener("visibilitychange", check);
    };

    const check = () => {
      if (inViewport(el)) reveal();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) reveal();
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    check();
    document.addEventListener("visibilitychange", check);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", check);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
