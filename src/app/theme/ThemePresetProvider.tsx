import { useEffect, useMemo, useState } from "react"
import { MantineProvider, mergeThemeOverrides } from "@mantine/core"
import type { ReactNode } from "react"

import { baseTheme } from "./base"
import { PRESET_STORAGE_KEY, ThemePresetContext } from "./context"
import { DEFAULT_PRESET, isPresetId, presets } from "./presets"
import type { ThemePresetId } from "./presets"

const readPreset = (): ThemePresetId => {
  try {
    const saved = localStorage.getItem(PRESET_STORAGE_KEY)
    if (isPresetId(saved)) return saved
  } catch {
    /* */
  }
  return DEFAULT_PRESET
}

export function ThemePresetProvider({ children, initial }: { children: ReactNode; initial?: ThemePresetId }) {
  const [preset, setPreset] = useState<ThemePresetId>(() => initial ?? readPreset())
  const current = presets[preset]
  const theme = useMemo(() => mergeThemeOverrides(baseTheme, current.theme), [current])

  useEffect(() => {
    document.documentElement.dataset.appPreset = preset
    try {
      localStorage.setItem(PRESET_STORAGE_KEY, preset)
    } catch {
      /* ignore */
    }
    document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach(meta => {
      meta.content = meta.media.includes("dark") ? current.browserColor.dark : current.browserColor.light
    })
  }, [preset, current])

  const ctx = useMemo(() => ({ preset, setPreset }), [preset])

  return (
    <ThemePresetContext value={ctx}>
      <MantineProvider
        theme={theme}
        cssVariablesResolver={current.cssVariablesResolver}
        defaultColorScheme='auto'
      >
        {children}
      </MantineProvider>
    </ThemePresetContext>
  )
}
