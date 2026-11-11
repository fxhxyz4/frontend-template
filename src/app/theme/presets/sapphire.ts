import { Button, Card, DEFAULT_THEME, Paper } from "@mantine/core"

import { gold, navy, sapphire } from "./sapphire.palette"
import type { ThemePreset } from "./types"

export const sapphirePreset: ThemePreset = {
  id: "sapphire",
  label: "Сапфір",
  swatches: [
    "#1144e8",
    "#f6b623",
    "#141b2b",
  ],
  browserColor: { light: "#1144e8", dark: "#141b2b" },
  theme: {
    colors: {
      brand: sapphire,
      accent: gold,
      success: DEFAULT_THEME.colors.teal,
      warning: gold,
      danger: DEFAULT_THEME.colors.red,
      dark: navy,
    },
    primaryShade: { light: 6, dark: 5 },
    defaultRadius: "md",
    components: {
      Card: Card.extend({ defaultProps: { withBorder: true, radius: "lg", padding: "lg", shadow: "xs" } }),
      Paper: Paper.extend({ defaultProps: { radius: "lg" } }),
      Button: Button.extend({ defaultProps: { radius: "md" } }),
    },
  },
  cssVariablesResolver: () => ({
    variables: {
      "--app-header-height": "64px",
      "--app-gradient": "linear-gradient(120deg, var(--mantine-color-brand-6) 10%, var(--mantine-color-accent-5) 90%)",
      "--app-logo-from": "var(--mantine-color-brand-6)",
      "--app-logo-to": "var(--mantine-color-accent-5)",
      "--app-logo-mark": "var(--mantine-color-brand-6)",
    },
    light: {
      "--mantine-color-body": "#f6f8fc",
      "--app-surface-glass": "rgb(255 255 255 / 0.72)",
      "--app-hero-bg": "var(--mantine-color-body)",
      "--app-hero-glow": "1",
      "--app-chart-1": "var(--mantine-color-brand-6)",
      "--app-chart-2": "var(--mantine-color-accent-6)",
      "--app-tint-1": "var(--mantine-color-white)",
      "--app-tint-2": "var(--mantine-color-white)",
      "--app-tint-3": "var(--mantine-color-white)",
      "--app-tint-4": "var(--mantine-color-white)",
    },
    dark: {
      "--app-surface-glass": "rgb(20 27 43 / 0.72)",
      "--app-hero-bg": "var(--mantine-color-body)",
      "--app-hero-glow": "1",
      "--app-chart-1": "var(--mantine-color-brand-4)",
      "--app-chart-2": "var(--mantine-color-accent-5)",
      "--app-tint-1": "var(--mantine-color-dark-6)",
      "--app-tint-2": "var(--mantine-color-dark-6)",
      "--app-tint-3": "var(--mantine-color-dark-6)",
      "--app-tint-4": "var(--mantine-color-dark-6)",
    },
  }),
}
