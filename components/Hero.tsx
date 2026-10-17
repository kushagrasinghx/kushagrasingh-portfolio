import Image from "next/image";
import { site } from "@/lib/content";
import type { Profile } from "@/lib/github";
import CopyEmail from "./CopyEmail";
import Reveal from "./Reveal";
import { VerifiedIcon } from "./Icons";

export default function Hero({ profile }: { profile: Profile | null }) {
  const avatar =
    profile?.avatar_url ??
    `https://avatars.githubusercontent.com/${site.githubUser}`;

  return (
    <header className="pt-9 sm:pt-10">
      <Reveal>
        <div className="relative w-fit">
          <Image
            src={avatar}
            alt={site.name}
            width={96}
            height={96}
            sizes="56px"
            priority
            className="size-14 rounded-xl border border-line object-cover sm:size-12"
          />
          {/* Available-for-work dot */}
          <span
            className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-[2.5px] border-bg bg-emerald-400"
            title="Available for work"
          />
        </div>

        <h1 className="mt-4 flex items-center gap-1.5 text-[1.125rem] font-medium tracking-tight sm:text-[1.0625rem]">
          {site.name}
          <VerifiedIcon className="size-[1.05rem] shrink-0" />
        </h1>
        <p className="text-[0.9375rem] text-muted">{site.role}</p>
      </Reveal>

      <Reveal delay={80}>
        <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted sm:mt-6">
          {site.intro}
        </p>
      </Reveal>

      <Reveal delay={140}>
        <div className="mt-5">
          <CopyEmail />
        </div>
      </Reveal>
    </header>
  );
}
