import { createContext, use } from "react"

import type { ThemePresetId } from "./"

export const PRESET_STORAGE_KEY = "app-theme-preset"

type ThemePresetContextValue = { preset: ThemePresetId; setPreset: (id: ThemePresetId) => void }

export const ThemePresetContext = createContext<ThemePresetContextValue | null>(null)

export function useThemePreset() {
  const ctx = use(ThemePresetContext)
  if (!ctx) throw new Error("useThemePreset must be used inside <ThemePresetProvider>")
  return ctx
}
