# Indigenous Taiwan: A Living Atlas

A mobile-first, bilingual learning prototype that helps international visitors
connect the names of Taiwan's Indigenous peoples with their general homelands.

The current private prototype includes guided chapters for Amis, Tao, and
Siraya in English and Japanese. Locations are presented as illustrative memory
aids rather than fixed cultural boundaries.

## Technology

- Astro and TypeScript
- One React island for the guided journey and quiz
- Astro Content Collections for bilingual profile content
- An accessible SVG overview map
- pnpm for dependency management

## Local development

```bash
pnpm install
pnpm dev
```

Then open `http://localhost:4321/en/` or `http://localhost:4321/ja/`.

## Validation

```bash
pnpm quality
pnpm build
```

`pnpm quality` runs type-aware Oxlint using its TypeScript 7 native backend,
checks Oxfmt output, and performs Astro's type and content checks with
TypeScript 6. Use `pnpm lint:fix` for safe lint fixes and `pnpm format` to write
formatting changes.

Pull requests and pushes to `main` run the same lint, formatting, type/content,
and production build checks in GitHub Actions. The workflow uses Node.js 24 and
the pnpm version declared in `package.json` with a frozen lockfile.

## Deployment

The site is configured for a Cloudflare Pages project named
`taiwan-indigenous`, served initially from
`https://taiwan-indigenous.pages.dev`. Connect this repository to Pages with:

- Production branch: `main`
- Build command: `pnpm build`
- Build output directory: `dist`
- Root directory: `/`

Cloudflare reads Node.js 24 from `.node-version`, while pnpm reads its pinned
version from `package.json`. Update the `site` value in `astro.config.mjs` when
attaching a custom domain.

## Content status

All current cultural copy, locations, and media slots are provisional.
Public release requires citations, image permissions, and community review.
