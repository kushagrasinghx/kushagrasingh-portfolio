"use client";

import { workRepos } from "@/lib/content";
import { formatCount, type Repo } from "@/lib/github";
import { useLiveGitHub } from "./LiveGitHub";
import FeaturedProject from "./FeaturedProject";
import Reveal from "./Reveal";
import { ArrowIcon, ForkIcon, StarIcon } from "./Icons";

export default function Work() {
  const { featured, repos } = useLiveGitHub();

  // Keep the hand-picked order from content.ts, dropping anything that 404s.
  const byName = new Map(repos.map((r) => [r.name, r]));
  const others = workRepos
    .map((name) => byName.get(name))
    .filter((r): r is Repo => Boolean(r));

  return (
    <div className="space-y-3">
      <FeaturedProject repo={featured} />

      <div className="divide-y divide-[color:var(--color-line)] overflow-hidden rounded-xl border border-line">
        {others.map((repo, i) => (
          <Reveal key={repo.name} delay={i * 40}>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="group flex min-h-[3.25rem] items-center gap-3 bg-surface px-4 py-3.5 transition-colors hover:bg-surface-2 active:bg-surface-2 sm:gap-4"
            >
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-[0.9375rem] font-medium">
                  {repo.name}
                </h3>
                {repo.description ? (
                  <p className="mt-0.5 line-clamp-2 text-[0.8125rem] text-muted sm:line-clamp-1">
                    {repo.description}
                  </p>
                ) : null}

                {/* Stats sit under the title on phones, where there's no room beside it */}
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 sm:hidden">
                  {repo.stargazers_count > 0 ? (
                    <span className="mono flex items-center gap-1 tabular-nums">
                      <StarIcon className="size-3" />
                      {formatCount(repo.stargazers_count)}
                    </span>
                  ) : null}
                  {repo.forks_count > 0 ? (
                    <span className="mono flex items-center gap-1 tabular-nums">
                      <ForkIcon className="size-3" />
                      {formatCount(repo.forks_count)}
                    </span>
                  ) : null}
                  {repo.language ? (
                    <span className="mono">{repo.language}</span>
                  ) : null}
                </div>
              </div>

              <div className="hidden items-center gap-3 sm:flex">
                {repo.stargazers_count > 0 ? (
                  <span className="mono flex items-center gap-1 tabular-nums">
                    <StarIcon className="size-3" />
                    {formatCount(repo.stargazers_count)}
                  </span>
                ) : null}
                {repo.forks_count > 0 ? (
                  <span className="mono flex items-center gap-1 tabular-nums">
                    <ForkIcon className="size-3" />
                    {formatCount(repo.forks_count)}
                  </span>
                ) : null}
                {repo.language ? (
                  <span className="mono w-24 text-right">{repo.language}</span>
                ) : null}
              </div>

              <ArrowIcon className="size-3.5 shrink-0 text-dim transition-colors group-hover:text-fg" />
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
