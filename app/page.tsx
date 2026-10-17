import { getGitHubData } from "@/lib/github";
import LiveGitHub from "@/components/LiveGitHub";
import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Work from "@/components/Work";
// import Experience from "@/components/Experience"; // temporarily hidden
import Stack from "@/components/Stack";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default async function Page() {
  // Baked in at build time, then refreshed in the browser by <LiveGitHub>.
  const data = await getGitHubData();

  return (
    <LiveGitHub initial={data}>
      <main className="relative mx-auto w-full max-w-content ps-[max(1.25rem,env(safe-area-inset-left))] pe-[max(1.25rem,env(safe-area-inset-right))]">
        {/* Subtle dot grid fading out below the fold — svh so mobile browser chrome doesn't resize it */}
        <div
          aria-hidden
          className="dotgrid pointer-events-none fixed inset-x-0 top-0 -z-10 h-[80svh] opacity-70 [mask-image:linear-gradient(to_bottom,transparent_8%,black_45%,transparent_95%)]"
        />

        <TopBar />
        <Hero profile={data.profile} />

        <Section
          label="Work"
          id="work"
          intro="Select projects — open source, shipped, and used by real people."
        >
          <Work />
        </Section>

        {/* Temporarily hidden — Experience & Education
        <Section
          label="Experience"
          id="experience"
          intro="Frontend engineering and product design across startups, agencies, and campus teams."
        >
          <Experience />
        </Section>
        */}

        <Section label="Stack" id="stack">
          <Stack />
        </Section>

        <Section
          label="Contact"
          id="contact"
          intro="You can reach me using the form or via the links below."
        >
          <Contact />
        </Section>

        <Footer />
      </main>
    </LiveGitHub>
  );
}
