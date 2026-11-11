import { Button, Grid, SimpleGrid, Stack } from "@mantine/core"
import { IconRefresh } from "@tabler/icons-react"

import {
  ActivityChart,
  DocumentStatusChart,
  RiskCategoriesChart,
  RiskProfileChart,
  StatsGrid,
  useAnalyticsOverview,
} from "@/features/analytics"
import { PageHeader, Seo } from "@/shared/ui"

export function DashboardPage() {
  const { data, isPending, isFetching, refetch } = useAnalyticsOverview()

  return (
    <>
      <Seo
        title='Дашборд'
        description='Аналітика роботи ШІ-агента: запити, документи, корупційні ризики.'
      />
      <PageHeader
        title='Дашборд'
        description='Аналітика роботи ШІ-агента з антикорупційного законодавства'
        actions={
          <Button
            variant='default'
            leftSection={<IconRefresh size={16} />}
            loading={isFetching && !isPending}
            onClick={() => void refetch()}
          >
            Оновити
          </Button>
        }
      />

      <Stack gap='lg'>
        <StatsGrid
          stats={data?.stats}
          loading={isPending}
        />

        <Grid gap='lg'>
          <Grid.Col span={{ base: 12, lg: 8 }}>
            <ActivityChart
              data={data?.activity}
              loading={isPending}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 4 }}>
            <DocumentStatusChart
              data={data?.statuses}
              loading={isPending}
            />
          </Grid.Col>
        </Grid>

        <SimpleGrid
          cols={{ base: 1, md: 2 }}
          spacing='lg'
        >
          <RiskCategoriesChart
            data={data?.categories}
            loading={isPending}
          />
          <RiskProfileChart
            data={data?.riskProfile}
            loading={isPending}
          />
        </SimpleGrid>
      </Stack>
    </>
  )
}
