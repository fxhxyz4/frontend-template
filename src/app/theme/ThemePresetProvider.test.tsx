import { act, render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"

import { PRESET_STORAGE_KEY, useThemePreset } from "./context"
import { presets } from "./presets"
import { ThemePresetProvider } from "./ThemePresetProvider"

function Probe() {
  const { preset, setPreset } = useThemePreset()
  return (
    <button
      type='button'
      onClick={() => setPreset(preset === "pastel" ? "gradient" : "pastel")}
    >
      {preset}
    </button>
  )
}

const renderProbe = () =>
  render(
    <ThemePresetProvider>
      <Probe />
    </ThemePresetProvider>
  )

describe("ThemePresetProvider", () => {
  beforeEach(() => localStorage.clear())

  it("uses pastel by default", () => {
    renderProbe()
    expect(screen.getByRole("button")).toHaveTextContent("pastel")
    expect(document.documentElement.dataset.appPreset).toBe("pastel")
  })

  it("switches and remembers the preset", () => {
    renderProbe()
    act(() => screen.getByRole("button").click())
    expect(screen.getByRole("button")).toHaveTextContent("gradient")
    expect(localStorage.getItem(PRESET_STORAGE_KEY)).toBe("gradient")
  })

  it("ignores unknown value in localStorage", () => {
    localStorage.setItem(PRESET_STORAGE_KEY, "neon-pink")
    renderProbe()
    expect(screen.getByRole("button")).toHaveTextContent("pastel")
  })

  it("every preset defines all semantic colors", () => {
    for (const preset of Object.values(presets)) {
      for (const name of [
        "brand",
        "accent",
        "success",
        "warning",
        "danger",
        "dark",
      ]) {
        expect(preset.theme.colors?.[name], `${preset.id}.${name}`).toHaveLength(10)
      }
    }
  })
})
