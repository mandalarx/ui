import { create } from "storybook/theming"

export function atelierTheme(dark: boolean) {
  return create({
    base: dark ? "dark" : "light",
    brandTitle: "Violet Atelier · Mandalar UI",
    brandImage: "/atelier-brand.svg",
    brandUrl: "?path=/story/foundations-overview--system",
    brandTarget: "_self",
    colorPrimary: "#8854f5", colorSecondary: dark ? "#bd9bff" : "#6831d8",
    appBg: dark ? "#15131b" : "#f6f5f9",
    appContentBg: dark ? "#1b1922" : "#ffffff",
    appPreviewBg: dark ? "#111017" : "#faf9fc",
    appBorderColor: dark ? "#34303f" : "#e3dfec", appBorderRadius: 10,
    textColor: dark ? "#f2eff9" : "#292431",
    textMutedColor: dark ? "#afa7be" : "#665e75",
    barBg: dark ? "#1b1922" : "#ffffff",
    barTextColor: dark ? "#afa7be" : "#665e75",
    barSelectedColor: dark ? "#bd9bff" : "#6831d8",
    inputBg: dark ? "#24202d" : "#ffffff",
    inputBorder: dark ? "#443b54" : "#ded7ea",
    inputTextColor: dark ? "#f2eff9" : "#292431",
    fontBase: '"Manrope Variable", sans-serif', fontCode: '"IBM Plex Mono", monospace',
  })
}
