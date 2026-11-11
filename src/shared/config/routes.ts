export const paths = {
  home: "/",
  dashboard: "/dashboard",
  serverError: "/500",
} as const

export type AppPath = (typeof paths)[keyof typeof paths]
