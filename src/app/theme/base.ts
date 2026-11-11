import { createTheme, defaultVariantColorsResolver, parseThemeColor } from "@mantine/core"
import type { VariantColorsResolver } from "@mantine/core"

const variantColorResolver: VariantColorsResolver = input => {
  const result = defaultVariantColorsResolver(input)
  const color = input.color || input.theme.primaryColor
  const parsed = parseThemeColor({ color, theme: input.theme })
  const isPrimary = parsed.isThemeColor && parsed.color === input.theme.primaryColor && parsed.shade === undefined
  if (input.variant === "filled" && isPrimary) return { ...result, color: "var(--mantine-primary-color-contrast)" }
  return result
}

export const baseTheme = createTheme({
  variantColorResolver,
  primaryColor: "brand",
  fontFamily: "'Inter Variable', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  fontFamilyMonospace: "ui-monospace, 'JetBrains Mono', monospace",
  headings: {
    fontWeight: "700",
    sizes: { h1: { fontSize: "clamp(1.5rem, 1.1rem + 1.4vw, 2rem)", lineHeight: "1.2" } },
  },
  cursorType: "pointer",
  respectReducedMotion: true,
  autoContrast: true,
  breakpoints: { xs: "30em", sm: "40em", md: "53.75em", lg: "64em", xl: "90em" },
})
