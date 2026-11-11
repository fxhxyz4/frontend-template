import type { CSSVariablesResolver, MantineThemeOverride } from "@mantine/core"

export type ThemePresetId = "sapphire" | "pastel" | "gradient"

export interface ThemePreset {
  id: ThemePresetId
  label: string
  swatches: string[]
  theme: MantineThemeOverride
  cssVariablesResolver: CSSVariablesResolver
  browserColor: { light: string; dark: string }
}
