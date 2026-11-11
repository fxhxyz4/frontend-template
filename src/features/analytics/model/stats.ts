import { IconAlertTriangle, IconClock, IconFileText, IconMessages } from "@tabler/icons-react"
import type { Icon } from "@tabler/icons-react"

import { formatDuration, formatNumber } from "@/shared/lib"
import type { Stat, StatKey } from "../api/types"

export const statMeta: Record<
  StatKey,
  { label: string; icon: Icon; format: (v: number) => string; goodWhenUp: boolean }
> = {
  documents: { label: "Документів у базі", icon: IconFileText, format: formatNumber, goodWhenUp: true },
  queries: { label: "Запитів до агента", icon: IconMessages, format: formatNumber, goodWhenUp: true },
  risks: { label: "Виявлено ризиків", icon: IconAlertTriangle, format: formatNumber, goodWhenUp: false },
  responseTime: { label: "Середній час відповіді", icon: IconClock, format: formatDuration, goodWhenUp: false },
}

export const isGoodTrend = ({ key, diff }: Pick<Stat, "key" | "diff">) => diff >= 0 === statMeta[key].goodWhenUp
