import { screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { renderRoutes } from "@/test/render"
import { routes } from "./router"

describe("router", () => {
  it("renders home on /", async () => {
    renderRoutes(routes, "/")
    expect(await screen.findByRole("link", { name: /відкрити дашборд/i })).toBeInTheDocument()
  })

  it("renders 404 for unknown path", async () => {
    renderRoutes(routes, "/nope/123")
    expect(await screen.findByRole("heading", { name: /сторінку не знайдено/i })).toBeInTheDocument()
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow")
  })

  it("renders 500 page", async () => {
    renderRoutes(routes, "/500")
    expect(await screen.findByRole("heading", { name: /щось пішло не так/i })).toBeInTheDocument()
  })

  it("catches page crash with error boundary inside layout", async () => {
    const Crash = () => {
      throw new Error("boom")
    }
    const [root] = routes
    renderRoutes(
      [{ ...root, children: [{ ...root!.children[0], children: [{ path: "/crash", Component: Crash }] }] }],
      "/crash"
    )
    expect(await screen.findByRole("heading", { name: /щось пішло не так/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /дашборд/i })).toBeInTheDocument()
  })
})
