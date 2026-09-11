import { create } from "storybook/theming"

export function atelierTheme(dark: boolean) {
  return create({
    base: dark ? "dark" : "light",
    brandTitle: "Azure Blueprint, MandalarX UI",
    brandImage: "/atelier-brand.svg",
    brandUrl: "?path=/story/foundations-overview--system",
    brandTarget: "_self",
    colorPrimary: "#0069e8", colorSecondary: dark ? "#58b4ff" : "#0069e8",
    appBg: dark ? "#0b1728" : "#edf5ff",
    appContentBg: dark ? "#102238" : "#ffffff",
    appPreviewBg: dark ? "#07111f" : "#f3f8ff",
    appBorderColor: dark ? "#28425e" : "#cfdeee", appBorderRadius: 8,
    textColor: dark ? "#e8f3ff" : "#10243b",
    textMutedColor: dark ? "#a0b6ce" : "#506781",
    barBg: dark ? "#102238" : "#ffffff",
    barTextColor: dark ? "#a0b6ce" : "#506781",
    barSelectedColor: dark ? "#58b4ff" : "#0069e8",
    inputBg: dark ? "#15283e" : "#ffffff",
    inputBorder: dark ? "#3c5875" : "#b4c9e0",
    inputTextColor: dark ? "#e8f3ff" : "#10243b",
    fontBase: '"Inter Variable", ui-sans-serif, system-ui, sans-serif', fontCode: '"Geist Mono Variable", ui-monospace, monospace',
  })
}
