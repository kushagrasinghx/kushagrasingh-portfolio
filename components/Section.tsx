import Reveal from "./Reveal";

type Props = {
  label: string;
  id?: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
};

/** Mono eyebrow + optional intro line + body, the repeating rhythm of the page. */
export default function Section({
  label,
  id,
  intro,
  children,
  className = "",
}: Props) {
  return (
    <section id={id} className={`scroll-mt-6 pt-12 sm:pt-14 ${className}`}>
      <Reveal>
        <h2 className="eyebrow">{label}</h2>
        {intro ? (
          <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-muted sm:mt-4">
            {intro}
          </p>
        ) : null}
      </Reveal>
      <div className="mt-5 sm:mt-6">{children}</div>
    </section>
  );
}
