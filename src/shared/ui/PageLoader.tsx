import { Center, Loader } from "@mantine/core"

export function PageLoader() {
  return (
    <Center
      h='60dvh'
      aria-busy
    >
      <Loader type='dots' />
    </Center>
  )
}
