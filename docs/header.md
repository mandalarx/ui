# Header

A flat Azure Blueprint website header for React 19 and Tailwind 4: a full-width band with a rule below, navigation set in the heading face. Desktop dropdowns become a mobile sheet below 1024px. It needs no Next.js, router, theme provider, or Motion provider.

## Start with a complete plain app

From this repository, export the example into a **new directory**:

```sh
node scripts/prepare-header-example.mjs /absolute/path/to/my-header-app
cd /absolute/path/to/my-header-app
npm install
npm run dev
```

Node 22.13 or newer is required. The exporter copies the actual library source and the minimal Vite configuration; it does not create a dependency on this repository. `npm run build` checks types and builds the standalone app.

## Copy into an existing app

Copy these files, preserving their relative paths (or adjust imports):

- `components/header.tsx`
- `components/ui/button.tsx`, `navigation-menu.tsx`, `sheet.tsx`, and `accordion.tsx`
- `lib/utils.ts`
- `app/globals.css`
- `vendor/shadcn-tailwind-4.13.0.css`

Install `radix-ui`, `lucide-react`, `class-variance-authority`, `clsx`, `tailwind-merge`, `tw-animate-css`, `@fontsource-variable/geist`, and `@fontsource-variable/inter`. Configure Tailwind 4 with `@tailwindcss/postcss`; the example includes the exact tested dependencies and configuration. Map `@/*` to the directory containing `components`, `lib`, and `app` in both TypeScript and your bundler.

Import `app/globals.css` once from your application entry and import the two font packages as shown in `examples/header-vite/main.tsx`. The stylesheet includes global Azure Blueprint tokens, resets, and primitive styling; merge deliberately if your app already defines a theme. Do not import Tailwind twice. Ensure Tailwind scans the copied component sources. Add `.dark` to `<html>` to select the dark palette; light is the default. OS reduced motion is automatic; `data-motion="reduced"` on `<html>` forces it, including portaled menus.

## Usage

```tsx
import { Header, type HeaderNavItem } from "@/components/header"

const items: HeaderNavItem[] = [
  { id: "product", label: "Product", children: [
    { id: "guide", label: "Guide", href: "/guide", description: "Start here." },
    { id: "features", label: "Features", href: "/features" },
  ] },
  { id: "about", label: "About", href: "/about" },
]

<Header
  brand="Your brand"
  brandHref="/"
  brandLabel="Your brand home"
  items={items}
  activeHref="/guide"
  actions={[{ id: "start", label: "Get started", href: "/signup" }]}
/>
```

Supply real destinations in your app. This component never guesses routes or authentication state. Use unique item IDs; groups contain direct links, not nested groups. Keep branding non-interactive because it is wrapped in a link. Icons are decorative; labels carry the accessible name.

`HeaderProps` also accepts `sticky` (default `true`), `className`, `navigationLabel`, `menuButtonLabel`, and `menuTitle`. Actions use `variant: "primary" | "secondary"` (primary by default). Links support `target` and `rel`. `activeHref` uses exact string matching, sets `aria-current="page"`, and highlights the containing group. Supply an empty array for `items` or omit `actions` for a minimal header. Sticky behavior requires a scrolling ancestor and can be affected by ancestor overflow; keep the header near the app root.

## Router integration

Native anchors work immediately. To use a client router, pass `linkComponent`, which accepts `React.ComponentPropsWithRef<"a">`. Spread **all** attributes, handlers, children, and `ref` onto the underlying anchor. Radix depends on these for keyboard interaction and focus restoration. Translate `href` to your router's destination prop inside this adapter. Preserve modified clicks, `target`, and prevented events. Pass your router's current location as `activeHref`.

No default links, brand assets, or account actions are bundled. The Storybook examples are demonstrations only. Header source and stories are handwritten and unaffected by upstream story generation.

## Validate in this repository

Run `pnpm build:storybook` followed by `pnpm test:header` for responsive, sticky, flat-band, dismissal, resize, theme, and reduced-motion checks. Screenshots are saved under `artifacts/visual/header-*`. The Header stories also participate in `pnpm test:storybook --run`.
