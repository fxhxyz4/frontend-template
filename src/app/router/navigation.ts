import { IconHome2, IconLayoutDashboard } from "@tabler/icons-react"
import type { Icon } from "@tabler/icons-react"

import { paths } from "@/shared/config"
import { pages } from "./pages"

export type NavItem = {
  to: string
  label: string
  icon: Icon
  load: () => Promise<unknown>
}

export const navigation: NavItem[] = [
  { to: paths.home, label: "Головна", icon: IconHome2, load: pages.home },
  { to: paths.dashboard, label: "Дашборд", icon: IconLayoutDashboard, load: pages.dashboard },
]
