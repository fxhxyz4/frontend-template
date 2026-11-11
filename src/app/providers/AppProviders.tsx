import { Notifications } from "@mantine/notifications"
import { QueryClientProvider } from "@tanstack/react-query"
import type { ReactNode } from "react"

import { ThemePresetProvider } from "@/app/theme"
import { queryClient } from "@/shared/api"

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemePresetProvider>
        <Notifications position='top-right' />
        {children}
      </ThemePresetProvider>
    </QueryClientProvider>
  )
}
