const numberFmt = new Intl.NumberFormat("uk-UA")
const percentFmt = new Intl.NumberFormat("uk-UA", { maximumFractionDigits: 1, signDisplay: "exceptZero" })

export const formatNumber = (value: number) => numberFmt.format(value)

/** 12.345 → "+12,3%" */
export const formatDiff = (value: number) => `${percentFmt.format(value)}%`

/** 1840 → "1,8 с"; 420 → "420 мс" */
export const formatDuration = (ms: number) =>
  ms < 1000 ? `${Math.round(ms)} мс` : `${(ms / 1000).toLocaleString("uk-UA", { maximumFractionDigits: 1 })} с`
