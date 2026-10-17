import type { Metadata, Viewport } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import { site } from "@/lib/content";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

/* DM Sans has no monospaced cut — DM Mono keeps the tabular bits in the same family. */
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kushagrasingh.in"),
  title: `${site.name} — ${site.role}`,
  description:
    "Web developer building polished interfaces, Android apps, and AI tooling. Creator of BitChord.",
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description:
      "Web developer building polished interfaces, Android apps, and AI tooling. Creator of BitChord.",
    url: "https://kushagrasingh.in",
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description:
      "Web developer building polished interfaces, Android apps, and AI tooling.",
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/pfp.png", type: "image/png", sizes: "180x180" },
    ],
    apple: [{ url: "/pfp.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Let the page paint into the notch/home-indicator area; safe-area insets handle spacing.
  viewportFit: "cover",
  themeColor: "#0d0d0d",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
