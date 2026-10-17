"use client";

import { useState } from "react";
import { site, socials } from "@/lib/content";
import { ArrowIcon, socialIcons } from "./Icons";

const field =
  "w-full min-h-11 rounded-lg border border-line bg-surface px-3 py-2.5 text-base sm:text-[0.9375rem] text-fg placeholder:text-dim outline-none transition-colors focus:border-white/25";

/**
 * No backend here — the form composes a mail draft in the visitor's own client.
 * Swap handleSubmit for a POST to Formspree/Resend if you'd rather collect these server-side.
 */
export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name || "someone"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div>
      <form onSubmit={submit} className="space-y-2.5">
        <div className="grid gap-2.5 sm:grid-cols-2">
          <input
            className={field}
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            aria-label="Your name"
            name="name"
            autoComplete="name"
            autoCapitalize="words"
            enterKeyHint="next"
          />
          <input
            className={field}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Your email"
            name="email"
            autoComplete="email"
            inputMode="email"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="next"
          />
        </div>
        <textarea
          className={`${field} min-h-32 resize-y`}
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          aria-label="Your message"
          name="message"
          rows={5}
          enterKeyHint="send"
        />
        <div className="flex flex-col items-start gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-fg px-3.5 py-3 text-[0.9375rem] font-medium text-bg transition-opacity hover:opacity-85 active:opacity-75 sm:w-auto sm:py-2 sm:text-[0.875rem]"
          >
            Send message
          </button>
          <span className="mono">opens in your mail app</span>
        </div>
      </form>

      <ul className="mt-8 divide-y divide-[color:var(--color-line)] border-t border-line">
        {socials.map((s) => {
          const Icon = socialIcons[s.icon];
          return (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.icon === "mail" ? undefined : "_blank"}
                rel="noreferrer"
                className="group flex min-h-[3.25rem] items-center gap-3 py-2.5 text-[0.9375rem] transition-colors hover:text-fg sm:py-3"
              >
                <Icon className="size-4 shrink-0 text-muted transition-colors group-hover:text-fg" />
                {/* Label over value on phones — side by side once there's room */}
                <span className="flex min-w-0 flex-1 flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                  <span className="truncate">{s.label}</span>
                  <span className="truncate text-[0.8125rem] text-muted transition-colors group-hover:text-fg sm:text-[0.9375rem]">
                    {s.value}
                  </span>
                </span>
                <ArrowIcon className="size-3.5 shrink-0 text-dim transition-colors group-hover:text-fg" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
