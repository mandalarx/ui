---
name: "MandalarX UI"
system: "Azure Blueprint"
version: "3.0.0"
theme: "light + dark (system default)"
description: "Flat, ruled surfaces drawn in azure: hairline structure, clear azure actions, and one field of light per view. A shadcn/ui library for focused product work."
tags: [azure, blueprint, flat, motion, shadcn, component-library]
colors:
  light:
    background: "#f3f8ff"   # Ice
    foreground: "#10243b"
    card: "#ffffff"
    primary: "#0069e8"      # Azure
    accent: "#deefff"
    border: "#cfdeee"
    muted-foreground: "#506781"
  dark:
    background: "#07111f"   # Midnight
    foreground: "#e8f3ff"
    card: "#0d1d30"         # Deep water
    primary: "#58b4ff"      # Azure (dark)
    accent: "#123b60"
    border: "#28425e"
    muted-foreground: "#a0b6ce"
  light-sources:
    glacier: "#57def3"      # --light-cool: caustics, the signature ring, rim glints
    sunlit: "#fff3d6"       # --light-warm: inside light effects only, <=15% share
typography:
  font-heading: "Geist Variable"
  font-sans: "Inter Variable"
  font-mono: "Geist Mono Variable"
  display: { family: heading, size: "48-64px", weight: 500, tracking: "-0.05em", line-height: 1.1 }
  section: { family: heading, size: "36-48px", weight: 500, tracking: "-0.035em", line-height: 1.05 }
  heading-h1: { family: heading, size: "32px", weight: 600, tracking: "-0.03em", line-height: 1.2 }
  heading-h2: { family: heading, size: "24px", weight: 600, tracking: "-0.02em", line-height: 1.3 }
  heading-h3: { family: heading, size: "18px", weight: 600, tracking: "-0.01em", line-height: 1.4 }
  lead: { size: "18px", weight: 400, line-height: 1.55 }
  body: { size: "16px", weight: 400, line-height: 1.6 }
  ui: { size: "14px", weight: 500, line-height: 1.45 }
  caption: { size: "12px", weight: 500, line-height: 1.4 }
  micro-label: { family: mono, size: "12px", weight: 500, tracking: "0.06em", case: upper }
shapes:
  radius-structure: "0"
  radius-small: "4px"
  radius-item: "6px"
  radius-control: "8px"
  radius-layer: "8px"
  radius-dialog: "12px"
motion:
  touch: "120ms"
  travel: "200ms"
  arrive: "340ms"
  exit-fast: "90ms"
  exit: "160ms"
  exit-slow: "240ms"
  light: "2400ms"
  ambient: "18s"
  ease-standard: "cubic-bezier(.2, .8, .2, 1)"
  ease-enter: "cubic-bezier(.16, 1, .3, 1)"
  ease-exit: "cubic-bezier(.4, 0, 1, 1)"
  ease-settle: "linear() spring, stiffness 420 / damping 32 / mass .8"
  ease-spring: "cubic-bezier(.22, 1.18, .36, 1)"
---

# MandalarX UI: Azure Blueprint

## Concept: drawn on a blueprint

The interface is a technical drawing in azure. Grounds are flat. Fine rules show where things begin and end. One field of moving light marks the place a view wants you to look. Three rules keep it honest.

1. **Lines, not layers.** Structure comes from 1px rules and borders, not from shadows or translucency. Every surface is opaque. A shadow appears only where something really floats above the page: menus, popovers, dialogs.
2. **Motion answers people.** Primitives move when someone acts or when state changes, and the motion shows what changed. Ambient movement is limited to one signature surface per view.
3. **One field of light per view.** Expression is spent in one place: a caustic brand panel or the signature button. Everything around it stays quiet, flat, and ruled.

The composition borrows its structure from vite.dev: a ruled frame, tick marks where rules cross, flush cells, and a textured brand ring on the main action. The colors, motion, and light are our own.

The library is a working tool for dense product screens. Expressive effects live in an opt-in layer, so a form or a table never pays for spectacle it didn't ask for.

---

## Color

Semantic tokens live in `app/globals.css` and apply to every component and block. Prefer overriding tokens to overriding component styles.

### Grounds and surfaces

| Token | Light | Dark | Role |
| :-- | :-- | :-- | :-- |
| `--background` | `#f3f8ff` Ice | `#07111f` Midnight | Page ground, bands, cells |
| `--card` | `#ffffff` | `#0d1d30` Deep water | Cards that need to stand apart from the ground |
| `--popover` | `#ffffff` | `#102238` | Menus, popovers, overlays |
| `--muted` | `#eaf1fa` | `#15283e` | Code blocks, table headers, tracks, quiet fills |
| `--border` | `#cfdeee` | `#28425e` | Rules, hairlines, and outlines: the main structural tool |
| `--input` | `#b4c9e0` | `#3c5875` | Control borders |

There is no separate rule color. Rules, card borders, and cell dividers all use `--border`, so the drawing reads as one set of lines.

### Action and emphasis

| Token | Light | Dark | Role |
| :-- | :-- | :-- | :-- |
| `--primary` | `#0069e8` Azure | `#58b4ff` | The action color: primary buttons, focus ring, selection, active indicators, links |
| `--accent` / `--accent-foreground` | `#deefff` / `#0052b8` | `#123b60` / `#b8e2ff` | Hover and current-item fills |
| `--destructive`, `--success`, `--warning`, `--info` | OKLCH | OKLCH | Status only, never decoration |

### Light sources

Light sources are not UI colors. They never fill a control or carry text.

| Token | Value | Role |
| :-- | :-- | :-- |
| `--light-cool` | `#57def3` Glacier | Caustics, the cool end of the signature ring, rim glints, and the pointer glare. `--glass-highlight` remains as an alias |
| `--light-warm` | `#fff3d6` Sunlit | A whisper of warmth in sunlit caustics and the dark-mode pointer glare, as a 15% share or less |

Why a warm light in a cold palette: light passing through water carries the color of the sun. A small warm component in the brightest highlights makes the blues read as *lit* rather than flat. Keep it inside light effects; the moment it touches chrome, it becomes a second accent.

### Charts

`--chart-1` is Azure; `--chart-2` through `--chart-5` step around the hue wheel in OKLCH at matched lightness so series stay distinguishable in both themes. Chart color is data, never decoration.

---

## Typography

Three voices, each with one job.

- **Geist** (`--font-heading`, the `font-heading` utility) for headings, titles, and navigation: header links, navigation menus, sidebar items, and tab triggers. Setting navigation in the heading face ties the chrome to the content it leads to.
- **Inter** (`--font-sans`) for reading and operating: body copy, buttons, inputs, labels, and table cells.
- **Geist Mono** (`--font-mono`) for code, numbers, identifiers, and micro-labels. Use tabular numerals for anything that updates or aligns in columns.

### Scale

| Role | Size | Family and weight | Tracking | Line height |
| :-- | :-- | :-- | :-- | :-- |
| Display (`text-display`) | 48–64px | Geist 500 | -0.05em | 1.1 |
| Section (`text-section`) | 36–48px | Geist 500 | -0.035em | 1.05 |
| H1 | 32px | Geist 600 | -0.03em | 1.2 |
| H2 | 24px | Geist 600 | -0.02em | 1.3 |
| H3 | 18px | Geist 600 | -0.01em | 1.4 |
| Lead | 18px | Inter 400 | 0 | 1.55 |
| Body | 16px | Inter 400 | 0 | 1.6 |
| UI | 14px | Inter 500 | 0 | 1.45 |
| Caption | 12px | Inter 500 | 0 | 1.4 |
| Micro-label (`text-micro`) | 12px | Geist Mono 500, uppercase | 0.06em | 1.4 |

**Headlines are tight and medium.** Display and section headings use weight 500 with strong negative tracking, so large lines read as one shape. Document headings (H1–H3) step up to 600 at smaller sizes. In long documents, an H2 opens a new part: give it a 1px rule above and 24px of space before the text.

**Descriptions are quieter than headings, not smaller.** A hero or section description uses the lead size in `--muted-foreground`, under 60 characters per line.

### Voice in type

- Sentence case everywhere, including buttons, labels, and menu items.
- Uppercase only for micro-labels: 12px Geist Mono, tracked 0.06em, for footer column heads and meta lines such as a version or a file path. Never on headings, buttons, or menu items, and never as an eyebrow above a heading.
- Numbered markers (01, 02) only when the content is a real sequence.
- Keep line length under 80 characters for body text.

---

## Surfaces

### Flat and ruled

Every surface is opaque. Borders are 1px `--border`. Shadows mark only what floats.

| Surface | Treatment |
| :-- | :-- |
| Page ground | `--background`, divided into bands by rules |
| Cells | Flush, radius 0, separated by 1px rules (`azure-cells`) |
| Cards, alerts, empty states, outline items | `--card`, 1px border, 8px radius, no shadow |
| Code blocks, table headers | `--muted` fill, no border inside a cell |
| Menus, popovers, select, combobox, hover card, navigation content | `--popover`, 1px border, 8px radius, `--shadow-pop` |
| Dialogs, alert dialogs, sheets, drawers | `--popover`, 1px border, `--shadow-overlay`, over a scrim |
| Header | A full-width band on `--background` with a rule below |
| Sidebar | `--sidebar`, with a rule on its inner edge |

`data-surface="glass"` from the previous system is still accepted and renders as a flat card.

### Elevation

Two shadows, both only for floating layers. In light mode they are tinted blue; in dark mode they are near-black at a higher strength so they still read against Midnight.

| Token | Used by |
| :-- | :-- |
| `--shadow-pop` | Menus, popovers, select and combobox lists, hover cards, tooltips |
| `--shadow-overlay` | Dialogs, sheets, drawers: anything with a scrim |

Cards, cells, inputs, buttons, and the tabs indicator have no shadow.

### Radius

Radius is small and consistent. A corner tells you what kind of thing you are looking at: structure (square), a control or a card (8px), or a layer that holds focus (12px).

| Radius | Used by |
| :-- | :-- |
| 0 | Cells, bands, tables, the header band, the sidebar |
| 4px (`--radius-sm`) | Inline code, kbd, checkboxes, badges |
| 6px | Menu items, tab triggers, tooltips, extra-small buttons |
| 8px (`--radius`) | Buttons, inputs, selects, cards, alerts, code blocks, menus, popovers |
| 12px (`--radius-xl`) | Dialogs, alert dialogs, the top edge of drawers. Tailwind's `rounded-2xl` and `rounded-3xl` also resolve to 12px, so blocks never exceed it |

Tailwind's `shadow-2xs`, `shadow-xs`, and `shadow-sm` resolve to nothing: small shadows are the job of borders. Larger shadow utilities are left for floating layers.

### Brand texture

- **Signature ring.** The one main action on a view can use `variant="signature"`: a `--background` fill inside a 3px ring of Azure running into Glacier under a fine grain. The ring is static. On hover it brightens and swells slightly on the pop spring. Use it once per view; ordinary primary actions use the flat `default` variant.
- **Frost grain (`--frost-grain`).** A static noise texture at about 2% opacity. It lives only in the signature ring and in brand panels, where it keeps the gradients from banding.

---

## Composition

A page is a drawing: a frame, bands inside it, and cells inside the bands.

```
┼──────────────────────────┬──────────────────────────┼
│  Display headline        │                          │
│  Lead description        │   Brand panel            │
│  [Signature] [Outline]   │   (caustics)             │
┼──────────────────────────┴──────────────────────────┼
│                   Section heading                   │
│                 One muted description               │
┼──────────────────────────┬──────────────────────────┼
│  Cell: media to edges    │  Cell: media to edges    │
│  Title, one line of copy │  Title, one line of copy │
┼──────────────────────────┴──────────────────────────┼
```

- **Frame (`azure-frame`).** Centered, at most 1440px wide, with 1px rails on both sides. On narrow screens a 12px gutter keeps the rails and their ticks inside the viewport.
- **Band (`azure-band`).** A full-width section with a rule on top. Where the rule meets a rail, a 10px tick crosses it, so the page reads as measured.
- **Cells (`azure-cells`).** A flush grid separated by 1px rules at every breakpoint. Media fills its cell to the rules; text sits inside 24–40px of padding. Fill complete rows: an empty slot shows as a block of rule color.

The composition classes live in the components layer, so a utility on the same element (a cell background, a padding) still wins.
- **Section intro (`azure-section-intro`).** A centered section heading and one muted line, with generous space above and below.
- **Brand panel.** `Caustics` fills a cell or a whole band. It is the view's one field of light.

Left-align text inside cells and heroes. Center only section intros.

---

## Motion

### Tokens

| Token | Value | Use |
| :-- | :-- | :-- |
| `--motion-fast` | 120ms | Touch: press, hover color, focus |
| `--motion-base` | 200ms | Travel: toggles, state changes, panel swaps |
| `--motion-slow` | 340ms | Arrive: overlays and layered surfaces |
| `--motion-exit-fast` | 90ms | Leaving after a touch-scale entrance |
| `--motion-exit` | 160ms | Leaving after a travel-scale entrance |
| `--motion-exit-slow` | 240ms | Leaving after an arrive-scale entrance |
| `--motion-light` | 2400ms | One pass of a light sweep: progress glint, skeleton shimmer |
| `--motion-ambient` | 18s | One cycle of the caustic drift |

### Curves

| Token | Curve | Use |
| :-- | :-- | :-- |
| `--ease-standard` | `cubic-bezier(.2, .8, .2, 1)` | Color, opacity, and border changes |
| `--ease-enter` | `cubic-bezier(.16, 1, .3, 1)` | Things arriving: fast out of the gate, long gentle landing |
| `--ease-exit` | `cubic-bezier(.4, 0, 1, 1)` | Things leaving: accelerate away, no lingering |
| `--ease-settle` | `linear()` spring (420 / 32 / .8) | Surfaces and indicators. 0.3% overshoot, rests in about 330ms |
| `--ease-spring` | `cubic-bezier(.22, 1.18, .36, 1)` | Pop: small controls only, such as thumbs, checks, press release, and the signature ring |
| linear | `linear` | Light. Light never eases or bounces |

`--ease-settle` is the same spring as the `atelierSpring` export that drives JavaScript motion, sampled into a CSS `linear()` curve. CSS and JS motion share one feel. Browsers without `linear()` fall back to `--ease-enter`.

### Choreography rules

- **Exits are shorter than entrances,** about two thirds. People wait for things to arrive; nobody waits for things to leave.
- **Things come from where they were summoned.** Popovers and menus scale from the trigger (Radix transform origin). Sheets slide from their edge. Dialogs rise a few pixels from below center. Nothing flies in from off-screen without a reason.
- **Small distances.** Entrances travel 4–8px and scale from .96–.97. Motion should be felt more than watched.
- **Stagger is a cue, not a show.** 20ms per item, capped at 60ms total offset.
- **Interruptible by default.** State that can flip quickly (tabs, switches, accordions, hover) uses transitions or springs that retarget mid-flight, never keyframes that must finish.
- **No replay.** A rerender never restarts an entrance. Entrances run on mount or on state change only.
- **Animate transform, opacity, and CSS variables.** Never animate layout properties, except accordion height, which the primitive measures.

### What each primitive does

| Primitive | Motion |
| :-- | :-- |
| Button | Fill and border color change on hover; nothing lifts. Presses to .97 on the pop spring. An outline button fills with the foreground color on hover. The signature ring brightens and swells slightly |
| Focus ring | Blooms from 0 to 3px on the pop spring. Keyboard focus only |
| Menus, popovers, select, tooltip | Scale .96 to 1 from the trigger on `--ease-settle`; items stagger in. Exit: fade and scale to .98 on `--ease-exit` |
| Dialog | Rises 8px and scales .97 to 1 on `--ease-settle`. Exit: fast fade. Scrim fades opacity only |
| Sheet, drawer | Slide from their edge on `--ease-enter` |
| Tabs | The indicator, a flat bordered pill, stretches toward the new tab with its leading edge first, then settles. Panels fade and rise 5px once |
| Switch | Thumb stretches while pressed, then springs to its new side |
| Checkbox | The check draws itself in 220ms |
| Radio | The dot pops in on the pop spring |
| Accordion | Height opens on `--ease-enter`; content rises 5px and brightens from 20% opacity (never from invisible, so it is always findable); the chevron turns on the spring |
| Progress | While loading, a slow glint travels the bar. On completion, one soft glow |
| Skeleton | A slow shimmer sweeps across |

Primitives do not lift cards or buttons on hover, animate page content in on load, or loop.

---

## Expressive layer

Opt-in components in `components/effects/`, styled by `components/effects/effects.css`. Import the stylesheet only where you use them. None of them requires the Motion library.

| Effect | What it does | Use for | Not for |
| :-- | :-- | :-- | :-- |
| **Caustics** | Water-light patterns drift slowly across a panel, the way sunlight moves on a pool floor. In light mode, white light plays over a pale Glacier pool. `animated={false}` holds it still | The brand panel of a view: a hero cell, a call-to-action band, an empty state | Behind dense UI, behind body text without a fade, more than one moving panel per view |
| **Pointer light** | A soft glare and a brightening border follow the pointer across a bordered surface. Keyboard focus sends one glint around the border | Featured cards, the cells of a feature grid | Lists of many cards, the header, touch-only contexts (it switches itself off) |
| **Reveal** | Content clears from a soft blur or rises into place, once | One orchestrated entrance per view, usually the headline | Every section on a page, content people need immediately |
| **Number roll** | Digits roll to the new value in the direction of change | Stats, totals, counters that change while someone watches | Static numbers, long tables |
| **Theme transition** | A theme change spreads outward as light from the control that triggered it | Theme toggles | Any other state change |

**Spend boldness once.** A view gets one moving signature. If the hero panel drifts, a second brand panel further down holds still.

---

## Accessibility

- **Reduced motion.** The operating system preference and the `data-motion="reduced"` override are both honored, in CSS and JS. Under reduced motion, durations collapse to near zero and every decorative effect stops at a static, composed frame: caustics hold still, pointer light rests at the top edge, the rim glint is skipped, reveals show content immediately, number roll swaps digits, and theme changes are instant. The signature ring stays: it is a static texture, not motion. Each effect has explicit rules in both escape hatches, because a blanket duration override does not neutralize persistent transforms.
- **Contrast.** WCAG AA in both themes, checked by axe on every Storybook story. Text never sits on a gradient. Text on a caustic panel sits on the quiet side of its `fade` and uses `--foreground`: muted text on the pale light-mode pool measures about 4.4:1, just short of AA, while foreground text holds well above 4.5:1 even at full pattern strength.
- **Decoration is silent.** Effect layers are `aria-hidden`. Animated values have a plain-text equivalent for assistive technology.
- **Focus is always visible.** A 3px Azure ring blooms around a control on keyboard focus. Flat does not mean ringless: every surface rule that sets a shadow keeps a slot for the ring.
- **Nothing is hidden by default.** Content that reveals is in the DOM and readable before and after its entrance, including when JavaScript fails.

## Performance budget

- Animate only `transform`, `opacity`, CSS custom properties, a one-shot `filter` for Reveal, and the signature ring's hover brightness.
- No `backdrop-filter`. Surfaces are opaque, so nothing needs to blur what is behind it.
- The signature ring and the grain are static images; they never animate at rest.
- At most one infinite animation on screen, not counting spinners, loading progress, and skeletons.
- Ambient effects pause when off-screen or when the tab is hidden.
- No per-frame JavaScript for ambient effects. Pointer tracking writes CSS variables at most once per animation frame, and only for fine pointers.

---

## Do and don't

### Do

- Use Azure for actions, selection, and links only.
- Build structure with rules and cells before reaching for cards.
- Keep corners small: 8px for controls and cards, 0 for structure.
- Give motion a reason: show where something came from, what changed, or that the system heard you.
- Test every screen in both themes and with reduced motion.

### Don't

- Don't put shadows on things that don't float.
- Don't add translucency or backdrop blur.
- Don't add gradients outside the brand panel and the signature ring.
- Don't use more than one signature button or moving brand panel per view.
- Don't animate on scroll or on load more than once per view.
- Don't let Sunlit or Glacier touch text, fills, or borders outside the brand panel and the signature ring.
- Don't lift or tilt cards or buttons on hover.
- Don't use uppercase outside 12px mono micro-labels.
