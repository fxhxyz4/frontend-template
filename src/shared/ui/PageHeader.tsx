import { Group, Stack, Text, Title } from "@mantine/core"
import type { ReactNode } from "react"

type PageHeaderProps = {
  title: string
  description?: ReactNode
  actions?: ReactNode
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <Group
      justify='space-between'
      align='flex-end'
      gap='md'
      mb='xl'
    >
      <Stack gap={4}>
        <Title order={1}>{title}</Title>
        {description && (
          <Text
            c='dimmed'
            maw={640}
          >
            {description}
          </Text>
        )}
      </Stack>
      {actions && <Group gap='sm'>{actions}</Group>}
    </Group>
  )
}
