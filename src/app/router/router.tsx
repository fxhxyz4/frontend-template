import { createBrowserRouter } from "react-router"

import { AppLayout } from "@/app/layout"
import { NotFoundPage } from "@/pages/not-found"
import { ServerErrorPage } from "@/pages/server-error"
import { paths } from "@/shared/config"
import { PageLoader } from "@/shared/ui"
import { pages } from "./pages"
import { RouteErrorBoundary } from "./RouteErrorBoundary"

export const routes = [
  {
    path: paths.home,
    Component: AppLayout,
    HydrateFallback: PageLoader,
    children: [
      {
        ErrorBoundary: RouteErrorBoundary,
        children: [
          { index: true, lazy: pages.home },
          { path: paths.dashboard, lazy: pages.dashboard },
          { path: paths.serverError, Component: ServerErrorPage },
          { path: "*", Component: NotFoundPage },
        ],
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
