import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render } from "@testing-library/react"
import { createMemoryRouter, RouterProvider } from "react-router"
import type { ReactElement } from "react"
import type { RouteObject } from "react-router"

import { ThemePresetProvider } from "@/app/theme"

const wrap = (ui: ReactElement) => (
  <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
    <ThemePresetProvider initial='sapphire'>{ui}</ThemePresetProvider>
  </QueryClientProvider>
)

export const renderWithProviders = (ui: ReactElement) => render(wrap(ui))

export function renderRoutes(routes: RouteObject[], url = "/") {
  const router = createMemoryRouter(routes, { initialEntries: [url] })
  return { router, ...render(wrap(<RouterProvider router={router} />)) }
}
