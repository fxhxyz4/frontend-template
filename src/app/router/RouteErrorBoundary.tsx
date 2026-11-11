import { isRouteErrorResponse, useRouteError } from "react-router"

import { NotFoundPage } from "@/pages/not-found"
import { ServerErrorPage } from "@/pages/server-error"

const isChunkLoadError = (error: unknown) =>
  error instanceof Error &&
  /dynamically imported module|Importing a module script failed|Failed to fetch/i.test(error.message)

export function RouteErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error) && error.status === 404) return <NotFoundPage />
  if (isChunkLoadError(error)) return <ServerErrorPage reason='update' />

  if (import.meta.env.DEV) console.error(error)
  return <ServerErrorPage />
}
