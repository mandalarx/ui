# MandalarX UI

A Storybook-first collection of shadcn/ui components and blocks, styled as **Azure Glass**. Icy and midnight surfaces, clear azure actions, selective glass, Manrope typography, IBM Plex Mono for data, and fluid motion. This is a reusable UI library, not a product application.

The design language, including its tokens, surfaces, motion rules, and expressive layer, is specified in [DESIGN.md](DESIGN.md).

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

## Customize Azure Glass

- `app/globals.css`: semantic colors, surface shadows, radii, and shared primitive slot styling. Controls use 12px, menus 16px, cards 20px, dialogs 24px. Tokens apply to every component and block.
- `components/motion-provider.tsx`: shared spring and Motion reduced-motion policy. Wrap consumers with `MotionProvider` and import the global stylesheet. CSS respects the OS preference independently.
- `hooks/use-active-indicator.ts`: spring animation on the existing tab list, preserving primitive selection, keyboard behavior, and refs. Other controls use state-driven CSS; ordinary rerenders do not replay entrances.
- `.storybook`: coordinated manager, docs, preview providers, theme toolbar, and reduced-motion override. System theme is the default; manual choices persist locally.
- `scripts/generate-component-stories.mjs`: 61 authored examples. Run `pnpm stories:generate` after editing these examples. Handwritten interaction contracts live separately.

The `atelier` CSS layer follows Tailwind utilities so upstream styles cannot override the system. Consumer overrides can use a later CSS layer or inline styles; semantic token overrides are preferred.

### Glass surfaces

Use `<Card data-surface="glass">` for featured cards. Ordinary cards, inputs, and tables remain solid. Menus, overlay panels, and navigation receive glass automatically. Glass uses a 16px static backdrop blur, a fine cyan rim, and layered blue shadows; it falls back to an opaque surface when backdrop filtering is unavailable. Override `--glass-tint`, `--glass-blur`, and `--glass-shadow` to tune it. Dense popups use 94% opacity; featured cards use 86% in light mode and 90% in dark mode.

The internal `atelier` layer, `atelierSpring` export, and `atelier-theme` preference key remain stable for existing consumers. `useMotionPreference()` resolves the provider and OS settings for custom gestures. Button sheen, ambient lighting, and custom motion stop under reduced motion.

### Motion

`app/globals.css` defines the motion tokens: touch, travel, and arrive durations, shorter exits, and enter, exit, settle, and pop curves. `--ease-settle` is `atelierSpring` sampled into a CSS `linear()` curve, so CSS and Motion share one feel. Primitives move only when someone acts or state changes: overlays scale from their trigger and leave faster than they arrive, the tabs indicator stretches toward its target, focus rings bloom, and checks draw themselves. See [DESIGN.md](DESIGN.md) for the choreography rules.

## Expressive effects

Opt-in components in `components/effects`, styled by `components/effects/effects.css`. Import that stylesheet after `app/globals.css`. None of them requires the Motion library.

- `Caustics`: drifting water light for the one signature surface of a view.
- `usePointerLight` with `data-light="follow"`: a glare and a rim light that follow a mouse or pen across glass. Keyboard focus sends one glint around the rim. The Header uses it.
- `Reveal`: one orchestrated entrance. Content stays in the DOM and readable throughout.
- `NumberRoll`: digits roll to each new value; the formatted value is the accessible text.
- `startThemeTransition`: a theme change spreads outward from its trigger using View Transitions.

Browse **Foundations / Effects** in Storybook. Each effect has a static state under reduced motion.

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

## Reusable Header

The custom [Header](docs/header.md) provides floating Azure Glass navigation with desktop dropdowns, mobile navigation, and configurable branding and actions. Browse **Components / Header** in Storybook. Copy its sources into a React + Tailwind 4 app, or run `node scripts/prepare-header-example.mjs /absolute/path/to/new-app` to export a standalone Vite example. No Next.js runtime is required.
