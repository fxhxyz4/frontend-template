export type StatKey = "documents" | "queries" | "risks" | "responseTime"

export interface Stat {
  key: StatKey
  value: number
  diff: number
  trend: number[]
}

export interface ActivityPoint {
  date: string
  queries: number
  risks: number
}

export interface CategoryCount {
  category: string
  high: number
  medium: number
  low: number
}

export type DocumentStatus = "indexed" | "processing" | "queued" | "failed"

export interface StatusCount {
  status: DocumentStatus
  count: number
}

export interface RiskFactor {
  factor: string
  document: number
  average: number
}

export interface AnalyticsOverview {
  stats: Stat[]
  activity: ActivityPoint[]
  categories: CategoryCount[]
  statuses: StatusCount[]
  riskProfile: RiskFactor[]
}
