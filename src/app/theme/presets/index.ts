import { gradientPreset } from "./gradient"
import { pastelPreset } from "./pastel"
import { sapphirePreset } from "./sapphire"
import type { ThemePreset, ThemePresetId } from "./types"

export type { ThemePreset, ThemePresetId } from "./types"

export const presets: Record<ThemePresetId, ThemePreset> = {
  pastel: pastelPreset,
  gradient: gradientPreset,
  sapphire: sapphirePreset,
}

export const DEFAULT_PRESET: ThemePresetId = "pastel"

export const isPresetId = (value: unknown): value is ThemePresetId => typeof value === "string" && value in presets
