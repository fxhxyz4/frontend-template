import { describe, expect, it } from "vitest"

import { buildRobots, buildSitemap } from "./seo.ts"

describe("seo files", () => {
  const date = new Date("2026-11-11T10:00:00Z")

  it("builds sitemap with absolute urls and no double slashes", () => {
    const xml = buildSitemap("https://example.com/", ["/", "/dashboard"], date)
    expect(xml).toContain("<loc>https://example.com/</loc>")
    expect(xml).toContain("<loc>https://example.com/dashboard</loc>")
    expect(xml).toContain("<lastmod>2026-11-11</lastmod>")
    expect(xml).not.toContain("com//")
  })

  it("builds robots with disallow rules and sitemap link", () => {
    const txt = buildRobots("https://example.com", ["/api/", "/500"])
    expect(txt).toContain("Disallow: /api/")
    expect(txt).toContain("Disallow: /500")
    expect(txt).toContain("Sitemap: https://example.com/sitemap.xml")
  })
})
