import { queryOptions, useQuery } from "@tanstack/react-query"

import { http, mockable } from "@/shared/api"
import { mockOverview } from "./mocks"
import type { AnalyticsOverview } from "./types"

export const analyticsQueries = {
  all: ["analytics"] as const,
  overview: () =>
    queryOptions({
      queryKey: [...analyticsQueries.all, "overview"],
      queryFn: () => mockable(mockOverview, () => http<AnalyticsOverview>("/analytics/overview")),
    }),
}

export const useAnalyticsOverview = () => useQuery(analyticsQueries.overview())
