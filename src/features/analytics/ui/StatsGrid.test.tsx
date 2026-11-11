import { screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { renderWithProviders } from "@/test/render"
import { mockOverview } from "../api/mocks"
import { StatsGrid } from "./StatsGrid"

describe("StatsGrid", () => {
  it("shows all four metrics", () => {
    renderWithProviders(<StatsGrid stats={mockOverview().stats} />)
    expect(screen.getByText("Документів у базі")).toBeInTheDocument()
    expect(screen.getByText("Середній час відповіді")).toBeInTheDocument()
    expect(screen.getByText("1,8 с")).toBeInTheDocument()
  })
})
