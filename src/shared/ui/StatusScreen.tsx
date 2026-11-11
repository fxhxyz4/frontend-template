import { Stack, Text, Title } from "@mantine/core"
import type { ReactNode } from "react"

import classes from "./StatusScreen.module.scss"

type StatusScreenProps = {
  code: string
  title: string
  description: ReactNode
  actions?: ReactNode
}

/** 404 + 500 + / */
export function StatusScreen({ code, title, description, actions }: StatusScreenProps) {
  return (
    <Stack
      className={classes.root}
      align='center'
      gap='md'
    >
      <div
        className={classes.code}
        aria-hidden
      >
        {code}
      </div>
      <Title
        order={1}
        ta='center'
      >
        {title}
      </Title>
      <Text
        c='dimmed'
        ta='center'
        maw={480}
      >
        {description}
      </Text>
      {actions}
    </Stack>
  )
}
