import { describe, expect, it } from "vitest"

import { isGoodTrend } from "./stats"

describe("isGoodTrend", () => {
  it("growth of queries is good", () => expect(isGoodTrend({ key: "queries", diff: 10 })).toBe(true))
  it("drop of risks is good", () => expect(isGoodTrend({ key: "risks", diff: -6 })).toBe(true))
  it("growth of response time is bad", () => expect(isGoodTrend({ key: "responseTime", diff: 5 })).toBe(false))
})
