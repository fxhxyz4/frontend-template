import { RadarChart } from "@mantine/charts"

import { ChartCard } from "@/shared/ui"
import type { RiskFactor } from "../api/types"

export function RiskProfileChart({ data, loading }: { data?: RiskFactor[]; loading?: boolean }) {
  return (
    <ChartCard
      title='Профіль ризиків'
      subtitle='Останній документ vs середнє по базі'
      loading={loading}
    >
      <RadarChart
        h={280}
        data={data ?? []}
        dataKey='factor'
        series={[
          { name: "document", label: "Документ", color: "danger.5", opacity: 0.25 },
          { name: "average", label: "Середнє", color: "var(--app-chart-1)", opacity: 0.2 },
        ]}
        withLegend
        withPolarRadiusAxis={false}
      />
    </ChartCard>
  )
}
