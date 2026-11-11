import { DonutChart } from "@mantine/charts"
import { Group, Stack, Text } from "@mantine/core"

import { ChartCard } from "@/shared/ui"
import type { DocumentStatus, StatusCount } from "../api/types"

const toCssColor = (color: string) =>
  /^[a-z]+\.\d$/.test(color) ? `var(--mantine-color-${color.replace(".", "-")})` : color

const statusMeta: Record<DocumentStatus, { label: string; color: string }> = {
  indexed: { label: "Проіндексовано", color: "var(--app-chart-1)" },
  processing: { label: "Обробка", color: "warning.5" },
  queued: { label: "У черзі", color: "gray.4" },
  failed: { label: "Помилка", color: "danger.6" },
}

export function DocumentStatusChart({ data, loading }: { data?: StatusCount[]; loading?: boolean }) {
  const cells = (data ?? []).map(({ status, count }) => ({
    name: statusMeta[status].label,
    value: count,
    color: statusMeta[status].color,
  }))
  const total = cells.reduce((sum, c) => sum + c.value, 0)

  return (
    <ChartCard
      title='Статус документів'
      subtitle='Індексація бази знань'
      loading={loading}
    >
      <Group
        justify='center'
        gap='xl'
        wrap='wrap'
      >
        <DonutChart
          data={cells}
          size={180}
          thickness={24}
          paddingAngle={3}
          chartLabel={total}
          tooltipDataSource='segment'
        />
        <Stack gap={8}>
          {cells.map(c => (
            <Group
              key={c.name}
              gap={8}
              wrap='nowrap'
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 3,
                  background: toCssColor(c.color),
                }}
              />
              <Text
                size='sm'
                flex={1}
              >
                {c.name}
              </Text>
              <Text
                size='sm'
                fw={600}
              >
                {c.value}
              </Text>
            </Group>
          ))}
        </Stack>
      </Group>
    </ChartCard>
  )
}
