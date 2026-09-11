/**
 * Spreads a theme change outward as light from the control that triggered it.
 *
 * `apply` must show the new theme in the DOM before it returns, or before its promise resolves.
 * Wrap React state updates in `flushSync`, or resolve once the theme class has changed.
 * Without View Transitions support, or under reduced motion, the change is instant.
 * Requires components/effects/effects.css.
 */
export function startThemeTransition(apply: () => void | Promise<void>, origin?: Element | { x: number; y: number }): Promise<void> {
  const root = document.documentElement
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches || root.dataset.motion === "reduced"
  if (reduced || typeof document.startViewTransition !== "function") return Promise.resolve(apply())

  const box = origin instanceof Element ? origin.getBoundingClientRect() : undefined
  const x = box ? box.left + box.width / 2 : origin && "x" in origin ? origin.x : innerWidth / 2
  const y = box ? box.top + box.height / 2 : origin && "y" in origin ? origin.y : 0
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

  root.dataset.themeTransition = ""
  const transition = document.startViewTransition(apply)
  transition.ready.then(() => {
    root.animate({
      clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
      filter: ["brightness(1.3)", "brightness(1)"],
    }, { duration: 560, easing: "cubic-bezier(.16, 1, .3, 1)", pseudoElement: "::view-transition-new(root)" })
  }).catch(() => {})
  return transition.finished.finally(() => { delete root.dataset.themeTransition })
}
