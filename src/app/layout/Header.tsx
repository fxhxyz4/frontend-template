import {
  ActionIcon,
  Badge,
  Burger,
  Group,
  Tooltip,
  UnstyledButton,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core"
import { IconMoon, IconSun } from "@tabler/icons-react"
import { Link } from "react-router"

import { env, paths } from "@/shared/config"
import { Logo } from "@/shared/ui"
import { ThemePresetSwitcher } from "./ThemePresetSwitcher"

type HeaderProps = { opened: boolean; onToggle: () => void }

export function Header({ opened, onToggle }: HeaderProps) {
  const { setColorScheme } = useMantineColorScheme()
  const scheme = useComputedColorScheme("light", { getInitialValueInEffect: true })
  const next = scheme === "dark" ? "light" : "dark"

  return (
    <Group
      h='100%'
      px='md'
      justify='space-between'
      wrap='nowrap'
    >
      <Group
        gap='sm'
        wrap='nowrap'
      >
        <Burger
          opened={opened}
          onClick={onToggle}
          hiddenFrom='sm'
          size='sm'
          aria-label='Меню'
        />
        <UnstyledButton
          component={Link}
          to={paths.home}
          aria-label='На головну'
        >
          <Logo />
        </UnstyledButton>
      </Group>

      <Group
        gap='xs'
        wrap='nowrap'
      >
        {env.useMocks && (
          <Badge
            color='warning'
            variant='light'
            visibleFrom='xs'
          >
            Демо-дані
          </Badge>
        )}
        <ThemePresetSwitcher />
        <Tooltip label={next === "dark" ? "Темна тема" : "Світла тема"}>
          <ActionIcon
            variant='default'
            size='lg'
            onClick={() => setColorScheme(next)}
            aria-label='Змінити тему'
          >
            {scheme === "dark" ? <IconSun size={18} /> : <IconMoon size={18} />}
          </ActionIcon>
        </Tooltip>
      </Group>
    </Group>
  )
}
