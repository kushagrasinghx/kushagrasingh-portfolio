# kushagrasingh-portfolio

Personal site for Kushagra Singh — a single-page, dark, mono-labelled portfolio
built with Next.js (App Router) and Tailwind CSS v4.

Live GitHub data drives the WORK section: BitChord's stars, forks, and total
release downloads are fetched from the GitHub REST API and cached for an hour.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build && npm start
```

## Where to edit things

Almost all copy lives in one file — **`lib/content.ts`**:

| What | Key |
| --- | --- |
| Name, role, location, email, intro paragraph | `site` |
| Experience timeline | `experience` |
| Education | `education` |
| Tech pills | `stack` |
| Contact / social links | `socials` |
| Which repos appear under WORK | `workRepos` |
| Which repo gets the featured card | `site.featuredRepo` |

Design tokens (colours, fonts, the 608px reading column) live in the `@theme`
block at the top of `app/globals.css`.

## GitHub API rate limits

Unauthenticated requests are capped at 60/hour per IP. The page revalidates
hourly so this is fine in production, but if you hit the limit locally, add a
token with no scopes:

```bash
echo "GITHUB_TOKEN=ghp_yourtoken" > .env.local
```

`lib/github.ts` picks it up automatically and every request degrades gracefully
to `null` rather than crashing the page if the API is unreachable.

## Contact form

There's no backend — the form composes a message in the visitor's own mail
client via `mailto:`. To collect submissions server-side instead, replace
`submit` in `components/Contact.tsx` with a POST to Formspree, Resend, or a
route handler.

## Notes

- `components/Reveal.tsx` measures on mount as well as observing, so content is
  never stuck at `opacity: 0` in a background tab where `IntersectionObserver`
  callbacks don't fire.
- `npm audit` reports two advisories in `postcss`, pulled in transitively by
  Next 15. They're build-time only and can't be resolved without moving to
  Next 16.
- Design direction is inspired by the layout conventions of Framer's "Core"
  template; all markup, styles, and content here are original.
