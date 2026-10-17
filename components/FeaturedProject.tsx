import { formatCount, formatDate, type RepoStats } from "@/lib/github";
import { ArrowIcon, DownloadIcon, ForkIcon, StarIcon } from "./Icons";
import Reveal from "./Reveal";

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1 px-3 py-3 sm:px-4 sm:py-3.5">
      <span className="flex items-center gap-1 text-dim sm:gap-1.5">{icon}</span>
      <span className="font-mono text-[1.125rem] leading-none tracking-tight text-fg tabular-nums sm:text-[1.375rem]">
        {value}
      </span>
      <span className="eyebrow text-[0.625rem] sm:text-[0.6875rem]">{label}</span>
    </div>
  );
}

/** The BitChord highlight card — live stars, forks, and total release downloads. */
export default function FeaturedProject({ repo }: { repo: RepoStats | null }) {
  if (!repo) {
    return (
      <div className="card p-4 text-[0.9375rem] text-muted sm:p-5">
        BitChord stats are unavailable right now —{" "}
        <a
          href="https://github.com/kushagrasinghx/BitChord"
          target="_blank"
          rel="noreferrer"
          className="link text-fg"
        >
          view it on GitHub
        </a>
        .
      </div>
    );
  }

  return (
    <Reveal>
      <a
        href={repo.html_url}
        target="_blank"
        rel="noreferrer"
        className="card group block overflow-hidden transition-colors hover:border-white/20"
      >
        <div className="relative p-4 sm:p-5">
          {/* Album-art style gradient bloom, nodding at the app's music theme */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 size-52 rounded-full bg-[radial-gradient(circle,rgba(255,90,120,0.18),transparent_65%)] blur-xl"
          />

          <div className="relative flex items-start justify-between gap-3 sm:gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <h3 className="text-[1.0625rem] font-medium tracking-tight">
                  {repo.name}
                </h3>
                <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-wide text-muted">
                  Featured
                </span>
              </div>
              <p className="mt-2 max-w-[34rem] text-[0.9375rem] leading-relaxed text-muted">
                {repo.description ??
                  "A modern YouTube music client with clean aesthetics."}
              </p>
            </div>
            <ArrowIcon className="size-4 shrink-0 text-dim transition-colors group-hover:text-fg" />
          </div>

          <div className="relative mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 sm:mt-4">
            {repo.language ? (
              <span className="mono flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[#a97bff]" />
                {repo.language}
              </span>
            ) : null}
            {repo.latestTag ? (
              <span className="mono">
                {repo.latestTag} · {formatDate(repo.latestReleaseAt)}
              </span>
            ) : null}
            <span className="mono">{repo.releaseCount} releases</span>
          </div>
        </div>

        {/* Baked in at build time, then refreshed from the GitHub API on load */}
        <div className="grid grid-cols-3 divide-x divide-[color:var(--color-line)] border-t border-line bg-surface-2/60">
          <Stat
            icon={
              <>
                <DownloadIcon />{" "}
                <span className="mono text-[0.6875rem] sm:text-[0.75rem]">
                  Downloads
                </span>
              </>
            }
            value={formatCount(repo.downloads)}
            label={`${repo.downloads.toLocaleString("en-US")} total`}
          />
          <Stat
            icon={
              <>
                <StarIcon />{" "}
                <span className="mono text-[0.6875rem] sm:text-[0.75rem]">
                  Stars
                </span>
              </>
            }
            value={formatCount(repo.stargazers_count)}
            label="on GitHub"
          />
          <Stat
            icon={
              <>
                <ForkIcon />{" "}
                <span className="mono text-[0.6875rem] sm:text-[0.75rem]">
                  Forks
                </span>
              </>
            }
            value={formatCount(repo.forks_count)}
            label="community"
          />
        </div>
      </a>
    </Reveal>
  );
}
