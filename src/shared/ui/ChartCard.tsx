import { Card, Group, Skeleton, Text } from "@mantine/core"
import type { ReactNode } from "react"

type ChartCardProps = {
  title: string
  subtitle?: string
  actions?: ReactNode
  loading?: boolean
  height?: number
  children: ReactNode
}

export function ChartCard({ title, subtitle, actions, loading, height = 280, children }: ChartCardProps) {
  return (
    <Card
      className='hover-lift'
      h='100%'
    >
      <Group
        justify='space-between'
        align='flex-start'
        mb='lg'
        wrap='nowrap'
      >
        <div>
          <Text fw={600}>{title}</Text>
          {subtitle && (
            <Text
              size='sm'
              c='dimmed'
            >
              {subtitle}
            </Text>
          )}
        </div>
        {actions}
      </Group>
      {loading ? (
        <Skeleton
          h={height}
          radius='md'
        />
      ) : (
        children
      )}
    </Card>
  )
}
