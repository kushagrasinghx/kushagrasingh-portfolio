import { stack } from "@/lib/content";
import Reveal from "./Reveal";

export default function Stack() {
  return (
    <Reveal>
      <ul className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <li
            key={tech}
            className="rounded-lg border border-line bg-surface px-3 py-2 text-[0.8125rem] text-muted transition-colors hover:border-white/20 hover:text-fg sm:py-1.5"
          >
            {tech}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
