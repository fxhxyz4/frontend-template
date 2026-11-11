import { BarChart } from "@mantine/charts"

import { ChartCard } from "@/shared/ui"
import type { CategoryCount } from "../api/types"

export function RiskCategoriesChart({ data, loading }: { data?: CategoryCount[]; loading?: boolean }) {
  return (
    <ChartCard
      title='Ризики за категоріями'
      subtitle='Розподіл за рівнем'
      loading={loading}
    >
      <BarChart
        h={280}
        data={data ?? []}
        dataKey='category'
        type='stacked'
        series={[
          { name: "high", label: "Високий", color: "danger.6" },
          { name: "medium", label: "Середній", color: "warning.6" },
          { name: "low", label: "Низький", color: "success.6" },
        ]}
        withLegend
        legendProps={{ verticalAlign: "bottom", height: 40 }}
        gridAxis='x'
        tickLine='none'
        barProps={{ radius: 4 }}
        maxBarWidth={36}
      />
    </ChartCard>
  )
}
