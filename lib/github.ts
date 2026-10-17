import { site } from "./content";

const API = "https://api.github.com";

const isServer = typeof window === "undefined";

function headers(): HeadersInit {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  // Optional, build-time only: raises the rate limit from 60 to 5000/hour.
  // Never sent from the browser — the token would be public in the bundle.
  if (isServer && process.env.GITHUB_TOKEN) {
    h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return h;
}

/**
 * Runs twice: once at build time to bake numbers into the static export, then
 * again in the browser so a deployed page shows today's figures. GitHub's
 * 60-requests/hour anonymous limit is per visitor IP, and the four calls below
 * come back with `max-age=60`, so reloads mostly hit the browser cache.
 */
async function gh<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`, { headers: headers() });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export type Profile = {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  followers: number;
  public_repos: number;
  html_url: string;
};

export type Repo = {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  topics?: string[];
  pushed_at: string;
};

type Release = {
  tag_name: string;
  name: string | null;
  published_at: string;
  html_url: string;
  assets: { download_count: number }[];
};

export type RepoStats = Repo & {
  downloads: number;
  releaseCount: number;
  latestTag: string | null;
  latestReleaseAt: string | null;
  latestReleaseUrl: string | null;
};

export async function getProfile(): Promise<Profile | null> {
  return gh<Profile>(`/users/${site.githubUser}`);
}

export async function getRepos(): Promise<Repo[]> {
  const repos = await gh<Repo[]>(
    `/users/${site.githubUser}/repos?per_page=100&sort=pushed`,
  );
  return repos ?? [];
}

/** Total asset downloads across every published release of a repo. */
export async function getRepoStats(name: string): Promise<RepoStats | null> {
  const [repo, releases] = await Promise.all([
    gh<Repo>(`/repos/${site.githubUser}/${name}`),
    gh<Release[]>(`/repos/${site.githubUser}/${name}/releases?per_page=100`),
  ]);
  if (!repo) return null;

  const list = releases ?? [];
  const downloads = list.reduce(
    (sum, r) => sum + r.assets.reduce((s, a) => s + a.download_count, 0),
    0,
  );
  const latest = list[0] ?? null;

  return {
    ...repo,
    downloads,
    releaseCount: list.length,
    latestTag: latest?.tag_name ?? null,
    latestReleaseAt: latest?.published_at ?? null,
    latestReleaseUrl: latest?.html_url ?? null,
  };
}

export type GitHubData = {
  profile: Profile | null;
  repos: Repo[];
  featured: RepoStats | null;
};

/** Everything the page needs, in one round of parallel calls. */
export async function getGitHubData(): Promise<GitHubData> {
  const [profile, repos, featured] = await Promise.all([
    getProfile(),
    getRepos(),
    getRepoStats(site.featuredRepo),
  ]);
  return { profile, repos, featured };
}

/**
 * Merge a client-side refresh over the baked-in data, field by field. A rate
 * limit or offline visitor yields nulls, which must never wipe out numbers the
 * build already got right.
 */
export function mergeGitHubData(
  prev: GitHubData,
  fresh: GitHubData,
): GitHubData {
  return {
    profile: fresh.profile ?? prev.profile,
    repos: fresh.repos.length > 0 ? fresh.repos : prev.repos,
    featured: fresh.featured ?? prev.featured,
  };
}

export function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

export function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
