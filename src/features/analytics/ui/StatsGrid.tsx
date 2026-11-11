import { Sparkline } from "@mantine/charts"
import { Badge, Card, Group, SimpleGrid, Skeleton, Text, ThemeIcon } from "@mantine/core"

import { formatDiff } from "@/shared/lib"
import { isGoodTrend, statMeta } from "../model/stats"
import type { Stat } from "../api/types"

export function StatsGrid({ stats, loading }: { stats?: Stat[]; loading?: boolean }) {
  return (
    <SimpleGrid
      cols={{ base: 1, xs: 2, xl: 4 }}
      className='stagger'
    >
      {loading || !stats
        ? Array.from({ length: 4 }, (_, i) => (
            <Skeleton
              key={i}
              h={148}
              radius='lg'
            />
          ))
        : stats.map((stat, i) => {
            const { label, icon: StatIcon, format } = statMeta[stat.key]
            const good = isGoodTrend(stat)
            return (
              <Card
                key={stat.key}
                className='hover-lift'
                padding='lg'
                style={{ "--i": i, background: `var(--app-tint-${(i % 4) + 1})` }}
              >
                <Group
                  justify='space-between'
                  wrap='nowrap'
                >
                  <Text
                    size='sm'
                    c='dimmed'
                    truncate
                  >
                    {label}
                  </Text>
                  <ThemeIcon
                    variant='light'
                    radius='md'
                    size='lg'
                  >
                    <StatIcon size={18} />
                  </ThemeIcon>
                </Group>

                <Group
                  align='flex-end'
                  justify='space-between'
                  mt='sm'
                  wrap='nowrap'
                >
                  <div>
                    <Text
                      fz={28}
                      fw={700}
                      lh={1.1}
                    >
                      {format(stat.value)}
                    </Text>
                    <Badge
                      mt={6}
                      variant='light'
                      color={good ? "success" : "danger"}
                      size='sm'
                    >
                      {formatDiff(stat.diff)}
                    </Badge>
                  </div>
                  <Sparkline
                    w={96}
                    h={44}
                    data={stat.trend}
                    curveType='natural'
                    color={good ? "success.6" : "danger.6"}
                    fillOpacity={0.25}
                    strokeWidth={2}
                  />
                </Group>
              </Card>
            )
          })}
    </SimpleGrid>
  )
}
