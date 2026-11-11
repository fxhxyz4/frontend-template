import { NavLink, Stack, Text } from "@mantine/core"
import { Link, useLocation } from "react-router"

import { navigation } from "@/app/router/navigation"
import { preload } from "@/app/router/pages"

export function Navbar({ onNavigate }: { onNavigate: () => void }) {
  const { pathname } = useLocation()

  return (
    <Stack
      h='100%'
      justify='space-between'
    >
      <Stack gap={4}>
        {navigation.map(({ to, label, icon: Icon, load }) => (
          <NavLink
            key={to}
            component={Link}
            to={to}
            label={label}
            leftSection={
              <Icon
                size={20}
                stroke={1.6}
              />
            }
            active={to === "/" ? pathname === "/" : pathname.startsWith(to)}
            onClick={onNavigate}
            onMouseEnter={() => preload(load)}
            onFocus={() => preload(load)}
            styles={{ root: { borderRadius: "var(--mantine-radius-md)" } }}
          />
        ))}
      </Stack>

      <Text
        size='xs'
        c='dimmed'
        px='sm'
      >
        v{__APP_VERSION__} · Хакатон 2026
      </Text>
    </Stack>
  )
}
