import { site } from "@/lib/content";
import Clock from "./Clock";
import type { Profile } from "@/lib/github";

export default function Footer({ profile }: { profile: Profile | null }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-line pt-6 pb-[calc(2.5rem+env(safe-area-inset-bottom))] sm:mt-20">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <p className="mono">
          © {year} {site.name}
        </p>
        <p className="mono">
          {profile?.followers ? `${profile.followers} GitHub followers` : ""}
        </p>
      </div>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
        <Clock />
      </div>
    </footer>
  );
}
