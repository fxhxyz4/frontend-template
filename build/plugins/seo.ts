import type { Plugin } from "vite"

import { site } from "../../src/shared/config/site.ts"

export const normalizeUrl = (url: string) => url.replace(/\/+$/, "")

export function buildSitemap(siteUrl: string, routes: readonly string[], lastmod = new Date()): string {
  const base = normalizeUrl(siteUrl)
  const day = lastmod.toISOString().slice(0, 10)
  const urls = routes
    .map(path => `  <url>\n    <loc>${base}${path}</loc>\n    <lastmod>${day}</lastmod>\n  </url>`)
    .join("\n")
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

export function buildRobots(siteUrl: string, disallow: readonly string[]): string {
  const rules = disallow.map(p => `Disallow: ${p}`).join("\n")
  return `User-agent: *\nAllow: /\n${rules}\n\nSitemap: ${normalizeUrl(siteUrl)}/sitemap.xml\n`
}

export function seo(siteUrl: string): Plugin {
  const files = {
    "sitemap.xml": () => buildSitemap(siteUrl, site.publicRoutes),
    "robots.txt": () => buildRobots(siteUrl, site.privateRoutes),
  }
  return {
    name: "app:seo",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const file = req.url?.slice(1) as keyof typeof files
        if (!(file in files)) return next()
        res.setHeader("Content-Type", file.endsWith(".xml") ? "application/xml" : "text/plain")
        res.end(files[file]())
      })
    },
    generateBundle() {
      for (const [fileName, render] of Object.entries(files)) {
        this.emitFile({ type: "asset", fileName, source: render() })
      }
    },
  }
}
