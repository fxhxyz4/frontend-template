import { pastelPreset } from "./pastel"
import { pastel } from "./pastel.palette"
import type { ThemePreset } from "./types"

const meshLight = [
  "radial-gradient(at 0% 0%, #c9e7f4 0, transparent 55%)",
  "radial-gradient(at 100% 20%, #f4d9e6 0, transparent 50%)",
  "radial-gradient(at 20% 100%, #e2ddf7 0, transparent 50%)",
  "radial-gradient(at 90% 100%, #f9edcc 0, transparent 55%)",
  `linear-gradient(160deg, ${pastel.sky} 0%, ${pastel.lavender} 35%, ${pastel.rose} 65%, ${pastel.sand} 100%)`,
].join(", ")

const tone = (color: string, amount: number) => `color-mix(in srgb, ${color} ${amount}%, #151618)`

const meshDark = [
  `radial-gradient(at 0% 0%, ${tone(pastel.sky, 22)} 0, transparent 55%)`,
  `radial-gradient(at 100% 20%, ${tone(pastel.rose, 18)} 0, transparent 50%)`,
  `radial-gradient(at 20% 100%, ${tone(pastel.lavender, 18)} 0, transparent 50%)`,
  `radial-gradient(at 90% 100%, ${tone(pastel.sand, 14)} 0, transparent 55%)`,
  `linear-gradient(160deg, ${tone(pastel.sky, 12)}, ${tone(pastel.lavender, 12)} 35%, ${tone(pastel.rose, 10)} 65%, ${tone(pastel.sand, 8)})`,
].join(", ")

const solid = (color: string) => ({
  "--app-tint-1": color,
  "--app-tint-2": color,
  "--app-tint-3": color,
  "--app-tint-4": color,
})

export const gradientPreset: ThemePreset = {
  id: "gradient",
  label: "Градієнт",
  swatches: [
    pastel.sky,
    pastel.lavender,
    pastel.rose,
    pastel.sand,
  ],
  browserColor: { light: "#d8eef6", dark: "#151618" },
  theme: pastelPreset.theme,
  cssVariablesResolver: theme => {
    const base = pastelPreset.cssVariablesResolver(theme)
    return {
      variables: base.variables,
      light: {
        ...base.light,
        ...solid("var(--mantine-color-white)"),
        "--app-page-bg": meshLight,
        "--app-navbar-bg": "rgb(255 255 255 / 0.45)",
        "--app-surface-glass": "rgb(255 255 255 / 0.55)",
        "--app-hero-bg": "rgb(255 255 255 / 0.55)",
      },
      dark: {
        ...base.dark,
        ...solid("var(--mantine-color-dark-6)"),
        "--app-page-bg": meshDark,
        "--app-navbar-bg": "rgb(21 22 24 / 0.5)",
        "--app-surface-glass": "rgb(21 22 24 / 0.55)",
        "--app-hero-bg": "rgb(30 31 34 / 0.6)",
      },
    }
  },
}
