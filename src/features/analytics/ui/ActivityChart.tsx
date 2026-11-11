import { AreaChart } from "@mantine/charts"

import { ChartCard } from "@/shared/ui"
import type { ActivityPoint } from "../api/types"

export function ActivityChart({ data, loading }: { data?: ActivityPoint[]; loading?: boolean }) {
  return (
    <ChartCard
      title='Активність'
      subtitle='Запити до агента та знайдені ризики за 14 днів'
      loading={loading}
      height={300}
    >
      <AreaChart
        h={300}
        data={data ?? []}
        dataKey='date'
        series={[
          { name: "queries", label: "Запити", color: "var(--app-chart-1)" },
          { name: "risks", label: "Ризики", color: "var(--app-chart-2)" },
        ]}
        curveType='natural'
        withGradient
        fillOpacity={0.3}
        strokeWidth={2.5}
        withDots={false}
        withLegend
        gridAxis='x'
        tickLine='none'
        legendProps={{ verticalAlign: "bottom", height: 40 }}
      />
    </ChartCard>
  )
}
