"use client"

import { useContext, useSyncExternalStore } from "react"
import { MotionConfig, MotionConfigContext } from "motion/react"

const motionQuery = "(prefers-reduced-motion: reduce)"
function subscribeToMotion(update: () => void) {
  const query = window.matchMedia(motionQuery)
  query.addEventListener("change", update)
  return () => query.removeEventListener("change", update)
}
function useSystemMotion() {
  return useSyncExternalStore(subscribeToMotion, () => window.matchMedia(motionQuery).matches, () => false)
}

export const atelierSpring = { type: "spring", stiffness: 420, damping: 32, mass: 0.8 } as const

/** Resolve the toolbar policy and OS preference for custom gesture animations. */
export function useMotionPreference() {
  const system = useSystemMotion()
  const { reducedMotion } = useContext(MotionConfigContext)
  return reducedMotion === "always" || (reducedMotion !== "never" && !!system)
}

export function MotionProvider({ children, reducedMotion = "user" }: {
  children: React.ReactNode
  reducedMotion?: "user" | "always" | "never"
}) {
  const system = useSystemMotion()
  const reduced = reducedMotion === "always" || (reducedMotion === "user" && system)
  return <MotionConfig reducedMotion={reduced ? "always" : "never"} transition={reduced ? { duration: 0 } : atelierSpring}>{children}</MotionConfig>
}
