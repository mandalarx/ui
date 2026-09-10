import { addons } from "storybook/manager-api"
import { atelierTheme } from "./atelier-theme"
import "@fontsource-variable/manrope"

const preference = window.matchMedia("(prefers-color-scheme: dark)")
function update() {
  const selected = localStorage.getItem("atelier-theme")
  addons.setConfig({ showPanel: false, theme: atelierTheme(selected === "dark" || ((!selected || selected === "system") && preference.matches)) })
}
update()
preference.addEventListener("change", update)
window.addEventListener("storage", update)
