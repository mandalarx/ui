# Mandalar UI

A Storybook-first collection of shadcn/ui components and blocks, styled as **Violet Atelier**. Graphite and porcelain surfaces, luminous violet actions, Manrope typography, IBM Plex Mono for data, and fluid motion. This is a reusable UI library, not a product application.

## Run the workbench

```bash
pnpm install
pnpm storybook
```

Storybook runs at `http://localhost:6006`. Start with Foundations / Overview, inspect the motion replay example, then browse individually named components and full-page blocks. The Next.js entry route simply points to the workbench.

## Registry coverage

- `components/ui` owns the source for all 61 official `new-york-v4` components.
- `blocks` contains isolated, runnable source for all 97 official blocks and generated full-page Storybook stories.
- `registry/blocks` stores the complete upstream registry payload for each block.
- `registry/shadcn-snapshot.json` records the source, retrieval time, names, and counts.

Check the snapshot against the current official registry:

```bash
pnpm registry:check
```

Refresh the archived block payloads after reviewing upstream changes:

```bash
pnpm registry:sync
pnpm blocks:materialize
```

Materialization only creates missing block files and regenerates the story index. It never overwrites existing block sources, including local design and accessibility adaptations. Review upstream JSON diffs and port updates deliberately. Component sources are also locally owned; `registry:check` verifies that every listed component file exists.

## Customize Violet Atelier

- `app/globals.css`: semantic colors, surface shadows, radii, and shared primitive slot styling. Controls use 10px, cards 16px, dialogs 20px. Tokens apply to every component and block.
- `components/motion-provider.tsx`: shared spring and Motion reduced-motion policy. Wrap consumers with `MotionProvider` and import the global stylesheet. CSS respects the OS preference independently.
- `hooks/use-active-indicator.ts`: spring animation on the existing tab list, preserving primitive selection, keyboard behavior, and refs. Other controls use state-driven CSS; ordinary rerenders do not replay entrances.
- `.storybook`: coordinated manager, docs, preview providers, theme toolbar, and reduced-motion override. System theme is the default; manual choices persist locally.
- `scripts/generate-component-stories.mjs`: 61 authored examples. Run `pnpm stories:generate` after editing these examples. Handwritten interaction contracts live separately.

The `atelier` CSS layer follows Tailwind utilities so upstream styles cannot override the system. Consumer overrides can use a later CSS layer or inline styles; semantic token overrides are preferred.

## Validation

```bash
pnpm typecheck
pnpm lint
pnpm exec playwright install chromium
pnpm test:storybook --run
VITE_ATELIER_THEME=dark pnpm test:storybook --run
pnpm build:storybook
pnpm test:visual
pnpm build
```

The browser suite runs accessibility checks for every story plus keyboard, focus, rapid interruption, refs, theme, and reduced-motion contracts. Visual verification serves the built Storybook temporarily, checks mobile/tablet/desktop in both themes, and saves review images in the ignored `artifacts/visual` directory. These screenshots are review artifacts, not a pixel-diff baseline.
