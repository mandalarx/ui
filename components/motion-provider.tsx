"use client"

import { MotionConfig } from "motion/react"

export const atelierSpring = { type: "spring", stiffness: 420, damping: 32, mass: 0.8 } as const

export function MotionProvider({ children, reducedMotion = "user" }: {
  children: React.ReactNode
  reducedMotion?: "user" | "always" | "never"
}) {
  return <MotionConfig reducedMotion={reducedMotion} transition={atelierSpring}>{children}</MotionConfig>
}
