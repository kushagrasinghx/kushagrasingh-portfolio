"use client";

import { useCallback, useEffect, useState } from "react";
import { site } from "@/lib/content";

/** "Press C to copy my email" — also clickable for anyone without a keyboard. */
export default function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(site.email);
    } catch {
      return; // clipboard blocked (insecure context or denied permission)
    }
    setCopied(true);
  }, []);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(id);
  }, [copied]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "c") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      // Don't hijack the key while the visitor is typing in the contact form.
      const el = document.activeElement;
      if (
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement ||
        (el instanceof HTMLElement && el.isContentEditable)
      ) {
        return;
      }

      void copy();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [copy]);

  return (
    <button
      type="button"
      onClick={copy}
      className="group -my-2 inline-flex min-h-11 cursor-pointer items-center gap-1.5 py-2 text-left text-[0.9375rem] text-muted transition-colors hover:text-fg active:text-fg"
      aria-label={`Copy email address ${site.email}`}
    >
      {copied ? (
        <span className="text-fg">Copied {site.email}</span>
      ) : (
        <>
          {/* Phones have no keyboard to press — they get a tap affordance instead */}
          <span className="sm:hidden">Tap to copy my email</span>
          <span className="hidden sm:inline">Press</span>
          <kbd className="hidden rounded-[5px] border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[0.6875rem] leading-none text-fg sm:inline">
            C
          </kbd>
          <span className="hidden sm:inline">to copy my email</span>
        </>
      )}
    </button>
  );
}
