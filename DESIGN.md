---
name: "MandalarX UI"
system: "Azure Glass"
version: "2.0.0"
theme: "light + dark (system default)"
description: "Icy and midnight surfaces, clear azure actions, selective glass, and light that behaves like light. A shadcn/ui library for focused product work."
tags: [azure, glass, light, motion, shadcn, component-library]
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
    glacier: "#57def3"      # --glass-highlight: rims, glints, caustics
    sunlit: "#fff3d6"       # --light-warm: inside light effects only, <=15% alpha
typography:
  font-sans: "Manrope Variable (200-800)"
  font-mono: "IBM Plex Mono (400, 500, 600)"
  display: { size: "48-64px", weight: 300, tracking: "-0.045em", line-height: 1.02 }
  heading-h1: { size: "36px", weight: 600, tracking: "-0.03em", line-height: 1.1 }
  heading-h2: { size: "28px", weight: 600, tracking: "-0.02em", line-height: 1.2 }
  heading-h3: { size: "20px", weight: 600, tracking: "-0.01em", line-height: 1.3 }
  body: { size: "16px", weight: 400, line-height: 1.6 }
  ui: { size: "14px", weight: 500, line-height: 1.45 }
  caption: { size: "12px", weight: 500, line-height: 1.4 }
shapes:
  radius-item: "8px"
  radius-control: "12px"
  radius-menu: "16px"
  radius-card: "20px"
  radius-dialog: "24px"
  radius-pill: "999px"
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

# MandalarX UI: Azure Glass

## Concept: light through ice

Surfaces are ice: cool, clear, and still. Motion is how light moves through them. Everything in the system follows from that picture, and three rules keep it honest.

1. **Only light decorates.** A gradient exists only if it can be read as light: a specular glare, a rim catching the sun, a caustic, a glint. No decorative blobs, color washes, or shapes for their own sake.
2. **Motion answers people.** Primitives move when someone acts or when state changes, and the motion shows what changed. Ambient movement is limited to one signature surface per view.
3. **Surfaces settle, light travels.** Things with mass (panels, menus, indicators) move on springs and come to rest. Light moves at constant speed (linear sweeps) and never bounces.

The library is a working tool for dense product screens. Expressive effects live in an opt-in layer, so a form or a table never pays for spectacle it didn't ask for.

---

## Color

Semantic tokens live in `app/globals.css` and apply to every component and block. Prefer overriding tokens to overriding component styles.

### Grounds and surfaces

| Token | Light | Dark | Role |
| :-- | :-- | :-- | :-- |
| `--background` | `#f3f8ff` Ice | `#07111f` Midnight | Page ground |
| `--card` | `#ffffff` | `#0d1d30` Deep water | Solid surfaces, glass cards |
| `--popover` | `#ffffff` | `#102238` | Menus, popovers, overlays |
| `--muted` | `#eaf1fa` | `#15283e` | Quiet fills, skeletons, tracks |
| `--border` | `#cfdeee` | `#28425e` | Hairlines and outlines |
| `--input` | `#b4c9e0` | `#3c5875` | Control borders |

### Action and emphasis

| Token | Light | Dark | Role |
| :-- | :-- | :-- | :-- |
| `--primary` | `#0069e8` Azure | `#58b4ff` | The action color: primary buttons, focus ring, selection, active indicators |
| `--accent` / `--accent-foreground` | `#deefff` / `#0052b8` | `#123b60` / `#b8e2ff` | Hover and current-item fills |
| `--destructive`, `--success`, `--warning`, `--info` | OKLCH | OKLCH | Status only, never decoration |

### Light sources

Light sources are not UI colors. They never fill a control or carry text.

| Token | Value | Role |
| :-- | :-- | :-- |
| `--glass-highlight` | `#57def3` Glacier | Rims, glints, caustics, the cyan edge of glass shadows |
| `--light-warm` | `#fff3d6` Sunlit | A whisper of warmth inside caustics and specular highlights, at 15% alpha or less |

Why a warm light in a cold palette: light passing through water carries the color of the sun. A small warm component in the brightest highlights makes the blues read as *lit* rather than flat. Keep it inside light effects; the moment it touches chrome, it becomes a second accent.

### Charts

`--chart-1` is Azure; `--chart-2` through `--chart-5` step around the hue wheel in OKLCH at matched lightness so series stay distinguishable in both themes. Chart color is data, never decoration.

---

## Typography

- **Manrope Variable** carries the whole interface. Its weight axis (200–800) is the main expressive tool.
- **IBM Plex Mono** is for data and code: numbers, identifiers, timings, snippets. Use tabular numerals for anything that updates or aligns in columns.

### Scale

| Role | Size | Weight | Tracking | Line height |
| :-- | :-- | :-- | :-- | :-- |
| Display | 48–64px | 300 | -0.045em | 1.02 |
| H1 | 36px | 600 | -0.03em | 1.1 |
| H2 | 28px | 600 | -0.02em | 1.2 |
| H3 | 20px | 600 | -0.01em | 1.3 |
| Body | 16px | 400 | 0 | 1.6 |
| UI | 14px | 500 | 0 | 1.45 |
| Caption | 12px | 500 | 0 | 1.4 |

**Display type is light.** Large headlines use weight 300 so the letterforms themselves feel thin and clear, like ice. The contrast with 600-weight headings and 500-weight UI text gives hierarchy without needing color. Light weights need less negative tracking than bold ones; don't copy the heading tracking onto display.

### Voice in type

- Sentence case everywhere, including buttons, labels, and menu items.
- No tracked-out uppercase labels. If a heading needs a label above it to make sense, rewrite the heading.
- Numbered markers (01, 02) only when the content is a real sequence.
- Keep line length under 80 characters for body text.

---

## Surfaces

### Solid by default, glass by intent

Solid surfaces anchor work: forms, tables, ordinary cards, inputs. Glass is a progressive enhancement for things that float above the work.

| Surface | Glass? | How |
| :-- | :-- | :-- |
| Menus, popovers, select, combobox, hover card, navigation content | Always | Automatic via `data-slot` |
| Dialogs, alert dialogs, sheets, drawers | Always | Automatic via `data-slot` |
| Sidebar, header bar | Always | Automatic / `data-surface="glass"` |
| Featured cards | Opt-in | `<Card data-surface="glass">` |
| Ordinary cards, inputs, tables | Never | Stay opaque, even inside glass |

### Glass recipe

- `backdrop-filter: blur(16px) saturate(140%)`, static. The blur never animates.
- Tint: 94% for dense popups; 86% (light) and 90% (dark) for featured cards. Tune with `--glass-tint`, `--glass-blur`, `--glass-shadow`.
- **Refraction rim (`--glass-rims`):** light enters at the top-left as a bright 1px rim and leaves at the bottom-right as a faint Glacier edge (`--glass-edge`). Built from inset shadows, so it follows the radius, survives scrolling menus, and never needs a pseudo-element or a position change.
- **Frost grain (`--frost-grain`):** a static noise texture averaging about 2% opacity, tinted Ink in light mode and Ice in dark mode. It gives the glass a physical surface and prevents banding in the light gradients behind it. It is a background image, so it never changes the surface's tint or alpha.
- **Fallback:** without `backdrop-filter` support, glass becomes an opaque surface with the same rim and shadow. Nothing depends on the blur to be legible.

### Elevation

Depth comes from light and blur, not from heavy shadows. Shadows are tinted blue, never neutral grey.

| Tier | Token | Used by |
| :-- | :-- | :-- |
| 0 Flat | none | Page ground, table rows, inline content |
| 1 Surface | `--elevation-1` (`--surface-shadow`) | Solid cards, items, alerts, empty states |
| 2 Raised | `--elevation-2` (`--glass-shadow`) | Menus, popovers, featured glass, navigation |
| 3 Overlay | `--elevation-3` (`--glass-shadow` + `--overlay-shadow`) | Dialogs, sheets, drawers: anything with a scrim |

### Radius hierarchy

Radius grows with the size and elevation of the thing. It is information: a glance at a corner tells you what kind of object it is.

| Radius | Used by |
| :-- | :-- |
| 8px | Menu items, tab pills, small inner elements |
| 12px | Controls: buttons, inputs, selects (`--radius`) |
| 16px | Menus, popovers, dropdowns |
| 20px | Cards, alerts, empty states, header bar |
| 24px | Dialogs and alert dialogs |
| Pill | Badges |

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
| `--motion-light` | 2400ms | One pass of a light sweep: glint, shimmer |
| `--motion-ambient` | 18s | One cycle of the caustic drift |

### Curves

| Token | Curve | Use |
| :-- | :-- | :-- |
| `--ease-standard` | `cubic-bezier(.2, .8, .2, 1)` | Color, opacity, and border changes |
| `--ease-enter` | `cubic-bezier(.16, 1, .3, 1)` | Things arriving: fast out of the gate, long gentle landing |
| `--ease-exit` | `cubic-bezier(.4, 0, 1, 1)` | Things leaving: accelerate away, no lingering |
| `--ease-settle` | `linear()` spring (420 / 32 / .8) | Surfaces and indicators. 0.3% overshoot, rests in about 330ms |
| `--ease-spring` | `cubic-bezier(.22, 1.18, .36, 1)` | Pop: small controls only, such as thumbs, checks, and press release |
| linear | `linear` | Light. Light never eases or bounces |

`--ease-settle` is the same spring as the `atelierSpring` export that drives JavaScript motion, sampled into a CSS `linear()` curve. CSS and JS motion share one feel. Browsers without `linear()` fall back to `--ease-enter`.

### Choreography rules

- **Exits are shorter than entrances,** about two thirds. People wait for things to arrive; nobody waits for things to leave.
- **Things come from where they were summoned.** Popovers and menus scale from the trigger (Radix transform origin). Sheets slide from their edge. Dialogs rise a few pixels from below center. Nothing flies in from off-screen without a reason.
- **Small distances.** Entrances travel 4–8px and scale from .96–.97. Motion should be felt more than watched.
- **Stagger is a cue, not a show.** 20ms per item, capped at 60ms total offset.
- **Interruptible by default.** State that can flip quickly (tabs, switches, accordions, hover) uses transitions or springs that retarget mid-flight, never keyframes that must finish.
- **No replay.** A rerender never restarts an entrance. Entrances run on mount or on state change only.
- **Animate transform, opacity, and CSS variables.** Never animate `backdrop-filter`, blur radius on glass, or layout properties, except accordion height, which the primitive measures.

### What each primitive does

| Primitive | Motion |
| :-- | :-- |
| Button | Lifts 1px on hover, presses to .97 on the pop spring. Primary buttons catch a single sheen of light on hover and focus |
| Focus ring | Blooms from 0 to 3px on the pop spring. Keyboard focus only |
| Menus, popovers, select, tooltip | Scale .96 to 1 from the trigger on `--ease-settle`; items stagger in. Exit: fade and scale to .98 on `--ease-exit` |
| Dialog | Rises 8px and scales .97 to 1 on `--ease-settle`. Exit: fast fade. Scrim fades opacity only |
| Sheet, drawer | Slide from their edge on `--ease-enter` |
| Tabs | The indicator stretches toward the new tab with its leading edge first, then settles. Panels fade and rise 5px once |
| Switch | Thumb stretches while pressed, then springs to its new side |
| Checkbox | The check draws itself in 220ms |
| Radio | The dot pops in on the pop spring |
| Accordion | Height opens on `--ease-enter`; content fades and rises 4px just behind it; the chevron turns on the spring |
| Progress | While loading, a slow glint travels the bar. On completion, one soft glow |
| Skeleton | A slow frost shimmer sweeps across, the same light as the button sheen |

Primitives do not lift cards on hover, animate page content in on load, or loop.

---

## Expressive layer

Opt-in components in `components/effects/`, styled by `components/effects/effects.css`. Import the stylesheet only where you use them. None of them requires the Motion library.

| Effect | What it does | Use for | Not for |
| :-- | :-- | :-- | :-- |
| **Caustics** | Water-light patterns drift slowly across a surface, the way sunlight moves on a pool floor | The one signature surface of a view: a hero, an empty state, an onboarding panel | Behind dense UI, behind body text without a scrim, more than once per view |
| **Pointer light** | A soft glare and a brightening rim follow the pointer across glass. Keyboard focus sends one glint around the rim | Featured glass cards, the header bar | Solid surfaces, lists of many cards, touch-only contexts (it switches itself off) |
| **Reveal** | Content clears from frost (blur to sharp) or rises into place, once | One orchestrated entrance per view, usually the headline | Every section on a page, content people need immediately |
| **Number roll** | Digits roll to the new value in the direction of change | Stats, totals, counters that change while someone watches | Static numbers, long tables |
| **Theme transition** | A theme change spreads outward as light from the control that triggered it | Theme toggles | Any other state change |

**Spend boldness once.** A view gets one signature effect. If the hero has caustics, nothing else on the page drifts.

---

## Accessibility

- **Reduced motion.** The operating system preference and the `data-motion="reduced"` override are both honored, in CSS and JS. Under reduced motion, durations collapse to near zero and every decorative effect stops at a static, composed frame: caustics hold still, pointer light centers, reveals show content immediately, number roll swaps digits, and theme changes are instant. Each effect has explicit rules in both escape hatches, because a blanket duration override does not neutralize persistent transforms.
- **Contrast.** WCAG AA in both themes, checked by axe on every Storybook story. Text never sits on a gradient or a glow. Text over caustics sits on a scrim that holds 4.5:1 at the brightest frame.
- **Decoration is silent.** Effect layers are `aria-hidden`. Animated values have a plain-text equivalent for assistive technology.
- **Focus is always visible** and never depends on motion to be seen.
- **Nothing is hidden by default.** Content that reveals is in the DOM and readable before and after its entrance, including when JavaScript fails.

## Performance budget

- Animate only `transform`, `opacity`, CSS custom properties, and a one-shot `filter` for Reveal.
- Never animate `backdrop-filter` or blur on a glass surface; the blur is static.
- At most one infinite animation on screen, not counting spinners, loading progress, and skeletons.
- Ambient effects pause when off-screen or when the tab is hidden.
- No per-frame JavaScript for ambient effects. Pointer tracking writes CSS variables at most once per animation frame, and only for fine pointers.

---

## Do and don't

### Do

- Use Azure for actions and selection only.
- Keep ordinary surfaces solid; reach for glass when something floats.
- Let radius grow with elevation.
- Give motion a reason: show where something came from, what changed, or that the system heard you.
- Test every screen in both themes and with reduced motion.

### Don't

- Don't add gradients that aren't light.
- Don't animate on scroll or on load more than once per view.
- Don't let Sunlit or Glacier touch text, fills, or borders.
- Don't lift or tilt cards on hover.
- Don't use monospace for labels or uppercase for anything.
- Don't use neutral grey shadows; depth is tinted blue.
