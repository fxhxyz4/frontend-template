import { Button, Group } from "@mantine/core"
import { IconHome2, IconRefresh } from "@tabler/icons-react"

import { paths } from "@/shared/config"
import { Seo, StatusScreen } from "@/shared/ui"

type ServerErrorPageProps = {
  reason?: "error" | "update"
}

const texts = {
  error: {
    title: "Щось пішло не так",
    description: "Сталася непередбачена помилка. Спробуйте оновити сторінку або повернутися пізніше.",
  },
  update: {
    title: "Доступна нова версія",
    description: "Застосунок оновився. Перезавантажте сторінку, щоб продовжити.",
  },
}

export function ServerErrorPage({ reason = "error" }: ServerErrorPageProps) {
  const { title, description } = texts[reason]

  return (
    <>
      <Seo
        title={title}
        noindex
      />
      <StatusScreen
        code={reason === "update" ? "↻" : "500"}
        title={title}
        description={description}
        actions={
          <Group gap='sm'>
            <Button
              component='a'
              href={paths.home}
              variant='default'
              leftSection={<IconHome2 size={16} />}
            >
              На головну
            </Button>
            <Button
              leftSection={<IconRefresh size={16} />}
              onClick={() => window.location.reload()}
            >
              Оновити сторінку
            </Button>
          </Group>
        }
      />
    </>
  )
}
