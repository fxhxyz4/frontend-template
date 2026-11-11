const trimSlash = (url: string) => url.replace(/\/+$/, "")

export const env = {
  siteUrl: trimSlash(import.meta.env.VITE_SITE_URL || window.location.origin),
  apiUrl: trimSlash(import.meta.env.VITE_API_URL || "/api"),
  useMocks: import.meta.env.VITE_USE_MOCKS !== "false",
  isDev: import.meta.env.DEV,
} as const
