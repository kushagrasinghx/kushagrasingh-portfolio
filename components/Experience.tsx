import { education, experience } from "@/lib/content";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <div className="space-y-6 sm:space-y-7">
      {experience.map((item, i) => (
        <Reveal key={`${item.company}-${item.period}`} delay={i * 40}>
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
            <span className="mono shrink-0 sm:w-28 sm:pt-1">{item.period}</span>
            <div className="min-w-0">
              <h3 className="text-[0.9375rem] font-medium leading-relaxed">
                {item.title}{" "}
                <span className="text-muted">at</span>{" "}
                {item.companyUrl ? (
                  <a
                    href={item.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="link"
                  >
                    {item.company}
                  </a>
                ) : (
                  item.company
                )}
              </h3>
              <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          </div>
        </Reveal>
      ))}

      <Reveal>
        <div className="border-t border-line pt-6 sm:pt-7">
          <h3 className="eyebrow mb-4 sm:mb-5">Education</h3>
          <div className="space-y-4">
            {education.map((item) => (
              <div
                key={item.school}
                className="flex flex-col gap-1 sm:flex-row sm:gap-6"
              >
                <span className="mono shrink-0 sm:w-28 sm:pt-0.5">
                  {item.period}
                </span>
                <div className="min-w-0">
                  <h4 className="text-[0.9375rem] font-medium">{item.school}</h4>
                  <p className="text-[0.9375rem] text-muted">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
