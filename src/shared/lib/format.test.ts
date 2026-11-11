import { describe, expect, it } from "vitest"

import { formatDiff, formatDuration, formatNumber } from "./format"

const nbsp = (s: string) => s.replace(/\s/g, " ")

describe("format", () => {
  it("formats numbers with uk-UA grouping", () => {
    expect(nbsp(formatNumber(1542))).toBe("1 542")
  })

  it("adds sign to diff", () => {
    expect(formatDiff(12.34)).toBe("+12,3%")
    expect(formatDiff(-4)).toBe("-4%")
    expect(formatDiff(0)).toBe("0%")
  })

  it("switches ms → s at 1000", () => {
    expect(formatDuration(420)).toBe("420 мс")
    expect(formatDuration(1840)).toBe("1,8 с")
  })
})
