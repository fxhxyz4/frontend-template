export const pages = {
  home: () => import("@/pages/home"),
  dashboard: () => import("@/pages/dashboard"),
}

const preloaded = new Set<() => Promise<unknown>>()

export function preload(load: () => Promise<unknown>) {
  if (preloaded.has(load)) return
  preloaded.add(load)
  load().catch(() => preloaded.delete(load))
}
