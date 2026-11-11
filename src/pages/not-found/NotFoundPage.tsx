import { Button, Group } from "@mantine/core"
import { IconArrowLeft, IconHome2 } from "@tabler/icons-react"
import { Link, useNavigate } from "react-router"

import { paths } from "@/shared/config"
import { Seo, StatusScreen } from "@/shared/ui"

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <>
      <Seo
        title='Сторінку не знайдено'
        noindex
      />
      <StatusScreen
        code='404'
        title='Сторінку не знайдено'
        description='Можливо, її перемістили або адресу введено з помилкою.'
        actions={
          <Group gap='sm'>
            <Button
              variant='default'
              leftSection={<IconArrowLeft size={16} />}
              onClick={() => void navigate(-1)}
            >
              Назад
            </Button>
            <Button
              component={Link}
              to={paths.home}
              leftSection={<IconHome2 size={16} />}
            >
              На головну
            </Button>
          </Group>
        }
      />
    </>
  )
}
