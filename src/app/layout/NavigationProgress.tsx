import { useNavigation } from "react-router"

import classes from "./NavigationProgress.module.scss"

export function NavigationProgress() {
  const { state } = useNavigation()
  return (
    <div
      className={classes.bar}
      data-active={state !== "idle" || undefined}
      aria-hidden
    />
  )
}
