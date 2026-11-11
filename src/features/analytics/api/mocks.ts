import type { AnalyticsOverview } from "./types"

const days = (n: number) =>
  Array.from({ length: n }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (n - 1 - i))
    return d.toLocaleDateString("uk-UA", { day: "2-digit", month: "2-digit" })
  })

const wave = (n: number, base: number, amp: number, growth = 0) =>
  Array.from({ length: n }, (_, i) => Math.round(base + Math.sin(i / 2) * amp + i * growth))

export function mockOverview(): AnalyticsOverview {
  const queries = wave(14, 70, 22, 3)
  const risks = wave(14, 6, 3)

  return {
    stats: [
      { key: "documents", value: 128, diff: 12.5, trend: wave(10, 90, 6, 4) },
      { key: "queries", value: 1542, diff: 18.2, trend: queries.slice(-10) },
      { key: "risks", value: 87, diff: -6.4, trend: wave(10, 12, 4, -0.5) },
      { key: "responseTime", value: 1840, diff: -9.1, trend: wave(10, 2200, 180, -40) },
    ],
    activity: days(14).map((date, i) => ({ date, queries: queries[i] ?? 0, risks: risks[i] ?? 0 })),
    categories: [
      { category: "Дискреція", high: 14, medium: 9, low: 4 },
      { category: "Строки", high: 6, medium: 12, low: 7 },
      { category: "Конфлікт інтересів", high: 11, medium: 5, low: 3 },
      { category: "Закупівлі", high: 9, medium: 8, low: 6 },
      { category: "Декларування", high: 4, medium: 7, low: 9 },
    ],
    statuses: [
      { status: "indexed", count: 96 },
      { status: "processing", count: 14 },
      { status: "queued", count: 12 },
      { status: "failed", count: 6 },
    ],
    riskProfile: [
      { factor: "Дискреція", document: 82, average: 55 },
      { factor: "Строки", document: 64, average: 48 },
      { factor: "Прозорість", document: 38, average: 60 },
      { factor: "Підзвітність", document: 45, average: 58 },
      { factor: "Конкуренція", document: 70, average: 52 },
      { factor: "Санкції", document: 30, average: 44 },
    ],
  }
}
