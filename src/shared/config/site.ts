export const site = {
  name: "AntiCorruption AI",
  shortName: "AC AI",
  description:
    "ШІ-асистент з антикорупційного законодавства України: пошук норм, аналіз документів на корупційні ризики.",
  locale: "uk_UA",
  lang: "uk",
  themeColor: { light: "#1144e8", dark: "#141b2b" },
  /** sitemap.xml */
  publicRoutes: ["/", "/dashboard"],
  /** Disallow robots.txt */
  privateRoutes: ["/api/", "/500"],
} as const
