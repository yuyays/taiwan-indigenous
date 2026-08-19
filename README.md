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

## Content status

All current cultural copy, locations, and media slots are provisional.
Public release requires citations, image permissions, and community review.
