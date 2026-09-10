# Mandalar UI

A Storybook-first design-system workbench built from the complete shadcn/ui catalog. The visual language uses graphite surfaces, violet actions, Manrope for interface copy, IBM Plex Mono for code and data, balanced control density, and expressive reduced-motion-safe transitions.

## Run the workbench

```bash
pnpm install
pnpm storybook
```

Storybook runs at `http://localhost:6006`. The small Next.js reference surface is available with `pnpm dev` at `http://localhost:5173`.

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

Generated shadcn source is intentionally owned here. Do not overwrite customized files automatically when updating the registry.

## Validation

```bash
pnpm typecheck
pnpm lint
pnpm build:storybook
pnpm build
```

The Storybook toolbar switches between the coordinated light and dark themes. Accessibility checks run through the Storybook a11y addon.
