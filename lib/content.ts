/**
 * All editable site content lives here — everything below comes from
 * the LinkedIn profile export and the public GitHub account.
 */

export const site = {
  githubUser: "kushagrasinghx",
  featuredRepo: "BitChord",

  name: "Kushagra Singh",
  role: "Product Designer",
  tagline: "Creating memorable experiences for startups & brands",
  location: "Varanasi, India",
  locationLabel: "VARANASI, INDIA",
  timeZone: "Asia/Kolkata",

  email: "hello@kushagrasingh.in",

  intro: "Hey there! I'm Kushagra, a product designer that codes",
} as const;

export type Experience = {
  period: string;
  title: string;
  company: string;
  companyUrl?: string;
  description: string;
};

export const experience: Experience[] = [
  {
    period: "2026 — NOW",
    title: "Frontend Developer",
    company: "HiringForms",
    companyUrl: "https://hiringforms.io",
    description:
      "Building a seamless hiring experience — form flows, candidate dashboards, and the interfaces recruiters live in all day.",
  },
  {
    period: "2025 — NOW",
    title: "Frontend Developer",
    company: "SocialSense",
    description:
      "Bridging design and implementation, leaning on a UI/UX background to ship high-performance, user-centric web applications.",
  },
  {
    period: "2024 — NOW",
    title: "Co-Founder",
    company: "SOMEONE Advertising Agency",
    companyUrl: "https://someone.co.in",
    description:
      "Co-founded a creative agency building brand identities, campaigns, and sites for startups across India.",
  },
  {
    period: "2025",
    title: "Frontend Web Developer",
    company: "NextFront",
    description:
      "Summer engagement in Bengaluru building production frontend features with modern React tooling.",
  },
  {
    period: "2025",
    title: "Designing Head",
    company: "TEDxJUET",
    companyUrl: "https://github.com/kushagrasinghx/tedxjuet25",
    description:
      "Led the design team for TEDxJUET, directing event identity, collateral, and the public event website.",
  },
  {
    period: "2024 — 2025",
    title: "Secretary, Multimedia UI/UX Club",
    company: "Jaypee University of Engineering and Technology",
    description:
      "Ran the campus UI/UX club and served as joint secretary for videography in the Media Wing.",
  },
  {
    period: "2023 — 2024",
    title: "Product Designer",
    company: "SocialSense",
    description:
      "Owned product design across web surfaces before moving into frontend engineering on the same team.",
  },
  {
    period: "2024",
    title: "Webflow Developer",
    company: "Quickads",
    description:
      "Built and shipped marketing pages in Webflow for a Singapore-based ad automation product.",
  },
];

export type Education = {
  period: string;
  school: string;
  detail: string;
};

export const education: Education[] = [
  {
    period: "2022 — 2026",
    school: "Jaypee University of Engineering and Technology",
    detail: "B.Tech, Computer Science",
  },
  {
    period: "2012 — 2022",
    school: "Delhi Public School, Varanasi",
    detail: "School",
  },
];

/** Top skills first — these lead the LinkedIn profile. */
export const stack = [
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind",
  "Redux",
  "Vite",
  "Kotlin",
  "Jetpack Compose",
  "Python",
  "Figma",
  "Webflow",
  "Astro",
];

export type SocialLink = {
  label: string;
  value: string;
  href: string;
  icon: "mail" | "github" | "instagram" | "linkedin";
};

export const socials: SocialLink[] = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: "mail",
  },
  {
    label: "GitHub",
    value: "@kushagrasinghx",
    href: "https://github.com/kushagrasinghx",
    icon: "github",
  },
  // Temporarily hidden — LinkedIn & Instagram
  // {
  //   label: "LinkedIn",
  //   value: "/in/kushagra-singh-varanasi",
  //   href: "https://www.linkedin.com/in/kushagra-singh-varanasi/",
  //   icon: "linkedin",
  // },
  // {
  //   label: "Instagram",
  //   value: "@kuxhagrasingh",
  //   href: "https://instagram.com/kuxhagrasingh",
  //   icon: "instagram",
  // },
];

/** Repos surfaced under WORK, in order. Stats are pulled live from GitHub. */
export const workRepos = [
  "samsung-band-selection",
  "reader-mode-extension",
  "windows-quick-preview",
  "otto",
  "clove-browser",
  "tedxjuet25",
];
